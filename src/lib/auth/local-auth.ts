import "server-only";
import {
  createHmac,
  randomBytes,
  randomUUID,
  scrypt,
  timingSafeEqual,
} from "node:crypto";
import { promisify } from "node:util";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { addLocalUser, readLocalUsers } from "@/lib/db/local-store";

const scryptAsync = promisify(scrypt) as (
  password: string,
  salt: string,
  keylen: number,
) => Promise<Buffer>;

const secretFile = path.join(process.cwd(), ".data", "auth-secret");
let cachedSecret: string | null = null;

/**
 * Local-mode signing key. Set AUTH_SECRET in any shared environment; the
 * generated file only exists so a fresh clone can run without configuration.
 */
async function getSecret(): Promise<string> {
  if (process.env.AUTH_SECRET) return process.env.AUTH_SECRET;
  if (cachedSecret) return cachedSecret;

  try {
    cachedSecret = (await readFile(secretFile, "utf8")).trim();
  } catch {
    cachedSecret = randomBytes(32).toString("hex");
    await mkdir(path.dirname(secretFile), { recursive: true });
    await writeFile(secretFile, cachedSecret, "utf8");
  }
  return cachedSecret;
}

async function hashPassword(password: string, salt: string): Promise<string> {
  const derived = await scryptAsync(password, salt, 64);
  return derived.toString("hex");
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export async function createSessionToken(userId: string): Promise<string> {
  const signature = createHmac("sha256", await getSecret())
    .update(userId)
    .digest("hex");
  return `${userId}.${signature}`;
}

export async function readSessionToken(
  token: string | undefined,
): Promise<string | null> {
  if (!token) return null;
  const separator = token.lastIndexOf(".");
  if (separator < 0) return null;

  const userId = token.slice(0, separator);
  const signature = token.slice(separator + 1);
  const expected = createHmac("sha256", await getSecret())
    .update(userId)
    .digest("hex");

  return safeEqual(signature, expected) ? userId : null;
}

export type LocalAuthResult =
  | { ok: true; user: { id: string; email: string } }
  | { ok: false; error: string };

export async function localSignUp(
  email: string,
  password: string,
): Promise<LocalAuthResult> {
  const normalized = email.trim().toLowerCase();
  const users = await readLocalUsers();
  if (users.some((u) => u.email === normalized)) {
    return { ok: false, error: "An account with this email already exists." };
  }

  const salt = randomBytes(16).toString("hex");
  const user = {
    id: randomUUID(),
    email: normalized,
    salt,
    passwordHash: await hashPassword(password, salt),
    createdAt: new Date().toISOString(),
  };
  await addLocalUser(user);

  return { ok: true, user: { id: user.id, email: user.email } };
}

export async function localSignIn(
  email: string,
  password: string,
): Promise<LocalAuthResult> {
  const normalized = email.trim().toLowerCase();
  const user = (await readLocalUsers()).find((u) => u.email === normalized);
  if (!user) return { ok: false, error: "Invalid email or password." };

  const candidate = await hashPassword(password, user.salt);
  if (!safeEqual(candidate, user.passwordHash)) {
    return { ok: false, error: "Invalid email or password." };
  }

  return { ok: true, user: { id: user.id, email: user.email } };
}

export async function findLocalUser(
  userId: string,
): Promise<{ id: string; email: string } | null> {
  const user = (await readLocalUsers()).find((u) => u.id === userId);
  return user ? { id: user.id, email: user.email } : null;
}

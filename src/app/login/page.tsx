import { redirect } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { AuthForm } from "@/components/auth/auth-form";
import { getSessionUser } from "@/lib/auth/session";

export const metadata = { title: "Sign in" };

export default async function LoginPage() {
  if (await getSessionUser()) redirect("/history");

  return (
    <AppShell>
      <div className="px-6 pb-20 sm:px-10">
        <AuthForm />
      </div>
    </AppShell>
  );
}

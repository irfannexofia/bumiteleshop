"use server";

import { redirect } from "next/navigation";

import {
  registerUserIfMissing,
  signInWithCredentials,
  signOut,
} from "@/server/services/auth.service";

export async function signInAction(
  _prev: { error?: string } | null,
  formData: FormData,
): Promise<{ error?: string }> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const redirectTo = String(formData.get("redirectTo") ?? "/dashboard");

  const result = await signInWithCredentials(email, password);

  if (!result.success) {
    return { error: result.error };
  }

  redirect(redirectTo.startsWith("/") ? redirectTo : "/dashboard");
}

export async function signOutAction(): Promise<void> {
  await signOut();
  redirect("/");
}

export async function ensureDemoUserAction(): Promise<void> {
  await registerUserIfMissing(
    "demo@bumiteleshop.com",
    "Demo User",
    "demo123456",
  );
}

import { AlertApp } from "@/core/modules/app/fragments/alert";
import { RegisterAuthContainer } from "@/features/auth/register/container";
import { RegisterAuthProvider } from "@/features/auth/register/context";

export default function RegisterPage() {
  return (
    <RegisterAuthProvider>
      <RegisterAuthContainer />
      <AlertApp />
    </RegisterAuthProvider>
  );
}

import { AlertApp } from "@/core/modules/app/fragments/alert";
import { LoginAuthContainer } from "@/features/auth/login/container";
import { LoginAuthProvider } from "@/features/auth/login/context";

export default function LoginPage() {
  return (
    <LoginAuthProvider>
      <LoginAuthContainer />
      <AlertApp />
    </LoginAuthProvider>
  );
}

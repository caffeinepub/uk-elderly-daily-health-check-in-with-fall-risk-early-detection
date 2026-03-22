import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, LogIn, LogOut } from "lucide-react";
import { useInternetIdentity } from "../../hooks/useInternetIdentity";

export default function LoginButton() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === "logging-in";
  const disabled = isLoggingIn;

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error("Login error:", error);
        if (error.message === "User is already authenticated") {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  return (
    <Button
      onClick={handleAuth}
      disabled={disabled}
      variant={isAuthenticated ? "outline" : "default"}
      size="lg"
      className="min-w-[120px]"
    >
      {isLoggingIn ? (
        <>
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          Signing in...
        </>
      ) : isAuthenticated ? (
        <>
          <LogOut className="w-5 h-5 mr-2" />
          Sign Out
        </>
      ) : (
        <>
          <LogIn className="w-5 h-5 mr-2" />
          Sign In
        </>
      )}
    </Button>
  );
}

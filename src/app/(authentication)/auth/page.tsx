import { SignInForm } from "@/components/auth/sign-in-form";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth-utils";
import { AppContainer } from "@/components/layout/app-container";

export default async function AuthPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; callbackUrl?: string }>;
}) {
  const session = await getSession();
  const { tab, callbackUrl } = await searchParams;

  const safeCallbackUrl = callbackUrl?.startsWith("/")
    ? callbackUrl
    : "/editor";

  // Redirect authenticated users to their callback destination.
  if (session?.user) {
    redirect(safeCallbackUrl);
  }

  return (
    <AppContainer className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center py-10 sm:py-14">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Welcome to Markstack
          </h2>
          <p className="text-sm text-muted-foreground">
            Sign in to your account or create a new one
          </p>
        </div>

        <Tabs
          defaultValue={tab === "signup" ? "signup" : "signin"}
          className="w-full"
        >
          <TabsList className="grid h-10 w-full grid-cols-2 rounded-lg border bg-card p-1">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="signin" className="mt-6">
            <SignInForm />
          </TabsContent>

          <TabsContent value="signup" className="mt-6">
            <SignUpForm />
          </TabsContent>
        </Tabs>
      </div>
    </AppContainer>
  );
}

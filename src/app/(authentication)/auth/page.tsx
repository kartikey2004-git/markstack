import { SignInForm } from "@/components/auth/sign-in-form";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth-utils";

export default async function AuthPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; callbackUrl?: string }>;
}) {
  const session = await getSession();
  const { tab, callbackUrl } = await searchParams;
  
  const safeCallbackUrl = callbackUrl?.startsWith("/") ? callbackUrl : "/editor";

  // Redirect authenticated users to their callback destination.
  if (session?.user) {
    redirect(safeCallbackUrl);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Welcome to Markstack
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your account or create a new one
          </p>
        </div>
        
        <Tabs defaultValue={tab === "signup" ? "signup" : "signin"} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
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
    </div>
  );
}

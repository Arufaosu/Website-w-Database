// app/sign-in/[[...rest]]/page.tsx

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <SignIn 
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
        redirectUrl="/" // Redirect to the home page after sign-in
      />
    </div>
  );
}

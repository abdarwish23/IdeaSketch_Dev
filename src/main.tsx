
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from "@clerk/clerk-react";
import App from './App.tsx'
import './index.css'

const PUBLISHABLE_KEY = "pk_test_bm90YWJsZS1jaGFtb2lzLTU2LmNsZXJrLmFjY291bnRzLmRldiQ";
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

createRoot(document.getElementById("root")!).render(
  <ClerkProvider 
    publishableKey={PUBLISHABLE_KEY}
    signInUrl="/login"
    signUpUrl="/register"
    afterSignInUrl="/chat"
    afterSignUpUrl="/chat"
    appearance={{
      elements: {
        formButtonPrimary: "bg-idea-green hover:bg-idea-green/90 text-white",
        formFieldInput: "border border-gray-300 focus:ring-idea-primary focus:border-idea-primary",
      }
    }}
  >
    <App />
  </ClerkProvider>
);

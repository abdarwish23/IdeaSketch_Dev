
import { useNavigate, Link } from "react-router-dom";
import { SignIn } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Get error from URL if present
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get("error");
    if (error) {
      setLoginError(decodeURIComponent(error));
    }
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-idea-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="text-2xl font-bold text-idea-primary">IdeaSketch</div>
      </div>
      
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-8">
            <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
              Sign in to IdeaSketch
            </h2>
            
            {loginError && (
              <Alert variant="destructive" className="mb-6">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Authentication Error</AlertTitle>
                <AlertDescription>{loginError}</AlertDescription>
              </Alert>
            )}
            
            <SignIn 
              path="/login"
              routing="path"
              signUpUrl="/register"
              fallbackRedirectUrl="/chat"
              appearance={{
                elements: {
                  card: "shadow-none",
                  formButtonPrimary: "bg-idea-green hover:bg-idea-green/90 text-white",
                  formFieldInput: "border border-gray-300 focus:ring-idea-primary focus:border-idea-primary",
                }
              }}
            />
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/register" className="font-medium text-idea-primary hover:text-idea-primary/80">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

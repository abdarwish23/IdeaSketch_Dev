
import { useNavigate, Link } from "react-router-dom";
import { SignUp } from "@clerk/clerk-react";
import { useState, useEffect } from "react";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

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
              Create your account
            </h2>
            <SignUp 
              path="/register"
              routing="path"
              signInUrl="/login"
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
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-idea-primary hover:text-idea-primary/80">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;


import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if this is an authentication error
    if (location.pathname === "/login" && location.search.includes("error")) {
      const params = new URLSearchParams(location.search);
      const error = params.get("error");
      // Redirect to login with error message
      window.location.href = `/login?error=${encodeURIComponent(
        error || "Account not found. Please check your credentials or sign up."
      )}`;
    } else {
      console.error(
        "404 Error: User attempted to access non-existent route:",
        location.pathname
      );
    }
  }, [location.pathname, location.search]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-bold mb-4 text-gray-800">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! Page not found</p>
        
        <Alert variant="destructive" className="mb-8 text-left">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Page Not Found</AlertTitle>
          <AlertDescription>
            The page you are looking for doesn't exist or you may not have permission to access it.
          </AlertDescription>
        </Alert>
        
        <Button asChild className="bg-idea-primary hover:bg-idea-primary/90">
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

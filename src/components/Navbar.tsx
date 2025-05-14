
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton } from "@clerk/clerk-react";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-idea-primary text-2xl font-bold">IdeaSketch</span>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link
                to="/"
                className="text-gray-500 hover:text-idea-primary font-medium"
              >
                Home
              </Link>
              <Link
                to="/chat"
                className="text-gray-500 hover:text-idea-primary font-medium"
              >
                Patent Assistant
              </Link>
              <a
                href="#features"
                className="text-gray-500 hover:text-idea-primary font-medium"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-gray-500 hover:text-idea-primary font-medium"
              >
                Pricing
              </a>
            </div>
          </div>
          <div className="hidden md:flex items-center">
            <SignedIn>
              <div className="flex items-center gap-4">
                <Link to="/chat">
                  <Button className="bg-idea-green hover:bg-idea-green/90 text-white">
                    My Dashboard
                  </Button>
                </Link>
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
            <SignedOut>
              <div className="flex items-center gap-2">
                <SignInButton mode="modal">
                  <Button variant="outline">Sign In</Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button className="bg-idea-green hover:bg-idea-green/90 text-white">
                    Get Started
                  </Button>
                </SignUpButton>
              </div>
            </SignedOut>
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:text-idea-primary hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/chat"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:text-idea-primary hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Patent Assistant
            </Link>
            <a
              href="#features"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:text-idea-primary hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#pricing"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:text-idea-primary hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </a>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <SignedIn>
                <div className="flex items-center px-4">
                  <UserButton />
                  <Link
                    to="/chat"
                    className="ml-3 block px-4 py-2 text-base font-medium text-gray-500 hover:text-idea-primary hover:bg-gray-100 rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Dashboard
                  </Link>
                </div>
              </SignedIn>
              <SignedOut>
                <div className="flex flex-col gap-2 px-4">
                  <SignInButton mode="modal">
                    <Button variant="outline" className="w-full justify-center">
                      Sign In
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button className="w-full justify-center bg-idea-green hover:bg-idea-green/90 text-white">
                      Get Started
                    </Button>
                  </SignUpButton>
                </div>
              </SignedOut>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

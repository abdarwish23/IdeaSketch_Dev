
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-idea-lightblue py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 items-center">
            <div className="mb-10 lg:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-idea-darkblue mb-6 leading-tight">
                Transform Your Ideas Into Patentable Innovations
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                IdeaSketch helps inventors, entrepreneurs, and innovators 
                develop, refine, and document patent-worthy ideas through 
                AI-powered assistance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/chat">
                  <Button size="lg" className="bg-idea-green hover:bg-idea-green/90 text-white">
                    Start Creating Now
                  </Button>
                </Link>
                <a href="#features">
                  <Button variant="outline" size="lg">
                    Explore Features
                  </Button>
                </a>
              </div>
            </div>
            <div className="lg:flex justify-center">
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-idea-green/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-idea-primary/20 rounded-full blur-3xl"></div>
                <div className="relative bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
                  <div className="text-center mb-6">
                    <h3 className="text-idea-primary text-xl font-semibold mb-3">
                      Patent Assistant
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Ask anything about patents and innovation
                    </p>
                  </div>
                  <div className="mb-4 bg-gray-100 p-4 rounded-lg">
                    <p className="text-gray-800">
                      How can I make my solar energy storage system more patentable?
                    </p>
                  </div>
                  <div className="bg-idea-lightblue p-4 rounded-lg">
                    <p className="text-gray-700">
                      To enhance patentability, focus on novel technical solutions like new 
                      material compositions, unique energy conversion methods, or innovative 
                      control systems that improve efficiency...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Feature Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-idea-primary mb-4">
              Powerful Patent Development Tools
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              IdeaSketch provides everything you need to develop and document your innovative ideas
              from concept to patent application.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="bg-idea-green/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="text-idea-green"
                >
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="14.31" y1="8" x2="20.05" y2="17.94"/>
                  <line x1="9.69" y1="8" x2="21.17" y2="8"/>
                  <line x1="7.38" y1="12" x2="13.12" y2="2.06"/>
                  <line x1="9.69" y1="16" x2="3.95" y2="6.06"/>
                  <line x1="14.31" y1="16" x2="2.83" y2="16"/>
                  <line x1="16.62" y1="12" x2="10.88" y2="21.94"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-idea-primary">
                Idea Generation
              </h3>
              <p className="text-gray-600">
                Generate innovative patent ideas across various technological domains with our
                AI-powered brainstorming assistant.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="bg-idea-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="text-idea-primary"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-idea-primary">
                Concept Refinement
              </h3>
              <p className="text-gray-600">
                Enhance your existing ideas with expert suggestions to strengthen patentability
                and overcome potential prior art obstacles.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="bg-idea-secondary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="text-idea-secondary"
                >
                  <path d="M14 3v4a1 1 0 0 0 1 1h4"/>
                  <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z"/>
                  <line x1="9" y1="9" x2="10" y2="9"/>
                  <line x1="9" y1="13" x2="15" y2="13"/>
                  <line x1="9" y1="17" x2="15" y2="17"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-idea-primary">
                Patent Documentation
              </h3>
              <p className="text-gray-600">
                Get assistance drafting comprehensive patent documentation with proper claims,
                detailed descriptions, and technical specifications.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-idea-primary mb-4">
              Choose Your Plan
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Select the plan that fits your innovation needs, from individual creators
              to enterprise patent portfolios.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Basic Plan */}
            <div className="rounded-xl border border-gray-200 bg-white p-8 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-2">Basic</h3>
              <p className="text-gray-600 text-sm mb-4">Best for individuals exploring the platform</p>
              <div className="mb-2">
                <span className="text-4xl font-bold">$0</span>
              </div>
              <p className="text-gray-500 mb-6">Free</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="text-green-500 mr-2"
                  >
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                  <span className="text-gray-600">1 patent idea generation per month</span>
                </li>
                <li className="flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="text-green-500 mr-2"
                  >
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                  <span className="text-gray-600">1 patent summary report</span>
                </li>
                <li className="flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="text-green-500 mr-2"
                  >
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                  <span className="text-gray-600">Basic novelty assessment</span>
                </li>
                <li className="flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="text-green-500 mr-2"
                  >
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                  <span className="text-gray-600">Limited AI agent collaboration</span>
                </li>
              </ul>
              <Link to="/chat">
                <Button className="w-full" variant="outline">
                  Try it Free
                </Button>
              </Link>
            </div>
            
            {/* Pro Plan */}
            <div className="rounded-xl border border-gray-200 bg-white p-8 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-2">Pro</h3>
              <p className="text-gray-600 text-sm mb-4">Ideal for solo innovators and small teams</p>
              <div className="mb-2">
                <span className="text-4xl font-bold">$39</span>
              </div>
              <p className="text-gray-500 mb-6">per month</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="text-green-500 mr-2"
                  >
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                  <span className="text-gray-600">10 patent ideas per month</span>
                </li>
                <li className="flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="text-green-500 mr-2"
                  >
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                  <span className="text-gray-600">5 detailed patent reports</span>
                </li>
                <li className="flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="text-green-500 mr-2"
                  >
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                  <span className="text-gray-600">Advanced novelty assessment</span>
                </li>
                <li className="flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="text-green-500 mr-2"
                  >
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                  <span className="text-gray-600">Full AI agent collaboration</span>
                </li>
                <li className="flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="text-green-500 mr-2"
                  >
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                  <span className="text-gray-600">Access to academic patent search</span>
                </li>
              </ul>
              <Link to="/chat">
                <Button className="w-full" variant="outline">
                  Get Started
                </Button>
              </Link>
            </div>
            
            {/* Premium Plan (Popular) */}
            <div className="rounded-xl border-2 border-idea-green bg-white p-8 shadow-xl relative">
              <div className="absolute top-0 right-0 bg-idea-green text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                MOST POPULAR
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium</h3>
              <p className="text-gray-600 text-sm mb-4">Designed for startups and growing innovation teams</p>
              <div className="mb-2">
                <span className="text-4xl font-bold">$89</span>
              </div>
              <p className="text-gray-500 mb-6">per month</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="text-green-500 mr-2"
                  >
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                  <span className="text-gray-600">30 patent ideas per month</span>
                </li>
                <li className="flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="text-green-500 mr-2"
                  >
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                  <span className="text-gray-600">15 detailed patent reports</span>
                </li>
                <li className="flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="text-green-500 mr-2"
                  >
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                  <span className="text-gray-600">Advanced novelty assessment</span>
                </li>
                <li className="flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="text-green-500 mr-2"
                  >
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                  <span className="text-gray-600">Full AI agent collaboration</span>
                </li>
                <li className="flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="text-green-500 mr-2"
                  >
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                  <span className="text-gray-600">Priority support</span>
                </li>
                <li className="flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="text-green-500 mr-2"
                  >
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                  <span className="text-gray-600">Access to academic patent search</span>
                </li>
                <li className="flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="text-green-500 mr-2"
                  >
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                  <span className="text-gray-600">Patent legal claim generation</span>
                </li>
              </ul>
              <Link to="/chat">
                <Button className="w-full bg-idea-green hover:bg-idea-green/90 text-white">
                  Get Started
                </Button>
              </Link>
            </div>
            
            {/* Enterprise Plan */}
            <div className="rounded-xl border border-gray-200 bg-white p-8 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
              <p className="text-gray-600 text-sm mb-4">Tailored for large organizations with advanced needs</p>
              <div className="mb-2 h-10">
                <div className="text-lg font-medium">Contact Sales</div>
              </div>
              <div className="mb-6 h-4"></div>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="text-green-500 mr-2"
                  >
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                  <span className="text-gray-600">Unlimited patent idea generation</span>
                </li>
                <li className="flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="text-green-500 mr-2"
                  >
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                  <span className="text-gray-600">Unlimited detailed patent reports</span>
                </li>
                <li className="flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="text-green-500 mr-2"
                  >
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                  <span className="text-gray-600">Custom AI agent training for industry-specific domains</span>
                </li>
                <li className="flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="text-green-500 mr-2"
                  >
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                  <span className="text-gray-600">API integration with existing R&D systems</span>
                </li>
                <li className="flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="text-green-500 mr-2"
                  >
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                  <span className="text-gray-600">Smart patent tracking and expiry alerts</span>
                </li>
              </ul>
              <div className="mt-8">
                <Link to="/chat">
                  <Button className="w-full" variant="outline">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 bg-idea-darkblue text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your Ideas Into Patents?
          </h2>
          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
            Join thousands of innovators already using IdeaSketch to develop and document
            their groundbreaking ideas.
          </p>
          <Link to="/chat">
            <Button size="lg" className="bg-idea-green hover:bg-idea-green/90 text-white">
              Start Free Today
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-idea-primary font-semibold mb-4">IdeaSketch</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-500 hover:text-idea-primary">About Us</a></li>
                <li><a href="#" className="text-gray-500 hover:text-idea-primary">Careers</a></li>
                <li><a href="#" className="text-gray-500 hover:text-idea-primary">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-idea-primary font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-500 hover:text-idea-primary">Features</a></li>
                <li><a href="#pricing" className="text-gray-500 hover:text-idea-primary">Pricing</a></li>
                <li><a href="#" className="text-gray-500 hover:text-idea-primary">Testimonials</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-idea-primary font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-500 hover:text-idea-primary">Help Center</a></li>
                <li><a href="#" className="text-gray-500 hover:text-idea-primary">Contact Us</a></li>
                <li><a href="#" className="text-gray-500 hover:text-idea-primary">API Documentation</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-idea-primary font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-500 hover:text-idea-primary">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-500 hover:text-idea-primary">Terms of Service</a></li>
                <li><a href="#" className="text-gray-500 hover:text-idea-primary">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              &copy; 2025 IdeaSketch. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-idea-primary">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-idea-primary">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
      
    </div>
  );
};

export default LandingPage;

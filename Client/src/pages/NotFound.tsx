import { Home, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();
  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Circles - Grayscale */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-gray-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-gray-400 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-4000"></div>

        {/* Subtle Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        ></div>

        {/* Diagonal Lines */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-black to-transparent"></div>
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-black to-transparent"></div>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-6xl w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Illustration */}
            <div className="relative order-2 lg:order-1">
              <div className="relative">
                {/* Main 404 Number with elegant gradient */}
                <div className="relative">
                  <h1 className="text-[150px] sm:text-[200px] md:text-[280px] lg:text-[320px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-br from-gray-900 via-gray-600 to-black select-none">
                    404
                  </h1>

                  {/* Elegant Floating Elements */}
                  <div className="absolute top-1/4 -left-8 animate-float">
                    <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-gray-800 to-black rounded-2xl rotate-12 shadow-2xl shadow-gray-900/30 flex items-center justify-center">
                      <MapPin className="w-8 sm:w-10 h-8 sm:h-10 text-white" />
                    </div>
                  </div>

                  <div className="absolute top-1/2 -right-4 animate-float-delayed">
                    <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full shadow-2xl shadow-gray-800/30 flex items-center justify-center border border-gray-600">
                      <Sparkles className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                    </div>
                  </div>

                  <div className="absolute bottom-1/4 left-1/3 animate-float-slow">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg -rotate-12 shadow-2xl shadow-gray-700/30 flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Minimal Decorative Lines */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
                  <svg className="w-full h-full" viewBox="0 0 400 400">
                    <path
                      d="M 50 200 Q 200 100 350 200"
                      stroke="#000"
                      strokeWidth="1"
                      fill="none"
                      strokeDasharray="8,8"
                      opacity="0.2"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        from="0"
                        to="16"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </path>
                    <path
                      d="M 50 250 Q 200 350 350 250"
                      stroke="#666"
                      strokeWidth="1"
                      fill="none"
                      strokeDasharray="8,8"
                      opacity="0.2"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        from="0"
                        to="16"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="space-y-8 order-1 lg:order-2 text-center lg:text-left">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-sm font-semibold">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  Page Not Found
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-black leading-tight">
                  Lost Your Way?
                </h2>

                <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                  Don't worry! Even the best drivers take wrong turns sometimes.
                  Let's get you back on track to your destination.
                </p>
              </div>

              {/* Action Button */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => handleNavigate('/hike')}
                  className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-black text-white rounded-2xl font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Home className="w-5 h-5" />
                    Back to Home
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>

              {/* Popular Links */}
              <div className="pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-3 font-medium">
                  Popular destinations:
                </p>
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  {[
                    { label: 'Dashboard', path: '/insights' },
                    { label: 'Profile', path: '/profile' },
                    { label: 'Rides', path: '/ride' },
                    { label: 'Activity', path: '/activity' },
                  ].map(link => (
                    <button
                      key={link.label}
                      onClick={() => handleNavigate(link.path)}
                      className="px-3 sm:px-4 py-2 bg-gray-100 hover:bg-black hover:text-white text-gray-700 rounded-lg text-sm font-medium transition-all hover:scale-105 active:scale-95 cursor-pointer border border-gray-200 hover:border-black"
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-5deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(10deg); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

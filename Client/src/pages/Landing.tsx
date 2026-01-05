import {
  Shield,
  FileCheck,
  AlertTriangle,
  Leaf,
  DollarSign,
  ArrowRight,
  CheckCircle,
  MapPin,
  Trees,
  TrendingDown,
  UserCheck,
  Clock,
  Star,
  Target,
  Smartphone,
  Search,
  Users,
  Car,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Landing = () => {
  const [activeSection, setActiveSection] = useState('');
  const [roleTab, setRoleTab] = useState<'rider' | 'hiker'>('rider');
  const navigate = useNavigate();

  // Smooth scroll handler
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Intersection Observer for scroll animations + active nav
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          if (entry.target.id) {
            setActiveSection(`#${entry.target.id}`);
          }
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('.reveal-section');
    sections.forEach(section => observer.observe(section));

    return () => sections.forEach(section => observer.unobserve(section));
  }, []);

  // Tab data for How it works
  const riderSteps = [
    {
      title: 'Create Profile',
      icon: Smartphone,
      desc: 'Verify your ID and vehicle in minutes.',
    },
    {
      title: 'Post Your Ride',
      icon: Search,
      desc: 'Set your route, time, and available seats.',
    },
    {
      title: 'Connect & Confirm',
      icon: Users,
      desc: 'Chat, review profiles, and approve hikers.',
    },
    {
      title: 'Drive & Share Costs',
      icon: Car,
      desc: 'Travel together, split costs, and save fuel.',
    },
  ];

  const hikerSteps = [
    {
      title: 'Create Profile',
      icon: Smartphone,
      desc: 'Verify your identity for safer journeys.',
    },
    {
      title: 'Find a Ride',
      icon: Search,
      desc: 'Search rides that match your route and time.',
    },
    {
      title: 'Request & Chat',
      icon: Users,
      desc: 'Send requests, chat, and clarify trip details.',
    },
    {
      title: 'Ride Safely',
      icon: Car,
      desc: 'Enjoy verified rides with live tracking & SOS.',
    },
  ];

  const steps = roleTab === 'rider' ? riderSteps : hikerSteps;

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo + Brand */}
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center">
                {/* Replace src with your actual logo */}
                <img
                  src="/nomad-logo.png"
                  alt="NOMAD Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-bold text-black tracking-tight">
                NOMAD
              </span>
            </div>

            {/* Nav links */}
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#features"
                onClick={e => handleNavClick(e, '#features')}
                className={`text-gray-600 hover:text-black transition-all cursor-pointer font-medium relative ${
                  activeSection === '#features' ? 'text-black' : ''
                }`}
              >
                Features
                {activeSection === '#features' && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-black"></span>
                )}
              </a>
              <a
                href="#impact"
                onClick={e => handleNavClick(e, '#impact')}
                className={`text-gray-600 hover:text-black transition-all cursor-pointer font-medium relative ${
                  activeSection === '#impact' ? 'text-black' : ''
                }`}
              >
                Impact
                {activeSection === '#impact' && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-black"></span>
                )}
              </a>
              <a
                href="#how-it-works"
                onClick={e => handleNavClick(e, '#how-it-works')}
                className={`text-gray-600 hover:text-black transition-all cursor-pointer font-medium relative ${
                  activeSection === '#how-it-works' ? 'text-black' : ''
                }`}
              >
                How It Works
                {activeSection === '#how-it-works' && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-black"></span>
                )}
              </a>
              <button
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all hover:scale-105 cursor-pointer font-medium shadow-md"
                onClick={() => navigate('/hike')}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-20 reveal-section opacity-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full animate-bounce-gentle">
                <Leaf className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">
                  Eco-Friendly • Safe • Verified
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-black leading-tight">
                Share Rides,
                <span className="block text-gray-600">Save Money,</span>
                <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Save Earth with NOMAD
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
                NOMAD connects riders and hikers for safe, affordable journeys.
                Share seats, split fuel, and reduce emissions while staying
                fully protected.
              </p>

              {/* Trust strip */}
              <div className="pt-4 flex items-center gap-6 text-gray-400">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden"
                    >
                      <img
                        src={`https://i.pravatar.cc/100?img=${i + 10}`}
                        alt="User"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <span className="font-bold text-black block">
                    50k+ Nomads
                  </span>
                  trust us daily
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className="group px-8 py-4 bg-black text-white rounded-xl font-bold text-lg hover:bg-gray-800 transition-all hover:scale-105 cursor-pointer shadow-lg flex items-center justify-center gap-2"
                  onClick={() => navigate('/hike')}
                >
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button className="px-8 py-4 bg-white border-2 border-black text-black rounded-xl font-bold text-lg hover:bg-gray-50 transition-all cursor-pointer">
                  Learn More
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <img
                  src="https://user-gen-media-assets.s3.amazonaws.com/seedream_images/33afead9-6bcc-4d4b-b714-66b10ad30dc4.png"
                  alt="Ridesharing illustration"
                  className="w-full h-auto"
                />
              </div>

              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 border border-gray-100 animate-float">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-bold text-black">100% Verified</div>
                    <div className="text-sm text-gray-600">
                      All rides & users verified
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Features Section (unchanged structurally, enhanced earlier) */}
      <section
        id="features"
        className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 reveal-section opacity-0"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-sm font-semibold mb-4">
              <Shield className="w-4 h-4" />
              Your Safety First
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
              Built for Safety & Trust
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Advanced security features that keep you protected throughout your
              journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FileCheck,
                title: 'Document Verification',
                desc: 'ID, license, and vehicle documents checked before approval.',
                color: 'black',
                bgColor: 'bg-black',
                lightBg: 'bg-gray-50',
              },
              {
                icon: AlertTriangle,
                title: 'Smart SOS Alerts',
                desc: 'Manual and automatic SOS triggers with contact alerts.',
                color: 'red-600',
                bgColor: 'bg-red-600',
                lightBg: 'bg-red-50',
              },
              {
                icon: MapPin,
                title: 'Live Route Tracking',
                desc: 'Real-time GPS and alerts on route deviations.',
                color: 'blue-600',
                bgColor: 'bg-blue-600',
                lightBg: 'bg-blue-50',
              },
              {
                icon: Star,
                title: 'Rating System',
                desc: 'Community reviews to highlight trusted Nomads.',
                color: 'purple-600',
                bgColor: 'bg-purple-600',
                lightBg: 'bg-purple-50',
              },
              {
                icon: UserCheck,
                title: 'Identity Badges',
                desc: 'Verified badges for fully checked profiles.',
                color: 'green-600',
                bgColor: 'bg-green-600',
                lightBg: 'bg-green-50',
              },
              {
                icon: Clock,
                title: '24/7 Support',
                desc: 'Always-on support for any safety concerns.',
                color: 'orange-600',
                bgColor: 'bg-orange-600',
                lightBg: 'bg-orange-50',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className={`group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-gray-100 transform hover:-translate-y-2 overflow-hidden`}
              >
                <div
                  className={`absolute inset-0 ${feature.lightBg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>
                <div className="relative z-10">
                  <div
                    className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Environmental Impact Section – goals (as before) */}
      <section
        id="impact"
        className="py-20 bg-gradient-to-br from-green-50 to-emerald-50 reveal-section opacity-0"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-full text-sm font-semibold">
                <Target className="w-4 h-4" />
                Our Mission & Goals
              </div>

              <h2 className="text-4xl md:text-5xl font-black text-black leading-tight">
                Together We Can Make a Difference
              </h2>

              <p className="text-xl text-gray-600 leading-relaxed">
                NOMAD aims to make shared travel the default, not the exception.
                Join the mission to cut emissions, save fuel, and plant forests
                along the way.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4 bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingDown className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-black text-lg mb-2">
                      Reduce 10M kg CO₂ Annually
                    </h4>
                    <p className="text-gray-600">
                      Targeting 10 million kg CO₂ reduction in our first year
                      through shared rides.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-black text-lg mb-2">
                      Save ₹50M in Fuel Costs
                    </h4>
                    <p className="text-gray-600">
                      Help the community save ₹50 million by sharing journeys
                      instead of driving alone.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Trees className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-black text-lg mb-2">
                      Plant 100,000 Trees
                    </h4>
                    <p className="text-gray-600">
                      One tree for every 100 rides, aiming for 100,000 trees in
                      year one.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Goals Grid */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-8 shadow-xl text-center transform hover:scale-105 transition-all cursor-pointer hover:shadow-2xl">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <Target className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-4xl font-black text-green-600 mb-2">
                  10M
                </div>
                <div className="text-sm text-gray-600 font-medium uppercase">
                  KG CO₂ Goal
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-xl text-center transform hover:scale-105 transition-all cursor-pointer hover:shadow-2xl">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-4xl font-black text-blue-600 mb-2">
                  ₹50M
                </div>
                <div className="text-sm text-gray-600 font-medium uppercase">
                  Savings Goal
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-xl text-center transform hover:scale-105 transition-all cursor-pointer hover:shadow-2xl">
                <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <div className="text-4xl font-black text-purple-600 mb-2">
                  1M
                </div>
                <div className="text-sm text-gray-600 font-medium uppercase">
                  Users Goal
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-xl text-center transform hover:scale-105 transition-all cursor-pointer hover:shadow-2xl">
                <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Trees className="w-8 h-8 text-emerald-600" />
                </div>
                <div className="text-4xl font-black text-emerald-600 mb-2">
                  100K
                </div>
                <div className="text-sm text-gray-600 font-medium uppercase">
                  Trees Goal
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW How It Works Section with Rider/Hiker tabs */}
      <section
        id="how-it-works"
        className="py-24 bg-white reveal-section opacity-0"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
              Start Your Journey
            </h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Switch between Rider and Hiker to see how NOMAD works for you.
            </p>
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() => setRoleTab('rider')}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-colors cursor-pointer ${
                  roleTab === 'rider'
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                Rider
              </button>
              <button
                onClick={() => setRoleTab('hiker')}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-colors cursor-pointer ${
                  roleTab === 'hiker'
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                Hiker
              </button>
            </div>
          </div>

          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 hidden md:block z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="group bg-white p-6 rounded-2xl border border-gray-100 hover:border-black/10 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 text-center"
                >
                  <div className="w-16 h-16 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-colors duration-300 relative">
                    <step.icon className="w-7 h-7" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full text-white text-xs font-bold flex items-center justify-center border-2 border-white">
                      {i + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA + Footer from previous version (unchanged text except brand) */}
      <section className="py-20 bg-black text-white reveal-section opacity-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join the NOMAD community of riders and hikers making every kilometer
            safer, smarter, and greener.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="group px-8 py-4 bg-white text-black rounded-xl font-bold text-lg hover:bg-gray-100 transition-all hover:scale-105 cursor-pointer shadow-lg flex items-center justify-center gap-2"
              onClick={() => navigate('/hike')}
            >
              Start Riding Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white hover:text-black transition-all cursor-pointer">
              Learn More
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-gray-50 py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center">
                  <img
                    src="/nomad-logo.png"
                    alt="NOMAD Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-xl font-bold text-black">NOMAD</span>
              </div>
              <p className="text-gray-600 text-sm">
                Making transportation safer, affordable, and sustainable for
                everyone.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-black mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a
                    href="#"
                    className="hover:text-black transition-colors cursor-pointer"
                  >
                    For Riders
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-black transition-colors cursor-pointer"
                  >
                    For Hikers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-black transition-colors cursor-pointer"
                  >
                    Safety
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-black transition-colors cursor-pointer"
                  >
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-black mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a
                    href="#"
                    className="hover:text-black transition-colors cursor-pointer"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-black transition-colors cursor-pointer"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-black transition-colors cursor-pointer"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-black transition-colors cursor-pointer"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-black mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a
                    href="#"
                    className="hover:text-black transition-colors cursor-pointer"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-black transition-colors cursor-pointer"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-black transition-colors cursor-pointer"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
            <p>© 2026 NOMAD. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Animation Styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }

        html {
          scroll-behavior: smooth;
        }
        
        .reveal-section {
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
          transform: translateY(30px);
        }
        
        .reveal-section.animate-in {
          opacity: 1 !important;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

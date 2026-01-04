import React, { useState } from 'react';
import { Activity, Shield, Clock, FileText, ChevronRight, Menu, X, Users, TrendingUp, CheckCircle, Database, BarChart3 } from 'lucide-react';
import logo from '../assets/isplogonormal.svg';
import wlogo from '../assets/isplogowhite.svg'

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white ">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div>
                <img
                  src={logo}
                  alt="ISOLP Logo"
                  className='h-20 w-20'
                />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">SurgiDesk</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-10">
              <a href="#features" className="text-gray-600 hover:text-cyan-600 transition font-medium">Features</a>
              <a href="https://isolp.org/about.html" target='_blank' rel="noopener noreferrer" className="text-gray-600 hover:text-cyan-600 transition font-medium">About</a>
              <a href="https://isolp.org/index.html" target='_blank' rel="noopener noreferrer" className="text-gray-600 hover:text-cyan-600 transition font-medium">Contact</a>
              <a href="/signin">
                <button className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-8 py-3 rounded-xl hover:shadow-lg hover:shadow-cyan-600/50 transition transform hover:-translate-y-0.5 font-semibold">
                  Sign In
                </button>
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-4 py-4 space-y-4">
              <a href="#features" className="block text-gray-600 hover:text-cyan-600 font-medium">Features</a>
              <a href="https://isolp.org/about.html" target='_blank' rel="noopener noreferrer" className="block text-gray-600 hover:text-cyan-600 font-medium">About</a>
              <a href="https://isolp.org/index.html" target='_blank' rel="noopener noreferrer" className="block text-gray-600 hover:text-cyan-600 font-medium">Contact</a>
              <a href="/signin">
                <button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-8 py-3 rounded-xl hover:shadow-lg font-semibold">
                  Sign In
                </button>
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cyan-50 via-blue-50 to-white">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 relative z-10">
              <div className="inline-block animate-fade-in">
                <span className="bg-gradient-to-r from-cyan-100 to-blue-100 border border-cyan-200 text-cyan-800 px-5 py-2 rounded-full text-sm font-semibold flex items-center space-x-2 w-fit">
                  <Database className="w-4 h-4" />
                  <span>Centralized Research Database</span>
                </span>
              </div>

              <h1 className="text-6xl md:text-7xl font-bold text-gray-900 leading-tight">
                Surgical Records,
                <span className="block bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  Simplified
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-xl">
                The intelligent platform for documenting, tracking, and managing surgical procedures with unparalleled efficiency and security.              </p>

              <div className="flex flex-col sm:flex-row gap-5 pt-6">
                <a href="/signin">
                  <button className="group bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-10 py-5 rounded-xl hover:shadow-2xl hover:shadow-cyan-600/50 transition transform hover:-translate-y-1 flex items-center justify-center space-x-3 font-semibold text-lg">
                    <span>Access Platform</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                  </button>
                </a>
                <a href="https://isolp.org/about.html" target='_blank' rel="noopener noreferrer">
                  <button className="border-2 border-gray-300 text-gray-700 px-10 py-5 rounded-xl hover:border-cyan-600 hover:text-cyan-600 hover:shadow-lg transition font-semibold text-lg">
                    Learn More
                  </button>
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
                <div>
                  <p className="text-3xl font-bold text-gray-900">1K+</p>
                  <p className="text-sm text-gray-600 mt-1">Procedures Recorded</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">100+</p>
                  <p className="text-sm text-gray-600 mt-1">Community Members</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">99.9%</p>
                  <p className="text-sm text-gray-600 mt-1">Data Integrity</p>
                </div>
              </div>
            </div>

            {/* Hero Image/Illustration */}
            <div className="relative lg:ml-8">
              {/* Main Card */}
              <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition duration-500">
                <img
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop"
                  alt="Medical professionals reviewing surgical data"
                  className="w-full h-80 object-cover rounded-2xl mb-6"
                />

                {/* Overlay Stats Card */}
                {/* <div className="absolute -top-6 -right-6 bg-gradient-to-br from-cyan-500 to-blue-600 text-white p-6 rounded-2xl shadow-2xl">
                  <div className="flex items-center space-x-3 mb-3">
                    <TrendingUp className="w-8 h-8" />
                    <div>
                      <p className="text-sm opacity-90">Today's Surgeries</p>
                      <p className="text-3xl font-bold">24</p>
                    </div>
                  </div>
                </div> */}

                {/* Bottom Card */}
              
                <div className="bg-gradient-to-br from-gray-50 to-cyan-50 p-6 rounded-2xl border border-gray-100">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FileText className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 text-lg">Surgery Record #2847</p>
                      <p className="text-sm text-gray-500">Cardiac Bypass - DR-123-45</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Surgery Completed</span>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 h-full w-4/5 rounded-full animate-pulse"></div>
                    </div>
                    <p className="text-xs text-gray-500">Last updated: 2 minutes ago</p>
                  </div>
                </div>
              
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-8 -left-6 bg-white p-5 rounded-2xl shadow-xl border border-gray-100 z-20">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Secure Database</p>
                  <p className="text-xs text-gray-500">Protected & Encrypted</p>
                </div>
              </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-cyan-200 to-blue-200 rounded-3xl blur-3xl opacity-30"></div>
          </div>
        </div>
    </div>
      </section >

  {/* Features Section */ }
  < section id = "features" className = "py-32 bg-white" >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-20">
        <span className="text-cyan-600 font-semibold text-sm uppercase tracking-wider">Platform Features</span>
        <h2 className="text-5xl font-bold text-gray-900 mt-4 mb-6">
          Built for Research Excellence
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          A specialized platform designed to support the ISOLP community in collecting, managing, and analyzing surgical data for groundbreaking research
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        <div className="group p-8 rounded-2xl hover:bg-gradient-to-br hover:from-cyan-50 hover:to-blue-50 transition border border-transparent hover:border-cyan-200 hover:shadow-xl">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
            <Database className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Centralized Repository</h3>
          <p className="text-gray-600 leading-relaxed">
            Store all surgical procedures in one secure, organized database accessible to authorized community members for research and analysis.
          </p>
        </div>

        <div className="group p-8 rounded-2xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50 transition border border-transparent hover:border-cyan-200 hover:shadow-xl">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Research Analytics</h3>
          <p className="text-gray-600 leading-relaxed">
            Advanced tools to analyze trends, outcomes, and patterns across surgical procedures to drive evidence-based improvements in patient care.
          </p>
        </div>

        <div className="group p-8 rounded-2xl hover:bg-gradient-to-br hover:from-cyan-50 hover:to-blue-50 transition border border-transparent hover:border-cyan-200 hover:shadow-xl">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Community Collaboration</h3>
          <p className="text-gray-600 leading-relaxed">
            Enable seamless collaboration among ISOLP members to share insights, best practices, and contribute to collective medical knowledge.
          </p>
        </div>

        <div className="group p-8 rounded-2xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50 transition border border-transparent hover:border-cyan-200 hover:shadow-xl">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h3>
          <p className="text-gray-600 leading-relaxed">
            Enterprise-grade security with role-based access control to ensure sensitive surgical data remains protected and confidential.
          </p>
        </div>

        <div className="group p-8 rounded-2xl hover:bg-gradient-to-br hover:from-cyan-50 hover:to-blue-50 transition border border-transparent hover:border-cyan-200 hover:shadow-xl">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
            <Clock className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Efficient Documentation</h3>
          <p className="text-gray-600 leading-relaxed">
            Streamlined data entry with standardized templates and forms to ensure consistent, high-quality surgical documentation across the community.
          </p>
        </div>

        <div className="group p-8 rounded-2xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50 transition border border-transparent hover:border-cyan-200 hover:shadow-xl">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Comprehensive Records</h3>
          <p className="text-gray-600 leading-relaxed">
            Capture detailed surgical information including procedures, outcomes, complications, and follow-ups to build a robust research database.
          </p>
        </div>
      </div>
    </div>
      </section >

  {/* CTA Section */ }
  < section className = "relative py-32 overflow-hidden" >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 via-blue-600 to-cyan-700"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
            Join the ISOLP Research Community
          </h2>
          <p className="text-2xl text-cyan-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Be part of a collaborative effort to advance surgical research and improve patient outcomes through comprehensive data collection and analysis.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="/signin">
              <button className="bg-white text-cyan-600 px-12 py-5 rounded-xl hover:bg-gray-50 transition font-bold text-lg shadow-2xl transform hover:-translate-y-1">
                Access Platform
              </button>
            </a>
            <a href="https://isolp.org/index.html" target='_blank' rel="noopener noreferrer">
              <button className="border-2 border-white text-white px-12 py-5 rounded-xl hover:bg-white hover:text-cyan-600 transition font-bold text-lg">
                Contact Us
              </button>
            </a>
          </div>
        </div>
      </section >

  {/* Footer */ }
  < footer className = "bg-gray-900 text-gray-400 py-16" >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-4 gap-12 mb-12">
        <div>
          <div className="flex items-center space-x-3 mb-6">
            <div>
              <img
                src={wlogo}
                alt="ISOLP Logo"
                className='h-20 w-20'
              />
            </div>
            <span className="text-2xl font-bold text-white">SurgiDesk</span>
          </div>
          <p className="text-sm leading-relaxed">
            Empowering the ISOLP community with advanced tools for surgical data management and research excellence.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6 text-lg">Platform</h4>
          <ul className="space-y-3">
            <li><a href="https://isolp.org/about.html" target='_blank' rel="noopener noreferrer" className="hover:text-cyan-500 transition text-sm">About ISOLP</a></li>
            <li><a href="https://isolp.org/research-surveys.html" target='_blank' className="hover:text-cyan-500 transition text-sm">Research</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6 text-lg">Community</h4>
          <ul className="space-y-3">
            <li><a href="https://isolp.org/about.html" target='_blank' rel="noopener noreferrer" className="hover:text-cyan-500 transition text-sm">About Us</a></li>
            <li><a href="https://isolp.org/join.html" target='_blank' className="hover:text-cyan-500 transition text-sm">Members</a></li>
            <li><a href="https://isolp.org/research-surveys.html" target='_blank' className="hover:text-cyan-500 transition text-sm">Publications</a></li>
            <li><a href="https://isolp.org/index.html" target='_blank' rel="noopener noreferrer" className="hover:text-cyan-500 transition text-sm">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6 text-lg">Legal</h4>
          <ul className="space-y-3">
            <li><a href="#" className="hover:text-cyan-500 transition text-sm">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-cyan-500 transition text-sm">Terms of Service</a></li>
            <li><a href="#" className="hover:text-cyan-500 transition text-sm">Data Protection</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className="text-sm">&copy; 2025 SurgiDesk. All rights reserved.</p>
        <a
          href="https://nexaura.agency/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm hover:text-cyan-500 transition flex items-center space-x-2"
        >
          <span>Powered by</span>
          <span className="font-semibold text-cyan-400">Nexaura Agency</span>
        </a>
      </div>
    </div>
      </footer >

  <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div >
  );
};

export default LandingPage;
import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  Building2, 
  Sparkles, 
  Award, 
  CheckCircle2 
} from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('sanjay.gupta@mospi.gov.in');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex flex-col justify-between">
      {/* Top Gazette Style Header Bar */}
      <div className="border-b border-[#1A1A1A] px-6 md:px-12 py-3 flex justify-between items-center bg-[#1A1A1A] text-[#FDFCFB] text-[10px] uppercase tracking-[0.25em]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#8C7851]"></span>
          <span>Government of India • Ministry of Statistics & Programme Implementation</span>
        </div>
        <div className="hidden sm:block text-[#C8C2B7] font-mono">
          Security Classification: Official / Internal Capacity Building
        </div>
      </div>

      {/* Main Editorial Grid */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-12 py-10 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Editorial Feature Column */}
        <div className="lg:col-span-7 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F5F2ED] border border-[#1A1A1A] text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C7851]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#8C7851]" />
            <span>Verified Sovereign Platform</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif italic text-[#1A1A1A] leading-[1.05] tracking-tight">
              AI-Powered Learning for India’s Official Statistical System.
            </h1>
            <p className="text-base sm:text-lg text-[#5A554E] font-editorial leading-relaxed max-w-2xl">
              Personalized competency diagnostics, curriculum mapping, and adaptive AI tutoring built for the statistical cadre of MoSPI, NSO, and State Directorates of Economics & Statistics.
            </p>
          </div>

          {/* Editorial Divider */}
          <div className="h-px w-24 bg-[#1A1A1A]" />

          {/* Feature Badges in Editorial Framing */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 bg-[#F5F2ED] border border-[#1A1A1A]">
              <div className="text-2xl font-serif font-bold text-[#1A1A1A]">50,000+</div>
              <div className="text-[10px] uppercase tracking-wider font-bold text-[#8C7851] mt-1">Officers Enrolled</div>
              <p className="text-[11px] text-[#5A554E] mt-1">Across central & state statistical bodies</p>
            </div>
            <div className="p-4 bg-[#F5F2ED] border border-[#1A1A1A]">
              <div className="text-2xl font-serif font-bold text-[#1A1A1A]">100%</div>
              <div className="text-[10px] uppercase tracking-wider font-bold text-[#8C7851] mt-1">iGOT Aligned</div>
              <p className="text-[11px] text-[#5A554E] mt-1">Direct Karmayogi competency mapping</p>
            </div>
            <div className="p-4 bg-[#F5F2ED] border border-[#1A1A1A]">
              <div className="text-2xl font-serif font-bold text-[#1A1A1A]">NIF / SDG</div>
              <div className="text-[10px] uppercase tracking-wider font-bold text-[#8C7851] mt-1">Official Frameworks</div>
              <p className="text-[11px] text-[#5A554E] mt-1">NSSO, ASI, PLFS & National Accounts</p>
            </div>
          </div>

          {/* Editorial Quote Card */}
          <div className="p-5 bg-[#1A1A1A] text-[#FDFCFB] border border-[#1A1A1A] flex items-center gap-4">
            <div className="w-10 h-10 bg-[#8C7851] text-[#1A1A1A] font-serif italic font-bold text-xl flex items-center justify-center shrink-0">
              "
            </div>
            <div className="text-xs font-editorial italic leading-relaxed text-[#F5F2ED]">
              "Empowering our statistical officers with modern computational abilities, Python automation, and survey sampling excellence is central to national evidence-based policymaking."
            </div>
          </div>
        </div>

        {/* Right Column: Login Card */}
        <div className="lg:col-span-5">
          <div className="bg-[#FDFCFB] border-2 border-[#1A1A1A] shadow-[8px_8px_0px_#1A1A1A] p-8 md:p-10 relative">
            {/* Corner Badge */}
            <div className="absolute -top-3.5 right-6 px-3 py-0.5 bg-[#8C7851] text-[#FDFCFB] text-[9px] uppercase tracking-[0.2em] font-bold">
              SSO Portal
            </div>

            <div className="mb-6 pb-4 border-b border-[#1A1A1A]">
              <div className="text-xs uppercase tracking-[0.2em] text-[#8C7851] font-bold">Officer Sign In</div>
              <h2 className="text-2xl font-serif italic text-[#1A1A1A] mt-1 font-semibold">Welcome Back</h2>
              <p className="text-xs text-[#5A554E] mt-1">Sign in with your MoSPI credentials or employee identifier</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-[#1A1A1A] mb-1.5">
                  Official Email or Employee ID
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#8C7851] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="input-login-email"
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. sanjay.gupta@mospi.gov.in"
                    className="w-full bg-[#F5F2ED] border border-[#1A1A1A] pl-10 pr-3 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:bg-[#FDFCFB] focus:ring-1 focus:ring-[#8C7851]"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[11px] uppercase tracking-wider font-bold text-[#1A1A1A]">
                    Password / Token
                  </label>
                  <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Password reset link has been dispatched to your official gov.in email address."); }} className="text-[10px] text-[#8C7851] hover:underline uppercase tracking-wider font-bold">
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#8C7851] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="input-login-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#F5F2ED] border border-[#1A1A1A] pl-10 pr-10 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:bg-[#FDFCFB] focus:ring-1 focus:ring-[#8C7851]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A554E] hover:text-[#1A1A1A]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs py-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded-none accent-[#1A1A1A] border-[#1A1A1A]"
                  />
                  <span className="text-[11px] text-[#5A554E]">Remember this secure terminal</span>
                </label>
              </div>

              <button
                id="btn-login-submit"
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#1A1A1A] text-[#FDFCFB] hover:bg-[#8C7851] text-xs uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2 transition-all border border-[#1A1A1A] shadow-md"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-[#FDFCFB] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Enter StatLearn AI</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="relative my-4 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#DCD6CC]"></div>
                </div>
                <span className="relative bg-[#FDFCFB] px-3 text-[10px] uppercase tracking-widest text-[#5A554E]">
                  Or continue with
                </span>
              </div>

              <button
                type="button"
                onClick={onLogin}
                className="w-full py-2.5 bg-[#F5F2ED] hover:bg-[#EAE6DF] text-[#1A1A1A] border border-[#1A1A1A] text-xs font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <Building2 className="w-4 h-4 text-[#8C7851]" />
                <span>Single Sign-On (Parichay / iGOT)</span>
              </button>

              {/* Fast Demo Fill Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onLogin}
                  className="w-full py-2 bg-[#8C7851]/10 hover:bg-[#8C7851]/20 border border-[#8C7851] text-[#8C7851] text-[11px] font-mono font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Quick Demo Access (Sanjay Gupta - Statistical Officer)</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Editorial Footer */}
      <footer className="border-t border-[#1A1A1A] py-6 px-6 md:px-12 bg-[#F5F2ED] flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-[#5A554E]">
        <div>National Statistical Commission & Capacity Development Directorate</div>
        <div className="flex gap-6">
          <span>Official Privacy Policy</span>
          <span>Security Guidelines</span>
          <span>Helpdesk 1800-MOSPI-AI</span>
        </div>
      </footer>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  User, 
  Award, 
  ShieldCheck, 
  Bell, 
  Lock, 
  Save, 
  CheckCircle2, 
  FileCheck, 
  Download,
  Building,
  Mail,
  Smartphone,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileSettingsViewProps {
  user: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
}

export const ProfileSettingsView: React.FC<ProfileSettingsViewProps> = ({
  user,
  onUpdateProfile
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'certificates' | 'preferences' | 'security'>('info');
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [department, setDepartment] = useState(user.department);
  const [role, setRole] = useState(user.role);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const certificates = [
    {
      id: 'cert_1',
      title: 'National Indicator Framework (NIF) Implementation Specialist',
      issuer: 'MoSPI / NSSTA Academy',
      issueDate: 'July 2024',
      certId: 'MoSPI-NSSTA-2024-8841'
    },
    {
      id: 'cert_2',
      title: 'Survey Methodology & CAPI Field Operations Lead',
      issuer: 'National Statistical Office (NSO)',
      issueDate: 'May 2024',
      certId: 'NSO-SDRD-2024-1102'
    },
    {
      id: 'cert_3',
      title: 'Price Index Compilation & CPI Deflator Analysis',
      issuer: 'Economic Statistics Directorate',
      issueDate: 'January 2024',
      certId: 'ESD-CPI-2024-4091'
    }
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      name,
      email,
      department,
      role
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Editorial Header */}
      <div className="border-b border-[#1A1A1A] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-[#8C7851] font-bold mb-1.5 flex items-center gap-2">
            <span>Personnel & Records Directorate</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8C7851]" />
            <span>Cadre Dossier</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif italic text-[#1A1A1A] font-semibold tracking-tight">
            Officer Profile & Credentials
          </h1>
          <p className="text-xs md:text-sm text-[#5A554E] font-editorial mt-1 max-w-2xl leading-relaxed">
            Manage your official identity, review accredited iGOT certificates, and adjust computational learning cadence.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F5F2ED] border border-[#1A1A1A] text-xs font-mono">
          <ShieldCheck className="w-4 h-4 text-[#8C7851]" />
          <span>SSO Verified (Parichay Portal)</span>
        </div>
      </div>

      {/* Officer Summary Card */}
      <div className="p-6 md:p-8 bg-[#F5F2ED] border-2 border-[#1A1A1A] shadow-[4px_4px_0px_#1A1A1A] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-start md:items-center gap-5">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-16 h-16 object-cover border-2 border-[#1A1A1A] shadow-sm shrink-0"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-serif italic text-[#1A1A1A] font-bold">
                {user.name}
              </h2>
              <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 bg-[#1A1A1A] text-[#FDFCFB]">
                {user.level}
              </span>
            </div>
            <div className="text-xs text-[#5A554E] font-editorial">
              {user.role} • {user.department}
            </div>
            <div className="text-[10px] font-mono text-[#8C7851]">
              Employee ID: {user.employeeId} | Ministry of Statistics & Programme Implementation
            </div>
          </div>
        </div>

        {/* Credentials Trio */}
        <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-[#DCD6CC] pt-4 md:pt-0 md:pl-6 text-center">
          <div>
            <div className="text-2xl font-serif font-bold text-[#1A1A1A]">{user.certificatesCount}</div>
            <div className="text-[9px] uppercase font-mono text-[#8C7851] font-bold">Certificates</div>
          </div>
          <div>
            <div className="text-2xl font-serif font-bold text-[#1A1A1A]">{user.completedModules}</div>
            <div className="text-[9px] uppercase font-mono text-[#8C7851] font-bold">Modules</div>
          </div>
          <div>
            <div className="text-2xl font-serif font-bold text-[#1A1A1A]">{user.learningHours}h</div>
            <div className="text-[9px] uppercase font-mono text-[#8C7851] font-bold">Hours Logged</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#1A1A1A] flex gap-2 overflow-x-auto">
        {[
          { id: 'info' as const, label: 'Account Information', icon: User },
          { id: 'certificates' as const, label: 'Accredited Certificates', icon: Award },
          { id: 'preferences' as const, label: 'Cadre Preferences', icon: Bell },
          { id: 'security' as const, label: 'Security & Access', icon: Lock },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 text-xs font-medium border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
                isActive
                  ? 'border-[#1A1A1A] text-[#1A1A1A] font-serif italic font-bold bg-[#F5F2ED]'
                  : 'border-transparent text-[#5A554E] hover:text-[#1A1A1A]'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#8C7851]' : 'text-[#5A554E]'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      {activeTab === 'info' && (
        <div className="p-6 md:p-8 bg-[#FDFCFB] border border-[#1A1A1A] shadow-sm max-w-3xl">
          <form onSubmit={handleSave} className="space-y-5 text-xs">
            <div className="flex justify-between items-center pb-3 border-b border-[#1A1A1A]">
              <h3 className="text-lg font-serif italic text-[#1A1A1A] font-bold">
                Cadre Personnel Record
              </h3>
              {savedSuccess && (
                <span className="text-emerald-700 flex items-center gap-1 font-mono font-bold">
                  <CheckCircle2 className="w-4 h-4" /> Profile Updated Successfully
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block uppercase font-mono font-bold text-[#1A1A1A] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#F5F2ED] border border-[#1A1A1A] p-2.5 text-xs text-[#1A1A1A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block uppercase font-mono font-bold text-[#1A1A1A] mb-1">
                  Official Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#F5F2ED] border border-[#1A1A1A] p-2.5 text-xs text-[#1A1A1A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block uppercase font-mono font-bold text-[#1A1A1A] mb-1">
                  Cadre Designation
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-[#F5F2ED] border border-[#1A1A1A] p-2.5 text-xs text-[#1A1A1A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block uppercase font-mono font-bold text-[#1A1A1A] mb-1">
                  Department / Wing
                </label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full bg-[#F5F2ED] border border-[#1A1A1A] p-2.5 text-xs text-[#1A1A1A] focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#1A1A1A] flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#1A1A1A] hover:bg-[#8C7851] text-[#FDFCFB] text-xs uppercase tracking-[0.2em] font-bold border border-[#1A1A1A] flex items-center gap-2 transition-all"
              >
                <Save className="w-4 h-4 text-[#8C7851]" />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'certificates' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-[#1A1A1A]">
            <h3 className="text-lg font-serif italic text-[#1A1A1A] font-bold">
              Verified Government Certificates & Badges ({certificates.length})
            </h3>
            <button
              onClick={() => alert("Exporting all credentials to Digilocker / MoSPI e-Record...")}
              className="text-xs font-mono text-[#8C7851] hover:underline uppercase font-bold"
            >
              Export to DigiLocker →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="p-6 bg-[#FDFCFB] border-2 border-[#1A1A1A] shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="w-8 h-8 bg-[#1A1A1A] text-[#8C7851] flex items-center justify-center border border-[#1A1A1A]">
                    <Award className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-serif font-bold text-[#1A1A1A] leading-snug">
                    {cert.title}
                  </h4>
                  <div className="text-[10px] font-mono text-[#5A554E]">
                    Issued by: {cert.issuer} ({cert.issueDate})
                  </div>
                  <div className="text-[9px] font-mono text-[#8C7851] truncate">
                    ID: {cert.certId}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E2DDD5] flex justify-between items-center">
                  <span className="text-[9px] uppercase font-mono text-emerald-800 font-bold">Verified</span>
                  <button
                    onClick={() => alert(`Downloading high-resolution certificate for ${cert.title}`)}
                    className="p-1 text-[#1A1A1A] hover:text-[#8C7851]"
                    title="Download Certificate"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'preferences' && (
        <div className="p-6 md:p-8 bg-[#FDFCFB] border border-[#1A1A1A] shadow-sm max-w-2xl space-y-6 text-xs">
          <h3 className="text-lg font-serif italic text-[#1A1A1A] font-bold pb-2 border-b border-[#1A1A1A]">
            Learning Cadence & Notifications
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-[#F5F2ED] border border-[#DCD6CC]">
              <div>
                <div className="font-serif font-bold text-[#1A1A1A]">Daily Diagnostic Reminders</div>
                <div className="text-[10px] text-[#5A554E]">Dispatched at 09:30 AM via email & terminal</div>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#1A1A1A]" />
            </div>

            <div className="flex items-center justify-between p-3 bg-[#F5F2ED] border border-[#DCD6CC]">
              <div>
                <div className="font-serif font-bold text-[#1A1A1A]">Weekly Cadre Progress Digest</div>
                <div className="text-[10px] text-[#5A554E]">Summary of learning velocity sent to division lead</div>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#1A1A1A]" />
            </div>

            <div className="flex items-center justify-between p-3 bg-[#F5F2ED] border border-[#DCD6CC]">
              <div>
                <div className="font-serif font-bold text-[#1A1A1A]">Auto-Enroll in High Match iGOT Courses</div>
                <div className="text-[10px] text-[#5A554E]">Automatically add 90%+ match courses to roadmap</div>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#1A1A1A]" />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="p-6 md:p-8 bg-[#FDFCFB] border border-[#1A1A1A] shadow-sm max-w-2xl space-y-6 text-xs">
          <h3 className="text-lg font-serif italic text-[#1A1A1A] font-bold pb-2 border-b border-[#1A1A1A]">
            Authentication & Security
          </h3>

          <div className="space-y-3">
            <div className="p-4 bg-[#F5F2ED] border border-[#1A1A1A] flex justify-between items-center">
              <div>
                <div className="font-serif font-bold text-[#1A1A1A]">Two-Factor Authentication (2FA)</div>
                <div className="text-[10px] text-[#5A554E]">Secured via NIC OTP Service</div>
              </div>
              <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 bg-emerald-100 text-emerald-900 border border-emerald-300">
                Active
              </span>
            </div>

            <div className="p-4 bg-[#F5F2ED] border border-[#1A1A1A] flex justify-between items-center">
              <div>
                <div className="font-serif font-bold text-[#1A1A1A]">iGOT Karmayogi API Token</div>
                <div className="text-[10px] text-[#5A554E]">Last synchronized: 2 hours ago</div>
              </div>
              <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 bg-emerald-100 text-emerald-900 border border-emerald-300">
                Connected
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

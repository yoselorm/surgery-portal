import React from 'react';
import { 
  X,
  ChevronRight,
  Activity,
  Zap,
  Target,
  Sparkles,
  Flame,
  Droplets,
  CircleDot
} from 'lucide-react';

const SurgeryTypeModal = ({ isOpen, onClose, onSelectSurgery }) => {
  if (!isOpen) return null;

  const surgeryTypes = [
    {
      id: 1,
      name: 'FiLaC',
      fullName: 'Fistula-tract Laser Closure',
      icon: Target,
      color: 'red',
      description: 'Laser treatment for anal fistulas',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
      borderColor: 'border-red-200',
      hoverBg: 'hover:bg-red-100',
      route: '/dashboard/fill-surgery-form/filac'
    },
    {
      id: 2,
      name: 'SiLaC',
      fullName: 'Simple Laser Closure',
      icon: Zap,
      color: 'purple',
      description: 'Simple laser closure procedure',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      borderColor: 'border-purple-200',
      hoverBg: 'hover:bg-purple-100',
      route: '/dashboard/fill-surgery-form/silac'
    },
    {
      id: 3,
      name: 'LaFiP',
      fullName: 'Laser Fistula Procedure',
      icon: Flame,
      color: 'orange',
      description: 'Advanced laser fistula treatment',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
      borderColor: 'border-orange-200',
      hoverBg: 'hover:bg-orange-100',
      route: '/dashboard/fill-surgery-form/lafip'
    },
    {
      id: 4,
      name: 'HiLaC',
      fullName: 'High-Intensity Laser Closure',
      icon: Sparkles,
      color: 'yellow',
      description: 'High-intensity laser treatment',
      bgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-600',
      borderColor: 'border-yellow-200',
      hoverBg: 'hover:bg-yellow-100',
      route: '/dashboard/fill-surgery-form/hilac'
    },
    {
      id: 5,
      name: 'AiN / Condylomata',
      fullName: 'Anal Intraepithelial Neoplasia Treatment',
      icon: CircleDot,
      color: 'pink',
      description: 'Treatment for AiN and condylomata',
      bgColor: 'bg-pink-50',
      iconColor: 'text-pink-600',
      borderColor: 'border-pink-200',
      hoverBg: 'hover:bg-pink-100',
      route: '/dashboard/fill-surgery-form/ain-condylomata'
    },
    {
      id: 6,
      name: 'LHP Revo',
      fullName: 'Laser Hemorrhoid Procedure Revolution',
      icon: Droplets,
      color: 'blue',
      description: 'Revolutionary laser hemorrhoid treatment',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-200',
      hoverBg: 'hover:bg-blue-100',
      route: '/dashboard/fill-surgery-form/lhp-revo'
    },
    {
      id: 7,
      name: 'Biolitec Laser LHP Treatment',
      fullName: 'Biolitec Laser Hemorrhoid Procedure',
      icon: Activity,
      color: 'cyan',
      description: 'Laser hemorrhoid procedure treatment',
      bgColor: 'bg-cyan-50',
      iconColor: 'text-cyan-600',
      borderColor: 'border-cyan-200',
      hoverBg: 'hover:bg-cyan-100',
      route: '/dashboard/fill-surgery-form/biolitec-lhp'
    }
  ];

  const handleSurgeryClick = (surgery) => {
    onSelectSurgery(surgery);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/40 to-blue-900/40 backdrop-blur-sm"></div>
      
      {/* Modal Content */}
      <div 
        className="relative bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-auto animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Top Bar */}
        <div className="h-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>
        
        {/* Modal Header */}
        <div className="p-8 pb-6 border-b border-gray-100 sticky top-0 bg-white z-20">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Select Surgery Type</h2>
              <p className="text-gray-600">Choose a laser surgical procedure to begin recording</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Body with Cards */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {surgeryTypes.map((surgery) => {
              const Icon = surgery.icon;
              return (
                <button
                  key={surgery.id}
                  onClick={() => handleSurgeryClick(surgery)}
                  className="group relative bg-white border-2 border-gray-200 rounded-2xl p-6 text-left hover:border-cyan-400 hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 ${surgery.bgColor} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`${surgery.bgColor} border-2 ${surgery.borderColor} p-3 rounded-xl group-hover:scale-110 transition-transform`}>
                        <Icon className={`w-8 h-8 ${surgery.iconColor}`} />
                      </div>
                      <div className="bg-gray-100 group-hover:bg-white px-2 py-1 rounded-full">
                        <ChevronRight className={`w-5 h-5 text-gray-400 group-hover:${surgery.iconColor} group-hover:translate-x-1 transition-all`} />
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-gray-900 text-xl mb-1 group-hover:text-gray-900">
                      {surgery.name}
                    </h3>
                    <p className="text-xs text-gray-500 mb-3 font-medium">
                      {surgery.fullName}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {surgery.description}
                    </p>
                    
                    {/* Hover Indicator */}
                    <div className="mt-4 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className={`text-sm font-semibold ${surgery.iconColor}`}>
                        Select Procedure
                      </span>
                      <ChevronRight className={`w-4 h-4 ${surgery.iconColor}`} />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between sticky bottom-0">
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-gray-700">{surgeryTypes.length}</span> laser surgery procedures available
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition font-medium"
          >
            Cancel
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SurgeryTypeModal;
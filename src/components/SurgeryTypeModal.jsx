import React from 'react';
import { X, ChevronRight, Activity, Zap, Target, Sparkles, Flame, Droplets, CircleDot } from 'lucide-react';

const SurgeryTypeModal = ({ isOpen, onClose, onSelectSurgery }) => {
  if (!isOpen) return null;

  const surgeryTypes = [
    {
      id: 1,
      name: 'LHP Treatment',
      fullName: 'Laser Hemorrhoid Procedure',
      icon: Activity,
      color: 'cyan',
      description: 'Laser hemorrhoid procedure treatment',
      bgColor: 'bg-cyan-50',
      iconColor: 'text-cyan-600',
      borderColor: 'border-cyan-200',
      hoverBg: 'hover:bg-cyan-100',
      route: '/dashboard/fill-surgery-form/biolitec-lhp',
      comingSoon: false
    },
    {
      id: 2,
      name: 'FiLaC',
      fullName: 'Fistula-tract Laser Closure',
      icon: Target,
      color: 'red',
      description: 'Laser treatment for anal fistulas',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
      borderColor: 'border-red-200',
      hoverBg: 'hover:bg-red-100',
      route: '/dashboard/fill-surgery-form/filac',
      comingSoon: true
    },
    {
      id: 3,
      name: 'SiLaC',
      fullName: 'Simple Laser Closure',
      icon: Zap,
      color: 'purple',
      description: 'Simple laser closure procedure',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      borderColor: 'border-purple-200',
      hoverBg: 'hover:bg-purple-100',
      route: '/dashboard/fill-surgery-form/silac',
      comingSoon: true
    },
    {
      id: 4,
      name: 'LaFiP',
      fullName: 'Laser Fistula Procedure',
      icon: Flame,
      color: 'orange',
      description: 'Advanced laser fistula treatment',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
      borderColor: 'border-orange-200',
      hoverBg: 'hover:bg-orange-100',
      route: '/dashboard/fill-surgery-form/lafip',
      comingSoon: true
    },
    {
      id: 5,
      name: 'HiLaC',
      fullName: 'High-Intensity Laser Closure',
      icon: Sparkles,
      color: 'yellow',
      description: 'High-intensity laser treatment',
      bgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-600',
      borderColor: 'border-yellow-200',
      hoverBg: 'hover:bg-yellow-100',
      route: '/dashboard/fill-surgery-form/hilac',
      comingSoon: true
    },
    {
      id: 6,
      name: 'AiN / Condylomata',
      fullName: 'Anal Intraepithelial Neoplasia Treatment',
      icon: CircleDot,
      color: 'pink',
      description: 'Treatment for AiN and condylomata',
      bgColor: 'bg-pink-50',
      iconColor: 'text-pink-600',
      borderColor: 'border-pink-200',
      hoverBg: 'hover:bg-pink-100',
      route: '/dashboard/fill-surgery-form/ain-condylomata',
      comingSoon: true
    },
    {
      id: 7,
      name: 'LHP Revo',
      fullName: 'Laser Hemorrhoid Procedure Revolution',
      icon: Droplets,
      color: 'blue',
      description: 'Revolutionary laser hemorrhoid treatment',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-200',
      hoverBg: 'hover:bg-blue-100',
      route: '/dashboard/fill-surgery-form/lhp-revo',
      comingSoon: true
    },

  ];

  const handleSurgeryClick = (surgery) => {
    if (surgery.comingSoon) return;
    onSelectSurgery(surgery);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Decorative Top Bar */}
        <div className="h-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />
        
        {/* Modal Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-8 py-6 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Select Surgery Type
              </h2>
              <p className="text-gray-600">
                Choose a laser surgical procedure to begin recording
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Modal Body with Cards */}
        <div className="px-8 py-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {surgeryTypes.map((surgery) => {
              const Icon = surgery.icon;
              const isDisabled = surgery.comingSoon;
              
              return (
                <button
                  key={surgery.id}
                  onClick={() => handleSurgeryClick(surgery)}
                  disabled={isDisabled}
                  className={`group relative bg-white border-2 rounded-2xl p-6 text-left transition-all ${
                    isDisabled 
                      ? 'border-gray-200 opacity-60 cursor-not-allowed' 
                      : 'border-gray-200 hover:border-cyan-400 hover:shadow-xl transform hover:-translate-y-1'
                  }`}
                >
                  {/* Coming Soon Badge */}
                  {isDisabled && (
                    <div className="absolute top-4 right-4 bg-gray-900 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Coming Soon
                    </div>
                  )}
                  
                  {/* Gradient Background on Hover */}
                  {!isDisabled && (
                    <div className={`absolute inset-0 ${surgery.bgColor} opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl`} />
                  )}
                  
                  {/* Content */}
                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 ${surgery.bgColor} rounded-xl ${!isDisabled && 'group-hover:scale-110'} transition-transform`}>
                        <Icon className={`w-6 h-6 ${surgery.iconColor}`} />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {surgery.name}
                    </h3>
                    <p className="text-sm font-medium text-gray-600 mb-3">
                      {surgery.fullName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {surgery.description}
                    </p>
                    
                    {/* Hover Indicator */}
                    {!isDisabled && (
                      <div className="flex items-center gap-2 mt-4 text-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-sm font-semibold">Select Procedure</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {surgeryTypes.filter(s => !s.comingSoon).length} of {surgeryTypes.length} laser surgery procedures available
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurgeryTypeModal;
import { Activity } from "lucide-react";

const FormHeader = () => {
    return (
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl p-8 text-white mb-6">
        <div className="flex items-center space-x-3 mb-2">
          <Activity className="w-8 h-8" />
          <h1 className="text-3xl font-bold">Biolitec Laser LHP Treatment</h1>
        </div>
        <p className="text-cyan-100">Data Collection Form - Page 1/1</p>
      </div>
    );
  };
  
  export default FormHeader;
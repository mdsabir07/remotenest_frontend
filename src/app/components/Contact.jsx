
import { Phone, Mail, MessageSquare } from 'lucide-react';

const Contact = () => {
  return (
    
    <div className="fixed bottom-10 right-10 z-50">
      <div className="flex flex-col items-center space-y-4">
        {/* Phone Icon */}
        <a href="#" className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center cursor-pointer hover:bg-green-600 transition-colors shadow-lg">
          <Phone className="text-white" size={24} />
        </a>

        {/* Email Icon */}
        <a href="#" className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors shadow-lg">
          <Mail className="text-white" size={24} />
        </a>

        {/* Chat Icon */}
        <a href="#" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center cursor-pointer hover:bg-purple-600 transition-colors shadow-lg">
          <MessageSquare className="text-white" size={24} />
        </a>
      </div>
    </div>
  );
};

export default Contact;
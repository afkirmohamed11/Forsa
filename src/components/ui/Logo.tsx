import { Leaf } from 'lucide-react';
import React from 'react';

interface LogoProps {
  color?: string;
}

const Logo: React.FC<LogoProps> = ({ color = 'currentColor' }) => {
  return (
    <div className="relative">
      <Leaf 
        size={28} 
        className={`${color === 'currentColor' ? 'text-gray-900 dark:text-primary-500' : `text-${color}`}`} 
      />
      <div 
        className={`absolute -top-1 -right-1 w-3 h-3 rounded-full bg-secondary-400 border-2 ${color === 'currentColor' ? 'border-white dark:border-gray-800' : `border-${color}`}`}
      ></div>
    </div>
  );
};

export default Logo;
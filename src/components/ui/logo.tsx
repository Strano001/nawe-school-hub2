import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  className, 
  size = 'md', 
  showText = true 
}) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8', 
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl', 
    xl: 'text-3xl'
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <img 
        src="/lovable-uploads/a34045c0-a003-4c9a-98cb-3cff3573fdad.png" 
        alt="NaWe Logo" 
        className={cn(sizeClasses[size], "object-contain")}
      />
      {showText && (
        <div className="flex flex-col">
          <span className={cn("font-bold text-foreground", textSizeClasses[size])}>
            NaWe
          </span>
          {size !== 'sm' && (
            <span className="text-xs text-muted-foreground -mt-1">
              School Management
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;
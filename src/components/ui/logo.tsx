import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  clickable?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  className, 
  size = 'md', 
  showText = true,
  clickable = true
}) => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

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

  const handleLogoClick = () => {
    if (!clickable) return;
    
    if (user && profile) {
      // Redirect based on user role
      switch (profile.role) {
        case 'super_admin':
        case 'school_admin':
        case 'principal':
        case 'teacher':
        case 'accountant':
        case 'cashier':
        case 'auditor':
          navigate('/dashboard');
          break;
        case 'student':
        case 'parent':
          navigate('/dashboard');
          break;
        default:
          navigate('/dashboard');
      }
    } else {
      navigate('/');
    }
  };

  const LogoContent = () => (
    <>
      <img 
        src="/photo_2025-07-24_14-15-45.jpg" 
        alt="NaWe Logo" 
        className={cn(
          sizeClasses[size], 
          "object-contain rounded-lg shadow-sm transition-all duration-200",
          clickable && "hover:shadow-md hover:scale-105"
        )}
        style={{
          filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))',
        }}
      />
      {showText && (
        <div className="flex flex-col">
          <span className={cn(
            "font-bold text-foreground transition-colors duration-200", 
            textSizeClasses[size],
            clickable && "hover:text-primary"
          )}>
            NaWe
          </span>
          {size !== 'sm' && (
            <span className={cn(
              "text-xs text-muted-foreground -mt-1 transition-colors duration-200",
              clickable && "hover:text-primary/70"
            )}>
              School Management
            </span>
          )}
        </div>
      )}
    </>
  );

  if (!clickable) {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <LogoContent />
      </div>
    );
  }

  return (
    <div 
      className={cn(
        "flex items-center gap-3 cursor-pointer transition-all duration-200 rounded-lg p-1 -m-1",
        "hover:bg-accent/50 active:scale-95",
        className
      )}
      onClick={handleLogoClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleLogoClick();
        }
      }}
      aria-label="Navigate to dashboard"
    >
      <LogoContent />
    </div>
  );
};

export default Logo;
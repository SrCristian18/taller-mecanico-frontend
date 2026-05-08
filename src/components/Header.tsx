'use client';

import { Menu, User } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className="h-16 border-b border-border-custom bg-background/80 backdrop-blur-md flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 text-foreground/60 hover:text-white transition-colors rounded-lg hover:bg-accent"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 pl-0 md:pl-6 md:border-l border-border-custom">
          <div className="text-right">
            <p className="text-sm font-semibold text-white leading-tight">Admin Taller</p>
            <p className="text-xs text-foreground/40">Supervisor</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center border border-border-custom hover:border-secondary transition-colors cursor-pointer">
            <User className="w-6 h-6 text-secondary" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

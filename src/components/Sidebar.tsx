import Link from 'next/link';
import { Home, PlusSquare, History, Car, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-20 md:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar Content */}
      <aside className={`
        fixed top-0 left-0 h-screen w-64 bg-surface border-r border-border-custom 
        flex flex-col z-30 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0
      `}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-lg shadow-neon">
              <Car className="text-white w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              TALLER<span className="text-primary">X</span>
            </h1>
          </div>
          <button 
            onClick={onClose}
            className="md:hidden text-foreground/60 hover:text-white p-1 rounded-lg hover:bg-accent"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link 
            href="/" 
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-accent hover:text-primary transition-all group"
          >
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link 
            href="/register" 
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-accent hover:text-primary transition-all group"
          >
            <PlusSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Registrar</span>
          </Link>
          <Link 
            href="/history" 
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-accent hover:text-primary transition-all group"
          >
            <History className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Historial</span>
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;

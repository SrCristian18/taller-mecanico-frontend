'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { api } from '@/lib/api';
import { History, Search, Filter, Calendar, User, Clock, CheckCircle } from 'lucide-react';

function HistoryContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('plate') || '';
  
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(initialSearch);

  const fetchHistory = async (searchTerm: string) => {
    try {
      const data = await api.getHistory(searchTerm);
      setHistory(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setSearch(searchParams.get('plate') || '');
  }, [searchParams]);

  useEffect(() => {
    // Debounce the search input
    const timer = setTimeout(() => {
      setLoading(true);
      fetchHistory(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Historial de Servicios</h2>
          <p className="text-foreground/60">Consulta todos los servicios finalizados y en curso.</p>
        </div>
        
        <div className="flex gap-2">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Placa o Propietario..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-industrial pl-10 h-10 w-64"
            />
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {history.length === 0 && !loading && (
          <div className="card-industrial p-12 text-center text-foreground/40">
            <History className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>No se encontraron registros que coincidan con la búsqueda.</p>
          </div>
        )}

        {history.map((record) => (
          <div key={record.plate + record.entryDate} className="card-industrial p-6 group hover:border-secondary transition-all">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="bg-accent/50 p-4 rounded-xl text-primary border border-border-custom group-hover:shadow-neon transition-all">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-secondary uppercase tracking-widest bg-secondary/10 px-2 py-0.5 rounded">
                      {record.plate}
                    </span>
                    <h3 className="text-lg font-bold text-white">{record.brand} {record.model}</h3>
                  </div>
                  <p className="text-foreground/80 font-medium">{record.serviceType}</p>
                  <div className="flex items-center gap-4 text-xs text-foreground/40">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {record.ownerName}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(record.entryDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-8 px-6 py-4 bg-accent/20 rounded-xl border border-border-custom/50">
                <div className="text-center">
                  <p className="text-[10px] uppercase tracking-tighter text-foreground/40 font-bold">Estado</p>
                  <span className={`text-sm font-bold ${record.status === 'FINALIZADO' ? 'text-success' : 'text-warning'}`}>
                    {record.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="w-px h-8 bg-border-custom"></div>
                <div className="text-center">
                  <p className="text-[10px] uppercase tracking-tighter text-foreground/40 font-bold">Tiempo Total</p>
                  <div className="flex items-center gap-1 text-sm font-bold text-white">
                    <Clock className="w-3 h-3 text-secondary" />
                    {record.totalTimeMinutes ? `${record.totalTimeMinutes} min` : '---'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HistoryPage() {
  return (
    <Suspense fallback={<div className="text-white p-8">Cargando historial...</div>}>
      <HistoryContent />
    </Suspense>
  );
}

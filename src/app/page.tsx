'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Car, Clock, CheckCircle, AlertCircle, RefreshCw, Search } from 'lucide-react';

export default function Dashboard() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchVehicles = async () => {
    try {
      const data = await api.getVehicles();
      setVehicles(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleStatusUpdate = async (plate: string, status: string) => {
    await api.updateStatus(plate, status);
    fetchVehicles();
  };

  const handleFinish = async (plate: string) => {
    await api.finishService(plate);
    fetchVehicles();
  };

  const stats = [
    { label: 'En Espera', value: vehicles.filter(v => v.status === 'EN_ESPERA').length, icon: Clock, color: 'text-foreground/40' },
    { label: 'En Proceso', value: vehicles.filter(v => v.status === 'EN_PROCESO').length, icon: RefreshCw, color: 'text-warning' },
    { label: 'Terminados', value: vehicles.filter(v => v.status === 'FINALIZADO').length, icon: CheckCircle, color: 'text-success' },
  ];

  const activeVehicles = vehicles.filter(v => 
    v.status !== 'FINALIZADO' && 
    (v.plate.toLowerCase().includes(searchTerm.toLowerCase()) || 
     v.ownerName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header>
        <h2 className="text-3xl font-bold text-white tracking-tight">Panel de Control</h2>
        <p className="text-foreground/60">Resumen actual del taller y vehículos en servicio.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="card-industrial p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground/60">{stat.label}</p>
              <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-xl bg-accent/50 ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>

      {/* Active Vehicles Table */}
      <section className="card-industrial overflow-hidden">
        <div className="p-6 border-b border-border-custom flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Car className="text-primary w-5 h-5" />
            Vehículos en Taller
          </h3>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
              <input 
                type="text" 
                placeholder="Buscar placa..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-industrial pl-10 pr-4 h-9 text-sm w-full md:w-64"
              />
            </div>
            <button 
              onClick={fetchVehicles}
              className="text-sm text-secondary hover:text-white transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Actualizar
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-accent/30 text-foreground/40 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Vehículo</th>
                <th className="px-6 py-4 font-semibold">Propietario</th>
                <th className="px-6 py-4 font-semibold">Servicio</th>
                <th className="px-6 py-4 font-semibold">Estado</th>
                <th className="px-6 py-4 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-custom">
              {activeVehicles.length === 0 && !loading && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-foreground/40">
                    <div className="flex flex-col items-center gap-2">
                      <AlertCircle className="w-8 h-8" />
                      <p>No hay vehículos activos en este momento.</p>
                    </div>
                  </td>
                </tr>
              )}
              {activeVehicles.map((v) => (
                <tr key={v.plate} className="hover:bg-accent/10 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-accent p-2 rounded text-primary font-bold text-xs">
                        {v.plate}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{v.brand}</p>
                        <p className="text-xs text-foreground/40">{v.model}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-white">{v.ownerName}</p>
                    <p className="text-xs text-foreground/40">{v.ownerPhone}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-foreground/80">{v.serviceType}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`badge ${
                      v.status === 'EN_ESPERA' ? 'badge-waiting' : 
                      v.status === 'EN_PROCESO' ? 'badge-process' : 'badge-done'
                    }`}>
                      {v.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 transition-opacity">
                      {v.status === 'EN_ESPERA' && (
                        <button 
                          onClick={() => handleStatusUpdate(v.plate, 'EN_PROCESO')}
                          className="p-2 hover:bg-warning/20 text-warning rounded-lg transition-colors bg-warning/10"
                          title="Iniciar Servicio"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </button>
                      )}
                      {v.status === 'EN_PROCESO' && (
                        <button 
                          onClick={() => handleFinish(v.plate)}
                          className="p-2 hover:bg-success/20 text-success rounded-lg transition-colors bg-success/10"
                          title="Finalizar Servicio"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

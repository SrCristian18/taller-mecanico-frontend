'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { Car, User, Settings, Save, AlertCircle, RefreshCw } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      plate: formData.get('plate'),
      brand: formData.get('brand'),
      model: formData.get('model'),
      ownerName: formData.get('ownerName'),
      ownerPhone: formData.get('ownerPhone'),
      serviceType: formData.get('serviceType'),
    };

    try {
      await api.registerVehicle(data);
      router.push('/');
    } catch (err) {
      setError('Error al registrar el vehículo. Por favor intente de nuevo.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in slide-in-from-bottom duration-500">
      <header>
        <h2 className="text-3xl font-bold text-white tracking-tight">Registrar Ingreso</h2>
        <p className="text-foreground/60">Ingrese los datos del vehículo y el propietario para iniciar el servicio.</p>
      </header>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5" />
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="card-industrial p-8 space-y-6">
          <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-xs">
            <Car className="w-4 h-4" />
            Información del Vehículo
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/60 px-1">Placa</label>
              <input 
                name="plate" required
                placeholder="ABC-123" 
                className="input-industrial px-4 py-2 uppercase"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/60 px-1">Marca</label>
              <input 
                name="brand" required
                placeholder="Toyota, Ford, etc." 
                className="input-industrial px-4 py-2"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-foreground/60 px-1">Modelo</label>
              <input 
                name="model" required
                placeholder="Corolla 2024, Mustang, etc." 
                className="input-industrial px-4 py-2"
              />
            </div>
          </div>
        </section>

        <section className="card-industrial p-8 space-y-6">
          <div className="flex items-center gap-2 text-secondary font-bold uppercase tracking-wider text-xs">
            <User className="w-4 h-4" />
            Información del Propietario
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/60 px-1">Nombre Completo</label>
              <input 
                name="ownerName" required
                placeholder="Juan Pérez" 
                className="input-industrial px-4 py-2"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/60 px-1">Teléfono</label>
              <input 
                name="ownerPhone" required
                placeholder="+57 300..." 
                className="input-industrial px-4 py-2"
              />
            </div>
          </div>
        </section>

        <section className="card-industrial p-8 space-y-6">
          <div className="flex items-center gap-2 text-foreground/60 font-bold uppercase tracking-wider text-xs">
            <Settings className="w-4 h-4" />
            Detalles del Servicio
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/60 px-1">Tipo de Servicio</label>
            <select 
              name="serviceType" required
              className="input-industrial px-4 py-2"
            >
              <option value="Mantenimiento Preventivo">Mantenimiento Preventivo</option>
              <option value="Reparación de Motor">Reparación de Motor</option>
              <option value="Diagnóstico Eléctrico">Diagnóstico Eléctrico</option>
              <option value="Cambio de Aceite">Cambio de Aceite</option>
              <option value="Frenos y Suspensión">Frenos y Suspensión</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
        </section>

        <div className="flex justify-end gap-4">
          <button 
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 rounded-lg text-foreground/60 hover:text-white transition-colors"
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary"
          >
            {loading ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            Guardar Registro
          </button>
        </div>
      </form>
    </div>
  );
}

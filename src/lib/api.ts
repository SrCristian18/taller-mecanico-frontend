const BASE_URL = 'http://localhost:8080/api';

export const api = {
  getVehicles: async () => {
    const res = await fetch(`${BASE_URL}/vehicles`);
    if (!res.ok) throw new Error('Failed to fetch vehicles');
    return res.json();
  },

  registerVehicle: async (data: any) => {
    const res = await fetch(`${BASE_URL}/vehicles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to register vehicle');
    return res;
  },

  updateStatus: async (plate: string, status: string) => {
    const res = await fetch(`${BASE_URL}/vehicles/${plate}/status?status=${status}`, {
      method: 'PATCH',
    });
    if (!res.ok) throw new Error('Failed to update status');
    return res;
  },

  finishService: async (plate: string) => {
    const res = await fetch(`${BASE_URL}/vehicles/${plate}/finish`, {
      method: 'POST',
    });
    if (!res.ok) throw new Error('Failed to finish service');
    return res;
  },

  getHistory: async (search?: string) => {
    let url = `${BASE_URL}/vehicles/history`;
    if (search && search.trim()) {
      const term = encodeURIComponent(search.trim());
      url += `?plate=${term}&owner=${term}`;
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch history');
    return res.json();
  }
};

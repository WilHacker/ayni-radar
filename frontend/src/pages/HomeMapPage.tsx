import { useQuery } from '@tanstack/react-query';
import { Flame, HeartHandshake, MapPin } from 'lucide-react';
import { http } from '../shared/api/http';

interface HealthResponse {
  status: string;
  service: string;
  timestamp: string;
}

export function HomeMapPage() {
  const healthQuery = useQuery({
    queryKey: ['health'],
    queryFn: async () => {
      const { data } = await http.get<HealthResponse>('/health');
      return data;
    },
    retry: false,
  });

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <header className="border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Flame className="h-6 w-6 text-orange-500" />
          <span className="text-lg font-bold tracking-tight">AyniRadar</span>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-medium ${
              healthQuery.isSuccess
                ? 'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30'
                : 'bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/30'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-current" />
            {healthQuery.isSuccess ? 'API conectada' : 'API offline'}
          </span>
        </div>
      </header>

      <section className="flex-1 grid place-items-center p-6">
        <div className="max-w-xl text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-300 ring-1 ring-orange-500/20">
            <MapPin className="h-3.5 w-3.5" />
            ABSTRACTHON 2026 · Track 04 (Comunicación + Finanzas)
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Mapa de calor de zonas de desastre y donaciones directas
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            Agrupación geográfica de reportes ciudadanos en tiempo real conectada a ayuda directa
            sin intermediarios burocráticos.
          </p>
          <div className="pt-2 flex justify-center gap-3 text-xs text-slate-300">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 border border-slate-800">
              <HeartHandshake className="h-4 w-4 text-orange-400" />
              Listo para construir Bloque 2
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}

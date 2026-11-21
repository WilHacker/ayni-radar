import { create } from 'zustand';
import { type TipoDesastre } from '../../../shared/types/desastre.types';

interface Coordenadas {
  latitud: number;
  longitud: number;
}

interface EstadoMapaUi {
  zonaSeleccionadaId: string | null;
  filtroActivo: TipoDesastre | 'TODOS';
  esModalReporteAbierto: boolean;
  esModalDonacionAbierto: boolean;
  coordenadasElegidas: Coordenadas | null;
  seleccionarZona: (zonaId: string | null) => void;
  cambiarFiltro: (filtro: TipoDesastre | 'TODOS') => void;
  abrirModalReporte: (coordenadas?: Coordenadas) => void;
  cerrarModalReporte: () => void;
  abrirModalDonacion: (zonaId: string) => void;
  cerrarModalDonacion: () => void;
}

export const useMapaUiStore = create<EstadoMapaUi>((set) => ({
  zonaSeleccionadaId: null,
  filtroActivo: 'TODOS',
  esModalReporteAbierto: false,
  esModalDonacionAbierto: false,
  coordenadasElegidas: null,
  seleccionarZona: (zonaId) => {
    set({ zonaSeleccionadaId: zonaId });
  },
  cambiarFiltro: (filtro) => {
    set({ filtroActivo: filtro });
  },
  abrirModalReporte: (coordenadas) => {
    set({
      esModalReporteAbierto: true,
      coordenadasElegidas: coordenadas ?? null,
    });
  },
  cerrarModalReporte: () => {
    set({
      esModalReporteAbierto: false,
      coordenadasElegidas: null,
    });
  },
  abrirModalDonacion: (zonaId) => {
    set({
      zonaSeleccionadaId: zonaId,
      esModalDonacionAbierto: true,
    });
  },
  cerrarModalDonacion: () => {
    set({ esModalDonacionAbierto: false });
  },
}));

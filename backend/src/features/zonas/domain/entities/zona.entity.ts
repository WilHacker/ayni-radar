export type TipoDesastre =
  'INCENDIO' | 'INUNDACION' | 'DESLIZAMIENTO' | 'HELADA' | 'SEQUIA' | 'OTRO';

export type EstadoZona = 'POR_VERIFICAR' | 'ACTIVA' | 'ATENDIDA';

export interface FiltroZonas {
  tipo?: TipoDesastre;
  estado?: EstadoZona;
  departamento?: string;
}

export interface ZonaResumen {
  id: string;
  titulo: string;
  departamento: string;
  tipo: TipoDesastre;
  latitud: number;
  longitud: number;
  estado: EstadoZona;
  severidad: number;
  metaBs: number;
  recaudadoBs: number;
  qrImagenUrl: string | null;
  necesidadesJson: Record<string, unknown>;
  totalReportes: number;
  creadoEn: Date;
  actualizadoEn: Date;
}

export interface ReporteResumenZona {
  id: string;
  tipo: TipoDesastre;
  descripcion: string;
  latitud: number;
  longitud: number;
  fotoUrl: string | null;
  reportanteTag: string | null;
  creadoEn: Date;
}

export interface DonacionResumenZona {
  id: string;
  nombreDonante: string;
  tipo: string;
  montoBs: number | null;
  cantidad: number | null;
  detalleInsumo: string | null;
  comprobanteUrl: string | null;
  evidenciaEntregaUrl: string | null;
  estado: string;
  creadoEn: Date;
}

export interface ZonaDetalle extends ZonaResumen {
  reportes: ReporteResumenZona[];
  donaciones: DonacionResumenZona[];
}

export interface EstadisticasGlobales {
  totalZonas: number;
  zonasActivas: number;
  zonasPorVerificar: number;
  totalReportes: number;
  totalRecaudadoBs: number;
  donacionesEntregadas: number;
}

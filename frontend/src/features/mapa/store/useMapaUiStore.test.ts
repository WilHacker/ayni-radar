import { beforeEach, describe, expect, it } from 'vitest';
import { useMapaUiStore } from './useMapaUiStore';

describe('useMapaUiStore', () => {
  beforeEach(() => {
    useMapaUiStore.setState({
      zonaSeleccionadaId: null,
      filtroActivo: 'TODOS',
      esModalReporteAbierto: false,
      esModalDonacionAbierto: false,
      coordenadasElegidas: null,
    });
  });

  it('selecciona y limpia una zona de desastre correctamente', () => {
    // Actuar
    useMapaUiStore.getState().seleccionarZona('zona-1');
    // Verificar
    expect(useMapaUiStore.getState().zonaSeleccionadaId).toBe('zona-1');

    // Actuar
    useMapaUiStore.getState().seleccionarZona(null);
    // Verificar
    expect(useMapaUiStore.getState().zonaSeleccionadaId).toBeNull();
  });

  it('actualiza el filtro activo por tipo de desastre', () => {
    // Actuar
    useMapaUiStore.getState().cambiarFiltro('INCENDIO');
    // Verificar
    expect(useMapaUiStore.getState().filtroActivo).toBe('INCENDIO');
  });

  it('abre y cierra el modal de reporte conservando o limpiando coordenadas', () => {
    // Actuar
    useMapaUiStore.getState().abrirModalReporte({ latitud: -17.78, longitud: -63.18 });
    // Verificar
    expect(useMapaUiStore.getState().esModalReporteAbierto).toBe(true);
    expect(useMapaUiStore.getState().coordenadasElegidas).toEqual({
      latitud: -17.78,
      longitud: -63.18,
    });

    // Actuar
    useMapaUiStore.getState().cerrarModalReporte();
    // Verificar
    expect(useMapaUiStore.getState().esModalReporteAbierto).toBe(false);
    expect(useMapaUiStore.getState().coordenadasElegidas).toBeNull();
  });

  it('abre y cierra el modal de donación vinculado a la zona indicada', () => {
    // Actuar
    useMapaUiStore.getState().abrirModalDonacion('zona-42');
    // Verificar
    expect(useMapaUiStore.getState().zonaSeleccionadaId).toBe('zona-42');
    expect(useMapaUiStore.getState().esModalDonacionAbierto).toBe(true);

    // Actuar
    useMapaUiStore.getState().cerrarModalDonacion();
    // Verificar
    expect(useMapaUiStore.getState().esModalDonacionAbierto).toBe(false);
  });
});

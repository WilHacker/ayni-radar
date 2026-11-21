import { beforeEach, describe, expect, it } from 'vitest';
import { useMapUiStore } from './useMapUiStore';

describe('useMapUiStore', () => {
  beforeEach(() => {
    useMapUiStore.setState({
      selectedZoneId: null,
      activeFilter: 'ALL',
      isReportModalOpen: false,
      isDonateModalOpen: false,
      pickedCoords: null,
    });
  });

  it('selects and clears a disaster zone', () => {
    useMapUiStore.getState().selectZone('zone-1');
    expect(useMapUiStore.getState().selectedZoneId).toBe('zone-1');

    useMapUiStore.getState().selectZone(null);
    expect(useMapUiStore.getState().selectedZoneId).toBeNull();
  });

  it('updates the active disaster filter', () => {
    useMapUiStore.getState().setActiveFilter('INCENDIO');
    expect(useMapUiStore.getState().activeFilter).toBe('INCENDIO');
  });

  it('opens and closes the report modal with coordinates', () => {
    useMapUiStore.getState().openReportModal({ lat: -17.78, lng: -63.18 });
    expect(useMapUiStore.getState().isReportModalOpen).toBe(true);
    expect(useMapUiStore.getState().pickedCoords).toEqual({ lat: -17.78, lng: -63.18 });

    useMapUiStore.getState().closeReportModal();
    expect(useMapUiStore.getState().isReportModalOpen).toBe(false);
    expect(useMapUiStore.getState().pickedCoords).toBeNull();
  });

  it('opens and closes the donate modal bound to a zone', () => {
    useMapUiStore.getState().openDonateModal('zone-42');
    expect(useMapUiStore.getState().selectedZoneId).toBe('zone-42');
    expect(useMapUiStore.getState().isDonateModalOpen).toBe(true);

    useMapUiStore.getState().closeDonateModal();
    expect(useMapUiStore.getState().isDonateModalOpen).toBe(false);
  });
});

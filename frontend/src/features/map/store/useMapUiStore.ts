import { create } from 'zustand';
import { type DisasterType } from '../../../shared/types/disaster.types';

interface Coordinates {
  lat: number;
  lng: number;
}

interface MapUiState {
  selectedZoneId: string | null;
  activeFilter: DisasterType | 'ALL';
  isReportModalOpen: boolean;
  isDonateModalOpen: boolean;
  pickedCoords: Coordinates | null;
  selectZone: (zoneId: string | null) => void;
  setActiveFilter: (filter: DisasterType | 'ALL') => void;
  openReportModal: (coords?: Coordinates) => void;
  closeReportModal: () => void;
  openDonateModal: (zoneId: string) => void;
  closeDonateModal: () => void;
}

export const useMapUiStore = create<MapUiState>((set) => ({
  selectedZoneId: null,
  activeFilter: 'ALL',
  isReportModalOpen: false,
  isDonateModalOpen: false,
  pickedCoords: null,
  selectZone: (zoneId) => {
    set({ selectedZoneId: zoneId });
  },
  setActiveFilter: (filter) => {
    set({ activeFilter: filter });
  },
  openReportModal: (coords) => {
    set({
      isReportModalOpen: true,
      pickedCoords: coords ?? null,
    });
  },
  closeReportModal: () => {
    set({
      isReportModalOpen: false,
      pickedCoords: null,
    });
  },
  openDonateModal: (zoneId) => {
    set({
      selectedZoneId: zoneId,
      isDonateModalOpen: true,
    });
  },
  closeDonateModal: () => {
    set({ isDonateModalOpen: false });
  },
}));

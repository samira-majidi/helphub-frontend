export enum ExpertAvailabilityStatus {
  AVAILABLE = 'available',
  BUSY = 'busy',
  OFF_SHIFT = 'off_shift',
}

export interface UpdateAvailabilityPayload {
  availabilityStatus: ExpertAvailabilityStatus; // <--- این باید دقیقاً نام فیلد DTO باشه
}
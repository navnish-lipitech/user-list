export const APPOINTMENT_FIELD_NAMES = {
  name: "name",
  status: "status",
  description: "description",
  search: "search",
  category: "category",
  startTime: "startTime",
  endTime: "endTime",
  city: "city",
  caseMatter: "caseMatter",
  addedBy: "addedBy",
} as const;

export enum APPOINTMENT_STATUS {
  Accepted = "Accepted",
  Rejected = "Rejected",
  Pending = "Pending",
  Converted = "Converted",
}

export const STATUS_BG = {
  [APPOINTMENT_STATUS.Converted]: "#fcf2e6",
  [APPOINTMENT_STATUS.Accepted]: "#e1fff2",
  [APPOINTMENT_STATUS.Pending]: "#e3ebfc",
  [APPOINTMENT_STATUS.Rejected]: "#f5e1e1",
};

export const COLOR = {
  [APPOINTMENT_STATUS.Converted]: "#e8a95a",
  [APPOINTMENT_STATUS.Accepted]: "#2e7d32",
  [APPOINTMENT_STATUS.Pending]: "#0A4DFF",
  [APPOINTMENT_STATUS.Rejected]: "#DB6161",
};

export const BORDER = {
  [APPOINTMENT_STATUS.Converted]: "1px solid #e8a95a",
  [APPOINTMENT_STATUS.Accepted]: "1px solid #2e7d32",
  [APPOINTMENT_STATUS.Pending]: "1px solid #0A4DFF",
  [APPOINTMENT_STATUS.Rejected]: "1px solid #DB6161",
};
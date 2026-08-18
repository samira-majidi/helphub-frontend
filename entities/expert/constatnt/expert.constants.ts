// constants/expert.constants.ts

export const EXPERT_STATUS_MAP = {
  AVAILABLE: { label: "در دسترس", color: "bg-green-100 text-green-800 border-green-200" },
  BUSY: { label: "مشغول", color: "bg-orange-100 text-orange-800 border-orange-200" },
  OFF_SHIFT: { label: "خارج از شیفت", color: "bg-gray-100 text-gray-800 border-gray-200" },
} as const;

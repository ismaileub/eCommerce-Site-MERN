// =====================
// BASE PRODUCT
// =====================

export interface IBaseProduct {
  title: string;
  price: number;
  brand: string;
  stock: number;
  images: string;
  description?: string;
}

// =====================
// PC COMPONENT TYPES
// =====================

export type PcComponentType =
  | "ram"
  | "gpu"
  | "cpu"
  | "motherboard"
  | "ssd"
  | "hdd"
  | "psu"
  | "laptop";

// =====================
// SPEC TYPES
// =====================

export interface RamSpecs {
  type: "ram";
  capacity: string;
  speed: string;
  ddrType: "DDR3" | "DDR4" | "DDR5";
  latency?: string;

  // extra
  model?: string;
  series?: string;
  sku?: string;
  formFactor?: string; // DIMM / SO-DIMM
  voltage?: string;
  ecc?: boolean;
  buffered?: boolean;
  kit?: string; // e.g. "2x8GB"
  warranty?: string;
  color?: string;
}

export interface CpuSpecs {
  type: "cpu";
  cores: number;
  threads: number;
  baseClock: string;
  boostClock?: string;
  socket: string;

  // extra
  model?: string;
  series?: string;
  sku?: string;
  tdp?: string;
  cache?: string;
  lithography?: string;
  integratedGraphics?: string;
  coolerIncluded?: boolean;
  warranty?: string;
}

export interface GpuSpecs {
  type: "gpu";
  vram: string;
  chipset: string;
  baseClock?: string;
  boostClock?: string;
  rayTracing?: boolean;

  // extra
  model?: string;
  series?: string;
  sku?: string;
  memoryType?: string;
  busWidth?: string;
  outputs?: string; // HDMI/DP etc.
  powerConnectors?: string;
  recommendedPsu?: string;
  length?: string;
  warranty?: string;
  rgb?: boolean;
}

export interface StorageSpecs {
  type: "ssd" | "hdd";
  capacity: string;
  interface: "SATA" | "NVMe" | "PCIe";
  readSpeed?: string;
  writeSpeed?: string;

  // extra
  model?: string;
  series?: string;
  sku?: string;
  formFactor?: string; // 2.5", M.2
  nandType?: string;
  tbw?: string;
  dramCache?: boolean;
  rpm?: string; // HDD
  warranty?: string;
}

export interface PsuSpecs {
  type: "psu";
  wattage: string;
  efficiency: "80+" | "80+ Bronze" | "80+ Gold" | "80+ Platinum";
  modular?: boolean;

  // extra
  model?: string;
  series?: string;
  sku?: string;
  formFactor?: string; // ATX / SFX
  fanSize?: string;
  protections?: string; // OVP/OCP/OTP etc.
  pcieConnectors?: string;
  sataConnectors?: string;
  warranty?: string;
  color?: string;
}

export interface MotherboardSpecs {
  type: "motherboard";
  chipset: string;
  socket: string;
  ramSlots: number;
  maxRam: string;

  // extra
  model?: string;
  series?: string;
  sku?: string;
  formFactor?: string; // ATX / mATX / ITX
  ramType?: "DDR3" | "DDR4" | "DDR5";
  maxRamSpeed?: string;
  pcieSlots?: string;
  m2Slots?: number;
  sataPorts?: number;
  wifi?: boolean;
  bluetooth?: boolean;
  lan?: string;
  usbPorts?: string;
  warranty?: string;
}

// =====================
// UNION OF SPECS
// =====================

export type PcComponentSpecs =
  | RamSpecs
  | CpuSpecs
  | GpuSpecs
  | StorageSpecs
  | PsuSpecs
  | MotherboardSpecs;

// =====================
// OTHER PRODUCTS
// =====================

export interface LaptopSpecs {
  type: "laptop";
  cpu: string;
  ram: string;
  storage: string;
  display: string;
  gpu?: string;
  battery?: string;

  // extra
  model?: string;
  series?: string;
  sku?: string;
  os?: string;
  screenSize?: string;
  resolution?: string;
  refreshRate?: string;
  webcam?: string;
  keyboard?: string;
  ports?: string;
  weight?: string;
  dimensions?: string;
  color?: string;
  warranty?: string;
}

export interface GadgetSpecs {
  type: string;
  connectivity: string;
  batteryLife?: string;
  rgb?: boolean;

  // extra
  model?: string;
  series?: string;
  sku?: string;
  wireless?: boolean;
  range?: string;
  charging?: string; // USB-C / Micro-USB / wireless
  compatibleWith?: string;
  weight?: string;
  dimensions?: string;
  color?: string;
  warranty?: string;
}

// =====================
// FINAL PRODUCT TYPE (NO CATEGORY)
// =====================

export type Product = IBaseProduct & {
  specs: PcComponentSpecs | LaptopSpecs | GadgetSpecs;
};

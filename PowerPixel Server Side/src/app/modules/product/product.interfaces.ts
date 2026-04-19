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
  | "psu";

// =====================
// SPEC TYPES
// =====================

export interface RamSpecs {
  type: "ram";
  capacity: string;
  speed: string;
  ddrType: "DDR3" | "DDR4" | "DDR5";
  latency?: string;
}

export interface CpuSpecs {
  type: "cpu";
  cores: number;
  threads: number;
  baseClock: string;
  boostClock?: string;
  socket: string;
}

export interface GpuSpecs {
  type: "gpu";
  vram: string;
  chipset: string;
  baseClock?: string;
  boostClock?: string;
  rayTracing?: boolean;
}

export interface StorageSpecs {
  type: "ssd" | "hdd";
  capacity: string;
  interface: "SATA" | "NVMe" | "PCIe";
  readSpeed?: string;
  writeSpeed?: string;
}

export interface PsuSpecs {
  type: "psu";
  wattage: string;
  efficiency: "80+" | "80+ Bronze" | "80+ Gold" | "80+ Platinum";
  modular?: boolean;
}

export interface MotherboardSpecs {
  type: "motherboard";
  chipset: string;
  socket: string;
  ramSlots: number;
  maxRam: string;
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
  cpu: string;
  ram: string;
  storage: string;
  display: string;
  gpu?: string;
  battery?: string;
}

export interface GadgetSpecs {
  type: string;
  connectivity: string;
  batteryLife?: string;
  rgb?: boolean;
}

// =====================
// FINAL PRODUCT TYPE (NO CATEGORY)
// =====================

export type Product = IBaseProduct & {
  specs: PcComponentSpecs | LaptopSpecs | GadgetSpecs;
};

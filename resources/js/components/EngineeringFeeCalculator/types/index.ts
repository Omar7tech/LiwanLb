export interface BuildingCategory {
  category_code: string;
  usage_type: {
    ar: string;
    en: string;
  };
  minimum_costs_usd: {
    [key: string]: number;
  };
}

export interface BuildingGroups {
  [key: string]: {
    name: {
      ar: string;
      en: string;
    };
    categories: BuildingCategory[];
  };
}

export interface FeeBracket {
  maxCost: number;
  c1: number;
  c2: number;
  c3: number;
  c4: number;
}

export interface ComplexityLevel {
  value: number;
  labelAr: string;
  labelEn: string;
}

export interface Translations {
  [key: string]: {
    ar: string;
    en: string;
  };
}

export interface SavedResult {
  id: string;
  date: string;
  selectedGroup: string;
  selectedCategory: string;
  selectedComplexity: number;
  area: string;
  estimatedCost: number;
  applicablePercentage: number;
  minimumFee: number;
  baseCostPerSqm: number;
  groupName: string;
  categoryName: string;
  complexityName: string;
}

export interface ModalState {
  type: 'success' | 'error' | 'warning';
  title: string;
  message: string;
  showGuidance?: boolean;
}

export type Language = 'ar' | 'en';
export type InputState = 'active' | 'completed' | 'disabled';

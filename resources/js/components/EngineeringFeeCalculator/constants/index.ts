import { BuildingGroups, FeeBracket, ComplexityLevel, Translations } from '../types';

// Building costs data with complexity levels - Official Engineers Syndicate Data
export const BUILDING_GROUPS: BuildingGroups = {
  "سكن منفرد": {
    name: {
      ar: "سكن منفرد",
      en: "Single Family Housing"
    },
    categories: [
      {
        category_code: 'A1',
        usage_type: {
          ar: 'منازل منفردة',
          en: 'Single Family Homes'
        },
        minimum_costs_usd: {
          "بسيط أو خدماتي": 300,
          "وسط أو عادي": 450,
        },
      },
      {
        category_code: 'A2',
        usage_type: {
          ar: 'فيلات (بدلات أتعاب 10% حد أدنى)',
          en: 'Villas (10% minimum fee)'
        },
        minimum_costs_usd: {
          "وسط أو عادي": 600,
          "متطلب أو فخم": 1000,
        },
      },
      {
        category_code: 'A3',
        usage_type: {
          ar: 'قصور (بدلات أتعاب 10% حد أدنى)',
          en: 'Palaces (10% minimum fee)'
        },
        minimum_costs_usd: {
          "متطلب أو فخم": 1150,
          "معقد": 1500,
        },
      },
    ]
  },
  "مباني سكن": {
    name: {
      ar: "مباني سكن",
      en: "Residential Buildings"
    },
    categories: [
      {
        category_code: 'B1',
        usage_type: {
          ar: 'مبنى سكن خدماتي (مع أو بدون محلات تجارية)',
          en: 'Service Residential Building (with or without shops)'
        },
        minimum_costs_usd: {
          "وسط أو عادي": 400,
        },
      },
      {
        category_code: 'B2',
        usage_type: {
          ar: 'مبنى سكن فخم',
          en: 'Luxury Residential Building'
        },
        minimum_costs_usd: {
          "متطلب أو فخم": 850,
        },
      },
      {
        category_code: 'B3',
        usage_type: {
          ar: 'مجمعات سكنية خدماتية',
          en: 'Service Residential Complexes'
        },
        minimum_costs_usd: {
          "وسط أو عادي": 450,
        },
      },
      {
        category_code: 'B4',
        usage_type: {
          ar: 'مجمعات سكنية فخمة',
          en: 'Luxury Residential Complexes'
        },
        minimum_costs_usd: {
          "متطلب أو فخم": 850,
        },
      },
    ]
  },
  "تجارة ومكاتب": {
    name: {
      ar: "تجارة ومكاتب",
      en: "Commercial & Office"
    },
    categories: [
      {
        category_code: 'C1',
        usage_type: {
          ar: 'محلات تجارة صرف',
          en: 'Retail Shops'
        },
        minimum_costs_usd: {
          "بسيط أو خدماتي": 300,
          "وسط أو عادي": 400,
        },
      },
      {
        category_code: 'C2',
        usage_type: {
          ar: 'مكاتب أو مكاتب + محلات تجارية',
          en: 'Offices or Offices + Retail Shops'
        },
        minimum_costs_usd: {
          "وسط أو عادي": 450,
          "متطلب أو فخم": 550,
        },
      },
      {
        category_code: 'C3',
        usage_type: {
          ar: 'مجمعات تجارة + مكاتب',
          en: 'Commercial + Office Complexes'
        },
        minimum_costs_usd: {
          "متطلب أو فخم": 600,
          "معقد": 750,
        },
      },
      {
        category_code: 'C4',
        usage_type: {
          ar: 'مراكز تجارية كبرى (mall - department store)',
          en: 'Large Commercial Centers (Mall - Department Store)'
        },
        minimum_costs_usd: {
          "معقد": 900,
        },
      },
    ]
  },
  "شقق مفروشة": {
    name: {
      ar: "شقق مفروشة",
      en: "Furnished Apartments"
    },
    categories: [
      {
        category_code: 'D1',
        usage_type: {
          ar: 'شقق مفروشة',
          en: 'Furnished Apartments'
        },
        minimum_costs_usd: {
          "وسط أو عادي": 550,
          "متطلب أو فخم": 750,
        },
      },
      {
        category_code: 'D2',
        usage_type: {
          ar: 'شقق فندقية (Suite Hotel)',
          en: 'Hotel Suites (Suite Hotel)'
        },
        minimum_costs_usd: {
          "متطلب أو فخم": 850,
        },
      },
    ]
  },
};

// Complexity level mapping - uses the four main complexity columns
export const COMPLEXITY_MAPPING: { [key: string]: number } = {
  "بسيط أو خدماتي": 1,
  "وسط أو عادي": 2,
  "متطلب أو فخم": 3,
  "معقد": 4,
};

// Fee schedule with complexity-based percentages
export const FEE_SCHEDULE: FeeBracket[] = [
  { maxCost: 150000, c1: 7.0, c2: 8.0, c3: 9.0, c4: 10.0 },
  { maxCost: 300000, c1: 6.5, c2: 7.5, c3: 8.5, c4: 9.5 },
  { maxCost: 500000, c1: 6.0, c2: 7.0, c3: 8.0, c4: 9.0 },
  { maxCost: 1000000, c1: 5.5, c2: 6.5, c3: 7.5, c4: 8.5 },
  { maxCost: 2000000, c1: 5.0, c2: 6.0, c3: 7.0, c4: 8.0 },
  { maxCost: 5000000, c1: 4.5, c2: 5.5, c3: 6.5, c4: 7.5 },
  { maxCost: 10000000, c1: 4.0, c2: 5.0, c3: 6.0, c4: 7.0 },
  { maxCost: Infinity, c1: 3.5, c2: 4.5, c3: 5.5, c4: 6.5 },
];

export const COMPLEXITY_LEVELS: ComplexityLevel[] = [
  { value: 1, labelAr: 'بسيط أو خدماتي', labelEn: 'Simple / Service' },
  { value: 2, labelAr: 'وسط أو عادي', labelEn: 'Medium / Standard' },
  { value: 3, labelAr: 'متطلب أو فخم', labelEn: 'Demanding / Luxury' },
  { value: 4, labelAr: 'معقد', labelEn: 'Complex' },
];

export const TRANSLATIONS: Translations = {
  title: {
    ar: 'حاسبة الحد الأدنى للأتعاب الهندسية (نقابة المهندسين - بيروت)',
    en: 'Minimum Engineering Fees Calculator (Engineers Syndicate - Beirut)'
  },
  group: {
    ar: 'مجموعة المباني',
    en: 'Building Group'
  },
  category: {
    ar: 'نوع المبنى',
    en: 'Building Type'
  },
  complexity: {
    ar: 'درجة التعقيد (تؤثر على الكلفة والنسبة)',
    en: 'Complexity Level (Affects Cost & Percentage)'
  },
  area: {
    ar: 'المساحة الإجمالية للبناء',
    en: 'Total Construction Area'
  },
  areaUnit: {
    ar: 'متر مربع (m²)',
    en: 'square meters (m²)'
  },
  baseCost: {
    ar: 'كلفة المتر المربع التقديرية (المرشد)',
    en: 'Estimated Cost per Square Meter (Guide)'
  },
  estimatedCost: {
    ar: 'الكلفة التقديرية للمشروع',
    en: 'Estimated Project Cost'
  },
  applicableFee: {
    ar: 'نسبة الأتعاب المطبقة',
    en: 'Applicable Fee Percentage'
  },
  minimumFee: {
    ar: 'الحد الأدنى للأتعاب الهندسية (المجموع)',
    en: 'Minimum Engineering Fee (Total)'
  },
  calculate: {
    ar: 'احسب',
    en: 'Calculate'
  },
  clear: {
    ar: 'مسح',
    en: 'Clear'
  },
  selectGroup: {
    ar: '-- اختر مجموعة المباني --',
    en: '-- Select Building Group --'
  },
  selectCategory: {
    ar: '-- اختر نوع المبنى --',
    en: '-- Select Building Type --'
  },
  selectComplexity: {
    ar: '-- اختر درجة التعقيد --',
    en: '-- Select Complexity Level --'
  },
  enterArea: {
    ar: 'الرجاء إدخال المساحة',
    en: 'Please enter the area'
  },
  selectGroupError: {
    ar: 'الرجاء اختيار مجموعة المباني',
    en: 'Please select building group'
  },
  selectCategoryError: {
    ar: 'الرجاء اختيار نوع المبنى',
    en: 'Please select building type'
  },
  selectComplexityLevel: {
    ar: 'الرجاء اختيار درجة التعقيد',
    en: 'Please select complexity level'
  },
  results: {
    ar: 'نتائج الحساب',
    en: 'Calculation Results'
  },
  currency: {
    ar: 'دولار أمريكي',
    en: 'US Dollars'
  },
  complexityDesc: {
    ar: 'مستوى تعقيد البناء',
    en: 'Building Complexity Level'
  },
  areaPlaceholder: {
    ar: 'أدخل المساحة الإجمالية',
    en: 'Enter total area'
  },
  step1: {
    ar: '1. مجموعة المباني',
    en: '1. Building Group'
  },
  step2: {
    ar: '2. نوع المبنى',
    en: '2. Building Type'
  },
  step3: {
    ar: '3. درجة التعقيد',
    en: '3. Complexity Level'
  },
  step4: {
    ar: '4. المساحة الإجمالية',
    en: '4. Total Area'
  }
};

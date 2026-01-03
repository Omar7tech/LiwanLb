import { useMemo } from 'react';
import { BuildingCategory, FeeBracket } from '../types';
import { BUILDING_GROUPS, FEE_SCHEDULE, COMPLEXITY_MAPPING, COMPLEXITY_LEVELS } from '../constants';

export interface CalculationResult {
  estimatedCost: number;
  applicablePercentage: number;
  minimumFee: number;
  baseCostPerSqm: number;
}

export const useCalculations = (
  selectedGroup: string,
  selectedCategory: string,
  selectedComplexity: number,
  area: string
) => {
  // Get available categories for selected group
  const availableCategories = useMemo(() => {
    if (!selectedGroup) return [];

    const groupData = BUILDING_GROUPS[selectedGroup]?.categories || [];
    return groupData.map((category: BuildingCategory) => ({
      key: category.category_code,
      labelAr: category.usage_type.ar,
      labelEn: category.usage_type.en,
      group: selectedGroup
    }));
  }, [selectedGroup]);

  // Get available complexities for selected category
  const availableComplexities = useMemo(() => {
    if (!selectedCategory || !selectedGroup) return [];

    const groupData = BUILDING_GROUPS[selectedGroup]?.categories || [];
    const selectedCategoryData = groupData.find((cat: BuildingCategory) => cat.category_code === selectedCategory);

    if (!selectedCategoryData) return [];

    const availableComplexityNumbers = Object.keys(selectedCategoryData.minimum_costs_usd)
      .map(complexityName => COMPLEXITY_MAPPING[complexityName])
      .filter(Boolean);

    return COMPLEXITY_LEVELS.filter(level => availableComplexityNumbers.includes(level.value));
  }, [selectedCategory, selectedGroup]);

  // Calculate fees
  const calculateFees = async (): Promise<CalculationResult> => {
    const areaNum = parseFloat(area);
    if (areaNum <= 0) {
      return {
        estimatedCost: 0,
        applicablePercentage: 0,
        minimumFee: 0,
        baseCostPerSqm: 0
      };
    }

    // Find the selected building cost entry
    const groupData = BUILDING_GROUPS[selectedGroup]?.categories || [];
    const selectedCategoryData = groupData.find((cat: BuildingCategory) => cat.category_code === selectedCategory);

    if (!selectedCategoryData) {
      return {
        estimatedCost: 0,
        applicablePercentage: 0,
        minimumFee: 0,
        baseCostPerSqm: 0
      };
    }

    // Find the complexity name that matches the selected complexity number
    const complexityName = Object.keys(selectedCategoryData.minimum_costs_usd).find(
      name => COMPLEXITY_MAPPING[name] === selectedComplexity
    );

    const costPerSqm = complexityName ? selectedCategoryData.minimum_costs_usd[complexityName] : 0;

    // Calculate estimated cost
    const cost = areaNum * costPerSqm;

    // Find applicable percentage based on complexity
    const complexityColumn = `c${selectedComplexity}` as keyof FeeBracket;
    const feeEntry = FEE_SCHEDULE.find(entry => cost <= entry.maxCost);
    const percentage = feeEntry ? feeEntry[complexityColumn] : 0;

    // Calculate minimum fee
    const fee = cost * (percentage / 100);

    return {
      estimatedCost: cost,
      applicablePercentage: percentage,
      minimumFee: fee,
      baseCostPerSqm: costPerSqm
    };
  };

  return {
    availableCategories,
    availableComplexities,
    calculateFees
  };
};

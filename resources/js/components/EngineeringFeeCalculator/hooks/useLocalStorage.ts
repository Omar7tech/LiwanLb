import { useState, useEffect } from 'react';
import { SavedResult } from '../types';

export const useLocalStorage = (key: string, initialValue: SavedResult[] = []) => {
  // Get value from localStorage or return initial value
  const [storedValue, setStoredValue] = useState<SavedResult[]>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return initialValue;
    }
  });

  // Update localStorage when value changes
  useEffect(() => {
    try {
      if (storedValue.length > 0) {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      }
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  }, [key, storedValue]);

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value: SavedResult[] | ((val: SavedResult[]) => SavedResult[])) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
    } catch (error) {
      console.error(`Error setting ${key} in localStorage:`, error);
    }
  };

  return [storedValue, setValue] as const;
};

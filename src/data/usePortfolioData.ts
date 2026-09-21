import { useState, useEffect } from 'react';
import initialPortfolioData from './portfolioData.json';
import { PortfolioData } from '../types';

const STORAGE_KEY = 'paper_portfolio_mohit_v6';

export function usePortfolioData() {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure basic schema integrity
        if (parsed.personal && parsed.projects && parsed.mascots) {
          return parsed as PortfolioData;
        }
      }
    } catch (e) {
      console.warn('Failed to load stored portfolio data, using defaults', e);
    }
    return initialPortfolioData as unknown as PortfolioData;
  });

  const [hasCustomEdits, setHasCustomEdits] = useState<boolean>(() => {
    return Boolean(localStorage.getItem(STORAGE_KEY));
  });

  const saveCustomData = (newData: PortfolioData) => {
    setData(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData, null, 2));
    setHasCustomEdits(true);
  };

  const resetToDefault = () => {
    localStorage.removeItem(STORAGE_KEY);
    setData(initialPortfolioData as unknown as PortfolioData);
    setHasCustomEdits(false);
  };

  const downloadJsonFile = () => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'portfolioData.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return {
    data,
    saveCustomData,
    resetToDefault,
    downloadJsonFile,
    hasCustomEdits,
    initialData: initialPortfolioData as unknown as PortfolioData
  };
}

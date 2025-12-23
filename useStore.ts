
import { useState, useEffect, useCallback } from 'react';
import { UserStats, EcoExchangeItem } from './types';

// Initial default data
const DEFAULT_STATS: UserStats = {
  carbonCredits: 500,
  co2Saved: 0,
  streak: 1,
  level: 1,
  xp: 0,
  lastActionDate: new Date().toISOString()
};

export const useStore = () => {
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('eco_stats');
    return saved ? JSON.parse(saved) : DEFAULT_STATS;
  });

  const [exchangeItems, setExchangeItems] = useState<EcoExchangeItem[]>(() => {
    const saved = localStorage.getItem('eco_exchange');
    return saved ? JSON.parse(saved) : [];
  });

  const [chatHistory, setChatHistory] = useState<any[]>(() => {
    const saved = localStorage.getItem('eco_chat');
    return saved ? JSON.parse(saved) : [];
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('eco_stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('eco_exchange', JSON.stringify(exchangeItems));
  }, [exchangeItems]);

  useEffect(() => {
    localStorage.setItem('eco_chat', JSON.stringify(chatHistory));
  }, [chatHistory]);

  const addXP = useCallback((amount: number) => {
    setStats(prev => {
      const newXp = prev.xp + amount;
      const newLevel = Math.floor(newXp / 1000) + 1;
      return { ...prev, xp: newXp, level: newLevel };
    });
  }, []);

  const addCredits = useCallback((amount: number) => {
    setStats(prev => ({ ...prev, carbonCredits: prev.carbonCredits + amount }));
  }, []);

  const spendCredits = useCallback((amount: number) => {
    let success = false;
    setStats(prev => {
      if (prev.carbonCredits >= amount) {
        success = true;
        return { ...prev, carbonCredits: prev.carbonCredits - amount };
      }
      return prev;
    });
    return success;
  }, []);

  const addCo2Saved = useCallback((amount: number) => {
    setStats(prev => ({ ...prev, co2Saved: parseFloat((prev.co2Saved + amount).toFixed(2)) }));
  }, []);

  const postExchangeItem = useCallback((item: EcoExchangeItem) => {
    setExchangeItems(prev => [item, ...prev]);
  }, []);

  const saveChatMessage = useCallback((role: 'user' | 'model', text: string) => {
    setChatHistory(prev => [...prev, { role, parts: [{ text }] }]);
  }, []);

  return {
    stats,
    exchangeItems,
    chatHistory,
    addXP,
    addCredits,
    spendCredits,
    addCo2Saved,
    postExchangeItem,
    saveChatMessage
  };
};

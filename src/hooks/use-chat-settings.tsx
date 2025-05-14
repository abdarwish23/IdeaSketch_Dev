
import { useState, useEffect } from 'react';

type ChatSettings = {
  fontSize: 'small' | 'medium' | 'large';
  darkMode: boolean;
  soundEnabled: boolean;
  typingIndicator: boolean;
};

const defaultSettings: ChatSettings = {
  fontSize: 'medium',
  darkMode: false,
  soundEnabled: true,
  typingIndicator: true,
};

export function useChatSettings() {
  const [settings, setSettings] = useState<ChatSettings>(() => {
    // Load settings from localStorage on initial render
    const savedSettings = localStorage.getItem('ideaSketch_settings');
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  });

  // Update localStorage when settings change
  useEffect(() => {
    localStorage.setItem('ideaSketch_settings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings: Partial<ChatSettings>) => {
    setSettings(prev => ({
      ...prev,
      ...newSettings,
    }));
  };

  return {
    settings,
    updateSettings,
  };
}

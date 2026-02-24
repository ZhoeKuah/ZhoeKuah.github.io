import { createContext, useContext, useState, ReactNode } from 'react';

export type BackgroundType = 'none' | 'cosmic' | 'bubble';

interface CosmicContextType {
  cosmicEnabled: boolean;
  setCosmicEnabled: (enabled: boolean) => void;
  backgroundType: BackgroundType;
  setBackgroundType: (type: BackgroundType) => void;
}

const CosmicContext = createContext<CosmicContextType>({
  cosmicEnabled: false,
  setCosmicEnabled: () => {},
  backgroundType: 'none',
  setBackgroundType: () => {},
});

export const useCosmic = () => useContext(CosmicContext);

interface CosmicProviderProps {
  children: ReactNode;
}

export const CosmicProvider = ({ children }: CosmicProviderProps) => {
  const [cosmicEnabled, setCosmicEnabled] = useState(false);
  const [backgroundType, setBackgroundType] = useState<BackgroundType>('cosmic');

  const handleSetCosmicEnabled = (enabled: boolean) => {
    setCosmicEnabled(enabled);
    if (enabled && backgroundType === 'none') {
      setBackgroundType('cosmic');
    }
  };

  const handleSetBackgroundType = (type: BackgroundType) => {
    setBackgroundType(type);
    setCosmicEnabled(type !== 'none');
  };

  return (
    <CosmicContext.Provider value={{ 
      cosmicEnabled, 
      setCosmicEnabled: handleSetCosmicEnabled,
      backgroundType,
      setBackgroundType: handleSetBackgroundType,
    }}>
      {children}
    </CosmicContext.Provider>
  );
};

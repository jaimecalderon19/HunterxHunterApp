import React, { createContext, useContext, useState } from 'react';

export type Cazador = {
  id?: number | string;
  _id?: string;
  nombre: string;
  imagen: string;
  edad: number;
  altura: number;
  peso: number;
  genero: string;
  habilidades: string[];
  tipoLicencia: string;
};

type CazadoresContextType = {
  cazador: Cazador | null;
  setCazador: React.Dispatch<React.SetStateAction<Cazador | null>>;
  cazadores: Cazador[];
  setCazadores: React.Dispatch<React.SetStateAction<Cazador[]>>;
};

const CazadoresContext = createContext<CazadoresContextType | undefined>(undefined);

export const CazadoresProvider = ({ children }: { children: React.ReactNode }) => {
  const [cazador, setCazador] = useState<Cazador | null>(null);
  const [cazadores, setCazadores] = useState<Cazador[]>([]);

  return (
    <CazadoresContext.Provider value={{ cazador, setCazador, cazadores, setCazadores }}>
      {children}
    </CazadoresContext.Provider>
  );
};

export const useCazadores = () => {
  const context = useContext(CazadoresContext);
  if (!context) {
    throw new Error('useCazadores debe usarse dentro de un CazadoresProvider');
  }
  return context;
};

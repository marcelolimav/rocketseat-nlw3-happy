import React, { createContext, useState } from 'react';

export interface IOrphanage {
  id?: number;
  name?: string;
  latitude?: number;
  longitude?: number;
  about?: string;
  celPhone?: string;
  instructions?: string;
  opening_hours?: string;
  open_on_weekends?: boolean ;
  images?: [
    {
      id: number;
      url: string;
    }
  ]
}
export interface OrphanageContextData {
  orphanage?: IOrphanage;
  setOrphanageData(data: IOrphanage): void;
  setLatLon(latitude: number, longitude: number): void;
  setName(name: string): void;
  setCelPhone(celPhone: string): void;
  setAbout(about: string): void;
  setInstructions(instructions: string): void;
  setOpeningHours(opening_hours: string): void;
  setOpenOnWeekends(open_on_weekends: boolean): void;
}

const OrphanageContext = createContext<OrphanageContextData>({} as OrphanageContextData);

export const OrphanageProvider: React.FC = ({ children }) => {
  const [orphanage, setOrphanage] = useState<IOrphanage>({} as IOrphanage);

  function setOrphanageData(data: IOrphanage) {
    setOrphanage(data);
  }

  function setLatLon(latitude: number, longitude: number) {
    setOrphanage({...orphanage, latitude, longitude});
  }

  function setName(name: string) {
    setOrphanage({...orphanage, name});
  }

  function setAbout(about: string) {
    setOrphanage({...orphanage, about});
  }

  function setCelPhone(celPhone: string) {
    setOrphanage({...orphanage, celPhone});
  }

  function setInstructions(instructions: string) {
    setOrphanage({...orphanage, instructions});
  }

  function setOpeningHours(opening_hours: string) {
    setOrphanage({...orphanage, opening_hours});
  }

  function setOpenOnWeekends(open_on_weekends: boolean) {
    setOrphanage({...orphanage, open_on_weekends});
  }

  return (
    <OrphanageContext.Provider value={{
        orphanage,
        setOrphanageData,
        setLatLon,
        setName,
        setAbout,
        setInstructions,
        setCelPhone,
        setOpeningHours,
        setOpenOnWeekends,
      }}>
      {children}
    </OrphanageContext.Provider>
  );
};

export default OrphanageContext;

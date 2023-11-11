import { createContext, useContext, useState } from "react";

const MapglContext = createContext({
  mapgl: undefined,
  mapglInstance: undefined,
  rulerControl: undefined,
  setMapglContext: () => {},
});

export function useMapglContext() {
  return useContext(MapglContext);
}

export function MapglContextProvider({ children }) {
  const [{ mapglInstance, rulerControl, mapgl }, setMapglContext] = useState({
    mapglInstance: undefined,
    rulerControl: undefined,
    mapgl: undefined,
  });
  return (
    <MapglContext.Provider
      value={{ mapgl, mapglInstance, rulerControl, setMapglContext }}
    >
      {children}
    </MapglContext.Provider>
  );
}

import { createContext, useState } from "react";

const initialContext = {
    isLoading: false,
    setLoading: () => null,
}

const LoadingContext = createContext(initialContext);

const LoadingContextProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(false);
  
    return (
      <LoadingContext.Provider value={{ isLoading, setLoading }}>
        {children}
      </LoadingContext.Provider>
    );
  };

  export { LoadingContext, LoadingContextProvider };
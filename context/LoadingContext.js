import { createContext, useState, useContext } from 'react';
import dynamic from 'next/dynamic';
const DynamicLoading = dynamic(() => import('../components/Loading'))



const initialContext = {
  loading: false,
  setLoading: (loading) => { },
};

const LoadingContext = createContext(initialContext);

const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(initialContext.loading);



  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {loading && <DynamicLoading />}
      {children}
    </LoadingContext.Provider>
  );
};

const LoadingContextProvider = () => useContext(LoadingContext)

export { LoadingProvider, LoadingContextProvider };

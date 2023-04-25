import { createContext, useContext, useState } from "react";

const initialContext = {
  isVisible: false,
  setSidebar: () => null,
}

const SidebarContext = createContext(initialContext.isVisible);

const SidebarProvider = ({ children }) => {
  const [isVisible, setSidebar] = useState(false);
  const [home, setHome] = useState([])

  return (
    <SidebarContext.Provider value={{ home,setHome, isVisible, setSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

const SidebarContextProvider = () => useContext(SidebarContext)
export { SidebarProvider, SidebarContextProvider };


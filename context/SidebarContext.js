import { createContext, useContext, useState } from "react";

const initialContext = {
  isVisible: false,
  setSidebar: () => null,
}

const SidebarContext = createContext(initialContext.isVisible);

const SidebarProvider = ({ children }) => {
  const [isVisible, setSidebar] = useState(false);

  return (
    <SidebarContext.Provider value={{ isVisible, setSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

const SidebarContextProvider = () => useContext(SidebarContext)
export { SidebarProvider, SidebarContextProvider };


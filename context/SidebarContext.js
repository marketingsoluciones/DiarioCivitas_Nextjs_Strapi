import { createContext, useState } from "react";

const initialContext = {
    isVisible: false,
    setSidebar: () => null,
}

const SidebarContext = createContext(initialContext);

const SidebarContextProvider = ({ children }) => {
    const [isVisible, setSidebar] = useState(false);
  
    return (
      <SidebarContext.Provider value={{ isVisible, setSidebar }}>
        {children}
      </SidebarContext.Provider>
    );
  };

  export { SidebarContext, SidebarContextProvider };
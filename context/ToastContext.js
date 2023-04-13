import { createContext, FC, useContext, useReducer, Reducer } from 'react';
import ToastContainer from '../components/Toast/ToastContainer';

const types = {
  success: "",
  error: "",
  warning: "",
  update: ""
}



const initialContext = {
  toasts: [],
  dispatch: () => null,
}

const ToastContext = createContext(initialContext);

const toastReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST": {
      return [...state, action.toast]
    }
    case "DELETE_TOAST": {
      const updateToast = state.filter(e => e.id !== action.id)
      return updateToast
    }
    default: {
      throw new Error('unhandled action type');
    }
  }
}

const ToastProvider = ({ children }) => {
  const [toasts, dispatch] = useReducer(toastReducer, []);

  return (
    <ToastContext.Provider value={{ toasts, dispatch }}>
      <ToastContainer toasts={toasts} />
      {children}
    </ToastContext.Provider>
  );
};

const ToastContextProvider = () => useContext(ToastContext)
export { ToastContextProvider, ToastProvider };
import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const URL = "http://localhost:3000";

export const Context = createContext();

export const ContextProvider = ({ children }) => {

  return (
    <Context.Provider
    >
      {children}
    </Context.Provider>
  );
};

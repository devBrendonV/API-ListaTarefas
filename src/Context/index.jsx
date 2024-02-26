import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const URL = "http://localhost:3000";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [logado, setLogado] = useState(false);
  const [listaAtual, setListaAtual] = useState([]);
  const [idAtual, setIdAtual] = useState("");
  const [mensagem, setMensagem] = useState();

  function deslogar() {
    setLogado(false);
    setListaAtual([]);
    setIdAtual("");
  }

  const puxarDados = async (recebido) => {
    try {
      const respo = await axios.get(`${URL}/lista/${recebido}`);
      setIdAtual(respo.data.id);
      setListaAtual(respo.data.lista);
      setLogado(true);
    } catch (e) {
      if (TypeError(e).message.includes("404")) {
        toast.error("ID não encontrado");
      } else {
        toast.error("Falha ao processar informação");
      }
    }
  };

  const criar = async () => {
    try {
      const respo = await axios.post(`${URL}/lista`, { lista: [] });
      setIdAtual(respo.data.id);
      setListaAtual(respo.data.lista);
      toast.success(`Seu novo ID: ${respo.data.id}`);
      setLogado(true);
    } catch (error) {
      toast.error("Falha ao processar informação");
    }
  };

  const salvar = async (recebido) => {
    try {
      const respo = await axios.put(`${URL}/lista/${idAtual}`, {
        lista: recebido,
      });
      setListaAtual(respo.data.lista);
      toast.success("Lista Salva");
    } catch (error) {
      toast.error("Falha ao processar informação");
    }
  };

  const apagar = async (recebido) => {
    try {
      const respo = await axios.delete(`${URL}/lista/${recebido}`);
      toast.success("Lista Deletada");
      setLogado(false);
      setListaAtual([]);
      setIdAtual("");
    } catch (e) {
      if (TypeError(e).message.includes("404")) {
        toast.error("ID não encontrado");
      } else {
        toast.error("Falha ao processar informação");
      }
    }
  };

  return (
    <Context.Provider
      value={{
        listaAtual,
        mensagem,
        idAtual,
        logado,
        setMensagem,
        deslogar,
        setListaAtual,
        puxarDados,
        criar,
        salvar,
        apagar,
      }}
    >
      {children}
    </Context.Provider>
  );
};

import { Box, Typography, Input, IconButton, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../Context";
import { Historico } from "../Historico";
import { OpcoesLista } from "./OpcoesLista";
import TarefaConcluida from "./TarefaConcluida";

export const Lista = () => {
  const [listaProvisoria, setlistaProvisoria] = useState("");
  const { listaAtual, idAtual } = useContext(Context);
  const [salvarMudancas, setSalvarMudancas] = useState();
  const [tarefaConcluida, setTarefaConcluida] = useState(false);
  const [texto, setTexto] = useState("");

  useEffect(() => {
    setlistaProvisoria(listaAtual);
    setTexto("");
  }, [listaAtual]);

  useEffect(() => {
    conferirMudancas();
  }, [listaProvisoria]);

  function adicionarTarefa() {
    setlistaProvisoria([
      ...listaProvisoria,
      { tarefa: texto, feito: tarefaConcluida },
    ]);
    setTexto("");
  }

  function tarefaFeita(posicao) {
    const atualizarTarefa = listaProvisoria.map((arr, i) => {
      if (posicao == i) {
        return {
          tarefa: listaProvisoria[posicao].tarefa,
          feito: !listaProvisoria[posicao].feito,
        };
      } else {
        return arr;
      }
    });
    setlistaProvisoria(atualizarTarefa);
  }

  function conferirMudancas() {
    if (listaProvisoria.length === 0 && listaAtual.length === 0) {
      return setSalvarMudancas(true);
    }
    if (listaProvisoria.length === 0 && listaAtual.length > 0) {
      return setSalvarMudancas(false);
    }
    setSalvarMudancas(
      listaProvisoria.every((arr, i) => {
        if (listaProvisoria.length === listaAtual.length) {
          return (
            arr.feito === listaAtual[i].feito &&
            arr.tarefa === listaAtual[i].tarefa
          );
        }
      })
    );
  }

  function apagarTarefa(posicao) {
    const remocao = listaProvisoria.filter((e, i) => {
      return posicao != i;
    });
    setlistaProvisoria(remocao);
  }

  function mudarPosicao(posicaoAtual, posicaoNova) {
    const listaMudancaProvisoria = listaProvisoria;
    const mudancas = listaProvisoria.map((e, i) => {
      if (i !== posicaoAtual && i !== posicaoNova) {
        return e;
      }
      if (i === posicaoAtual) {
        return listaMudancaProvisoria[posicaoNova];
      }
      if (i === posicaoNova) {
        return listaMudancaProvisoria[posicaoAtual];
      }
    });
    setlistaProvisoria(mudancas);
  }

  return (
    <Box flex={1} display={"flex"} width={"100%"} flexDirection={"column"}>
      <Box
        borderRadius={"15px 15px 0 0"}
        borderBottom={"2px solid #555"}
        backgroundColor={"#e8e8ec"}
        marginTop={"2px"}
        color={"black"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        paddingBottom={"10px"}
        textAlign={"center"}
      >
        <Box
          flexDirection={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          display={"flex"}
          width={"100%"}
          textAlign={"left"}
          color={"#555"}
          fontWeight={"bold"}
        >
          <Typography as="span" marginLeft={"10px"} width={"50%"}>
            Meu ID: {idAtual}
          </Typography>
          <OpcoesLista
            func={{ setlistaProvisoria }}
            value={{ listaProvisoria, salvarMudancas }}
          />
        </Box>
        <Box>
          <TextField
            variant="standard"
            value={texto}
            placeholder="Digite sua nova tarefa..."
            inputProps={{
              maxLength: 13,
            }}
            onChange={(e) => setTexto(e.target.value.trim())}
            onKeyDown={(e) => {
              if (e.key === "Enter" && texto.length > 0) {
                adicionarTarefa();
              }
            }}
          />

          <IconButton
            title="Enviar"
            size="small"
            variant="contained"
            disabled={texto.length === 0}
            onClick={() => adicionarTarefa()}
          >
            <SendIcon fontSize={"5px"} />
          </IconButton>
        </Box>

        <Box marginTop={"10px"}>
          <TarefaConcluida func={{ setTarefaConcluida }} />
        </Box>
      </Box>
      <Box flex={1} width={"100%"} color={"black"}>
        <Historico
          func={{
            tarefaFeita: tarefaFeita,
            mudarPosicao: mudarPosicao,
            apagarTarefa: apagarTarefa,
          }}
          value={{ lista: listaProvisoria, total: listaProvisoria.length }}
        />
      </Box>
    </Box>
  );
};

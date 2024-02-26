import React from "react";
import { Box } from "@mui/material";
import { ItemLista } from "../Lista/ItemLista";

export const Historico = (prop) => {
  if (prop.value.total === 0) {
    return (
      <Box
        display={"flex"}
        height={"40vh"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        Lista Vazia
      </Box>
    );
  }

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      padding={"5px"}
      overflow={"auto"}
      width={"100%"}
      height={"40vh"}
      alignItems={"center"}
    >
      {prop.value.lista.map((e, i) => {
        console.log(e)
          return (
            <ItemLista
              key={i}
              tarefaFeita={() => {
                prop.func.tarefaFeita(i);
              }}
              mudarPosicao={(from, to) => {
                prop.func.mudarPosicao(from, to);
              }}
              apagarTarefa={() => {
                prop.func.apagarTarefa(i);
              }}
              value={{
                tarefa: e.tarefa,
                feito: e.feito,
                indice: i,
                total: prop.value.total,
              }}
            />
          );
      })}
    </Box>
  );
};

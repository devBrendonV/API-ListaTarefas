import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function TarefaConcluida(prop) {
  return (
    <FormControl sx={{ display:"flex", flexDirection:"row", alignItems:"center"}}>
      <FormLabel id="demo-row-radio-buttons-group-label" sx={{marginRight:"10px", fontSize:"18px"}}>
        Tarefa Concluida:
      </FormLabel>
      <RadioGroup
        defaultValue="nao"
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel
          value="sim"
          control={
            <Radio
              size="small"
              color="success"
              onClick={() => prop.func.setTarefaConcluida(true)}
            />
          }
          label="Sim"
        />
        <FormControlLabel
          value="nao"
          control={
            <Radio
              size="small"
              sx={{
                color: "#f30c0cf4",
                "&.Mui-checked": {
                  color: "#f30c0cf4",
                },
              }}
              type="radio"
              id="feito"
              name="tarefafeita"
              onClick={() => setTarefaConcluida(false)}
            />
          }
          label="Não"
        />
      </RadioGroup>
    </FormControl>
  );
}

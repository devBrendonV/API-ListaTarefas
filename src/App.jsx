import { Box } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Box
      color={"white"}
      backgroundColor={"#9ca3af"}
      width={"100vw"}
      height={"100vh"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      Conteudo
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        closeOnClick
        theme="dark"
      />
    </Box>
  );
}

export default App;

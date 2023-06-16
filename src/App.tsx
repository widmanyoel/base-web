import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import "./App.css";
import store from "./stateManagement/store";
import LoggedInRouting from "./routes/loggedIn/Routing";
import LoggedOutRouting from "./routes/loggedOut/Routing";
import ProductsRouting from "./routes/products/Routing";
import theme from "./theme";
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <LoggedOutRouting />
          <LoggedInRouting />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

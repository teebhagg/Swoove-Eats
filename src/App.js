import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {useMediaQuery} from 'react-responsive'
import HomePageCustomer from "./pages/HomePage(Customer)";
import HomePageAdmin from "./pages/HomePage(Owner)";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  const theme = createTheme({
    typography:{
      fontFamily:'Roboto'
    },
    palette:{
      background:'#FFF5E4'
    },
    
  })  

 const mobileDisplay = useMediaQuery({ query:'(max-width: 600px)' });

 const tabletDisplay = useMediaQuery({ query:'(max-width: 768px)' });
  return (
    <ThemeProvider theme={theme} >
      <CssBaseline/>
      <BrowserRouter>
        <Routes>
          <Route index path='/login' element = { <LoginPage/>} />
          <Route index path='/sign-up' element = { <SignUpPage/>} />
          <Route  path='/homepage-admin/:id' element = { <HomePageAdmin tabletDisplay={tabletDisplay} />} />
          <Route  path='/homepage-client/:id' element = { <HomePageCustomer tabletDisplay={tabletDisplay} />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

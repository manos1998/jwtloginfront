import { ColorModeContext, useMode } from './scenes/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import TopNavBar from './scenes/global/TopNavBar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './scenes/dashboard';
// import Pie from './scenes/pie';

function App() {
  const [theme,colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <SideNavbar />
          <main className="content">
            <TopNavBar />
            <Routes>
              <Route path='/' element={<Dashboard />} />  
              {/* <Route path="/pie" element={<Pie />} /> */}
              {/* <Route path="/pie" element={<Pie />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/bar" element={<Bar />} /> */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

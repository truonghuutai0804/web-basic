import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LayoutMain from './components/Layouts/Layout';
import QuanLy from './components/Pages/QuanLy';
import Tao from './components/Pages/Tao';

function App() {
  const publicRoutes = [
    { path: '/', component: QuanLy},
    { path: '/create/', component: Tao},
    
  ]

  return (
    <Router>
      <Routes>
      {publicRoutes.map((route, idx)=>{
            const Layout = route.layout || LayoutMain
            const Page = route.component
            return (
              <Route
                key={idx}               
                path={route.path}
                element={
                  <Layout>
                      <Page />
                  </Layout>
                }
              />
            )
          })}
      </Routes>
    </Router>
  );
}

export default App;

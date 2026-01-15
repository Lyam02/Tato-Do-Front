import './App.css'
import {Routes, Route} from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Connexion from './pages/Connexion.jsx'
import Lists from './components/lists/Lists';




function App() {

  return (
    <Routes>

            <Route path='/' element={
                <Connexion/>
            }/>
            <Route path='/home' element={
                <Layout>
                    <Home/>
                </Layout>
            }/>

            <Route path='/lists/:id' element={
              <Layout>
                <Lists/>
              </Layout>
            
            }/>

        </Routes>
  );
}

export default App
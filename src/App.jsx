import './App.css'
import {Routes, Route} from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Connexion from './pages/Connexion.jsx'

function App() {

    return (
        <Routes>

            {/* Page de CONNEXION  */}
            <Route path='/' element={
                <Connexion/>
            }/>

            {/* Page HOME */}
            <Route path='/home' element={
                <Layout>
                    <Home/>
                </Layout>
            }/>

        </Routes>
    );
}

export default App
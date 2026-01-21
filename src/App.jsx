import './App.css'
import {Routes, Route} from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Today from './pages/Today.jsx'
import Calendrier from "./pages/Calendrier.jsx";
import Connexion from './pages/Connexion.jsx'
import Lists from './components/lists/Lists';
import CreateLists from './components/lists/CreateLists.jsx';
import SecureRoute from './components/SecureRoute';
import ParentList from './components/lists/ParentList.jsx';


function App() {

  return (
    <Routes>

            <Route path='/' element={
                <SecureRoute type={"public"}>
                    <Connexion/>
                </SecureRoute>
            }/>
            <Route path='/home' element={
                <SecureRoute>
                    <Layout>
                        <Home/>
                    </Layout>
                </SecureRoute>
            }/>

            <Route path='/lists/:id' element={
                <SecureRoute>
                  <Layout>
                    <Lists/>
                  </Layout>
                </SecureRoute>
            }/>

            <Route path='/ParentList/:id' element={
                <SecureRoute>
                  <Layout>
                    <ParentList/>
                  </Layout>
                </SecureRoute>
            }/>

            <Route path='/newlist' element={
              <SecureRoute>
                    <Layout>
                    <CreateLists/>
                  </Layout>
              </SecureRoute>
            }/>

        <Route path='/today' element={
            <SecureRoute>
                <Layout>
                    <Today/>
                </Layout>
            </SecureRoute>
        }/>
        <Route path='/calendrier' element={
            <SecureRoute>
                <Layout>
                    <Calendrier/>
                </Layout>
            </SecureRoute>
        }/>

        </Routes>
  );
}

export default App
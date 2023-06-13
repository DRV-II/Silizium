import React from 'react';
import {BrowserRouter,Route, Routes} from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import Inicio from './pages/Inicio';
import Certificados from './pages/Certificados';
import EmpleadoPage from './pages/EmpleadoPage';
import QR from './pages/QR';
import TokenPage from './pages/TokenPage';
import TokenPage2 from './pages/TokenPage2';
import RegistrarUsuario from './pages/RegistrarUsuario';
import DesactivarUsuario from './pages/DesactivarUsuario';
import BookmarkPage from './pages/Bookmark';
import Perfil from './pages/Perfil';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage/>} />
          <Route path='/Home' element={<Inicio/>} />
          <Route path="/Certifications" element={<Certificados/>} />
          <Route path="/Bookmark" element={<BookmarkPage/>} />
          <Route path="/Employee/:id" element={<EmpleadoPage/>} />
          <Route path="/QR" element={<QR/>} />
          <Route path="/TokenPage" element={<TokenPage/>} />
          <Route path="/TokenPage2" element={<TokenPage2/>} />
          <Route path="/UserRegistration" element={<RegistrarUsuario/>} />
          <Route path="/DeactivateUser" element={<DesactivarUsuario/>} />
          <Route path="/Profile" element={<Perfil/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

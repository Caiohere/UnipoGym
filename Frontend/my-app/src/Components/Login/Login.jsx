import { FaUser, FaLock } from 'react-icons/fa';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "../../firebase";

import "./Login.css";

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");  
  const [password, setPassword] = useState("");  
  const [isRegistering, setIsRegistering] = useState(false); // Para controlar se é login ou registro
  const navigate = useNavigate();

  
  // Função para lidar com login ou registro
  async function handleAuth(event) {
    event.preventDefault(); // Impede o comportamento padrão de recarregar a página

    if (isRegistering) {
      // Registro de novo usuário
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, username, password);
        console.log("Usuário registrado:", userCredential.user);
        alert("Registro efetuado com sucesso!")
      } catch (error) {
        console.error("Erro ao registrar:", error.message);
        alert(error.message);
      }
    } else {
      // Login de usuário existente
      try {
        const userCredential = await signInWithEmailAndPassword(auth, username, password);
        console.log("Usuário logado:", userCredential.user);
        alert("Login efetuado com sucesso!")
        setIsAuthenticated(true);
        navigate('/gerador');
      } catch (error) {
        // console.error("Erro ao fazer login:", error.message);
        alert("Erro ao fazer login \nTente novamente ou registre-se");
      }
    }
  }

  return (
    <div className="login">
      <div className="container">
        <form onSubmit={handleAuth}>
          <h1>UNIPO GYM</h1>

          <div className="input-field">
            <input 
              type="email" 
              placeholder="E-mail" 
              onChange={(e) => setUsername(e.target.value)} 
              value={username} // Controle de estado
              required 
            />
            <FaUser className="icon" />
          </div>

          <div className="input-field">
            <input 
              type="password"
              placeholder="Senha"
              onChange={(e) => setPassword(e.target.value)}  
              value={password} // Controle de estado
              required
            />
            <FaLock className="icon" />
          </div>

          <button type="submit">{isRegistering ? "Registrar" : "Entrar"}</button>

          <div className="signup-link">
            <p>
              {isRegistering ? "Já tem uma conta? " : "Criar conta? "}
              <a href="#" onClick={() => setIsRegistering(!isRegistering)}>
                {isRegistering ? "Fazer login" : "Registrar"}
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

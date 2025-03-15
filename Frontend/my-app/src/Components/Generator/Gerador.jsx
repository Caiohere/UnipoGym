import React from "react";
//import { useState } from "react";
import "./Gerador.css"

const Gerador = () => {
    return(
        <div className="gerador">
            <div className="container">
                <form>
                    <h1>Exercicios</h1>
                    <div className="menu">
                            <button className="menu">Novo</button>
                        </div>
                    <div className="container2">
                        <h2>Exercício</h2>
                        <input type="number" placeholder="Séries" className="input-field"/>
                        <input type="number" placeholder="Repetições" className="input-field"/>
                        <div className="int">
                        <label className="l1">Descanso</label>
                        <select name="Intervalo" className="Intervalo">                        
                            <option value="00:30">0:30s</option>
                            <option value="00:45">0:45s</option>
                            <option value="01:00">01:00s</option>
                            <option value="01:30">01:30s</option>
                            
                        </select>
                        </div>
                        
                    </div>
                    <button className="salvar">Salvar</button>
                </form>
            </div>
        </div>
    )
}

export default Gerador
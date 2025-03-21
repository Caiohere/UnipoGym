//import React from "react";
import { useState } from "react";
import "./Gerador.css"


const Gerador = () => {

    const [exercicios, setExercicios] = useState([]);

    
    const adicionarExercicio = () => {
        setExercicios([...exercicios,{id: exercicios.length,},]);
    };

    const removerExercicio = (id) => {
        setExercicios(exercicios.filter((exercicio) => exercicio.id !== id));
      };


    return (
        <div className="gerador">
          <div className="container">
            <form>
              <h1>Gerador de Treino</h1>
              <button type="button" className="novo" onClick={adicionarExercicio}>
                +
              </button>
    
              {exercicios.length > 0 && (
                <div className="lista-exercicios">
                  {exercicios.map((exercicio) => (
                    <div key={exercicio.id} className="container2">
                      <input type="string" placeholder="Exercício" className="input-field-3" />
                      <button className="excluir" type="button" onClick={() => removerExercicio(exercicio.id)}>-</button>
                      <input type="number" placeholder="Séries" className="input-field" />
                      <input type="number" placeholder="Repetições" className="input-field-2" />
                      <div className="int">
                        <label className="l1">Descanso</label>
                        <select name="Intervalo" className="Intervalo">
                          <option value="" disabled selected></option> 
                          <option value="00:30">0:30s</option>
                          <option value="00:45">0:45s</option>
                          <option value="01:00">01:00s</option>
                          <option value="01:30">01:30s</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </form>
            <button className="salvar">Salvar</button>
          </div>
        </div>
      );
}

export default Gerador
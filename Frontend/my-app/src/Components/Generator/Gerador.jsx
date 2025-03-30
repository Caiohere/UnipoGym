import React, { useState } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import "./Gerador.css";

const Gerador = () => {
  const [exercicios, setExercicios] = useState([]);
  const [showInputs, setShowInputs] = useState(false);
  const [aluno, setAluno] = useState("");
  const [idade, setIdade] = useState("");
  const [peso, setPeso] = useState("");

  const adicionarExercicio = () => {
    setExercicios([
      ...exercicios,
      { id: Date.now(), nome: "", series: "", repeticoes: "", intervalo: "" },
    ]);
  };

  const removerExercicio = (id) => {
    setExercicios(exercicios.filter((exercicio) => exercicio.id !== id));
  };

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    setExercicios((prevExercicios) =>
      prevExercicios.map((exercicio) =>
        exercicio.id === id ? { ...exercicio, [name]: value } : exercicio
      )
    );
  };

  const gerarPDF = () => {
    if (exercicios.length === 0) {
      alert("Não há dados para gerar o PDF.");
      return;
    }

    const tabelaBody = exercicios.map((exercicio) => [
      exercicio.nome || "Não informado",
      exercicio.series || "Não informado",
      exercicio.repeticoes || "Não informado",
      exercicio.intervalo || "Não informado",
    ]);

    const formatarData = (data) => {
      const dia = String(data.getDate()).padStart(2, "0");
      const mes = String(data.getMonth() + 1).padStart(2, "0");
      const ano = data.getFullYear();
      return `${dia}-${mes}-${ano}`;
    };

    const dataAtual = new Date();
    const dataFormatada = formatarData(dataAtual);
    const nomeArquivo = `treino_${dataFormatada}.pdf`;

    const tituloPDF = showInputs && aluno ? aluno : "Seu Treino";
    const subtituloPDF = showInputs && (idade || peso) ? `${idade ? idade + " anos" : ""} ${peso ? "• " + peso + " kg" : ""}` : null;

    const docDefinition = {
      content: [
        { text: tituloPDF, style: "header", fontSize: 22, bold: true, margin: [0, 0, 0, 10] },

        subtituloPDF && {
          text: subtituloPDF,
          style: "subheader",
          fontSize: 16,
          margin: [0, 0, 0, 20],
        },

        {
          table: {
            widths: ["*", "*", "*", "*"],
            body: [["Exercício", "Séries", "Repetições", "Intervalo"], ...tabelaBody],
          },
        },
      ],
      styles: {
        header: { alignment: "center" },
        subheader: { alignment: "center", color: "gray" },
      },
    };

    pdfMake.createPdf(docDefinition).download(nomeArquivo);

    setExercicios([]);
    setAluno("");
    setIdade("");
    setPeso("");
  };

  return (
    <div className="gerador">
      <div className="container">
        <form>
          <h1>Gerador de Treino</h1>

          {showInputs && (
            <div className="modo-professor">
              <input type="text" placeholder="Aluno" className="aluno-nome" value={aluno} onChange={(e) => setAluno(e.target.value)} />
              <input type="number" placeholder="Idade" className="aluno-idade" value={idade} onChange={(e) => setIdade(e.target.value)} />
              <input type="number" placeholder="Peso" className="aluno-peso" value={peso} onChange={(e) => setPeso(e.target.value)} />
            </div>
          )}

          <button type="button" className="novo" onClick={adicionarExercicio}>
            +
          </button>

          {exercicios.length > 0 && (
            <div className={`lista-exercicios ${showInputs ? "open" : ""}`}>
              {exercicios.map((exercicio) => (
                <div key={exercicio.id} className="container2">
                  <input
                    type="text"
                    name="nome"
                    placeholder="Exercício"
                    className="input-field-3"
                    value={exercicio.nome}
                    onChange={(e) => handleChange(e, exercicio.id)}
                  />
                  <button className="excluir" type="button" onClick={() => removerExercicio(exercicio.id)}>
                    -
                  </button>
                  <input
                    name="series"
                    type="number"
                    placeholder="Séries"
                    className="input-field"
                    value={exercicio.series}
                    onChange={(e) => handleChange(e, exercicio.id)}
                  />
                  <input
                    name="repeticoes"
                    type="number"
                    placeholder="Repetições"
                    className="input-field-2"
                    value={exercicio.repeticoes}
                    onChange={(e) => handleChange(e, exercicio.id)}
                  />
                  <div className="int">
                    <label className="l1">Descanso</label>
                    <select name="intervalo" className="Intervalo" value={exercicio.intervalo} onChange={(e) => handleChange(e, exercicio.id)}>
                      <option value="" disabled selected></option>
                      <option value="00:30">0:30s</option>
                      <option value="00:45">0:45s</option>
                      <option value="01:00">01:00s</option>
                      <option value="01:30">01:30s</option>
                      <option value="01:45">01:45s</option>
                      <option value="02:00">02:00s</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </form>

        <button onClick={gerarPDF} className="salvar">
          Gerar PDF
        </button>

        <label className="textoSwitch">Modo professor</label>
        <label className="switch">
          <input type="checkbox" onChange={(e) => setShowInputs(e.target.checked)} />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
};

export default Gerador;

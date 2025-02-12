import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [medicamentos, setMedicamentos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [hora, setHora] = useState("");

  const agregarMedicamento = () => {
    if (!nombre || !hora) return;
    const nuevoMed = { id: uuidv4(), nombre, hora, tomado: false };
    setMedicamentos([...medicamentos, nuevoMed]);
    setNombre("");
    setHora("");
  };

  const marcarTomado = (id) => {
    setMedicamentos(
      medicamentos.map((med) =>
        med.id === id ? { ...med, tomado: !med.tomado } : med
      )
    );
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold">Recordatorio de Medicación</h1>
      <div className="my-4">
        <input
          type="text"
          placeholder="Nombre del medicamento"
          className="border p-2 w-full mb-2"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="time"
          className="border p-2 w-full mb-2"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 w-full"
          onClick={agregarMedicamento}
        >
          Agregar Medicamento
        </button>
      </div>
      <ul>
        {medicamentos.map((med) => (
          <li
            key={med.id}
            className="flex justify-between items-center border p-2 my-2"
          >
            <span>
              {med.nombre} - {med.hora}
            </span>
            <button
              className={`p-2 text-white ${
                med.tomado ? "bg-green-500" : "bg-red-500"
              }`}
              onClick={() => marcarTomado(med.id)}
            >
              {med.tomado ? "Tomado" : "Pendiente"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

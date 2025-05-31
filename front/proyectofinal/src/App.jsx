import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
   const [info, setInfo] = useState([]);
  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoP] = useState('');
  const [apellidoMaterno, setApellidoM] = useState('');
  const [edad, setEdad] = useState('');
  const [sexo, setSexo] = useState('');
  const [id, setId] = useState("");

  useEffect( () => {
        fetch ('http://localhost:3000/clientes')
        .then((res) => {
          return res.json();
        })
        . then((data) => {
          console.log('data desde API', data);
          setInfo(data)
        })
      }, [])

  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ evita recargar la página

    const userData = {
      nombre,
      apellidopaterno: apellidoPaterno,
      apellidomaterno: apellidoMaterno,
      edad: Number(edad),
      sexo
    };

    try {
      const res = await fetch('http://localhost:3000/clientes/agregar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      const data = await res.json();
      console.log('Respuesta del servidor:', data);

      // Opcional: limpiar formulario después de enviar
      setNombre('');
      setApellidoP('');
      setApellidoM('');
      setEdad('');
      setSexo('');

    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };
    
    

  return (
    <div className='container'>
      <div className='up'></div>
      <div className="form_wrapper">
        <form className="form" onSubmit={handleSubmit}>
          <input placeholder="Nombre" className="input" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          <input placeholder="Apellido Paterno" className="input" type="text" value={apellidoPaterno} onChange={(e) => setApellidoP(e.target.value)} />
          <input placeholder="Apellido Materno" className="input" type="text" value={apellidoMaterno} onChange={(e) => setApellidoM(e.target.value)} />
          <input placeholder="Edad" className="input" type="number" value={edad} onChange={(e) => setEdad(e.target.value)} />
          <input placeholder="Sexo" className="input" type="text" value={sexo} onChange={(e) => setSexo(e.target.value)} />
          <button type='submit'>Enviar</button>
          <button type='submit'>Eliminar</button>
          <button type='submit'>aactualizar</button>
          </form>
      </div>
      <div className='dow'>
        Info De Empleados
        <table border={1}>
          <thead>
            <tr>
              <td>id</td>
              <td>nombre</td>
              <td>apellido Paterno</td>
              <td>apellido Materno</td>
              <td>edad</td>
              <td>sexo</td>
            </tr>
          </thead>
          <tbody>
            {
              info.map( (item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.nombre}</td>
                    <td>{item.apellidoPaterno}</td>
                    <td>{item.apellidoMaterno}</td>
                    <td>{item.edad}</td>
                    <td>{item.sexo}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
       
    </div>
  );
}

export default App;


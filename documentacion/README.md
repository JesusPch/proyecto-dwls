# Documentacion  Backend
Para crear nuestra api crearemos iniciaremos creando un proyectoen node sobre el visual studio code atraves de la terminal instlando las dependencias nesesarias 

```terminal
npm init
npm i sequelize express slite3
```
una vez iniciado el proyecto y aber descargado las dependencias nesesarias  se nos desplegara un proyecto de express con node modules 

![imagen](/imgs/img2.png)

posteriormente nosotros le agregaremos el app.js, una caarpeta de models  por buenas practicas ya que dentro estarran nuestros modelos que se enlazaran ala base de datos el archivo de coneccion haremos las configuraciones correspondientes parraa enlasarrlo a la base de datos que usaremos, en este caso usaremos sqlite ya que solo para moptivos estudiantiles sera mas sencillo


## Creacion de la base de datos 
abriremos nuestro seqlite y crearemos una base de datos con el nombre "proyecto" o cualquier nombre que ustedes puedan identificar.

![imagen](/imgs/bd.png)

lo imporrtante sera el lugar donde ubiquen el archivo en el que guardaran
guardenlo en el archivo back donde esta nuestro proyecto parr poder acceder a el de mejor manera y asi tendremos mejores rresultados a la hora de consultar nuestra tabla

![imagen](/imgs/bdUbicacion.png)
asi deveria quedar el proyecto e la api que crearemos

![imagen](/imgs/imgindice.png)
-----
Esta es la parte de la coneccion de la base de datos sacada de la documentacion de sequelize de su pagina oficial 
[sequlize](https://sequelize.org/)

```javaScript
const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './proyecto.sqlite'
});

module.exports = sequelize;
```
----

esta seria la parte de los modelos que se crearan 
para nuestro crud y acceder ala base de daatos,en este caso solamente tenemos un archivo con una sola tabla en sqlite.
![imagen](/imgs/modelos.png)




```javascript
const { DataTypes } = require('sequelize');
const sequelize = require('../conexion');

const Clientes = sequelize.define('clientes', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // ✅ Esto es importante
  },
  nombre: { type: DataTypes.STRING },
  apellidopaterno: { type: DataTypes.STRING },
  apellidomaterno: { type: DataTypes.STRING },
  edad: { type: DataTypes.INTEGER },
  sexo: { type: DataTypes.STRING },
}, {
  timestamps: false,
});

module.exports = Clientes;
```
---
## crear el archivo app
En esta parte podremos empezar a crear el api y su modelo CRUD el cual utilizaremos los protocolos de httt y los nesesarios par apoder hacer peticiones al servidor, tales como -POST - GET - PUT - DELETE-

```JAVASCRIPT
const express = require('express')
const bodyParser = require('body-parser')
const clientes = require('./models/clientes')
const app = express()
const puerto = 3000
const cors= require('cors')
const Clientes = require('./models/clientes')

app.use(cors());
app.use(bodyParser.json())

app.listen(puerto, ()=>{
    console.log('servicio iniciado')
})

app.post('/clientes/agregar', async (req,res) => {
    const { nombre, apellidopaterno, apellidomaterno,edad,sexo} = req.body;
    const data = await Clientes.create({
         nombre, apellidopaterno, apellidomaterno,edad,sexo
    })
    if (data == 0){
      return  res.sendStatus(404).send('Error al ingresar.')
    } else {
      return  res.send('Registro ingresado con exito');
    }
})

app.get('/clientes', async (req,res) => {
    const data = await clientes.findAll();
    if (!data) {
        res.sendStatus(400).send('No se encontraron registros') 
    } else {
        res.send(data)
    }
})

app.put('/clientes/editar/:id',async (req,res) => {
    const { nombre, apellidopaterno, apellidomaterno,edad,sexo } = req.body;
    const { id } = req.params;
    const data = await clientes.update({
        nombre, apellidopaterno, apellidomaterno,edad,sexo
    }, {
        where: {
            id
        }
    })
    if (data == 0){
        res.sendStatus(404).send('Registro no existente.')
    } else {
        res.send('Registro actualizado con exito');
    }
})

app.delete('/clientes/borrar/:id' ,async (req,res) => {
    const { id } = req.params;
    const data = await clientes.destroy({
        where: {
            id
        }
    })
    if (data == 0){
        res.sendStatus(404).send('Registro no existente.')
    } else {
        res.send('Registro eliminado con exito');
    }
})
```
---
##       ---POST---
En esta parte se hace el registro de las personas manda la informacion ala base de datos

```javascript
app.post('/clientes/agregar', async (req,res) => {
    const { nombre, apellidopaterno, apellidomaterno,edad,sexo} = req.body;
    const data = await Clientes.create({
         nombre, apellidopaterno, apellidomaterno,edad,sexo
    })
    if (data == 0){
      return  res.sendStatus(404).send('Error al ingresar.')
    } else {
      return  res.send('Registro ingresado con exito');
    }
})
```
## ---GET---
Esta seria la parte la cual solo solicita peticiones en la base de datos.

```javascript
app.get('/clientes', async (req,res) => {
    const data = await clientes.findAll();
    if (!data) {
        res.sendStatus(400).send('No se encontraron registros') 
    } else {
        res.send(data)
    }
})
```
---
## ---PUT--(actualizar)
En este metodo podemos hacer las peticiones al servidor por medio de un id y hacer las actualizaciones correspondientes

```javascript
app.put('/clientes/editar/:id',async (req,res) => {
    const { nombre, apellidopaterno, apellidomaterno,edad,sexo } = req.body;
    const { id } = req.params;
    const data = await clientes.update({
        nombre, apellidopaterno, apellidomaterno,edad,sexo
    }, {
        where: {
            id
        }
    })
    if (data == 0){
        res.sendStatus(404).send('Registro no existente.')
    } else {
        res.send('Registro actualizado con exito');
    }
})
```
---
## ---DELETE---(BORRAR)
En esta peticion que se hace al servidor por medio de id podremos borrar eldato el cual esta en la base de datos.

```javascript
app.delete('/clientes/borrar/:id' ,async (req,res) => {
    const { id } = req.params;
    const data = await clientes.destroy({
        where: {
            id
        }
    })
    if (data == 0){
        res.sendStatus(404).send('Registro no existente.')
    } else {
        res.send('Registro eliminado con exito');
    }
})
```
----
# Documentacion front
Para crear nuestro proyecto en react uitilizaremos la terminal de nuestro vscode  colo caremos lo siguiente para poder crear un proyecto

```bash
npm create vite@latest
```
Despues selacionaremos react y el lenguaje que utilisaremos en nuestro caso sera javascript 

una ves hacho el proyecto instalaremos de pendencias y correremos el proyect

(**"nota : error recurrente es cuando no se posiciona en la carpeta de el proyecto(error capa 8)"**)

INSTALACION DE DEPENDENCIAS
```bash
npm install
npm run dev
```
---
ya creado el proyecto se deve de verr de esta forma

![img](/imgs/front.png)

Abrimos la carpeta src la cual trabajaremos sobre ella, solo borraremos lo nesesario y agragaremos los modulos y los componentes nesesarios.

![img](/imgs/src.png)

```javascript
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
```
---
## ---pagina web frontend---
esta serria la vista de nuestro crud 
el cual se comunicaa con nuestra base de datos

![img](/imgs/frame.png)

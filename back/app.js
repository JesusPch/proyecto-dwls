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
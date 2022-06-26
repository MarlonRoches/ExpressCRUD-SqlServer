const express = require("express")
const app = express()
const port =3000
const DBContext =  require("./DB/DBClient")
var bodyParser = require('body-parser')

//iniciando la conexion a la BD
DBContext.SQL_Connect()

app.use(bodyParser.json())

app.get("/" , (req,res) => {
    res.send("Hola Mundo")
})


app.get("/usp_obtener/:id" ,async (req,res) => {
    var usuario = await DBContext.usp_obtener(req.params.id);
    res.send(usuario)
})


app.get("/usp_listar" ,async (req,res) => {
    var usuario = await DBContext.usp_listar();
    res.send(usuario)
})

app.get("/usp_eliminar/:id" ,async (req,res) => {
    var usuario = await DBContext.usp_eliminar(req.params.id);
    res.send(usuario)
})

app.post("/usp_registrar" ,async (req,res) => {
    var usuario = await DBContext.usp_registrar(req.body);
    res.send(usuario)
})

app.post("/usp_modificar" ,async (req,res) => {
    var usuario = await DBContext.usp_modificar(req.body);
    res.send(usuario)
})


app.post("/usp_IngresarProducto" ,async (req,res) => {
    var usuario = await DBContext.usp_IngresarProducto(req.body);
    res.send(usuario)
})


app.listen( port, () => { console.log( `Escuchando en el puerto ${port}`)})

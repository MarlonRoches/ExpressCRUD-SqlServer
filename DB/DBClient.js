const config  = require("./dbconfig.json")
const mssql = require("mssql")

let pool = mssql.ConnectionPool;

async function SQL_Connect() {
    
    try {
        //create el pool
        pool = await mssql.connect(config)
        console.log(`DB: ${config.server} Connected DONE `)
        // console.log(JSON.stringify(pool))
    } catch (error) {        
        console.log(`DB: ${error} Connected FAILED `)
    }

}

async function usp_registrar(body) {
    
    var result = await queryNoRows(`exec dbo.[usp_registrar] 
    '${body.documentoidentidad}','${body.nombres}',
    '${body.telefono}','${body.correo}','${body.ciudad}'`)

    if(result === false)
    {
        return Respuesta("Error en la consulta", null)
    }else
    return Respuesta("Usuario Agregado exitosamente", result) ;


}
async function usp_modificar(body) {
    
    var result = await queryNoRows(`exec dbo.[usp_modificar] 
    '${body.idusuario}',
    '${body.documentoidentidad}',
    '${body.nombres}',
    '${body.telefono}','${body.correo}','${body.ciudad}'`)

    if(result === false)
    {
        return Respuesta("Error en la consulta", null)
    }else
    return Respuesta("Usuario Agregado exitosamente", result) ;


}

async function usp_obtener(id) {
    var result = await query(`exec dbo.usp_obtener ${id}`)

    if(result === false)
    {
        return Respuesta("Error en la consulta", null)
    }else
    return Respuesta("Usuario Encontrado", result) ;

}

async function usp_listar() {
    var result = await query(`exec dbo.usp_listar`)

    if(result === false)
    {
        return Respuesta("Error en la consulta", null)
    }else
    return Respuesta("Lista obtenida", result) ;


}

async function usp_eliminar(id) {
    
    var result = await queryNoRows(`exec dbo.usp_eliminar ${id}`)

    if(result === false)
    {
        return Respuesta("Error en la consulta", null)
    }else
    return Respuesta("Usuario Eliminado", result) ;


}


async function queryNoRows(query) {
    // Ejecuta la consulta y devuelve true or false
    var request  = new mssql.Request();
    try {
        var result = await request.query(query)
        if (result.rowsAffected[0]>0) {
            //devuelve la lista de resultados
            return true;
        } else {
            return false;
            
        } 
    } catch (error) {
        console.error(`Error en la DB: ${error}`)
        return false;
    }
}

async function query(query) {
    // Ejecuta la consulta y devuelve el resultado
    var request  = new mssql.Request();
    try {
        var result = await request.query(query)
        if (result.rowsAffected[0]>0) {
            //devuelve la lista de resultados
            return result.recordset;
        } else {
            return false;
            
        } 
    } catch (error) {
        console.error(`Error en la DB: ${error}`)
        return false;
    }
}


function Respuesta(message, data) {
    return {
        Mensaje: message,
        Data:data
    }
}


async function usp_IngresarProducto(body) {
    
    var result = await queryNoRows(`exec dbo.[usp_IngresarProducto] 
    '${body.Nombre}',${body.Precio},
    ${body.Agotado}`)

    if(result === false)
    {
        return Respuesta("Error en la consulta", null)
    }else
    return Respuesta("Usuario Agregado exitosamente", result) ;


}
module.exports = {
    SQL_Connect:SQL_Connect,
    usp_registrar:usp_registrar,
    usp_modificar:usp_modificar,
    usp_obtener:usp_obtener,
    usp_listar:usp_listar,
    usp_eliminar:usp_eliminar,
    usp_IngresarProducto:usp_IngresarProducto
}
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

async function usp_registrar() {
    


}
async function usp_modificar() {
    


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
    


}

async function usp_eliminar() {
    


}


async function queryNoRows(query) {
    // Ejecuta la consulta y devuelve true or false
    var request  =- new mssql.Request();
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

module.exports = {
    SQL_Connect:SQL_Connect,
    usp_registrar:usp_registrar,
    usp_modificar:usp_modificar,
    usp_obtener:usp_obtener,
    usp_listar:usp_listar,
    usp_eliminar:usp_eliminar
}
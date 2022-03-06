const cors = require("cors");
const app = require("./app");
const express = require("express");
mysql = require ("mysql2");

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Conexión a la bbdd

let connection = mysql.createConnection({
    host    :"localhost",
    user    :"root",
    password:"J1j2j3j4j5?",
    database:"appbooks"
});

connection.connect(function(error){
    if(error){
        console.log(error);
    }else{
        console.log("Conexión correcta");
    }
});

//POST “/registro”. Añade un nuevo usuario a la BBDD.

app.post("/registro",
    function(request,response){
        let sql;
        let params=[];
        let respuesta;

        console.log("Nos llega esto: ");
        console.log(request.body);
        params = [request.body.nombre,
                request.body.apellidos,
                request.body.correo,
                request.body.foto,
                request.body.password];

        sql = "INSERT INTO usuario( nombre,apellidos,correo,foto,password) VALUES (?,?,?,?,?)";

        connection.query(sql,params,function(err,result){
            if(err){
                console.log(err);
            }else{
                if(result.insertId){
                    //Si todo va correctamente.
                    respuesta = {error: false, codigo:200, mensaje: "Usuario insertado correctamente", resultado: result.insertId};
                }else{
                    //Si la bbdd da un error al insertar.
                    respuesta = {error: true, codigo:200, mensaje: "Error al insertar el usuario", resultado: -1};
                }
                response.send(respuesta);
            }
        })
    })


    app.post("/login",
    function(request,response){
        let sql;
        let params=[];
        let respuesta;

        console.log("Nos llega esto: ");
        console.log(request.body);
        params = [request.body.correo,
                request.body.password];

        sql = "SELECT id_usuario,nombre,apellidos,correo,foto FROM appbooks.usuario WHERE correo = ? AND password = ?";

        connection.query(sql,params,function(err,result){
            console.log(result);
            if(err){
                console.log(err);
            }else{
                if(result.length != 0){
                    //Si todo va correctamente.
                    respuesta = {error: false, codigo:200, mensaje: "Usuario logeado corretamente", resultado: result[0]};
                }else{
                    //Si la bbdd da un error al insertar.
                    respuesta = {error: true, codigo:200, mensaje: "Error al logear el usuario", resultado: -1};
                }
                response.send(respuesta);
            }
        })
    })


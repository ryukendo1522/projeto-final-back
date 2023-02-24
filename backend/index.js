import express from "express";
import mysql from "mysql";
import cors from 'cors';

const app = express()



const db = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"",
    database:"gastos" //nome do banco de dados
});

//código que faz a conexão com o banco de dados

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.get("/", (req, res) =>{
    res.json("Sou o Backend em funcionamento")
});
app.get("/retiradas", (req, res)=>{
    const q = "SELECT * FROM retiradas"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
app.get("/entradas", (req, res)=>{
    const q = "SELECT * FROM entradas"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
    
})

app.get("/Total", (req, res)=>{
    const q = "select (SELECT SUM(entrada) FROM entradas) - (select SUM(saida) FROM retiradas)AS Total"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
    
})

app.listen(8800, () => {
    console.log("servidor rodando em: http://localhost:8800")
});
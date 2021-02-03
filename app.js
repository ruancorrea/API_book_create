const express = require('express');
const app = express();

const mongoose = require('mongoose');

require('./models/book');
const Book = mongoose.model('books');

const cors = require('cors');

app.use(express.json());

app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,POST,PUT,DELETE');
    app.use(cors);
    next();
})

mongoose.connect("mongodb://localhost/book_api",  {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB conectado!");
}).catch((err) => {
    console.log("Houve um erro ao se conectar ao mongoDB: " + err)
});

// abrindo dados
app.get("/book", (req, res) =>{
    Book.find({}).then(book =>{
        return res.json(book);
    }).catch(err =>{
        return res.status(400).json({
            error: true,
            message: "Error: Nenhum book encontrado."
        })
    })
})

// salvando dados
app.post("/book", (req, res) => {
    const book = Book.create(req.body, (err) =>{
        if(err) return res.status(400).json({
            error: true,
            message: "Error: Book não foi adicionado com sucesso."
        })

        return res.json({
            error: false,
            message: "Book adicionado com sucesso."
        })
    })
})

// editando dados
app.put("/book/:id", (req, res) =>{
    const book = Book.updateOne({_id: req.params.id}, req.body, (err) =>{
        if(err) return res.status(400).json({
            error: true,
            message: "Error: Book não foi editado com sucesso."
        })

        return res.json({
            error: false,
            message: "Book editado com sucesso."
        });
    });
});

// apagando dados
app.delete("/book/:id", (req, res) =>{
    const book = Book.deleteOne({_id: req.params.id}, (err) =>{
        if(err) return res.status(400).json({
            error: true,
            message: "Error: Book não foi deletado com sucesso."
        })

        return res.json({
            error: false,
            message: "Book deletado com sucesso."
        })
    })
})

const PORTA = process.env.PORT || 2407

app.listen(PORTA, function(){
    console.log("O servidor está rolando na url http://localhost:2407!")
});
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const app = express();
//                mongodb+srv://augusto:<password>@cluster0-nh3jx.mongodb.net/test?retryWrites=true&w=majority
mongoose.connect('mongodb+srv://augusto:pistolitoBASE1256@cluster0-nh3jx.mongodb.net/week10?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(routes);
// Metodos HTTP: get, post, put, delete
// get == buscar alguma informação
// post == criar
// put == editar
// delete == apagar

// Tipos de paramentros
// Query Params: request.query (Filtros, Ordenação, Paginação, ...)
// Route Params: request.params (identificar um recurso na alteração ou remoção)
// Body: request.body (Dados para a criação ou alteração de um registro)

// MongoDB (não-relacional)


app.listen(3333);

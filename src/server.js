const express = require("express");
const mongoose = require("mongoose");

// Importando rotas
const routes = require("./routes");

// instaciando o express
const app = express();

// Conectando ao banco de dados
mongoose.connect(
  "mongodb+srv://omnistack:omnistack@omnistack9-ki5zr.mongodb.net/semana09?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

// Informando que os retornos serao em formato json
app.use(express.json());

// rotas de acesso
app.use(routes);

// liberando porta de acesso
app.listen(3333);

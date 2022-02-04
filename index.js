const express = require('express');
const user = require('./routers/users.route');
const errorMiddleware = require('./middlewares/errorMiddleware'); 

const app = express();
app.use(express.json());
const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', user);
app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}!`));

module.exports = app;
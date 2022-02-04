const express = require('express');
const user = require('./routers/users.route');
const errorMiddleware = require('./middlewares/errorMiddleware'); 
const login = require('./routers/login.router');
const category = require('./routers/category.router');

const app = express();
app.use(express.json());
const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', user);
app.use('/login', login);
app.use('/categories', category);
app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}!`));

module.exports = app;
import express from 'express';
import './database/connection'
import routes from './routes'

const app = express();
app.use(express.json());
app.use(routes);

app.listen(3333);

/*
Params:

Query: localhost:3333/user?search=pedro => request.query
Route: localhost:3333/user/1 => app.post("/user/:id") => request.params
Body: Informações complexas => request.body

*/

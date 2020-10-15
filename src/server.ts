import express from 'express'
import 'express-async-errors'
import './database/connection'
import routes from './routes'
import path from 'path'
import cors from 'cors'

import errorHandler from './errors/handler'


const app = express();
app.use(cors()) // {origin: "https:://....."}

app.use(express.json());
app.use(routes);
app.use("/uploads", express.static(path.join(__dirname, '..', 'uploads')));
app.use(errorHandler);
app.listen(3333);

/*
Params:

Query: localhost:3333/user?search=pedro => request.query
Route: localhost:3333/user/1 => app.post("/user/:id") => request.params
Body: Informações complexas => request.body

*/

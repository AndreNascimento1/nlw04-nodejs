import 'reflect-metadata';
import express from 'express';
import createConnection from "./database";
import { router } from './routes';

createConnection();

const app = express();
app.use(express.json()); //habilitar que seja utilizado o formato JSON

app.use(router);

export { app };

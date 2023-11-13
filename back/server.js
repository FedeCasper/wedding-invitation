import express from 'express';
import 'dotenv/config.js';
import './config/database.js';
import indexRouter from './routes/index.js';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

app.use(express.json());
app.use(cors()); // Configurar CORS
app.use(bodyParser.json());

app.use("/api", indexRouter)


app.listen(5000, () => {
   console.log(' --> Server is listening on port 5000 <-- ');
})
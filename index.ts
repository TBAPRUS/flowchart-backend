import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import router from './routes';
import errorHandler from './middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
app.use(errorHandler);

const PORT: number = parseInt(process.env.PORT as string) || 8080;

app.listen(PORT, () => {
  console.log(`Server start on ${PORT}`);
});
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
const app: Application = express();

// Parser or Middlewares
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Axiler E-Commerce Store 😊');
});

export default app;

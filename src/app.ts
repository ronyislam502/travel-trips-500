import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['*'],
    credentials: true,
  }),
);

app.use('/api', router);

const getController = (req: Request, res: Response) => {
  res.send('Social Travel-Tips');
};

app.get('/', getController);
app.use(globalErrorHandler);
app.use(notFound);

export default app;

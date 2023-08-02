import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import http from 'http-status-codes';
import routes from './app/routes/routes';

const app: Application = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/uploads', express.static('upload'));

app.use('/api/v1', routes);

app.use(globalErrorHandler);

// Wrong API error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req)
  res.status(http.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

app.get('/', (req: Request, res: Response) => {
  res.send('SERVER RUNNING');
});

export default app;

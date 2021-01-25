import path from 'path';
import express, { Application } from 'express';
import compression from 'compression'; // compresses requests
import cookieParser from 'cookie-parser';
import { initRoutes } from './routes';

interface SlsApplication extends Application {
  binaryTypes?: string[] | null;
  slsInitialize?: () => Promise<void>;
}

// Create Express server
const app = express() as SlsApplication;

// Express configuration
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

// Define Routes
initRoutes(app);

export { app };

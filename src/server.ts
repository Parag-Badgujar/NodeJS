import express, { Express } from 'express';
import { serverConfig } from './configs/app.config';
import Server from './app';
const app: Express = express();
const { port: PORT } = serverConfig();
const server = new Server(app);

app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
}).on('error', (error: any) => {
    console.error('Error starting server:', error);
});

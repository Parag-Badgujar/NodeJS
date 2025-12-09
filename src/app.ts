import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
import helmet from "helmet";
import bodyparser from "body-parser";
import morgan from "morgan";
import database from "./configs/postgresqldb.config";
import Routes from "./routes";
export default class Server {
    constructor(app: Application) {
        this.initializeDatabase();
        this.config(app);
    }

    private async initializeDatabase(): Promise<void> {
        database.sequelize?.sync();
    }
    
    private config(app: Application): void {
        const corsOptions: CorsOptions = {
            origin: '*',
            methods: 'GET,PUT,PATCH,POST,DELETE',
            // preflightContinue: false,
            // optionsSuccessStatus: 204,
        };
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(cors(corsOptions));
        app.use(helmet());
        app.use(bodyparser.json({ limit: '15mb' }));
        app.use(bodyparser.urlencoded({ extended: true }));
        app.use(morgan('dev'));
        new Routes(app);
    }
}
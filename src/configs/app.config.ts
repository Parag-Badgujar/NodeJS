import dotenv from 'dotenv';
dotenv.config();
import { ServerConfig } from '@interfaces/server.interface';
import { PostgresqlConfig } from "@interfaces/postgresql.interface";

export function serverConfig(): ServerConfig {
    return {
        port : process.env.PORT || '3000',
        host : process.env.HOST || 'localhost',
    }
}

export const postgresqlDBConfig: PostgresqlConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_DATABASE || 'mobilestore',
}

export const CRYPTO_CONFIG = {
    algorithm: process.env.CRYPTO_ALGO || 'aes-256-gcm',
    // key:  process.env.CRYPTO_KEY_LENGTH || '',
    // iv: Number(process.env.CRYPTO_IV_LENGTH) || '',
}
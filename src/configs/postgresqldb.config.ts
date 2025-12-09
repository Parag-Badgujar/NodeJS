import { Sequelize } from 'sequelize-typescript';
import { postgresqlDBConfig } from './app.config';
const { host, port, user, password, database } = postgresqlDBConfig;
class Database {
  public sequelize: Sequelize | undefined;

  constructor() {
    this.connectToDatabase();
  }

  private async connectToDatabase(): Promise<void> {
    if (!this.sequelize) {
      this.sequelize = new Sequelize(database, user, password, {
        host: host,
        logging: false,
        dialect: 'postgres',
        pool: {
          max: 40,
          min: 0,
          acquire: 60000,
          idle: 10000
        },
        dialectOptions: {
          // ssl: {
          //   require: true, // This will help you. But you will see nwe error
          //   rejectUnauthorized: false // This line will fix new error
          // }
        },
        retry: {
          max: 10,
          match: ['timeout', 'Operation timeout'],
          timeout: 60000
        },
        models: [__dirname + '../../models']
      });
    }

    // for local use uncomment below if condition and comment above
    // if (!this.sequelize) {
    //   this.sequelize = new Sequelize(dbName, userName, password, {
    //     host: dbHost,
    //     dialect,
    //     pool: {
    //       max: 40,
    //       min: 0,
    //       acquire: 60000,
    //       idle: 10000
    //     },
    //     logging: false,
    //     models: [__dirname + '../../models']
    //   });
    // }
    try {
      await this.sequelize.authenticate();
      await this.sequelize.sync({alter: true});
      console.log("connected to the DataBase successfully")
    } catch (err) {
      console.error('Unable to connect to the Database:', err);
    }
  }
}
export default new Database();

import { Application } from 'express';
import UserRoute from './user.route';
import BrandRoute from './brand.route';
export default class Routes {
    constructor(app : Application) {
        app.use('/users', UserRoute);
        app.use('/brands', BrandRoute);
    }
}

import BrandController from '../controllers/brand.controller';
import { Router } from 'express';
export class BrandRoute {
    public router: Router = Router();
    private brandController = new BrandController();

    constructor() {
        this.initializeRoutes();
    }
    initializeRoutes(){
        this.router.get('/brand', (req, res) => {
            this.brandController.getAllBrands(req, res);
        });
    }
}
export default new BrandRoute().router;
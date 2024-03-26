import { Router } from 'express';
import ViewController from '../controllers/view.controller.js';

const router = Router();

const viewController = new ViewController();

router.get('/', viewController.viewIndex);

router.get('/addproducts', viewController.viewAddProduct);

export default router;

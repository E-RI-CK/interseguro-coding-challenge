import { Router } from 'express';
import { StatisticsRoutes } from './statistics/route';


export class AppRoutes {


  static get routes(): Router {

    const router = Router();

    // Definir las rutas
    router.use('/api/statistics', StatisticsRoutes.routes);
    return router;
  }


}


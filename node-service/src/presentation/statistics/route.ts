import { Router } from "express";
import { StatisticsService } from "../../services/statistics.service";
import { StatisticsController } from "./controller";


export class StatisticsRoutes {
    static get routes(): Router {

        const router = Router();
        const statisticService = new StatisticsService;
        const controller = new StatisticsController(statisticService);

        router.post('/', controller.getStatistics);
        // router.post('/', [AuthMiddleware.validateJWT], controller.createProduct);


        return router;
    }
}
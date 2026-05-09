import { Request, Response } from "express";
import { StatisticsService } from "../../services/statistics.service";
import { QRDto } from "../../domain/dtos/statistics/qr.dto";
import { CustomError } from "../../domain/errors/custom.error";



export class StatisticsController {
    // DI
    constructor(
        public readonly statisticsService: StatisticsService,
    ) { }



    getStatistics = async (req: Request, res: Response) => {

        const [error, qrDto] = QRDto.create(req.body);

        if (error) {
            const { statusCode, message } = CustomError.badRequest(error);
            return res.status(statusCode).json({ message })
        }
  
        const matrixResponse = await this.statisticsService.generateStatistics(qrDto!);

        return res.status(200).json(matrixResponse)

    };

}
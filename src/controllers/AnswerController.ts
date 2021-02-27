import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../erros/AppError";

import { SurveysUsersRepository } from "../repositores/SurveysUsersRepository";

class AnswerController {

    //http://localhost:3333/answers/1?u=528080bb-1ed3-443c-9e18-234be4e307c10
    /*
        Route Parms => parametros que vem na rota (exemplo answer, 1?u...), geralmente é routes.get("/answers/:value")
        Query Parms => parametros que são utilizados para Buscas, Paginação, e não são obrigatórios, sempre vem depois do ponto de interrogação, (chave=valor)
    */
    async execute(request: Request, response:Response){
        const { value } = request.params;
        const { u } = request.query;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u),
        });

        if(!surveyUser){
            throw new AppError("Survey User does not exists");
        }

        surveyUser.value = Number(value);

        await surveysUsersRepository.save(surveyUser);

        return response.json(surveyUser);
    }
}

export { AnswerController };

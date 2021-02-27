import { getCustomRepository, IsNull, Not } from "typeorm";
import { Request, Response } from 'express';

import { SurveysUsersRepository } from "../repositores/SurveysUsersRepository";

class NPSController {
    /*
        1 2 3 4 5 6 7 8 9 10 - notas
        Detratores => notas de 0 a 6
        Passivos => 7 a 8
        Promotores => 9 a 10

        calculo:
        ( número de promotores - número de detratores ) / ( número de respondentes ) * 100
    */
    async execute(request: Request, response: Response){
        const { survey_id } = request.params;

        const surveysUserReopsitory = getCustomRepository(SurveysUsersRepository);

        const surveyUsers = await surveysUserReopsitory.find({
            survey_id,
            value: Not(IsNull() )
        });

        const detractor = surveyUsers.filter(
            (survey) => survey.value >= 0 && survey.value <= 6
        ).length;

        const promoters = surveyUsers.filter( 
            (survey)=>  survey.value >= 9 && survey.value <= 10
        ).length;

        const passive = surveyUsers.filter(
            (survey)=>  survey.value >= 7 && survey.value <= 8
        ).length;

        const totalAnswers = surveyUsers.length;

        const calculate = Number((( (promoters - detractor) / totalAnswers ) * 100).toFixed(2));

        return response.json({
            detractor,
            promoters,
            passive,
            totalAnswers,
            nps: calculate
        });

    }
}

export { NPSController };
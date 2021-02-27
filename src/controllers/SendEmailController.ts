import { Request, Response } from "express";
import { resolve } from 'path';
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositores/SurveysRepository";
import { UsersRepository } from "../repositores/UsersRepository";
import { SurveysUsersRepository } from "../repositores/SurveysUsersRepository";
import SendEmailServices from "../services/SendEmailServices";
import { AppError } from "../erros/AppError";

class SendEmailController {
    async execute(request: Request, response: Response){
        const { email, survey_id } = request.body;

        const usersRepository = getCustomRepository(UsersRepository);
        const surveysRepository = getCustomRepository(SurveysRepository);
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const user = await usersRepository.findOne({email});

        if(!user){
            throw new AppError("User does not exists");
        }

        const survey = await surveysRepository.findOne({
            id: survey_id
        });

        if(!survey){
            throw new AppError("Survey does not exists!");
        }

        const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
            where: { user_id: user.id, value: null},
            relations: ["user", "survey"]
        });

        const variables = {
            name: user.name,
            title: survey.title,
            description: survey.description,
            id: "",
            link: process.env.URL_MAIL
        }

        const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");

        if(surveyUserAlreadyExists){
            variables.id = surveyUserAlreadyExists.id;
            await SendEmailServices.execute(email, survey.title, variables, npsPath);

            return response.json(surveyUserAlreadyExists);
        }

        //Salvar as informações na tabela surveyUser
        const surveyUser = surveysUsersRepository.create({
            user_id: user.id,
            survey_id
        })
        await surveysUsersRepository.save(surveyUser);
        //Enviar email para o usuário
        variables.id = surveyUser.id;

        await SendEmailServices.execute(email, survey.title, variables, npsPath);

        return response.json(surveyUser);
    }
}

export { SendEmailController }
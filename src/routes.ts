import { Router } from 'express';

import { UserController } from './controllers/UserController';
import { SurveysController } from './controllers/SurveysController';
import { SendEmailController } from './controllers/SendEmailController';
import { AnswerController } from './controllers/AnswerController';
import { NPSController } from './controllers/NPSController';

const router = Router();

const sendEmailController = new SendEmailController();
const userController = new UserController();
const surveysController = new SurveysController();
const answerController = new AnswerController();
const nPSController = new NPSController();

router.post("/users");
router.post("/users", userController.create);

router.post("/surveys", surveysController.create);
router.get("/surveys", surveysController.show);

router.post("/sendEmail", sendEmailController.execute);

router.get("/answers/:value", answerController.execute);

router.get("/nps/:survey_id", nPSController.execute);

export { router };
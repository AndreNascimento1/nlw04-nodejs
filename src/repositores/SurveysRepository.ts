import { EntityRepository, Repository } from "typeorm";
import { Survey } from "../models/Survey";

@EntityRepository(Survey)
//herança de classe extends, o extend vai permitir que o SurveysRepository possua os mesmos metodos que tem no Repository
class SurveysRepository extends Repository<Survey> {}

export { SurveysRepository };
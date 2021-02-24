import { EntityRepository, Repository } from "typeorm";
import { User } from "../models/User";

@EntityRepository(User)
//herança de classe extends, o extend vai permitir que o UsersRepository possua os mesmos metodos que tem no Repository
class UsersRepository extends Repository<User> {
    
}

export { UsersRepository };
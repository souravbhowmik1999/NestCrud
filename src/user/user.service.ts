import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}
    show(): Promise<User[]> {
        return this.userRepository.find();
    }

    create(createUserDto : CreateUserDto){
        return this.userRepository.save(createUserDto);
    }

    edit(updateUserDto: UpdateUserDto, id: number) {
        return this.userRepository.update(id, updateUserDto);
    }

    findUser(id: number){
        return this.userRepository.findOne({where:{id}})
    }

    deleteUser(id: number){
        return this.userRepository.delete(id)
    }
    findUserByEmail(email: string){
        return this.userRepository.findOne({where:{email}})
    }
}

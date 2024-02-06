import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from "../user/user.service";
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {

    //Authentication Using Passport
    constructor(private userService: UserService, private jwtService: JwtService) {}
    
    async validateUser(email: string, pass: string): Promise<any> {
        const user =  await this.userService.findUserByEmail(email);

        if(user){
            if(pass && email){
                if(user.password === pass){
                    return user;
                }else{
                    throw new BadRequestException('Wrong Password');
                }
            }else{
                throw new BadRequestException('Username and Password required');
            }

        }else{
            throw new NotFoundException('User is not registered');
        }
    }

    //Authentication Using JWT token
    async login(loginDto: LoginDto) {
        const email = loginDto.email;
        const pass = loginDto.password;
        const userData =  await this.userService.findUserByEmail(email);
        if(userData){
            if(pass && email){
                if(pass === userData.password){
                    const payload = { username: email, password: pass };
                    const token = this.jwtService.sign(payload)
                    return {
                        token : token,
                        success: 'Authentication successful',
                        statusCode: HttpStatus.OK
                    };
                }else{
                    throw new BadRequestException('Wrong Password');
                }
            }else{
                throw new BadRequestException('Username and Password required');
            }

        }else{
            throw new NotFoundException('User is not registered');
        }


        // const payload = { username: user.email, sub: user.id };
        // return {
        //   access_token: this.jwtService.sign(payload),
        // };
    }
}

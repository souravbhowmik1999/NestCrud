import { Injectable } from '@nestjs/common';
import { UserService } from "../user/user.service";
import { JwtService } from '@nestjs/jwt';

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
                    return 'Wrong Password';
                }
            }else{
                return 'Username and Password required';
            }

        }else{
            return 'User is not register';
        }
    }

    //Authentication Using JWT token
    async login(email: string, pass:string) {
        const userData =  await this.userService.findUserByEmail(email);
        if(userData){
            if(pass && email){
                if(pass === userData.password){
                    const payload = { username: email, password: pass };
                    return {access_token: this.jwtService.sign(payload)};
                }else{
                    return 'Wrong Password';
                }
            }else{
                return 'Username and Password required';
            }

        }else{
            return 'User is not register';
        }


        // const payload = { username: user.email, sub: user.id };
        // return {
        //   access_token: this.jwtService.sign(payload),
        // };
    }
}

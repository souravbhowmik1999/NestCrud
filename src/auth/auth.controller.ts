import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from "./auth.service";
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    //this line is for Passport Authentication
    // @UseGuards(AuthGuard('local'))
    @Post('/login')
    // login(@Body() loginDto: any){
    //     return this.authService.validateUser(loginDto.email, loginDto.password)
    // }
    login(@Request() req:any){
        // return req.user;
        // console.log(req.body.email);
        // return "hello world!";
        
        return this.authService.login(req.body.email, req.body.password)
    }
}

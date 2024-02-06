import { Controller, Get, Post, Body, Param, ParseIntPipe, Put, Delete, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AuthGuard } from '@nestjs/passport';
import { LoggingInterceptor } from 'src/interceptor/logging.interceptor';
import { EmailValidationPipe } from "./email-validation.pipe";


@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
    constructor(private userService: UserService) {}
    @Get()
    // @UseInterceptors(LoggingInterceptor)
    showData(){
        // console.log('In Code...');
        return this.userService.show();
    }

    @UsePipes(new EmailValidationPipe())
    @Post("/store")
    store(@Body() createUserDto : CreateUserDto){
        return this.userService.create(createUserDto);
    }

    @Put('edit/:id')
    edit(@Body() updateUserDto: UpdateUserDto, @Param('id', ParseIntPipe) id: number){
        const { token, ...dtoWithoutToken } = updateUserDto;
        return this.userService.edit(dtoWithoutToken, id);
    }

    @Get('/:id')
    findUser(@Param('id', ParseIntPipe) id: number){
        return this.userService.findUser(id)
    }

    @Delete('/:id')
    deleteUser(@Param('id',ParseIntPipe) id:number){
        return this.userService.deleteUser(id)
    }

}

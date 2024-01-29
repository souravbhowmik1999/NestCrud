import { Controller, Get, Post, Body, Param, ParseIntPipe, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";


@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}
    @Get()
    showData(){
        return this.userService.show();
    }
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

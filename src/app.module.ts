import { MiddlewareConsumer, Module, NestModule, Post } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/user.entity';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from "./middleware/auth.middleware";
import { ConfigModule } from "@nestjs/config";



@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: 3306,
      username: process.env.USER_NAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [User],
      synchronize: true,
    }),
    UserModule,
    AuthModule
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('posts')
    // throw new Error('Method not implemented.');
  }
}

// username: process.env.USERNAME,
// password: process.env.PASSWORD,
// database: process.env.DATABASE,

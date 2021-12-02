import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,

    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      // load: [
      //   process.env.NODE_ENV == 'development'
      //     ? configuration
      //     : prodConfiguration,
      // ],
    }),
    MongooseModule.forRoot(process.env.CONNECTION_STRING),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

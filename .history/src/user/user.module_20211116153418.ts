import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShopperSchema } from './models/shopper.model';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports : [
    MongooseModule.forFeature([{name : 'Shopper' , schema : ShopperSchema}])] ,
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}

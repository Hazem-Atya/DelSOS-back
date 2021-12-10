import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ShopperSchema } from './models/shopper.model';
import { StoreSchema } from './models/store.model';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Shopper', schema: ShopperSchema }]),
    MongooseModule.forFeature([{ name: 'Store', schema: StoreSchema }]),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}

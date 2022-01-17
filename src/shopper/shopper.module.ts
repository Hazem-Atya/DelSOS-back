import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { MailModule } from 'src/mail/mail.module';
import { UtilsModule } from 'src/utils/utils.module';
import { ShopperSchema } from './models/shopper.model';
import { ShopperController } from './shopper.controller';
import { ShopperService } from './shopper.service';

@Module({
  imports: [
    AuthModule,
    MailModule,
    UtilsModule,
    ConfigModule,
    MongooseModule.forFeature([{ name: 'Shopper', schema: ShopperSchema }]),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [ShopperService],
  controllers: [ShopperController],
})
export class ShopperModule {}

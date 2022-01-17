import { Module } from '@nestjs/common';
import { JwtModule, JwtSecretRequestType } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { JwtStrategy } from './auth-strategies/jwt.strategy';
import { LocalStrategy } from './auth-strategies/local.strategy';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';
import { MailModule } from 'src/mail/mail.module';
import { ShopperSchema } from 'src/shopper/models/shopper.model';

@Module({
  imports: [
    MailModule,
    MongooseModule.forFeature([{ name: 'Shopper', schema: ShopperSchema }]),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('SIGN_SECRET'),
        // secretOrKeyProvider: (requestType: JwtSecretRequestType) => {
        //   switch (requestType) {
        //     case JwtSecretRequestType.SIGN:
        //       return configService.get('SIGN_SECRET');
        //     case JwtSecretRequestType.VERIFY:
        //       return configService.get('VERIFY_SECRET');
        //   }
        // },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}

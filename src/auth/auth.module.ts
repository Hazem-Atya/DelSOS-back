import { Module } from '@nestjs/common';
import { JwtModule, JwtSecretRequestType } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { ShopperSchema } from 'src/user/models/shopper.model';
import { AuthService } from './auth.service';
import { JwtStrategy } from './auth-strategies/jwt.strategy';
import { LocalStrategy } from './auth-strategies/local.strategy';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    MailModule,
    MongooseModule.forFeature([{ name: 'Shopper', schema: ShopperSchema }]),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secretOrKeyProvider: (requestType: JwtSecretRequestType) => {
          switch (requestType) {
            case JwtSecretRequestType.SIGN:
              return configService.get('SIGN_SECRET');
            case JwtSecretRequestType.VERIFY:
              return configService.get('VERIFY_SECRET');
          }
        },
        signOptions: { expiresIn: '24h' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}

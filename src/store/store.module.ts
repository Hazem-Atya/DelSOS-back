import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { MailModule } from 'src/mail/mail.module';
import { StoreSchema } from 'src/store/models/store.model';
import { UtilsModule } from 'src/utils/utils.module';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';

@Module({
  imports: [
    AuthModule,
    MailModule,
    UtilsModule,
    ConfigModule,
    MongooseModule.forFeature([{ name: 'Store', schema: StoreSchema }]),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  exports:[StoreService],
  controllers: [StoreController],
  providers: [StoreService],
})
export class StoreModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

import { MailModule } from './mail/mail.module';
import { UtilsModule } from './utils/utils.module';
import { ShopperModule } from './shopper/shopper.module';
import { StoreModule } from './store/store.module';
import { DeliveryModule } from './delivery/delivery.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // load: [
      //   process.env.NODE_ENV == 'development'
      //     ? configuration
      //     : prodConfiguration,
      // ],
    }),
    MongooseModule.forRoot(process.env.CONNECTION_STRING),
    MailModule,
    UtilsModule,
    AuthModule,
    ShopperModule,
    StoreModule,
    DeliveryModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

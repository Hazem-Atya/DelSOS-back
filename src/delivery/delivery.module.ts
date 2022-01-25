import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShopperSchema } from 'src/shopper/models/shopper.model';
import { ShopperModule } from 'src/shopper/shopper.module';
import { StoreSchema } from 'src/store/models/store.model';
import { StoreModule } from 'src/store/store.module';
import { DeliveryController } from './delivery.controller';
import { DeliverySchema } from './model/delivery.model';
import { DeliveryService } from './service/delivery.service';

@Module({
  imports: [

    MongooseModule.forFeature([{ name: 'Delivery', schema: DeliverySchema },
    { name: 'Store', schema: StoreSchema },
    { name: 'Shopper', schema: ShopperSchema }
  ]),
    StoreModule,
    ShopperModule
  ],
  exports: [DeliveryService],
  controllers: [DeliveryController],
  providers: [DeliveryService]
})
export class DeliveryModule { }

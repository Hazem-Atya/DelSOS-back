import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StoreModule } from 'src/store/store.module';
import { DeliveryController } from './delivery.controller';
import { DeliverySchema } from './model/delivery.model';
import { DeliveryService } from './service/delivery.service';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: 'Delivery', schema: DeliverySchema }]),
    StoreModule
  ],
  exports:[DeliveryService],
  controllers: [DeliveryController],
  providers: [DeliveryService]
})
export class DeliveryModule {}

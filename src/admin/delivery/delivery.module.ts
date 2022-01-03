import { Module } from '@nestjs/common';
import { DeliveryController } from './delivery.controller';

@Module({
  controllers: [DeliveryController]
})
export class DeliveryModule {}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateDeliveryDTO } from 'src/delivery/DTO/create-delivery.dto';
import { Delivery } from 'src/delivery/model/delivery.model';

@Injectable()
export class DeliveryService {

    constructor(
        @InjectModel('Delivery')
        private readonly deliveryModel: Model<Delivery>,) {
    }

    async addDelivery(storeId: any, delivery: CreateDeliveryDTO): Promise<any> {


        return await this.deliveryModel.create(
            {
                ...delivery,
                store: storeId
            }
        );

    }
    async getDeliveriesByStoreId(storeId) {
        return await  this.deliveryModel.find({
            store: storeId
        });
    }

}

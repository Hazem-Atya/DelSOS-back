import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDeliveryDTO } from 'src/delivery/DTO/create-delivery.dto';
import { Delivery, DELIVERY_STATUS } from 'src/delivery/model/delivery.model';
import { Shopper } from 'src/shopper/models/shopper.model';
import { ShopperService } from 'src/shopper/shopper.service';
import { Store } from 'src/store/models/store.model';
import { ROLE, STATUS } from 'src/utils/enum';
import { AddTrackingDTO } from '../DTO/add-tracking.dto';

@Injectable()
export class DeliveryService {
    constructor(
        @InjectModel('Delivery')
        private readonly deliveryModel: Model<Delivery>,
        @InjectModel('Store')
        private readonly storeModel: Model<Store>,
        @InjectModel('Shopper')
        private readonly shopperModel: Model<Shopper>,
        private shopperService: ShopperService
    ) {
    }

    async getDeliveryById(id) {
        return await this.deliveryModel.findById(id);
    }
    async addDelivery(storeId: any, delivery: CreateDeliveryDTO): Promise<any> {
        const newDelivery = await this.deliveryModel.create(
            {
                ...delivery,
                store: storeId
            }
        );
        console.log(newDelivery);
        return delivery;
    }
    // this function returns deliveries that are not delivered yet
    async getDeliveriesByStoreId(storeId, documentsToSkip = 0, limitOfDocuments?: number) {
        const deliveries = this.deliveryModel.find({
            store: storeId,
            status: { $ne: DELIVERY_STATUS.DELIVERED }
        }).sort({ _id: 1 }).skip(documentsToSkip);
        if (limitOfDocuments) {
            // when limit =0 this condition will be false
            deliveries.limit(limitOfDocuments);
        }
        return deliveries;
    }

    async getArchivedDeliveriesByStoreId(storeId, documentsToSkip = 0, limitOfDocuments?: number) {
        const deliveries = this.deliveryModel.find({
            store: storeId, status: DELIVERY_STATUS.DELIVERED
        }).sort({ _id: 1 }).skip(documentsToSkip);
        if (limitOfDocuments) {
            // when limit =0 this condition will be false
            deliveries.limit(limitOfDocuments);
        }
        return deliveries;
    }



    /*    this function lets the store affects a shopper to the delivery
        The shopper should have be in the list of the shoppers who asked to get the delivery
    */
    async affectShoppertoDelivery(storeId, shopperEmail, deliveryId) {

        const delivery = await this.isUpdatableByUser(storeId, ROLE.store, deliveryId);
        const shopper = await this.shopperService.getShopperByEmail(shopperEmail);
        if (!shopper) {
            throw new NotFoundException('Shopper with email ' + shopperEmail + ' not found');
        }
        if (!delivery.applicants.find((id) => { if (id == shopper._id) return id })) {
            throw new UnauthorizedException('You only an affect the delivery to one of the applicants');
        }
        delivery.shopper = shopper._id;
        delivery.status = DELIVERY_STATUS.ON_THE_WAY;
        return await this.deliveryModel.updateOne({ _id: deliveryId }, delivery).exec();
    }

    async removeShopperFromDelivery(storeId, shopperEmail, deliveryId) {
        const delivery = await this.isUpdatableByUser(storeId, ROLE.store, deliveryId);
        const shopper = await this.shopperService.getShopperByEmail(shopperEmail);
        if (!shopper) {
            throw new NotFoundException('Shopper with email ' + shopperEmail + ' not found');
        }
        if ((delivery.shopper==null)||delivery.shopper.toString() != shopper._id.toString()) {
            throw new ConflictException(
                `Shopper with email ${shopperEmail} isn't affected to the delivery`)
        }
        delivery.shopper = null;
        delivery.status = DELIVERY_STATUS.PENDING;
        return await this.deliveryModel.updateOne({ _id: deliveryId }, delivery).exec();

    }
    async requestDelivery(deliveryId, shopperId) {
        const delivery = await this.deliveryModel.findById(deliveryId);
        console.log('The delivery:\n', delivery);
        if (!delivery) {
            throw new NotFoundException('Delivery not found');
        }
        if (delivery.status == DELIVERY_STATUS.DELIVERED ||
            delivery.status == DELIVERY_STATUS.ON_THE_WAY
        ) {
            throw new ConflictException(
                'This delivery is either delivered or has been affected to another shopper');
        }
        const shopperAlreadyApplied = delivery.applicants.find((el) => {

            if (el == shopperId)
                return el
        })
        if (shopperAlreadyApplied) {
            throw new ConflictException('Shopper already applied for this delivery');
        }
        delivery.applicants.push(shopperId);
        return await this.deliveryModel.updateOne({ _id: deliveryId }, delivery).exec();
    }


    async getDeliveriesByShopperId(shopperId, documentsToSkip = 0, limitOfDocuments?: number) {
        const deliveries = this.deliveryModel.find({ shopper: shopperId })
            .sort({ _id: 1 }).skip(documentsToSkip);
        if (limitOfDocuments) {
            // when limit =0 this condition will be false
            deliveries.limit(limitOfDocuments);
        }
        return deliveries;
    }


    async markDeliveryAsDelivered(shopperId, deliveryId) {

        const delivery = await this.isUpdatableByUser(shopperId,
            ROLE.shopper, deliveryId)
        if (delivery) {
            delivery.status = DELIVERY_STATUS.DELIVERED;
            return await this.deliveryModel.updateOne({ _id: deliveryId }, delivery).exec();
        }

    }

    // lets the shopper add stracking history to the delivery
    async addTrackingData(shopperId, addTrackingDTO: AddTrackingDTO) {
        const delivery = await this.isUpdatableByUser(shopperId,
            ROLE.shopper, addTrackingDTO.deliveryId)
        if (delivery) {
            addTrackingDTO.tracking.date = new Date();
            delivery.trackingHistory.push(addTrackingDTO.tracking)
        }
        return await this.deliveryModel.updateOne({ _id: delivery._id }, delivery).exec();

    }



    //check if the delivery is updatable by the user trying to update it
    async isUpdatableByUser(userID, userRole: ROLE, deliveryId) {
        const delivery = await this.getDeliveryById(deliveryId);
        if (!delivery) {
            throw new NotFoundException('Delivery not found');
        }
        if (delivery.status == DELIVERY_STATUS.DELIVERED) {
            throw new ConflictException('This delivery is already marked as delivered');
        }
        if (userRole == ROLE.shopper) {
            if (delivery.shopper.toString() != userID.toString()) {
                throw new UnauthorizedException("You can't change a delivery that does not belong to you");
            }
        }
        else if (userRole == ROLE.store)
            if (delivery.store.toString() != userID.toString()) {
                console.log('store Id:', userID);
                console.log('delivery Id:', delivery.store);
                console.log('hey there!!');
                throw new UnauthorizedException("You can't change a delivery that does not belong to you");
            }
        return delivery;
    }
    // returns all the deliveries that the shopper applied to but 
    //didn't get accepted byt the store
    async getRequestedDeliveries(shopperId, documentsToSkip = 0, limitOfDocuments?: number) {
        const deliveries = this.deliveryModel.
            find({ applicants: shopperId, shopper: { $ne: shopperId } })
            .sort({ _id: 1 }).skip(documentsToSkip);
        if (limitOfDocuments) {
            // when limit =0 this condition will be false
            deliveries.limit(limitOfDocuments);
        }
        console.log(deliveries);
        return deliveries;
    }
    async getDeliverisesByShopperId(shopperId, documentsToSkip = 0, limitOfDocuments?: number) {
        const deliveries = this.deliveryModel.find({ shopper: shopperId })
            .sort({ _id: 1 }).skip(documentsToSkip);
        if (limitOfDocuments) {
            // when limit =0 this condition will be false
            deliveries.limit(limitOfDocuments);
        }

    }
}

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDeliveryDTO } from 'src/delivery/DTO/create-delivery.dto';
import { Delivery, DELIVERY_STATUS } from 'src/delivery/model/delivery.model';
import { Shopper } from 'src/shopper/models/shopper.model';
import { ShopperService } from 'src/shopper/shopper.service';
import { Store } from 'src/store/models/store.model';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectModel('Delivery')
    private readonly deliveryModel: Model<Delivery>,
    @InjectModel('Store')
    private readonly storeModel: Model<Store>,
    @InjectModel('Shopper')
    private readonly shopperModel: Model<Shopper>,
    private shopperService: ShopperService,
  ) {}

  async addDelivery(storeId: any, delivery: CreateDeliveryDTO): Promise<any> {
    return await this.deliveryModel.create({
      ...delivery,
      store: storeId,
    });
  }
  async getDeliveriesByStoreId(storeId) {
    return await this.deliveryModel
      .find({
        store: storeId,
      })
      .populate('store', '', this.storeModel)
      .populate('shopper', '', this.shopperModel)
      .exec();
  }

  /*    this function lets the store affects a shopper to the delivery
        The shopper should have be in the list of the shoppers who asked to get the delivery
    */
  async affectShoppertoDelivery(storeId, shopperEmail, deliveryId) {
    const delivery = await this.deliveryModel.findById(deliveryId);
    if (!delivery) {
      throw new NotFoundException('Delivery not found');
    }
    const shopper = await this.shopperService.getShopperByEmail(shopperEmail);
    if (!shopper) {
      throw new NotFoundException(
        'Shopper with email ' + shopperEmail + ' not found',
      );
    }
    delivery.shopper = shopper._id;
    delivery.status = DELIVERY_STATUS.ON_THE_WAY;
    return await this.deliveryModel
      .updateOne({ _id: deliveryId }, delivery)
      .exec();
  }

  async requestDelivery(deliveryId, shopperId) {
    const delivery = await this.deliveryModel.findById(deliveryId);
    console.log('The delivery:\n', delivery);
    if (!delivery) {
      throw new NotFoundException('Delivery not found');
    }
    const shopperlreadyApplied = delivery.applicants.find((el) => {
      if (el == shopperId) return el;
    });
    if (shopperlreadyApplied) {
      throw new ConflictException('Shopper already applied for this delivery');
    }
    delivery.applicants.push(shopperId);
    return await this.deliveryModel
      .updateOne({ _id: deliveryId }, delivery)
      .exec();
  }

  async getDeliveriesByShopperId(shopperId) {
    console.log('shopper id:', shopperId);
    return await this.deliveryModel.find({ shopper: shopperId });
  }

  // getDeliveryByApplicantID
}

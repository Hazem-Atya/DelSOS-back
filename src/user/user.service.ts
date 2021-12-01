import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateShopperDto } from './DTO/shopperCreation.dto';
import { Shopper } from './models/shopper.model';
import * as bcrypt from 'bcrypt';
import { Store } from './models/store.model';
import { CreateStoreDto } from './DTO/storeCreation.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('Shopper')
    private readonly userModel: Model<Shopper>,
    @InjectModel('Store')
    private readonly storeModel: Model<Store>,
  ) {}

  async registerShopper(userData: CreateShopperDto): Promise<any> {
    const email = userData.email;
    const firstname = userData.firstname;
    const lastname = userData.lastname;
    const username = `${firstname}-${lastname}`;
    const user = await this.userModel.create({
      ...userData,
      username,
      bankDetails: {
        owner: '',
        number: '',
        expirationdate: '',
      },
      address: '',
    });
    if (await this.userModel.findOne({ email })) {
      return new ConflictException(`This email  is already used`);
    }
    user.password = await bcrypt.hash(user.password, 10);
    try {
      await user.save();
    } catch (e) {
      throw new InternalServerErrorException();
    }
    return 'shopper created';
  }

  async registerStore(userData: CreateStoreDto): Promise<any> {
    const email = userData.email;
    const user = await this.storeModel.create({
      ...userData,
      address: [],
    });
    if (await this.userModel.findOne({ email })) {
      return new ConflictException(`This email  is already used`);
    }
    user.password = await bcrypt.hash(user.password, 10);
    try {
      await user.save();
    } catch (e) {
      throw new InternalServerErrorException();
    }
    return 'store created';
  }
}

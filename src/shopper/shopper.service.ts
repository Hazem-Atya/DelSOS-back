import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateShopperDto } from '../shopper/DTO/shopperCreation.dto';
import { Shopper } from './models/shopper.model';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';
import { AuthService } from 'src/auth/auth.service';
import { ConfigService } from '@nestjs/config';
import { Password } from 'src/auth/DTO/password.dto';
import { CrudService } from 'src/utils/crud.service';

@Injectable()
export class ShopperService {
  constructor(
    @InjectModel('Shopper')
    private readonly shopperModel: Model<Shopper>,
    private readonly mailService: MailService,
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly crudService: CrudService,
  ) {}

  async registerShopper(userData: CreateShopperDto): Promise<any> {
    const email = userData.email;
    const name = userData.name;
    const username = `shopper-${name.split(' ').join('')}-delsos`;

    if (await this.shopperModel.findOne({ email })) {
      throw new ConflictException(`This email  is already used`);
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    const user = await this.shopperModel.create({
      ...userData,
      password: hashedPassword,
      username,
      bankDetails: {
        owner: userData.owner,
        cardNumber: userData.cardNumber,
        expirationdate: userData.expirationDate,
      },
    });

    const confirmToken = await this.authService.createToken(
      {
        email: email,
        sub: user._id,
      },
      this.configService.get('CONFIRM_TOKEN_EXPIRATION'),
    );

    const info = await this.mailService.sendUserConfirmation(
      {
        email: user.email,
        username: user.username,
      },
      confirmToken.access_token,
    );

    throw new HttpException(
      'Shopper Created ! Check ur Mail for confirmation',
      HttpStatus.OK,
    );
  }

  async getShopper(id: string) {
    return await this.shopperModel.findById(id);
  }

  async getAll(): Promise<Shopper[]> {
    return await this.shopperModel.find();
  }

  async updateShopper(newShopper: Partial<Shopper>): Promise<any> {
    return this.crudService.update(this.shopperModel, newShopper);
  }

  async updateShopperPassword(password: Password, id: string): Promise<any> {
    return this.crudService.updatePassword(
      this.shopperModel,
      password.password,
      id,
    );
  }

  async deleteShopper(id: string): Promise<any> {
    return this.crudService.delete(this.shopperModel, id);
  }
}

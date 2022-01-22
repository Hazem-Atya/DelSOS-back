import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateShopperDto } from '../shopper/DTO/shopperCreation.dto';
import { Shopper } from './models/shopper.model';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';
import { AuthService } from 'src/auth/auth.service';
import { ConfigService } from '@nestjs/config';
import { CrudService } from 'src/utils/crud.service';
import { EmailDto } from 'src/auth/DTO/email.dto';
import { UtilsService } from 'src/utils/utils.service';
import { ForgotPasswordDto } from 'src/auth/DTO/forgotPassword.dto';
import { TYPE } from 'src/utils/enum';
import { updatePasswordDto } from 'src/auth/DTO/updatePassword.dto';

@Injectable()
export class ShopperService {
  constructor(
    @InjectModel('Shopper')
    private readonly shopperModel: Model<Shopper>,
    private readonly mailService: MailService,
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly crudService: CrudService,
    private readonly utilService: UtilsService,
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
        type: TYPE.shopper,
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
  async getAll_v2(documentsToSkip = 0, limitOfDocuments?: number) {
    const query = this.shopperModel
      .find()
      .sort({ _id: 1 })
      .skip(documentsToSkip);

    if (limitOfDocuments) {
      // when limit =0 this condition will be false
      query.limit(limitOfDocuments);
    }
    return query;
  }

  async updateShopper(newShopper: Partial<Shopper>): Promise<any> {
    return this.crudService.update(this.shopperModel, newShopper);
  }

  async updateShopperPassword(
    passwordData: updatePasswordDto,
    id: string,
  ): Promise<any> {
    const currentPassword = await this.shopperModel
      .findById(id)
      .select('password');
    const testPassword = bcrypt.compareSync(
      passwordData.currentPassword,
      currentPassword.password,
    );
    if (
      testPassword &&
      passwordData.newPassword == passwordData.confirmPassword
    ) {
      await this.crudService.updatePassword(
        this.shopperModel,
        passwordData.newPassword,
        id,
      );
      return HttpStatus.OK
    }

    return new UnauthorizedException('Check your passwords!');
  }

  async deleteShopper(id: string): Promise<any> {
    return this.crudService.delete(this.shopperModel, id);
  }

  async forgotPassword(email: string) {
    return this.utilService.forgotPassword(
      this.shopperModel,
      email,
      TYPE.shopper,
    );
  }

  async resetPassword(passwordInfo: ForgotPasswordDto, user) {
    return this.utilService.resetPassword(
      this.shopperModel,
      passwordInfo,
      user,
    );
  }
  async getShopperByEmail(email) {

    return await this.shopperModel.findOne({ email });
  }
}

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
import { Password } from 'src/auth/DTO/password.dto';
import { NotFoundException } from '@nestjs/common';


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
  ) { }

  getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
  async registerShopper(userData: CreateShopperDto): Promise<any> {
    const email = userData.email;
    const name = userData.name;
    const birthdate = userData.birthdate;
    const age = this.getAge(birthdate)
    console.log(age)
    const username = `shopper-${name.split(' ').join('')}-delsos`;

    if (await this.shopperModel.findOne({ email })) {
      throw new ConflictException(`This email  is already used`);
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    const user = await this.shopperModel.create({
      ...userData,
      age,
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

  async updateShopper(id, newShopper, file: Express.Multer.File,): Promise<any> {

    if (file) {
      console.log(file)
      const cin = {
        filename: file.filename,
        originalname: file.originalname,
        mimetype: file.mimetype,
        path: file.path,
      };
      newShopper = { ...newShopper, cin }
    }
    let shopper = await this.shopperModel.findById(id)

    await shopper.updateOne(newShopper)

    return shopper



  }

  async addPic(id, file) {
    let picture;
console.log(file)
    if (file) {

      picture = file.filename;
      let shopper = await this.shopperModel.findById(id)
      await shopper.updateOne({ picture }).then((u) => {
      
   
    
      })
      return await this.shopperModel.findById(id);
    }
else
    throw new NotFoundException('There is a problem with your file ')

  }
  async updateShopperPassword(password: Password, id: string): Promise<any> {
    return this.crudService.updatePassword(
      this.shopperModel,
      password.oldPassword,
      password.newPassword,
      id)
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

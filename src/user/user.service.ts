import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  PreconditionFailedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateShopperDto } from './DTO/shopperCreation.dto';
import { Shopper } from './models/shopper.model';
import * as bcrypt from 'bcrypt';
import { Store } from './models/store.model';
import { CreateStoreDto } from './DTO/storeCreation.dto';
import { MailService } from 'src/mail/mail.service';
import { AuthService } from 'src/auth/auth.service';
import { ForgotPasswordDto } from 'src/auth/DTO/forgotPassword.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('Shopper')
    private readonly userModel: Model<Shopper>,
    @InjectModel('Store')
    private readonly storeModel: Model<Store>,
    private readonly mailService: MailService,
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) { }

  
  async registerShopper(userData: CreateShopperDto): Promise<any> {
    const email = userData.email;
    const name = userData.name;
    const username = `shopper-${name.split(' ').join('')}-delsos`;

    if (await this.userModel.findOne({ email })) {
      throw new ConflictException(`This email  is already used`);
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    const user = await this.userModel.create({
      ...userData,
      password: hashedPassword,
      username,
      bankDetails: {
        owner: '',
        number: '',
        expirationdate: '',
      },
      address: '',
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

  async registerStore(userData: CreateStoreDto): Promise<any> {

    const email = userData.email;
    const name = userData.name;

        
    if (await this.storeModel.findOne({ email })) {
         
      throw new NotFoundException(`This email  is already used`, `This email is already used`);
    }
    const user = await this.storeModel.create({
      ...userData,
      address: []
    });
        
    user.password = await bcrypt.hash(user.password, 10);
    try {
      await user.save();
    } catch (e) {
      throw new ConflictException(`the email should be unique`);
    }
    return "store created";
  
  }

  async forgotPassword(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new NotFoundException();

    const forgotToken = await this.authService.createToken(
      {
        email,
        sub: user._id,
        creationDate: new Date(),
      },
      this.configService.get('RESET_TOKEN_EXPIRATION'),
    );

    const info = await this.mailService.sendPasswordReset(
      {
        email: user.email,
        username: user.username,
      },
      forgotToken.access_token,
    );

    throw new HttpException(
      "Check ur mail for reset password link ! it won't last long !! ",
      HttpStatus.OK,
    );
  }

  async resetPassword(passwordInfo: ForgotPasswordDto, user) {
    const { newPassword, confirmPassword } = passwordInfo;

    if (newPassword !== confirmPassword)
      throw new PreconditionFailedException();

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await this.userModel.findByIdAndUpdate(
      user._id,
      {
        password: hashedPassword,
      },
      { new: true },
    );

    throw new HttpException('Password updated successfully ! ', HttpStatus.OK);
  }
}

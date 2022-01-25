import {
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  PreconditionFailedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './DTO/userLogin.dto';
import { Shopper } from 'src/shopper/models/shopper.model';
import { Store } from 'src/store/models/store.model';
import { STATUS, TYPE } from 'src/utils/enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Shopper')
    private readonly shopperModel: Model<Shopper>,
    @InjectModel('Store')
    private readonly storeModel: Model<Store>,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginInfo: LoginUserDto): Promise<any> {
    const { password, email } = loginInfo;

    const shopper = await this.shopperModel.findOne({ email }).select('_id email status +password');
  
    let user;
    let type = TYPE.shopper;
    if (!shopper) {
      user = await this.storeModel.findOne({ username: email }).select('_id email status +password');
    

      type = TYPE.store;
    } else user = shopper;
    console.log(loginInfo)
    console.log(user)
    if (user && user.status === STATUS.activated) {

      const testPassword = bcrypt.compareSync(password, user.password);
      if (testPassword) {
        const payload = { email: user.email, sub: user._id, type };
        return payload;
      } else {
        throw new PreconditionFailedException('Wrong Credentials ');
      }
    }
    throw new PreconditionFailedException(
      'Wrong Credentials or Unconfirmed Email ! ',
    );
  }

  async createToken(payload, expirationDate: number) {
    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: +expirationDate,
      }),
    };
  }

  async verifyConfirmToken(token: string) {
    const payload = await this.jwtService.verify(token);
    const user = await this.verifyToken(token);
    if (user) {
      await user.model.findByIdAndUpdate(
        user.data._id,
        {
          status: STATUS.activated,
        },
        { new: true },
      );

      throw new HttpException('Email confirmed', HttpStatus.OK);
    } else {
      throw new NotAcceptableException();
    }
  }

  async verifyToken(token: string) {
    console.log(token);
    const payload = await this.jwtService.verify(token);
    const user = { data: null, model: null };
    if (payload.type === TYPE.shopper) {
      user.data = await this.shopperModel.findById(payload.sub);
      user.model = this.shopperModel;
    } else {
      user.data = await this.storeModel.findById(payload.sub);
      user.model = this.storeModel;
    }
    if (user) {
      return user;
    } else {
      throw new NotFoundException();
    }
  }
}

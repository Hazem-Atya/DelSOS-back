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
import { ConfigService } from '@nestjs/config';
import { MailService } from 'src/mail/mail.service';
import { ForgotPasswordDto } from './DTO/forgotPassword.dto';
import { Shopper } from 'src/shopper/models/shopper.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Shopper')
    private readonly userModel: Model<Shopper>,
    private jwtService: JwtService,
    private readonly mailService: MailService,
    private configService: ConfigService,
  ) {}

  async validateUser(loginInfo: LoginUserDto): Promise<any> {
    const { password, email } = loginInfo;
    const user = await this.userModel.findOne({ email });
    if (user && user.isConfirmed) {
      const testPassword = bcrypt.compareSync(password, user.password);
      if (testPassword) {
        const payload = { email: user.email, sub: user._id };
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
      await this.userModel.findByIdAndUpdate(
        user._id,
        {
          isConfirmed: true,
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
    const user = await this.userModel.findById(payload.sub);
    if (user) {
      return user;
    } else {
      throw new NotFoundException();
    }
  }

  async forgotPassword(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new NotFoundException();

    const forgotToken = await this.createToken(
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

import {
  NotFoundException,
  HttpException,
  HttpStatus,
  PreconditionFailedException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { AuthService } from 'src/auth/auth.service';
import { ForgotPasswordDto } from 'src/auth/DTO/forgotPassword.dto';
import { MailService } from '../mail/mail.service';
import { EmailDto } from 'src/auth/DTO/email.dto';

@Injectable()
export class UtilsService {
  constructor(
    private readonly maileService: MailService,
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
  ) {}

  async forgotPassword(model: Model<any>, email: string, type: string) {
    const user = await model.findOne({ email });
    if (!user) throw new NotFoundException();

    const forgotToken = await this.authService.createToken(
      {
        email,
        sub: user._id,
        type,
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

  async resetPassword(
    model: Model<any>,
    passwordInfo: ForgotPasswordDto,
    user,
  ) {
    const { newPassword, confirmPassword } = passwordInfo;

    if (newPassword !== confirmPassword)
      throw new PreconditionFailedException();

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await model.findByIdAndUpdate(
      user._id,
      {
        password: hashedPassword,
      },
      { new: true },
    );

    throw new HttpException('Password updated successfully ! ', HttpStatus.OK);
  }
}

import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { URLS } from './URL/url-object';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: any, token: string) {
    const info = await this.mailerService.sendMail({
      to: user.email,
      from: '"Support Team" <delsosinsat@gmail.com>',
      subject: 'Welcome to DelSOS! Confirm your Email',
      template: './confirmation',
      context: {
        name: user.username,
        url: URLS.confirmMail(token),
      },
    });

    return info;
  }

  async activateStore(store: any) {
    const info = await this.mailerService.sendMail({
      to: store.email,
      from: '"Support Team" <delsosinsat@gmail.com>',
      subject: 'Welcome to DelSOS! Your account is activated',
      template: './activation',
      context: {
        name: store.username,
        username: store.username,
        password: store.password,
      },
    });
    return info;
  }

  async sendPasswordReset(user: any, resetToken: string) {
    const info = await this.mailerService.sendMail({
      to: user.email,
      from: '"Support Team" <delsosinsat@gmail.com>',
      subject: 'This is ur password reset code ! ',
      template: './resetPassword',
      context: {
        name: user.username,
        url: URLS.forgotPasswordMail(resetToken),
      },
    });

    return info;
  }
}

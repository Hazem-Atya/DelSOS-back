import { Module } from '@nestjs/common';
import { CrudService } from './crud.service';
import { MailModule } from '../mail/mail.module';
import { AuthModule } from 'src/auth/auth.module';
import { UtilsService } from './utils.service';
import { PaginationParams } from './pagination.params';

@Module({
  imports: [MailModule, AuthModule, MailModule],
  providers: [CrudService, UtilsService],
  exports: [CrudService, UtilsService],
})
export class UtilsModule {}

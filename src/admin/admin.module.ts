import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminSchema } from './model/admin.model';

@Module({

    imports: [
        MongooseModule.forFeature([{ name: 'Admin', schema: AdminSchema }]),
    ]
})
export class AdminModule { }

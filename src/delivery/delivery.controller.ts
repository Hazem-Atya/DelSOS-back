import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/auth-guards/jwt-auth.guard';
import { Store } from 'src/store/models/store.model';
import { StoreService } from 'src/store/store.service';
import { CreateDeliveryDTO } from './DTO/create-delivery.dto';
import { DeliveryService } from './service/delivery.service';

@Controller('delivery')
export class DeliveryController {

    constructor(
        private deliveryService: DeliveryService,
    ) {
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(JwtAuthGuard)
    async addDelivery(
        @Body() createDeliveryDTO: CreateDeliveryDTO,
        @Req() request: Request
    ) {
        const user = request.user;
        const store = {
            _id: '',
            ...user
        }
        console.log("This is the store I received:", store._id)
        return await this.deliveryService.addDelivery(store._id, createDeliveryDTO);
    }

    @Get('all')
    @UseGuards(JwtAuthGuard)
    async getShoppersDeliveries(
        @Req() request: Request
    ) {
        const user = request.user;
        const store = {
            _id: '',
            ...user
        }
        return await this.deliveryService.getDeliveriesByStoreId(store._id);

    }
}

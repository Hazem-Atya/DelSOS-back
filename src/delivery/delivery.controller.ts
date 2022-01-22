import { Body, Controller, Get, HttpCode, HttpStatus, Patch, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/auth-guards/jwt-auth.guard';
import { Store } from 'src/store/models/store.model';
import { StoreService } from 'src/store/store.service';
import { ROLE } from 'src/utils/enum';
import { AffectShopperDTO } from './DTO/affect-shopper.dto';
import { CreateDeliveryDTO } from './DTO/create-delivery.dto';
import { RequestDeliveryDTO } from './DTO/request-delivery.dto';
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
            role: '',
            ...user
        }
        if (store.role != 'STORE') {
            throw new UnauthorizedException();
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

    @Patch('affect-shopper')
    @UseGuards(JwtAuthGuard)
    async affectShopperToDelivery(
        @Req() request: Request,
        @Body() delivery_shopper_data: AffectShopperDTO
    ) {
        const user = request.user;
        const store = {
            _id: '',
            ...user
        }
        return await this.deliveryService.affectShoppertoDelivery(
            store._id,
            delivery_shopper_data.shopperEmail,
            delivery_shopper_data.deliveryId);

    }

    @Patch('apply')
    @UseGuards(JwtAuthGuard)
    async requestDelivery(
        @Req() request: Request,
        @Body() delivery: RequestDeliveryDTO
    ) {
        const user = request.user;
        const shopper = {
            _id: '',
            role: '',
            ...user
        }
        if (shopper.role != ROLE.shopper) {
            throw new UnauthorizedException("nooooooooooooooo");
        }
        return this.deliveryService.requestDelivery(delivery.deliveryId, shopper._id);
    }


    @Get('shoppersDeliveries')
    @UseGuards(JwtAuthGuard)
    async getShopperDeliveries(
        @Req() request: Request
    ) {
        const user = request.user;
        const shopper = {
            _id: '',
            role: '',
            ...user
        }
        if (shopper.role != ROLE.shopper) {
            throw new UnauthorizedException("WE NEED A SHOPPER");
        }
        return await this.deliveryService.getDeliveriesByShopperId(shopper._id);
    }
}

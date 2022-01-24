import { Body, Controller, Get, HttpCode, HttpStatus, NotFoundException, Patch, Post, Query, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/auth-guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { Shopper } from 'src/shopper/models/shopper.model';
import { Store } from 'src/store/models/store.model';
import { StoreService } from 'src/store/store.service';
import { ROLE } from 'src/utils/enum';
import { PaginationParams } from 'src/utils/pagination.params';
import { AddTrackingDTO } from './DTO/add-tracking.dto';
import { AffectShopperDTO } from './DTO/affect-shopper.dto';
import { CreateDeliveryDTO } from './DTO/create-delivery.dto';
import { UpdateDeliveryDTO } from './DTO/update-delivery.dto';
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
        @Req() request
    ) {
        const store = request.user;

        if (store.role != 'STORE') {
            throw new UnauthorizedException();
        }
        console.log("This is the store I received:", store._id)
        return await this.deliveryService.addDelivery(store._id, createDeliveryDTO);
    }

    @Get('all')
    @UseGuards(JwtAuthGuard)
    async getToresDeliveries(
        @Req() request
    ) {
        const store = request.user;

        return await this.deliveryService.getDeliveriesByStoreId(store._id);

    }

    // get the deliveris that have been delivered
    @Get('archive')
    @UseGuards(JwtAuthGuard)
    async getStoresArchivedDeliveries(
        @GetUser() store,
        @Query() { skip, limit }: PaginationParams
    ) {
        return await this.deliveryService.
            getArchivedDeliveriesByStoreId(store._id, skip, limit);

    }
    @Patch('affect-shopper')
    @UseGuards(JwtAuthGuard)
    async affectShopperToDelivery(
        @Req() request,
        @Body() delivery_shopper_data: AffectShopperDTO
    ) {

        const store = request.user;
        return await this.deliveryService.affectShoppertoDelivery(
            store._id,
            delivery_shopper_data.shopperEmail,
            delivery_shopper_data.deliveryId);

    }

    @Patch('apply')
    @UseGuards(JwtAuthGuard)
    async requestDelivery(
        @GetUser() shopper,
        @Body() delivery: UpdateDeliveryDTO
    ) {

        if (shopper.role != ROLE.shopper) {
            throw new UnauthorizedException("nooooooooooooooo");
        }
        return this.deliveryService.requestDelivery(delivery.deliveryId, shopper._id);
    }


    @Get('shoppersDeliveries')
    @UseGuards(JwtAuthGuard)
    async getShopperDeliveries(
        @GetUser() shopper,
        @Query() { skip, limit }: PaginationParams

    ) {

        if (shopper.role != ROLE.shopper) {
            throw new UnauthorizedException("WE NEED A SHOPPER");
        }
        return await this.deliveryService.getDeliveriesByShopperId(shopper._id, skip, limit);
    }
    @Patch('markAsDelivered')
    @UseGuards(JwtAuthGuard)
    async markAsDeliverd(
        @GetUser() shopper,
        @Body() delivery: UpdateDeliveryDTO
    ) {

        if (shopper.role != ROLE.shopper) {
            throw new UnauthorizedException("WE NEED A SHOPPER");
        }

        return await this.deliveryService.markDeliveryAsDelivered(shopper._id, delivery.deliveryId);
    }

    @Get('requestedDeliveries')
    @UseGuards(JwtAuthGuard)
    getRequestedDeliveries(
        @GetUser() shopper: Partial<Shopper>,
        @Query() { skip, limit }: PaginationParams

    ) {
        if (shopper.role != ROLE.shopper) {
            throw new UnauthorizedException('This route can only be accessed by a shopper');
        }
        return this.deliveryService.getRequestedDeliveries(shopper._id,skip,limit);
    }

    @Patch('addTrackingData')
    @UseGuards(JwtAuthGuard)
    async addTrackingHistory(
        @GetUser() shopper,
        @Body() addTrackingData: AddTrackingDTO
    ) {
        if (shopper.role != ROLE.shopper) {
            throw new UnauthorizedException('This route can only be accessed by a shopper');
        }
        return await this.deliveryService.addTrackingData(shopper._id, addTrackingData);
    }
}

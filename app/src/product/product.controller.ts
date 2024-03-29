import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  Query,
  Param,
  NotFoundException,
  Patch,
  Delete,
  HttpCode,
} from '@nestjs/common';

import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { AccessTokenGuard } from '@app/auth/guards';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductOptionsDto } from './dtos/product-options.dto';
import { IRequestWithUser } from '@app/common/interfaces/request-user.interface';
import { UpdateProductDto } from './dtos';
import { RoleEnum } from '@app/user/enums';
import { Roles } from '@app/auth/decorators';
import { RolesGuard } from '@app/auth/guards/role.guard';
import { CreatePurchaseDto } from '../purchase/dtos';
import { Product } from './schemas/product.schema';
import { Purchase } from '../purchase/schemas/purchase.schema';
import { PageDto } from '@app/pagination/dtos';

@Controller('products')
@ApiTags('products')
@UseGuards(AccessTokenGuard, RolesGuard)
@Roles(RoleEnum.ADMIN, RoleEnum.USER)
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('')
  @HttpCode(201)
  @ApiResponse({ status: 201, description: 'Product Created Successfully' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    return await this.productService.create(createProductDto);
  }

  @Post('purchase')
  @HttpCode(201)
  @ApiResponse({ status: 201, description: 'Purchase Created Successfully' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 404, description: 'Not Found Exception' })
  async purchase(
    @Body() createPurchaseDto: CreatePurchaseDto,
    @Request() req: IRequestWithUser,
  ): Promise<Purchase> {
    const userId = req.user.sub;
    return await this.productService.purchase(createPurchaseDto, userId);
  }

  @Get('')
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'List of Product Fetched' })
  async getProducts(
    @Query() productOptionsDto: ProductOptionsDto,
  ): Promise<PageDto<Product>> {
    return await this.productService.getAll(productOptionsDto);
  }

  @Get(':id')
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'Product Found' })
  @ApiResponse({ status: 404, description: 'Product Not Found' })
  async getProductById(@Param('id') id: string) {
    const product = await this.productService.getProductById(id);
    if (!product) throw new NotFoundException('Prodct not found');
    return product;
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Product Updated Succesfully' })
  @ApiResponse({ status: 404, description: 'Product Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateProductDto,
  ) {
    return await this.productService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiResponse({ status: 204, description: 'Product Deleted Succesfully' })
  @ApiResponse({ status: 404, description: 'Product Not Found' })
  async delete(@Param('id') id: string) {
    return await this.productService.delete(id);
  }
}

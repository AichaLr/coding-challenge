import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, ProjectionType } from 'mongoose';
import { Product } from './schemas/product.schema';
import { IProduct } from './interfaces/product.interface';
import { CreateProductDto, UpdateProductDto } from './dtos';
import { LoggerService } from '@app/common/logger/logger.service';
import { Purchase } from '../purchase/schemas/purchase.schema';
import { ProductOptionsDto } from './dtos/product-options.dto';
import { ProductFilterDto } from './dtos/product-filter.dto';
import { OrderOptionsDto } from '@app/pagination/dtos/order-options.dto';
import { PageMetaDto } from '@app/pagination/dtos/page-meta.dto';
import { PageDto } from '@app/pagination/dtos/page.dto';
import { UserService } from '@app/user';
import { CreatePurchaseDto } from '../purchase/dtos';
import { ERROR_MESSAGES } from '@app/common/constants/error-messages';
import { PurchaseService } from '../purchase/purchase.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private readonly purchaseService: PurchaseService,
    private readonly logger: LoggerService,
    private readonly userService: UserService,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(createProductDto);
    const savedProduct = await newProduct.save();
    this.logger.log(
      'ProductService',
      `Product #${savedProduct._id} Saved Successfuly`,
    );
    return savedProduct;
  }

  async purchase(
    createPurchaseDto: CreatePurchaseDto,
    userId: string,
  ): Promise<Purchase> {
    const { quantity, id } = createPurchaseDto;

    const filter = { _id: id, isAvailable: true, quantity: { $gte: 0 } };

    const product = await this.findOne(filter);
    if (!product)
      throw new NotFoundException(
        ERROR_MESSAGES.GENERAL_ERROR_MESSAGES.PRODUCT_NOT_FOUND,
      );

    //? we split the condition for a better indicating error message
    if (product.quantity < quantity)
      throw new BadRequestException(
        ERROR_MESSAGES.GENERAL_ERROR_MESSAGES.INSUFFUSIANT_QUANTITY_IN_STOCK,
      );

    const user = await this.userService.getOneById(userId);

    const savedPurchase = await this.purchaseService.create(
      user,
      product,
      quantity,
    );

    const updatedPurchases = [...product.purchases, savedPurchase._id];

    const update = {
      quantity: product.quantity - quantity,
      purchases: updatedPurchases,
    };

    await this.update(id, update);

    return savedPurchase;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const existingProduct = await this.productModel.findByIdAndUpdate(
      id,
      updateProductDto,
      { new: true },
    );
    if (!existingProduct) {
      throw new NotFoundException(
        ERROR_MESSAGES.GENERAL_ERROR_MESSAGES.PRODUCT_NOT_FOUND,
      );
    }
    this.logger.log(
      'ProductService',
      `Product #${existingProduct._id} Updated Successfuly`,
    );
    return existingProduct;
  }

  async getAll(
    productOptionsDto: ProductOptionsDto,
  ): Promise<PageDto<Product>> {
    const {
      sort = {} as OrderOptionsDto,
      skip,
      take,
      query = {} as ProductFilterDto,
    } = productOptionsDto;
    const where = this.buildQuery(query);
    const order = this.buildSortOrder(sort);

    const items = await this.productModel
      .find(where)
      .skip(skip)
      .limit(take)
      .sort(order)
      .exec();

    const itemCount = await this.productModel.countDocuments(where);

    this.logger.log('ProductService', 'Fetching Product List');

    const pageMetaDto = new PageMetaDto({
      itemCount,
      pageOptionsDto: productOptionsDto,
    });
    return new PageDto(items, pageMetaDto);
  }

  private buildQuery(query: ProductFilterDto) {
    const where = {} as any;

    if (query.name) where.name = { $regex: query.name, $options: 'i' };
    if (query.isAvailable !== undefined) where.isAvailable = query.isAvailable;
    if (query.minPrice && query.maxPrice)
      where.price = { $gte: query.minPrice, $lte: query.maxPrice };

    return where;
  }

  private buildSortOrder(sort: OrderOptionsDto) {
    const order = {} as any;

    if (sort.createdAt) order['createdAt'] = sort.createdAt;
    if (sort.id) order['id'] = sort.id;
    if (sort.price) order['price'] = sort.price;

    return order;
  }

  async getProductById(
    id: string,
    projection?: ProjectionType<Product>,
  ): Promise<Product> {
    return await this.productModel.findById(id, projection);
  }

  async findOne(
    filter?: FilterQuery<IProduct>,
    projection?: ProjectionType<IProduct>,
  ): Promise<Product> {
    return await this.productModel.findOne(filter, projection);
  }

  async delete(id: string): Promise<boolean | NotFoundException> {
    const deletedProduct = await this.productModel.findByIdAndDelete(id);
    if (!deletedProduct) {
      throw new NotFoundException(
        ERROR_MESSAGES.GENERAL_ERROR_MESSAGES.PRODUCT_NOT_FOUND,
      );
    }
    this.logger.log('ProductService', `Product #${id} Deleted Successfully`);
    return true;
  }
}

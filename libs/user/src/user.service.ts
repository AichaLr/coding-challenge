import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { FilterQuery, Model, ProjectionType } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterRequestDto } from './dtos';
import { ERROR_MESSAGES } from '@app/common/constants/error-messages';
import { LoggerService } from '@app/common/logger/logger.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly logger: LoggerService,
  ) {}

  async findOne(
    filter?: FilterQuery<User>,
    projection?: ProjectionType<User>,
  ): Promise<User> {
    return await this.userModel.findOne(filter, projection);
  }

  async getOneById(
    id: string,
    projection?: ProjectionType<User>,
  ): Promise<User> {
    return await this.userModel.findById(id, projection);
  }

  async create(registerRequestDto: RegisterRequestDto): Promise<User> {
    const { email } = registerRequestDto;
    let userExists = await this.userModel.findOne({ email });
    if (userExists)
      throw new BadRequestException(
        ERROR_MESSAGES.GENERAL_ERROR_MESSAGES.EMAIL_ALREADY_EXISTS,
      );

    const newUser = new this.userModel({ ...registerRequestDto, email });
    const savedUser = await newUser.save();
    this.logger.log('UserService', ` User #{savedUser._id} Saved Successfully`);
    return savedUser;
  }
}

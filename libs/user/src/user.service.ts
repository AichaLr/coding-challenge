import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { FilterQuery, Model, ProjectionType } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterRequestDto } from './dtos';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

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
    if (userExists) throw new BadRequestException('EMAIL ALREADY EXISTS');

    const newUser = new this.userModel({ ...registerRequestDto, email });
    return await newUser.save();
  }
}

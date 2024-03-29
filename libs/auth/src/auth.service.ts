import { UserService } from '@app/user';
import { LoginRequestDto, RegisterRequestDto } from '@app/user/dtos';
import { User } from '@app/user/schemas/user.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RoleEnum } from '@app/user/enums';
import { ACCESS_TOKEN_TTL } from '@app/common/constants/constants';
import { TokenPayload } from './dtos/token.payload';
import { AccessTokenPayload } from './dtos/access-token.payload';
import { ERROR_MESSAGES } from '@app/common/constants/error-messages';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(registerRequestDto: RegisterRequestDto): Promise<User> {
    const { password, ...input } = registerRequestDto;
    const passwordHashed = await this.hash(password);
    const savedUser: User = await this.userService.create({
      ...input,
      password: passwordHashed,
    });

    const select = '-password';
    return await this.userService.findOne({ _id: savedUser._id }, select);
  }

  async signIn(loginRequestDto: LoginRequestDto): Promise<AccessTokenPayload> {
    const { email, password } = loginRequestDto;
    const user = await this.validateUser(email, password);
    if (!user)
      throw new NotFoundException(
        ERROR_MESSAGES.GENERAL_ERROR_MESSAGES.USER_NOT_FOUND,
      );

    return await this.generateAccessToken(user, user.role);
  }

  /**************************************************************************
                                Helper Functions                    
   **************************************************************************/

  private async hash(password: string): Promise<string> {
    const salt: string = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }
  private async validateUser(email: string, password: string): Promise<User> {
    const select = 'id password role email';
    const user = await this.userService.findOne({ email }, select);

    if (!user) return;
    const { password: passwordHashed } = user;
    const isValidPassword = await bcrypt.compare(password, passwordHashed);
    if (isValidPassword) return user;
    return null;
  }

  private async generateAccessToken(
    user: User,
    role: RoleEnum,
  ): Promise<AccessTokenPayload> {
    const payload = { sub: user._id, role };
    const expiresIn = ACCESS_TOKEN_TTL;

    const token = await this.jwtService.signAsync(payload, { expiresIn });
    return { accessToken: token };
  }

  async verifyToken(token: string): Promise<TokenPayload | undefined> {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch {
      return;
    }
  }
}

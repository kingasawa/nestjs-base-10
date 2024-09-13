import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import UserEntity from '@modules/database/entities/user.entity';
import { encrypt } from '@shared/common/helper';
import { ERROR_MESSAGES } from '@shared/common/constants';
import { MailService } from '@modules/mailer/mail.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private mailService: MailService,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async fetchUser(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: {
        email,
      }
    });
  }

  public async register(payload: UserEntity): Promise<any> {
    console.log('payload', payload);
    const checkExisting = await this.fetchUser(payload.email);
    if (checkExisting) {
      return {
        error: true,
        user: {},
        message: 'Data existed',
      };
    }
    console.log('checkExisting', checkExisting);
    payload.password = encrypt(payload.password);
    console.log('payload', payload);
    const UserEntity: UserEntity = this.userRepository.create(payload);
    console.log('UserEntity', UserEntity);
    await this.userRepository.save(UserEntity)
    delete UserEntity.password;
    return {
      error: false,
      user: UserEntity,
      message: 'Success',
    };
  }

  public async deleteUser(id: number): Promise<UserEntity> {
    const userEntity: UserEntity = await this.userRepository.findOne({ where: { id } });
    if (!userEntity) {
      throw new NotFoundException({ message: ERROR_MESSAGES.USER_NOT_FOUND });
    }
    await this.userRepository.softDelete(id);
    return userEntity;
  }

  public async updateUserDetail(payload: any): Promise<UserEntity> {
    const checkExisting: UserEntity = await this.userRepository.findOne({ where: { id: payload.id } });
    if (!checkExisting) {
      throw new NotFoundException({ message: ERROR_MESSAGES.USER_NOT_FOUND });
    }
    const userEntity = <UserEntity>(<unknown>{
      ...payload,
    });
    await this.userRepository.save(userEntity);
    return userEntity;
  }

  public async selfUpdate(payload: any): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findOne({ where: { email: payload.email } });
    Object.assign(user, payload);
    return await this.userRepository.save(user);
  }

  public async notificationUpdate(payload: any): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findOne({ where: { email: payload.email } });
    Object.assign(user, payload);
    return await this.userRepository.save(user);
  }

  public async resetPassword(payload: any): Promise<UserEntity> {
    const { email } = payload;
    const userEntity: UserEntity = await this.userRepository.findOne({ where: { email } });
    if (!userEntity) {
      throw new NotFoundException({ message: ERROR_MESSAGES.USER_NOT_FOUND });
    }
    this.mailService.sendNewPassword('Khánh Trần', 'trancatkhanh@gmail.com')
    return userEntity;
  }
}

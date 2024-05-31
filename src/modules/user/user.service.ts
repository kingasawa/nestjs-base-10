import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@modules/database/user.entity';
import { encrypt } from '@shared/common/helper';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async fetchUser(username: string): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: {
        username,
      }
    });
  }

  public async register(payload: UserEntity): Promise<any> {
    const checkExisting = await this.fetchUser(payload.username);
    if (checkExisting) {
      return {
        error: true,
        data: {},
        message: 'Data existed',
      };
    }
    payload.password = encrypt(payload.password);
    const UserEntity: UserEntity = this.userRepository.create(payload);
    await this.userRepository.save(UserEntity)
    delete UserEntity.password;
    return {
      error: false,
      data: UserEntity,
      message: 'Success',
    };
  }
}

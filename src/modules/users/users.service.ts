import { Injectable, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    private dataSource: DataSource,
  ) {}

  async findAll(): Promise<UsersEntity[]> {
    return await this.usersRepository.find();
  }

  async create(user): Promise<UsersEntity[]> {
    const { name } = user;
    const u = await this.usersRepository.findOne({ where: { name } });
    if (u) {
      throw new BadRequestException('name must be unique');
    }
    return await this.usersRepository.save(user);
  }

  async createMany(users: UsersEntity[]) {
    await this.dataSource.transaction(async (manager) => {
      for (const user of users) {
        await manager.getRepository(UsersEntity).save(user);
      }
    });
  }
}

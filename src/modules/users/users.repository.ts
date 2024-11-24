import { Injectable } from '@nestjs/common';
import { DataSource, FindOptionsRelations, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { AppDataSource } from 'src/db/data-source';
import { UserCreateDto } from './dto/user-create.dto';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findOneById(id: string) {
    return this.findOne({
      where: { id },
      relations: this.getRelations(),
    });
  }

  async findOneByEmail(email: string) {
    return this.findOne({
      where: { email },
      relations: this.getRelations(),
    });
  }

  async existsById(id: string) {
    return this.existsBy({ id });
  }

  async existsByEmail(email: string) {
    return this.existsBy({ email });
  }

  private getRelations(): FindOptionsRelations<User> {
    return {
      role: true,
    };
  }
}

import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  findByID(id: number) {
    return this.prismaService.user.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }
  // return all the documents attached to a user by id
  getDocs(id: number) {
    return this.prismaService.user.findUniqueOrThrow({ where: { id } }).documents();
  }
}

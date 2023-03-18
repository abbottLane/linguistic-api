import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma';

@Injectable()
export class DocumentService {
  constructor(private readonly prismaService: PrismaService) {}

    async document(id: number) {
        return await this.prismaService.document.findUnique({ where: { id } });
    }

    async documents(userId: number) {
        return await this.prismaService.document.findMany({ where: { authorId: userId } });
    }

    async saveDocument(title: string, text: string, authorId: number) {
        // save the document under the user with the given id
        return await this.prismaService.document.create({ data: { title, text, authorId } });
    }
}

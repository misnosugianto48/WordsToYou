import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { nanoid } from 'nanoid-cjs';

@Injectable()
export class ContentsService {
  constructor(private prisma: PrismaService) {}

  async create(createContentDto: CreateContentDto) {
    const newContent = {
      id: `c-${nanoid(10)}`,
      ...createContentDto,
    };

    const createContent = await this.prisma.content.create({
      data: newContent,
    });

    return {
      id: createContent.id,
      title: createContent.title,
      recipientName: createContent.recipient_name,
      wordSent: createContent.word_sent,
      createdAt: createContent.created_at,
      updatedAt: createContent.updated_at,
    };
  }

  findAll() {
    return this.prisma.content.findMany({ orderBy: { created_at: 'desc' } });
  }

  async findByName(name: string) {
    const content = await this.prisma.content.findMany({
      where: {
        recipient_name: {
          startsWith: `%${name}%`,
          mode: 'insensitive',
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return content.map((content) => ({
      id: content.id,
      title: content.title,
      recipientName: content.recipient_name,
      wordSent: content.word_sent,
      createdAt: content.created_at,
      updatedAt: content.updated_at,
    }));
  }

  async findOne(id: string) {
    const content = await this.prisma.content.findUnique({ where: { id } });

    if (!content) {
      throw new NotFoundException('Content not found');
    }

    return {
      id: content.id,
      title: content.title,
      recipientName: content.recipient_name,
      wordSent: content.word_sent,
      createdAt: content.created_at,
      updatedAt: content.updated_at,
    };
  }

  async remove(id: string) {
    const content = await this.prisma.content.findUnique({ where: { id } });

    if (!content) {
      throw new NotFoundException('Content not found');
    }

    return await this.prisma.content.delete({ where: { id } });
  }
}

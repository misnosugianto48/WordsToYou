import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { PrismaService } from 'src/common/prisma.service';
import { nanoid } from 'nanoid-cjs';
import {
  mapContentResponse,
  mapContentResponses,
} from '../utils/contents-mapper.utils';

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

    return mapContentResponse(createContent);
  }

  async findAll() {
    const contents = await this.prisma.content.findMany({
      orderBy: { created_at: 'desc' },
    });

    return mapContentResponses(contents);
  }

  async findByName(name?: string) {
    if (!name) {
      return this.findAll();
    }

    const content = await this.prisma.content.findMany({
      where: {
        recipient_name: {
          startsWith: name,
          mode: 'insensitive',
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return mapContentResponses(content);
  }

  async findOne(id: string) {
    const content = await this.prisma.content.findUnique({ where: { id } });

    if (!content) {
      throw new NotFoundException('Content not found');
    }

    return mapContentResponse(content);
  }

  async remove(id: string) {
    const content = await this.prisma.content.findUnique({ where: { id } });

    if (!content) {
      throw new NotFoundException('Content not found');
    }

    return await this.prisma.content.delete({ where: { id } });
  }
}

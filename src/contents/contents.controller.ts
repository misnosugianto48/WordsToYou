import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { ContentsService } from './contents.service';
import { CreateContentDto } from './dto/create-content.dto';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { ContentEntity } from './entities/content.entity';
import { responseJson } from 'src/utils/response-json.utils';

@Controller('contents')
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @Post()
  @ApiCreatedResponse({ type: ContentEntity })
  async create(@Body() createContentDto: CreateContentDto) {
    return responseJson(
      'Content created successfully',
      HttpStatus.CREATED,
      await this.contentsService.create(createContentDto),
    );
  }

  @Get()
  async findAll() {
    return responseJson(
      'Contents fetched successfully',
      HttpStatus.OK,
      await this.contentsService.findAll(),
    );
  }

  @Get('search')
  async findByName(@Query('name') name: string) {
    return responseJson(
      'Contents fetched successfully',
      HttpStatus.OK,
      await this.contentsService.findByName(name),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return responseJson(
      'Content fetched successfully',
      HttpStatus.OK,
      await this.contentsService.findOne(id),
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return responseJson(
      'Content deleted successfully',
      HttpStatus.OK,
      await this.contentsService.remove(id),
    );
  }
}

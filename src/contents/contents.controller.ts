import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { ContentsService } from './contents.service';
import { CreateContentDto } from './dto/create-content.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiQuery,
  getSchemaPath,
} from '@nestjs/swagger';
import { ContentEntity } from './entities/content.entity';
import { responseJson } from 'src/utils/response-json.utils';

@Controller('contents')
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @Post()
  @ApiExtraModels(ContentEntity)
  @ApiCreatedResponse({
    description: 'Content Created',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'success' },
        statusCode: {
          example: 201,
        },
        message: {
          type: 'string',
          example: 'Content created successfully',
        },
        data: { $ref: getSchemaPath(ContentEntity) },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'User Error',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'error' },
        statusCode: {
          example: 400,
        },
        message: {
          type: 'string',
          example: 'word_sent should not be empty',
        },
      },
    },
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'error' },
        statusCode: {
          example: 500,
        },
        message: {
          type: 'string',
          example: 'INTERNAL_SERVER_ERROR',
        },
      },
    },
  })
  async create(@Body() createContentDto: CreateContentDto) {
    return responseJson(
      'Content created successfully',
      HttpStatus.CREATED,
      await this.contentsService.create(createContentDto),
    );
  }

  @ApiExtraModels(ContentEntity)
  @ApiOkResponse({
    description: 'Contents Fetched',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'success' },
        statusCode: {
          example: 200,
        },
        message: {
          type: 'string',
          example: 'Contents fetched successfully',
        },
        data: {
          type: 'array',
          items: { $ref: getSchemaPath(ContentEntity) },
        },
      },
      minItems: 2,
    },
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'error' },
        statusCode: {
          example: 500,
        },
        message: {
          type: 'string',
          example: 'INTERNAL_SERVER_ERROR',
        },
      },
    },
  })
  @Get()
  async findAll() {
    return responseJson(
      'Contents fetched successfully',
      HttpStatus.OK,
      await this.contentsService.findAll(),
    );
  }

  @ApiExtraModels(ContentEntity)
  @ApiQuery({
    name: 'name',
    required: false,
    type: String,
  })
  @ApiOkResponse({
    description: 'Content Fetched',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'success' },
        statusCode: {
          example: 200,
        },
        message: {
          type: 'string',
          example: 'Content fetched successfully',
        },
        data: { $ref: getSchemaPath(ContentEntity) },
      },
    },
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'error' },
        statusCode: {
          example: 500,
        },
        message: {
          type: 'string',
          example: 'INTERNAL_SERVER_ERROR',
        },
      },
    },
  })
  @Get('search')
  async findByName(@Query('name') name?: string) {
    return responseJson(
      'Contents fetched successfully',
      HttpStatus.OK,
      await this.contentsService.findByName(name),
    );
  }

  // @ApiExtraModels(ContentEntity)
  // @ApiOkResponse({
  //   description: 'Content Fetched',
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       status: { type: 'string', example: 'success' },
  //       statusCode: {
  //         example: 200,
  //       },
  //       message: {
  //         type: 'string',
  //         example: 'Content fetched successfully',
  //       },
  //       data: { $ref: getSchemaPath(ContentEntity) },
  //     },
  //   },
  // })
  // @ApiNotFoundResponse({
  //   description: 'Not Found',
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       status: { type: 'string', example: 'error' },
  //       statusCode: {
  //         example: 404,
  //       },
  //       message: {
  //         type: 'string',
  //         example: 'Content not found',
  //       },
  //     },
  //   },
  // })
  // @ApiInternalServerErrorResponse({
  //   description: 'Internal Server Error',
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       status: { type: 'string', example: 'error' },
  //       statusCode: {
  //         example: 500,
  //       },
  //       message: {
  //         type: 'string',
  //         example: 'INTERNAL_SERVER_ERROR',
  //       },
  //     },
  //   },
  // })
  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //   return responseJson(
  //     'Content fetched successfully',
  //     HttpStatus.OK,
  //     await this.contentsService.findOne(id),
  //   );
  // }

  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   return responseJson(
  //     'Content deleted successfully',
  //     HttpStatus.OK,
  //     await this.contentsService.remove(id),
  //   );
  // }
}

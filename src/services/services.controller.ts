import { ServicesService } from '@/services/services.service.js';
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateServiceDto } from '@/services/dto/create-service.dto.js';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @Get()
  findAll() {
    return this.servicesService.findByCategory();
  }

  @Get(':categorySlug')
  findByCategory(@Param('categorySlug') categorySlug: string) {
    return this.servicesService.findByCategory(categorySlug);
  }
  // @Get()
  // findAll() {
  //   return this.servicesService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.servicesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
  //   return this.servicesService.update(+id, updateServiceDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.servicesService.remove(+id);
  // }
}

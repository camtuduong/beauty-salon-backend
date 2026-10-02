import { Injectable } from '@nestjs/common';
// import { UpdateServiceDto } from './dto/update-service.dto.js';
import { PrismaService } from '@/prisma/prisma.service.js';
import { CreateServiceDto } from '@/services/dto/create-service.dto.js';

@Injectable()
export class ServicesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createServiceDto: CreateServiceDto) {
    return 'This action adds a new service';
  }

  // findAll() {
  //   return `This action returns all services`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} service`;
  // }

  // update(id: number, updateServiceDto: UpdateServiceDto) {
  //   return `This action updates a #${id} service`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} service`;
  // }

  async findByCategory(categorySlug?: string) {
    let services;
    if (categorySlug) {
      services = await this.prisma.service.findMany({
        where: {
          category: {
            slug: categorySlug,
          },
          isActive: true,
        },
      });
      return services;
    }
    return await this.prisma.service.findMany({
      where: {
        isActive: true,
      },
    });
  }
}

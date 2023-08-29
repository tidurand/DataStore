import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FileService {
  constructor(private prisma: PrismaService) {}

  async create(createFileDto: CreateFileDto) {
    return this.prisma.file.create({
      data: createFileDto,
    });
  }

  async findAll() {
    return this.prisma.file.findMany();
  }

  async findOne(id: string) {
    return this.prisma.file.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateFileDto: UpdateFileDto) {
    const existingFile = await this.prisma.file.findUnique({
      where: { id },
    });

    if (!existingFile) {
      throw new NotFoundException(`File with ID ${id} not found`);
    }

    return this.prisma.file.update({
      where: { id },
      data: updateFileDto,
    });
  }

  async remove(id: string) {
    const file = await this.prisma.file.findUnique({
      where: { id },
    });

    if (!file) {
      throw new NotFoundException(`File with ID ${id} not found`);
    }

    await this.prisma.file.delete({
      where: { id },
    });

    return file;
  }
}

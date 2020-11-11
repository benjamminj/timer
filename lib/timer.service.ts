import {
  PrismaClient,
  TimerCreateInput,
  TimerUpdateInput,
} from "@prisma/client";
import { NotFoundError } from "./serverErrors";

const prisma = new PrismaClient();

export class TimerService {
  static async exists(id: number) {
    const count = await prisma.timer.count({
      where: { id },
    });

    if (count === 0) throw new NotFoundError(`No timer with id '${id}' exists`);
  }

  static async create(data: TimerCreateInput) {
    return prisma.timer.create({ data });
  }

  static async findMany() {
    return prisma.timer.findMany();
  }

  static async findOne(id: number) {
    await TimerService.exists(id);
    return prisma.timer.findOne({
      where: {
        id,
      },
    });
  }

  static async delete(id: number) {
    await TimerService.exists(id);
    return prisma.timer.delete({ where: { id } });
  }

  static async update(id: number, update: TimerUpdateInput) {
    await TimerService.exists(id);
    return prisma.timer.update({
      where: { id },
      data: update,
    });
  }
}

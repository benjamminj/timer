import { NextApiHandler } from "next";
import { PrismaClient, TimerCreateInput } from "@prisma/client";
import * as z from "zod";

const prisma = new PrismaClient();

type CreateTimerDto = Pick<TimerCreateInput, "duration" | "name">;
const createTimerDto = z.object({
  duration: z.number().positive(),
  name: z.string().optional().nullable(),
});

const timersController: NextApiHandler = async (req, res) => {
  try {
    switch (req.method) {
      case "GET": {
        const allTimers = await prisma.timer.findMany();
        return res.status(200).json({ data: allTimers });
      }
      case "POST": {
        const body: CreateTimerDto = createTimerDto.parse(req.body);
        const newTimer = await prisma.timer.create({ data: body });
        return res.status(201).json({ data: newTimer });
      }
      default:
        return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json(error);
    }

    res.status(500).json({ message: "Internal server error" });
  }
};

export default timersController;

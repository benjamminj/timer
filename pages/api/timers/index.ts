import { NextApiHandler } from "next";
import { TimerCreateInput } from "@prisma/client";
import * as z from "zod";
import { TimerService } from "../../../lib/timer.service";
import { handleServerErrors } from "../../../lib/serverErrors";

type CreateTimerDto = Pick<TimerCreateInput, "duration" | "name">;
const createTimerDto = z.object({
  duration: z.number().positive(),
  name: z.string().optional().nullable(),
});

const timersController: NextApiHandler = async (req, res) => {
  try {
    switch (req.method) {
      case "GET": {
        const allTimers = await TimerService.findMany();
        return res.status(200).json({ data: allTimers });
      }
      case "POST": {
        const body: CreateTimerDto = createTimerDto.parse(req.body);
        const newTimer = await TimerService.create(body);
        return res.status(201).json({ data: newTimer });
      }
      default:
        res.setHeader("Allow", ["GET", "POST"]);
        return res
          .status(405)
          .json({ message: `Method ${req.method} not allowed` });
    }
  } catch (error) {
    handleServerErrors(error, res);
  }
};

export default timersController;

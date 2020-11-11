import { NextApiHandler } from "next";
import { Timer } from "@prisma/client";
import * as z from "zod";
import { handleServerErrors } from "../../../lib/serverErrors";
import { TimerService } from "../../../lib/timer.service";

const querySchema = z.object({
  id: z.number().int(),
});

type UpdateTimerDto = Partial<Pick<Timer, "duration" | "name">>;
const updateTimerDto = z.object({
  duration: z.number().optional(),
  name: z.string().optional().nullable(),
});

const timerController: NextApiHandler = async (req, res) => {
  try {
    const { id: rawId } = req.query as { id: string };
    const { id } = querySchema.parse({ id: Number(rawId) });

    switch (req.method) {
      case "GET": {
        const timer = await TimerService.findOne(id);
        return res.status(200).json({ data: timer });
      }
      case "PATCH": {
        const body: UpdateTimerDto = updateTimerDto.parse(req.body);
        const updatedTimer = await TimerService.update(id, body);
        return res.status(200).json({ data: updatedTimer });
      }
      case "DELETE": {
        const deletedTimer = await TimerService.delete(id);
        return res.status(200).json({ data: deletedTimer });
      }
      default: {
        res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
        return res
          .status(405)
          .json({ message: `Method ${req.method} not allowed` });
      }
    }
  } catch (error) {
    return handleServerErrors(error, res);
  }
};

export default timerController;

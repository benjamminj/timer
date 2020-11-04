import { NextApiHandler } from "next";
import { PrismaClient, Timer } from "@prisma/client";

const prisma = new PrismaClient();

const timerController: NextApiHandler = async (req, res) => {
  try {
    const { id: rawId } = req.query as { id: string };
    const id = Number(rawId);

    // TODO: standardize req validation
    const isIdAnInteger = id % Math.floor(id) === 0;

    if (isNaN(id) || !isIdAnInteger) {
      return res
        .status(400)
        .json({ message: "Parameter 'id' must be an integer" });
    }

    if (req.method === "GET") {
      const timer = await prisma.timer.findOne({
        where: {
          id,
        },
      });

      if (timer === null) {
        return res
          .status(404)
          .json({ message: "A timer with that id doesn't exist 😱" });
      }

      return res.status(200).json({ data: timer });
    }

    if (req.method === "PATCH") {
      // pull out the req body
      const body = req.body as Partial<Pick<Timer, "duration" | "name">>;

      const updatedTimer = await prisma.timer.update({
        where: {
          id,
        },
        data: body,
      });

      // return the updated resource
      res.status(200).json({ data: updatedTimer });
    }

    // DELETE request
    if (req.method === "DELETE") {
      const timerCount = await prisma.timer.count({ where: { id } });

      if (timerCount === 0) {
        return res
          .status(404)
          .json({ message: "A timer with that id doesn't exist 😱" });
      }

      const deletedTimer = await prisma.timer.delete({ where: { id } });
      return res.status(200).json({ data: deletedTimer });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default timerController;

import { NextApiHandler } from "next";
import { PrismaClient, Timer } from "@prisma/client";

const prisma = new PrismaClient();

const timersController: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const allTimers = await prisma.timer.findMany();
      res.status(200).json({ data: allTimers });
    }

    if (req.method === "POST") {
      // take the parameters from the req
      const { duration, name } = req.body as Pick<Timer, "duration" | "name">;

      // TODO: validate POST body is properly formatted

      // create timer in the database
      const newTimer = await prisma.timer.create({
        data: {
          duration,
          name,
        },
      });

      res.status(201).json({ data: newTimer });
    }

    // TODO: 405 method not allowed if any other method
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default timersController;

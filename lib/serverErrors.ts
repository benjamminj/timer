import { NextApiResponse } from "next";
import { ZodError } from "zod";

export class HttpError extends Error {
  readonly status: number;
  readonly name: string;
}

export class NotFoundError extends HttpError {
  readonly status = 404;
  readonly name = "NotFoundError";
}

export const handleServerErrors = (error: unknown, res: NextApiResponse) => {
  // `ZodError` is thrown by `zod` on schema validation
  if (error instanceof ZodError) {
    return res.status(400).json(error);
  }

  if (error instanceof HttpError) {
    return res.status(error.status).json({ message: error.message });
  }

  return res.status(500).json({ message: "Internal server error" });
};

// import { Timer } from "@prisma/client";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Button } from "./Button";
import { Header } from "./Header";
import { formatTime } from "../lib/formatTime";
import { Color, getRandomColor } from "../lib/getRandomColor";
import { SECOND } from "../lib/constants";

type Status = "idle" | "running" | "paused" | "finished";

interface TimerProps {
  ms: number;
  color: Color;
}

export const Timer = ({ ms, color }: TimerProps) => {
  const [status, setStatus] = useState<Status>("idle");

  const [time, setTime] = useState(ms);
  const formattedTime = formatTime(time);

  // TODO: look into rendering performance and see if this is blocking a "paint"
  // or "composite" step by jumping on the main thread
  useEffect(() => {
    const interval = window.setInterval(() => {
      if (status === "running") {
        setTime((prevTime) => Math.max(prevTime - SECOND, 0));
      }
    }, SECOND);

    return () => {
      window.clearInterval(interval);
    };
  }, [status]);

  useEffect(() => {
    if (time === 0 && status === "running") {
      setStatus("finished");
    }
  }, [time, status]);

  const percentage = (time / ms) * 100;
  const percentageLeft = 100 - percentage;

  return (
    <main className="flex-grow py-8 px-0 flex flex-col justify-center items-center z-0 relative">
      <div
        className={`bg-${color}-50 fixed top-0 bottom-0 left-0 right-0 z-0 transform-gpu transition-transform ease-linear`}
        style={{
          // TODO: handle cases with all timer states
          transform:
            status === "running" ? `translateY(100%)` : `translateY(0)`,
          transitionDuration: `${ms}ms`,
        }}
      />

      <div className="z-10">
        <p className="text-6xl tabular-nums pb-8">{formattedTime}</p>

        {status === "finished" && (
          <span className="text-4xl pb-8">Tada! 🔥</span>
        )}

        <div className="space-y-4">
          {status === "paused" && (
            <Button
              color={color}
              onClick={() => {
                setStatus("running");
              }}
            >
              Resume
            </Button>
          )}

          {status === "idle" && (
            <Button
              color={color}
              onClick={() => {
                setStatus("running");
              }}
            >
              Start
            </Button>
          )}

          {status === "running" && (
            <Button
              color={color}
              onClick={() => {
                setStatus("paused");
              }}
            >
              Pause
            </Button>
          )}

          {status !== "idle" && (
            <Button
              color={color}
              onClick={() => {
                setTime(ms);
                setStatus("idle");
              }}
            >
              Reset
            </Button>
          )}
        </div>
      </div>
    </main>
  );
};

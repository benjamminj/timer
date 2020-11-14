import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { SECOND } from "../../lib/constants";
import { formatTime } from "../../lib/formatTime";

type Status = "idle" | "running" | "paused" | "finished";

type HomePageProps = {
  ms: number;
};

const Header = () => {
  return (
    <header className="flex w-full p-4">
      <Link href="/timers">
        <a className="text-xl">Back</a>
      </Link>
    </header>
  );
};

const Home = ({ ms }: HomePageProps) => {
  const [status, setStatus] = useState<Status>("idle");

  const [time, setTime] = useState(ms);
  const formattedTime = formatTime(time);

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

  return (
    <div className="min-h-screen py-0 px-2 flex flex-col justify-center items-center">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex-grow py-8 px-0 flex flex-col justify-center items-center">
        <p className="text-6xl tabular-nums pb-8">{formattedTime}</p>

        {status === "finished" && (
          <span className="text-4xl pb-8">Tada! 🔥</span>
        )}

        <div className="space-y-4">
          {status === "paused" && (
            <Button
              onClick={() => {
                setStatus("running");
              }}
            >
              Resume
            </Button>
          )}

          {status === "idle" && (
            <Button
              onClick={() => {
                setStatus("running");
              }}
            >
              Start
            </Button>
          )}

          {status === "running" && (
            <Button
              onClick={() => {
                setStatus("paused");
              }}
            >
              Pause
            </Button>
          )}

          {status !== "idle" && (
            <Button
              onClick={() => {
                setTime(ms);
                setStatus("idle");
              }}
            >
              Reset
            </Button>
          )}
        </div>

        <Link href="/new" passHref>
          <div className="fixed bottom-6 right-6">
            <Button>Create</Button>
          </div>
        </Link>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<HomePageProps> = async (
  ctx
) => {
  const { id } = ctx.query as { id: string };

  const { data: timer } = await fetch(
    `${process.env.BASE_URL}/api/timers/${id}`
  ).then((res) => res.json());

  // HANDLE MISSING TIMER
  // Redirect to create?
  if (!timer?.duration) {
    ctx.res.setHeader("location", "/new");
    ctx.res.statusCode = 302;
    ctx.res.end();

    return {
      props: { ms: 0 },
    };
  }

  return {
    props: {
      ms: timer.duration,
    },
  };
};

export default Home;

import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { SECOND } from "../../lib/constants";
import { formatTime } from "../../lib/formatTime";

import styles from "../../styles/Home.module.css";

type Status = "idle" | "running" | "paused" | "finished";

type HomePageProps = {
  ms: number;
};

const Header = () => {
  return (
    <header>
      <Link href="/timers">
        <a>Back</a>
      </Link>

      <style jsx>{`
        header {
          display: flex;
          width: 100%;
          padding: var(--size-m);
        }

        a {
          font-size: var(--font-size-h6);
        }
      `}</style>
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
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className={styles.main}>
        <p className={styles.timer}>{formattedTime}</p>

        {status === "finished" && (
          <span className={styles.finishedText}>Tada! 🔥</span>
        )}

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

        <Link href="/new" passHref>
          <Button className={styles.createNew}>Create</Button>
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

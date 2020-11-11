import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useReducer, useState } from "react";
import { Button } from "../components/Button";
import { HOUR, SECOND } from "../lib/constants";
import { formatTime } from "../lib/formatTime";
import styles from "../styles/Home.module.css";
import Link from "next/link";

type Status = "idle" | "running" | "paused" | "finished";

type HomePageProps = {
  ms: number;
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
  const { ms } = ctx.query as { ms: string };
  const duration = parseInt(ms, 10);
  return {
    props: {
      ms: isNaN(duration) ? 0 : duration,
    },
  };
};

export default Home;

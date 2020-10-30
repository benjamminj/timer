import Head from "next/head";
import { useEffect, useState } from "react";
import { HOUR, MINUTE, SECOND } from "../lib/constants";
import { formatTime } from "../lib/formatTime";
import styles from "../styles/Home.module.css";

const mockMs = HOUR * 2 + MINUTE * 3 + SECOND * 7 + 78;
const mockMsShort = MINUTE + 1000;

type Status = "idle" | "running" | "paused";

const Home = () => {
  const [status, setStatus] = useState<Status>("idle");

  const [time, setTime] = useState(mockMs);
  const { hours, minutes, seconds } = formatTime(time);

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

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <p className={styles.timer}>
          {[hours, minutes, seconds]
            .map((value) => String(value).padStart(2, "0"))
            .join(":")}
        </p>

        {status !== "running" && (
          <button
            className={styles.button}
            onClick={() => {
              setStatus("running");
            }}
          >
            {status === "paused" ? "Resume" : "Start"}
          </button>
        )}

        {status === "running" && (
          <button
            className={styles.button}
            onClick={() => {
              setStatus("paused");
            }}
          >
            Pause
          </button>
        )}
      </main>
    </div>
  );
};

export default Home;

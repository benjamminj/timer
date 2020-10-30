import { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { HOUR, MINUTE, SECOND } from "../lib/constants";
import styles from "../styles/New.module.css";

type FormStatus = "incomplete" | "submitting" | "completed";

const NewTimerPage = () => {
  const [status, setStatus] = useState<FormStatus>("incomplete");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const router = useRouter();
  return (
    <div className={styles.newTimerContainer}>
      <h1 className={styles.header}>Create a new timer</h1>
      <form
        className={styles.form}
        onSubmit={(ev) => {
          ev.preventDefault();

          const hoursInMs = Number(hours) * HOUR;
          const minutesInMs = Number(minutes) * MINUTE;
          const secondsInMs = Number(minutes) * SECOND;

          router.push({
            pathname: "/",
            query: { ms: hoursInMs + minutesInMs + secondsInMs },
          });
        }}
      >
        <div className={styles.inputContainer}>
          <Input
            onChange={(ev) => {
              setHours(ev.target.value);
            }}
            value={hours}
            name="hours"
            label="Hours"
          />
          <Input
            onChange={(ev) => {
              setMinutes(ev.target.value);
            }}
            value={minutes}
            name="minutes"
            label="Minutes"
          />
          <Input
            onChange={(ev) => {
              setSeconds(ev.target.value);
            }}
            value={seconds}
            name="seconds"
            label="Seconds"
          />

          <Button type="submit" className={styles.submit}>
            Create
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewTimerPage;

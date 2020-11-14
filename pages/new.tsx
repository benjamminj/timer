import { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { HOUR, MINUTE, SECOND } from "../lib/constants";

const NewTimerPage = () => {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const router = useRouter();
  return (
    <div className="max-w-lg p-8 my-0 mx-auto">
      <h1 className="text-4xl">Create a new timer</h1>
      <form
        className="pt-6"
        onSubmit={(ev) => {
          ev.preventDefault();

          const hoursInMs = Number(hours) * HOUR;
          const minutesInMs = Number(minutes) * MINUTE;
          const secondsInMs = Number(seconds) * SECOND;

          window
            .fetch("/api/timers", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                duration: hoursInMs + minutesInMs + secondsInMs,
              }),
            })
            .then((res) => {
              if (res.status !== 201) {
                throw new Error("😱");
              }

              return res.json();
            })
            .then((res) => {
              const { id } = res.data;
              router.push({ pathname: `/timers/${id}` });

              // TODO: handle error
            });
        }}
      >
        <div className="flex flex-col">
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

          <div className="mt-4">
            <Button type="submit">Create</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewTimerPage;

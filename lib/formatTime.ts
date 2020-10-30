import { HOUR, MINUTE, SECOND } from "./constants";

type Time = {
  hours: number;
  minutes: number;
  seconds: number;
};

export const formatTime = (milliseconds: number): Time => {
  // get the hours
  const hours = Math.floor(milliseconds / HOUR);
  const hoursRemainder = milliseconds % HOUR;

  const minutes = Math.floor(hoursRemainder / MINUTE);
  const minutesRemainder = hoursRemainder % MINUTE;

  const seconds = Math.floor(minutesRemainder / SECOND);

  return { hours, minutes, seconds };
};

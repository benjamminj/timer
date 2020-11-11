import { HOUR, MINUTE, SECOND } from "./constants";

export const formatTime = (milliseconds: number): string => {
  const hours = Math.floor(milliseconds / HOUR);
  const hoursRemainder = milliseconds % HOUR;

  const minutes = Math.floor(hoursRemainder / MINUTE);
  const minutesRemainder = hoursRemainder % MINUTE;

  const seconds = Math.floor(minutesRemainder / SECOND);

  return [hours, minutes, seconds]
    .map((value) => String(value).padStart(2, "0"))
    .join(":");
};

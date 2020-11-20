import { Timer } from "@prisma/client";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { ChevronRightIcon } from "../../components/ChevronRightIcon";
import { NewTimerButton } from "../../components/NewTimerButton";
import { formatTime } from "../../lib/formatTime";
import { getRandomColor } from "../../lib/getRandomColor";

interface TimersListPageProps {
  timers: Timer[];
}

const TimerPreview = ({ timer }: { timer: Timer }) => {
  const color = getRandomColor();
  return (
    <Link href={`/timers/${timer.id}`}>
      <a
        className={`block text-3xl py-8 px-4 focus:shadow-outline focus:outline-none bg-${color}-50 text-${color}-900 flex justify-between border-b-2 border-${color}-200`}
      >
        {timer.name || formatTime(timer.duration)}

        <ChevronRightIcon className="h-8 w-8" />
      </a>
    </Link>
  );
};

const TimersListPage = ({ timers }: TimersListPageProps) => {
  return (
    <div>
      <ul>
        {timers.map((timer) => (
          <li key={timer.id}>
            <TimerPreview timer={timer} />
          </li>
        ))}
      </ul>

      <NewTimerButton />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<TimersListPageProps> = async () => {
  const timers: Timer[] = await fetch(`${process.env.BASE_URL}/api/timers`)
    .then((res) => res.json())
    .then((json) => json.data);

  return {
    props: {
      timers,
    },
  };
};

export default TimersListPage;

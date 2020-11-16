import { Timer } from "@prisma/client";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { formatTime } from "../../lib/formatTime";

interface TimersListPageProps {
  timers: Timer[];
}

const TimerPreview = ({ timer }: { timer: Timer }) => {
  return (
    <>
      <Link href={`/timers/${timer.id}`}>
        <a className="block text-3xl py-8 px-4 border-gray-400 border-2 rounded-2xl focus:shadow-outline focus:outline-none">
          {timer.name || formatTime(timer.duration)}
        </a>
      </Link>
    </>
  );
};

const TimersListPage = ({ timers }: TimersListPageProps) => {
  return (
    <div className="p-4 pt-8">
      <h1 className="text-5xl">All timers</h1>

      <ul className="space-y-4 mt-8">
        {timers.map((timer) => (
          <li key={timer.id}>
            <TimerPreview timer={timer} />
          </li>
        ))}
      </ul>
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

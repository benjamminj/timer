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
        <a>{timer.name || formatTime(timer.duration)}</a>
      </Link>
      <style jsx>{`
        a {
          display: block;
          font-size: var(--font-size-h4);
          padding: var(--size-xl) var(--size-m);
          border: 2px solid #000;
          border-radius: var(--border-radius-m);
        }
      `}</style>
    </>
  );
};

const TimersListPage = ({ timers }: TimersListPageProps) => {
  return (
    <div className="TimersListPage">
      <h1>All timers</h1>

      <ul>
        {timers.map((timer) => (
          <li key={timer.id}>
            <TimerPreview timer={timer} />
          </li>
        ))}
      </ul>

      <style jsx>{`
        .TimersListPage {
          padding: var(--size-m);
          padding-top: var(--size-xl);
        }

        ul {
          padding-top: var(--size-xl);
        }

        li + li {
          margin-top: var(--size-m);
        }
      `}</style>
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

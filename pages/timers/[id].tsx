import { Timer as TimerInterface } from "@prisma/client";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { Header } from "../../components/Header";
import { Timer } from "../../components/Timer";
import { getRandomColor } from "../../lib/getRandomColor";

type HomePageProps = {
  ms: number;
  name?: string | null;
};

const TimerPage = ({ ms, name }: HomePageProps) => {
  const color = getRandomColor();

  // TODO: handle different colors on server / client
  return (
    <div
      className={`min-h-screen py-0 flex flex-col justify-center items-center bg-white`}
    >
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header backLink="/timers" color={color}>
        {name}
      </Header>

      <Timer ms={ms} color={color} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<HomePageProps> = async (
  ctx
) => {
  const { id } = ctx.query as { id: string };

  const { data: timer } = (await fetch(
    `${process.env.BASE_URL}/api/timers/${id}`
  ).then((res) => res.json())) as { data: TimerInterface };

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
      name: timer.name,
    },
  };
};

export default TimerPage;

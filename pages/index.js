import { getSession } from "next-auth/react";
import Head from "next/head";
import Input from "../components/input";

// import PostCard from "../UI/cards/post";

export default function Home() {
  return (
    <div>
      <Head></Head>
      <Input />
      {/* <PostCard
        title={"song title"}
        artist={"song artist"}
        photo={"https://api.lorem.space/image/album"}
        reproductionURL={
          "https://p.scdn.co/mp3-preview/93c5f800d1e0e7d988f1c96e23078357ffde8d4b?cid=fc23bc7797434d8c8954e8cd1c3e4bbd"
        }
      /> */}
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}

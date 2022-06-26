import { getSession } from "next-auth/react";
import Head from "next/head";
import { useState, useEffect } from "react";
import PostCard from "../UI/cards/post";
import { hasuraRequest } from "../lib/hasuraAdapter";
import { postsList } from "../graphql/queries";

// import PostCard from "../UI/cards/post";

export default function Home() {
  const [data, setData] = useState();
  const [showUploadModal, setShowUploadModal] = useState(false);

  const fetchData = async () => {
    setData(await hasuraRequest({ query: postsList }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Head></Head>
      <div className="mx-20">
        <button
          className="btn btn-primary max-w-sm mt-6"
          onClick={() => setShowUploadModal(true)}
        >
          Suggerisci un brano
        </button>
        {data &&
          data.posts.map((post) => (
            <div class="flex flex-row justify-center my-8">
              <PostCard
                class="w-100"
                title={post.title}
                artist={post.artistByArtist.name}
                photo={post.poster}
                reproductionURL={
                  post.track_preview_url && post.track_preview_url
                }
                likesAggregate={post.likes_aggregate?.aggregate?.count}
              />
            </div>
          ))}
      </div>
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

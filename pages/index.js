import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import { useState, useEffect } from "react";

import { postsList } from "../graphql/queries";
import { hasuraRequest } from "../lib/hasuraAdapter";
import request from "../lib/api";

import PostCard from "../UI/cards/post";
import Input from "../components/input";

import { modalAtom } from "../atoms/modals";
import { useRecoilState } from "recoil";

// import PostCard from "../UI/cards/post";

export default function Home() {
  const [data, setData] = useState();
  const [track, setTrack] = useState();
  const [url, setUrl] = useState("");

  const [, setShowModal] = useRecoilState(modalAtom);

  const { data: session } = useSession();

  const fetchData = async () => {
    setData(await hasuraRequest({ query: postsList(session?.user?.id) }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Head></Head>
      <div className="mx-20">
        {session?.user && (
          <button
            className="btn btn-primary max-w-sm mt-6"
            onClick={() =>
              setShowModal({
                show: true,
                children: (
                  <center>
                    <h2 className="text-3xl text-center">
                      Suggeriscici un brano!
                    </h2>
                    <p className="my-6 mx-12 text-[#a3aacf]">
                      Noi del team Leets cerchiamo di aggiungere nuovi brani
                      ogni giorno, ma non riusciamo a fare tutto da soli.
                      Inserisci l'URL di un brano che vorresti vedere su Leets e
                      potrai vedere il tuo artista crescere
                    </p>
                    <Input
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="URL"
                      label="Spotify link"
                      type="text"
                    />
                    <button
                      onClick={async () => {
                        try {
                          const { data } = await request({
                            userId: session?.token?.sub,
                            jwt: session?.token?.jwt,
                            endpoint: "/upload-spotify-url",
                            body: {
                              url: url.substring(
                                url.indexOf("track/") + 6,
                                url.lastIndexOf("?")
                              ),
                            },
                          });
                          setTrack(data);
                        } catch (error) {
                          console.log(error.response.request);
                          if (error?.response?.request?.status === 409) {
                            setShowModal({
                              show: true,
                              children: <p>{error.response.data}</p>,
                            });
                          }
                        }
                      }}
                      className="btn mt-6"
                    >
                      Invia
                    </button>

                    {track && (
                      <div className=" flex flex-row justify-center">
                        <PostCard
                          title={track.trackName}
                          artist={track.artistData.name}
                          photo={track.images[0].url}
                          reproductionURL={track.previewSong}
                        />
                      </div>
                    )}
                  </center>
                ),
              })
            }
          >
            Suggerisci un brano
          </button>
        )}

        {data &&
          data.posts.map((post) => (
            <div class="flex flex-row justify-center my-8">
              {console.log(post)}
              <PostCard
                class="w-100"
                title={post.title}
                artist={post.artistByArtist.name}
                photo={post.poster}
                reproductionURL={
                  post.track_preview_url && post.track_preview_url
                }
                likesAggregate={post.likes_aggregate?.aggregate?.count}
                isLiked={post?.likes ? post.likes.length > 0 : false}
                postId={post.id}
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

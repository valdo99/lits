import { getSession, useSession } from "next-auth/react";
import { useState } from "react";
import request from "../lib/api";
import Input from "../components/input";
import PostCard from "../UI/cards/post";

export default function UploadSong({}) {
  const [url, setUrl] = useState("");
  const [track, setTrack] = useState();
  const { data: session } = useSession();

  return (
    <div>
      <Input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="URL"
        label="Insert spotify song link"
        type="text"
      />
      <button
        onClick={async () => {
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
        }}
        className="btn"
      >
        Upload
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

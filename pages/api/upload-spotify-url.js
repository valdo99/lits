import request from "request";
import axios from "axios";
import { insertPostOne } from "../../graphql/mutations";
import { getSession } from "next-auth/react";
import { hasuraRequest } from "../../lib/hasuraAdapter";

var authOptions = {
  url: "https://accounts.spotify.com/api/token",
  headers: {
    Authorization:
      "Basic " +
      new Buffer(
        process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET
      ).toString("base64"),
  },
  form: {
    grant_type: "client_credentials",
  },
  json: true,
};

export default async function handler(req, res) {
  const { user } = await getSession({ req });
  if (req.method === "POST") {
    // if (!user) {
    //   return res.status(401).send("Unauthorized request");
    // }
    request.post(authOptions, async function (error, response, body) {
      if (!error && response.statusCode === 200) {
        // use the access token to access the Spotify Web API
        try {
          const { data } = await axios.get(
            `https://api.spotify.com/v1/tracks/${req.body.url}`,
            {
              headers: {
                Authorization: `${body.token_type} ${body.access_token}`,
              },
            }
          );

          const artistData = data.artists[0];
          const image = data?.album?.images[0].url;
          const trackName = data.name;
          const previewSong = data?.preview_url;
          const trackId = data.id;
          const album = data?.album?.name;
          const trackUrl = `https://open.spotify.com/track/${req.body.url}`;

          //TODO 1 -> controllare se canzone esiste già
          //TODO 2 -> controllare se artista esiste già, se non esiste inserire.
          //TODO 3 -> controllare se canzone esiste già

          const responseObj = {
            artistData,
            trackName,
            previewSong,
            trackId,
            album,
          };

          const d = await hasuraRequest({
            query: insertPostOne({
              author: "13jvLDXME7yplEwCweRivE",
              spotify_url: trackUrl,
              poster: image,
              title: trackName,
              track_preview_url: previewSong,
              id: trackId,
              hunter: user.id,
            }),
            admin: true,
          });
          console.log(d);
          if (d?.insert_posts_one)
            return res.status("200").send(d?.insert_posts_one);

          return res.status(404).send("not found");
        } catch (error) {
          console.log(error);
          res.status("500").send(error);
        }
      }
    });

    // Process a POST request
  } else {
    res.status("403").send("O KARI NPIDH, solo POST è supportata");
  }
}

import request from "request";
import axios from "axios";
import { insertArtistOne, insertPostOne } from "../../graphql/mutations";
import { getSession } from "next-auth/react";
import { hasuraRequest } from "../../lib/hasuraAdapter";
import { ArtistByPk, findPostByPk } from "../../graphql/queries";

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
          try {
            const { posts_by_pk } = await hasuraRequest({
              query: findPostByPk(trackId),
              admin: true,
            });
            if (posts_by_pk) {
              return res.status(403).send("Track already registered");
            }
          } catch (error) {}

          const { artist_by_pk } = await hasuraRequest({
            query: ArtistByPk(artistData?.id),
            admin: true,
          });
          if (!artist_by_pk) {
            //TODO  -> inserire artista.
            await hasuraRequest({
              query: insertArtistOne({
                id: artistData?.id,
                name: artistData.name,
                user: user.id,
              }),
              admin: true,
            });
          }

          // const responseObj = {
          //   artistData,
          //   trackName,
          //   previewSong,
          //   trackId,
          //   album,
          // };

          const d = await hasuraRequest({
            query: insertPostOne({
              artist: artistData.id,
              spotify_url: trackUrl,
              poster: image,
              title: trackName,
              track_preview_url: previewSong,
              id: trackId,
              userBy: user.id,
            }),
            admin: true,
          });
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

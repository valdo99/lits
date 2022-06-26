export const insertPostOne = ({
  author,
  spotify_url,
  title,
  poster,
  track_preview_url,
  hunter,
}) => `
mutation creratePost {
  insert_posts_one(object: {author: "${author}", spotify_url: "${spotify_url}", title: "${title}", poster: "${poster}", track_preview_url: "${track_preview_url}", hunter: "${hunter}"}){
    artistByArtist{
      name
    }
    track_preview_url
    poster
    spotify_url
    title
    user{
      name
      surname
    }
  }
}

`;

export const insertPostOne = ({
  id,
  artist,
  spotify_url,
  title,
  poster,
  track_preview_url,
  userBy,
}) => `
mutation createPost {
  insert_posts_one(object: {id:"${id}", artist: "${artist}", spotify_url: "${spotify_url}", title: "${title}", poster: "${poster}" ${
  track_preview_url ? `, track_preview_url: "${track_preview_url}",` : ""
} userBy: "${userBy}"}){
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

export const insertArtistOne = ({ id, name, user }) => `
mutation MyMutation {
  insert_artist_one(object: {id: "${id}", name: "${name}", userBy: "${user}"}){
    name
    id
  }
}
`;

export const likePost = ({ post, user }) => `
mutation Like {
  insert_likes_one(object: {post: "${post}", user: "${user}"}){
    id
  }
}
`;

export const dislikePost = ({ post, user }) => `
mutation Dislike {
  delete_likes(where: {user: {_eq: "${user}"}, post: {_eq: "${post}"}}) {
    affected_rows
  }
}
`;

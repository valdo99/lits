export const postsList = (userId) => `query MyQuery {
  posts(order_by: {likes_aggregate: {count: desc}, created_at: desc}) {
    id
    artistByArtist {
      name
    }
    user {
      image
      name
      surname
    }
    likes_aggregate {
      aggregate {
        count(distinct: true)
      }
    }
    ${
      userId
        ? `likes(where: {user: {_eq: "${userId}"}}) {
        user
      }`
        : ""
    }

    created_at
    poster
    spotify_url
    title
    track_preview_url
  }
}

`;

export const findPostByPk = (id) => `
query FindPostById {
  posts_by_pk(id: "${id}") {
    id
  }
}
`;

export const ArtistByPk = (artistId) => `
query Artist_by_pk {
  artist_by_pk(id: "${artistId}"){
    name
  }
}
`;

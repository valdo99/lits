export const postsList = `query MyQuery {
  posts(order_by: {likes_aggregate: {count: desc}, created_at: desc}) {
    authorByAuthor {
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
    created_at
    poster
    spotify_url
    title
    track_preview_url
  }
}

`;

export const postsList = `
query MyQuery {
    posts {
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
`
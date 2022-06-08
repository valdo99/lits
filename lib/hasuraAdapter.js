import { GraphQLClient } from "graphql-request";
import jwt from "jsonwebtoken";
import { randomBytes } from "crypto";

export const hasuraFetch = async ({
  query,
  variables,
  token = null,
  admin = false,
}) => {
  if (process.env.HASURA_URL && process.env.HASURA_ADMIN_SECRET) {
    let headers = {};
    if (admin) {
      headers["X-Hasura-Admin-Secret"] = process.env.HASURA_ADMIN_SECRET;
    } else if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    const result = await fetch(process.env.HASURA_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({ query, variables }),
    }).then((res) => res.json());

    if (!result || !result.data) {
      console.error(result);
      return [];
    }

    return result.data;
  }
  return {};
};

export const hasuraRequest = async ({
  query = "",
  variables = {},
  token = null,
  admin = false,
}) => {
  try {
    if (process.env.NEXT_PUBLIC_HASURA_URL) {
      let headers = {};
      if (admin) {
        headers["X-Hasura-Admin-Secret"] = process.env.HASURA_ADMIN_SECRET;
      } else if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      const graphQLClient = new GraphQLClient(
        process.env.NEXT_PUBLIC_HASURA_URL,
        {
          headers,
        }
      );
      return graphQLClient.request(query, variables);
    }
    return {};
  } catch (error) {
    return error;
  }
};

export const hasuraClaims = async (id, email) => {
  const jwtSecret = JSON.parse(process.env.AUTH_PRIVATE_KEY || "");
  const token = jwt.sign(
    {
      userId: String(id),
      "https://hasura.io/jwt/claims": {
        "x-hasura-user-id": String(id),
        "x-hasura-role": "user",
        "x-hasura-default-role": "user",
        "x-hasura-allowed-roles": ["user"],
      },
      iat: Date.now() / 1000,
      exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
      sub: id,
    },
    jwtSecret.key,
    {
      algorithm: jwtSecret.type,
    }
  );
  return token;
};

export const hasuraDecodeToken = async (token) => {
  const jwtSecret = JSON.parse(process.env.AUTH_PRIVATE_KEY || "");
  const decodedToken = jwt.verify(token, jwtSecret.key, {
    algorithms: jwtSecret.type,
  });
  return decodedToken;
};

export const HasuraAdapter = (config = {}, options = {}) => {
  return {
    displayName: "HASURA",
    async createUser(user) {
      const data = await hasuraRequest({
        query: `
          mutation createUser($user: users_insert_input!) {
            insert_users_one(object: $user) {
              id
              email
            }
          }
        `,
        variables: {
          user: {
            id: randomBytes(32).toString("hex"),
            emailVerified: user.emailVerified?.toISOString() ?? null,
            ...user,
          },
        },
        admin: true,
      });
      return data?.insert_users_one || null;
    },
    async getUser(id) {
      const data = await hasuraRequest({
        query: `
          query getUser($id: String!){
            users(where: {id: {_eq: $id}}) {
              id
              email
              name
              birthDate
              surname
            }
          }
        `,
        variables: {
          id,
        },
        admin: true,
      });
      return data?.users[0] || null;
    },
    async getUserByEmail(email) {
      const data = await hasuraRequest({
        query: `
          query getUser($email: String!){
            users(where: {email: {_eq: $email}}) {
              id
              email
              name
              birthDate
              surname
            }
          }
        `,
        variables: {
          email,
        },
        admin: true,
      });
      return data?.users[0] || null;
    },
    async getUserByAccount({ providerAccountId, provider }) {
      const data = await hasuraRequest({
        query: `
          query getUserByAccount($provider: String!, $providerAccountId: String!){
            users(where: {
                _and: {
                  accounts: {
                      provider: {_eq: $provider}, 
                      providerAccountId: {_eq: $providerAccountId}
                    }
                }
              }){
              id
              email
              name
              birthDate
              surname
              accounts {
                provider
                providerAccountId
              }
            }
          }
        `,
        variables: {
          provider,
          providerAccountId,
        },
        admin: true,
      });
      return data?.users[0] || null;
    },
    async updateUser(user) {
      return;
    },
    async deleteUser(userId) {
      return;
    },
    async linkAccount(account) {
      const data = await hasuraRequest({
        query: `
          mutation linkAccount($account: accounts_insert_input!) {
            insert_accounts_one(object: $account) {
              id
              userId
              provider
              providerAccountId
            }
          }
        `,
        variables: {
          account: {
            id: randomBytes(32).toString("hex"),
            ...account,
          },
        },
        admin: true,
      });
      return data?.insert_accounts_one || null;
    },
    async unlinkAccount({ providerAccountId, provider }) {
      return;
    },
    async createSession({ sessionToken, userId, expires }) {
      const sessionMaxAge = 30 * 24 * 60 * 60;

      const data = await hasuraRequest({
        query: `
          mutation createSession($session: sessions_insert_input!) {
            insert_sessions_one(object: $session) {
              id
              userId
              expires
              sessionToken
            }
          }
        `,
        variables: {
          session: {
            id: randomBytes(32).toString("hex"),
            expires: new Date(Date.now() + sessionMaxAge),
            userId,
            sessionToken,
          },
        },
        admin: true,
      });
      return data?.insert_sessions_one || null;
    },
    async getSessionAndUser(sessionToken) {
      const data = await hasuraRequest({
        query: `
          query getSessionAndUser(!sessionToken: String!){
            session(where: {
              sessionToken: {_eq: $sessionToken}
            }){
              sessionToken
              expires
              User {
                id
                email
                name
                surname
                birthDate
              }
            }
          }
        `,
        variables: {
          sessionToken,
        },
      });
      return data?.sessions[0] || null;
    },
    async updateSession({ sessionToken }) {
      return;
    },
    async deleteSession(sessionToken) {
      return;
    },
    async createVerificationToken({ identifier, expires, token }) {
      return;
    },
    async useVerificationToken({ identifier, token }) {
      return;
    },
  };
};
export default HasuraAdapter;

import axios from "axios";

export default function request({
  method = "POST",
  body,
  userId,
  jwt,
  endpoint,
}) {
  return new Promise(async (resolve, reject) => {
    if (!userId || !jwt) {
      reject("User needs to be logged");
    }

    const headers = {
      authorization: `Bearer ${jwt}`,
    };

    try {
      const res = await axios({
        url: `http://localhost:3000/api${endpoint}`,
        method,
        data: body,
        headers,
      });
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
}

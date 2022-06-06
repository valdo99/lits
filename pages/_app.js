import { SessionProvider } from "next-auth/react";

import "../styles/global.css";
import Navbar from "../UI/navbar/navbar";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Navbar />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;

import { SessionProvider } from "next-auth/react";
import "../styles/global.css";
import Navbar from "../UI/navbar/navbar";
import CompleteProfile from "../UI/complete-profile/complete-profile";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <CompleteProfile />
      <Navbar />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;

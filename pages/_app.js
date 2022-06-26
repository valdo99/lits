import { SessionProvider } from "next-auth/react";
import "../audio.css";

import "../styles/global.css";
import Navbar from "../UI/navbar/navbar";
import CompleteProfile from "../UI/complete-profile/complete-profile";
import { RecoilRoot } from "recoil";
import ModalsHandler from "../components/ModalsHandler";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <CompleteProfile />
        <Navbar />
        <Component {...pageProps} />
        <ModalsHandler />
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;

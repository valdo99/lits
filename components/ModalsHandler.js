import { useRecoilState } from "recoil";
import { loginModal, modalAtom } from "../atoms/modals";
import LoginModal from "./modals/LoginModal";
import Modal from "./modals/Modal";

export default function ModalsHandler() {
  const [showLogin] = useRecoilState(loginModal);
  const [{ show }] = useRecoilState(modalAtom);

  return (
    <>
      {showLogin && <LoginModal />}
      {show && <Modal />}
    </>
  );
}

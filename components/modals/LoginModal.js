import { useRef } from "react";
import { useRecoilState } from "recoil";
import { loginModal } from "../../atoms/modals";
import useOnClickOutside from "../../hooks/useOnClickOutside";

export default function LoginModal({}) {
  const [showLogin, setShowLogin] = useRecoilState(loginModal);
  const ref = useRef();
  useOnClickOutside(ref, () => setShowLogin(false));
  return (
    <div class={`modal ${showLogin && "modal-open"}`}>
      <div class="modal-box w-11/12 max-w-5xl" ref={ref}>
        <h3 class="font-bold text-lg">Congratulations random Interner user!</h3>
        <p class="py-4">
          You've been selected for a chance to get one year of subscription to
          use Wikipedia for free!
        </p>
        <div class="modal-action"></div>
      </div>
    </div>
  );
}

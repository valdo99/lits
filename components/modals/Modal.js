import { useRef } from "react";
import { useRecoilState } from "recoil";
import { modalAtom } from "../../atoms/modals";
import useOnClickOutside from "../../hooks/useOnClickOutside";

export default function LoginModal({}) {
  const [{ show, children }, setShowModal] = useRecoilState(modalAtom);
  const ref = useRef();
  useOnClickOutside(ref, () => setShowModal({ show: false, children: null }));
  return (
    <div class={`modal ${show && "modal-open"}`}>
      <div class="modal-box w-11/12 max-w-5xl" ref={ref}>
        {children}
        <div class="modal-action"></div>
      </div>
    </div>
  );
}

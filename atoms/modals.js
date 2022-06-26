import { atom } from "recoil";

const loginModal = atom({
  key: "loginModalAtom",
  default: false,
});

const modalAtom = atom({
  key: "modalAtom",
  default: {
    show: false,
    children: <h1>hiiii</h1>,
  },
});

export { loginModal, modalAtom };

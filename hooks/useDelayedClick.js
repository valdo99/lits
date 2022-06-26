import { useRef, useState } from "react";
import { dislikePost, likePost } from "../graphql/mutations";
import { hasuraRequest } from "../lib/hasuraAdapter";

const useDelayedLikeButton = (initialValue) => {
  const [{ isLiked, post, user, jwt }, setValue] = useState(initialValue);
  const timeOutRef = useRef();

  const handleChange = () => {
    window.clearTimeout(timeOutRef.current);

    timeOutRef.current = window.setTimeout(async () => {
      setValue(!isLiked);
      if (!isLiked) {
        await hasuraRequest({ query: likePost({ post, user }), token: jwt });
        console.log("liking");
      } else {
        await hasuraRequest({ query: dislikePost({ post, user }), token: jwt });

        console.log("not liking");
      }
    }, 300);
  };

  return [{ isLiked, post, user }, handleChange];
};

export default useDelayedLikeButton;

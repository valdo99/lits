import { useState, useEffect } from "react";
import AudioPlayer from "../../components/audio-player";

export default function PostCard({ title, artist, photo, reproductionURL,likesAggregate }) {
  const [classNameLike,setClassNameLike] = useState('dislike');
  const [likes,setLikes] = useState(likesAggregate);



  return (
    <div class="card lg:card-side bg-base-100 shadow-xl lg:w-full">
      <figure>
        <img class="w-40" src={photo} alt={title} />
      </figure>
      <div class="card-body py-0 px-5">
        <div class="flex flex-row justify-between">
          <div>
            <h2 class="card-title text-3xl">{title}</h2>
              <p>{artist}</p>
                <div class="card-actions justify-between">
                  <div>
                    {reproductionURL && (
                      <AudioPlayer
                      src={reproductionURL}
                      className="rounded-lg py-2 bg-opacity-30 mt-10 mb-2"
                      />
                    )}
                  </div>
                </div>
            </div>
            <div>
          <button class={`like-button ${classNameLike}`} onClick={() => {
            if(classNameLike==="dislike" ){
              setClassNameLike("active")
              setLikes(likes+1)
            }else{
              setClassNameLike("dislike")
              setLikes(likes-1)
            }
           }} id="like">
        <div class="icon">
            <svg class="prime" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill="currentColor"
                    d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z">
                </path>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill="currentColor"
                    d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z">
                </path>
            </svg>
        </div>
        <div className="counter" id="couter">{likes}</div>
        </button>
        </div>
        </div>
      </div>
    </div>
  );
}

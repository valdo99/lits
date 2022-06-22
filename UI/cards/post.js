import AudioPlayer from "../../components/audio-player";

export default function PostCard({ title, artist, photo, reproductionURL }) {
  return (
    <div class="card lg:card-side bg-base-100 shadow-xl lg:w-4/6">
      <figure>
        <img class="w-40" src={photo} alt={title} />
      </figure>
      <div class="card-body py-0 px-5">
        <h2 class="card-title text-3xl">{title}</h2>
        <p>{artist}</p>
        <div class="card-actions justify-between">
          {/* <audio
            class="rounded-lg color-primary"
            src={reproductionURL}
            controls
          /> */}
          <div>
            {reproductionURL && (
              <AudioPlayer
                src={reproductionURL}
                className="rounded-lg bg-secondary py-2  bg-opacity-30 mb-2"
              />
            )}
          </div>

          <button class="btn btn-primary mb-2 mr-2">Like</button>
        </div>
      </div>
    </div>
  );
}

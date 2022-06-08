import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { hasuraRequest } from "../../lib/hasuraAdapter";

const reloadSession = () => {
  const event = new Event("visibilitychange");
  document.dispatchEvent(event);
};

export default function CompleteProfile({}) {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    await hasuraRequest({
      query: `
      mutation UpdateUser {
        update_users_by_pk(pk_columns: {id: "${session?.token?.sub}"}, _set: {surname: "${data.surname}", name: "${data.name}"}) {
          id
          email
        }
      }
    `,
      token: session?.token?.jwt,
    });
    reloadSession();
  };

  const [showModal, setShowModal] = useState(!session?.user?.surname);

  useEffect(() => {
    setShowModal(!session?.user?.surname);
    console.log(session);
  }, [session]);

  if (session?.user) {
    return (
      <div class={`modal ${showModal && "modal-open"}`}>
        <div class="modal-box">
          <h3 class="font-bold text-lg">
            Congratulations random Interner user!
          </h3>
          <div class="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* register your input into the hook by invoking the "register" function */}
              <div class="py-5 space-y-3 sm:py-3">
                <div class="form-control w-full max-w-xs">
                  <label class="label">
                    <span class="label-text">What is your name?</span>
                  </label>
                  <input
                    {...register("name", { required: true })}
                    type="text"
                    placeholder="Name"
                    class="input input-bordered w-full max-w-xs"
                  />
                  {errors.name && (
                    <label class="label">
                      <span class="label-text-alt text-red-500">
                        This field is required
                      </span>
                    </label>
                  )}
                </div>
              </div>
              {/* include validation with required or other standard HTML validation rules */}
              <div class=" py-5 space-y-3 sm:py-3">
                <div class="form-control w-full max-w-xs">
                  <label class="label">
                    <span class="label-text">What is your surname?</span>
                  </label>
                  <input
                    {...register("surname", { required: true })}
                    type="text"
                    placeholder="Surname"
                    class="input input-bordered w-full max-w-xs"
                  />
                  {errors.surname && (
                    <label class="label">
                      <span class="label-text-alt text-red-500">
                        This field is required
                      </span>
                    </label>
                  )}
                </div>
              </div>
              {/* errors will return when field validation fails  */}
              <input className="btn" type="submit" />
            </form>
          </div>

          {/* <div class="modal-action">
            <button onClick={() => setShowModal(false)} class="btn">
              Yay!
            </button>
          </div> */}
        </div>
      </div>
    );
  }
  return null;
}

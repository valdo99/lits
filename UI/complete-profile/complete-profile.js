import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { hasuraRequest } from "../../lib/hasuraAdapter";
import Input from "../../components/input";

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
              <Input
                error={{
                  name: errors.name,
                  message: "This field is required",
                }}
                label="What is your name?"
                placeholder="Name"
                type="text"
                register={{ ...register("name", { required: true }) }}
              />
              {/* include validation with required or other standard HTML validation rules */}
              <Input
                error={{
                  name: errors.name,
                  message: "This field is required",
                }}
                label="What is your surname?"
                placeholder="Surname"
                type="text"
                register={{ ...register("surname", { required: true }) }}
              />
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

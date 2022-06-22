export default function Input({
  error,
  register,
  label,
  placeholder,
  type,
  ...props
}) {
  return (
    <div class="py-5 space-y-2 sm:py-2">
      <div class="form-control w-full max-w-xs">
        {label && (
          <label class="label">
            <span class="label-text">{label}</span>
          </label>
        )}
        <input
          // {...register("name", { required: true })}
          {...register}
          type={type}
          placeholder={placeholder}
          class="input input-bordered w-full max-w-xs"
          {...props}
        />
        {error && error.name && (
          <label class="label">
            <span class="label-text-alt text-red-500">{error.message}</span>
          </label>
        )}
      </div>
    </div>
  );
}

import { useFormContext } from "react-hook-form"
import { todosTitleValidationRules } from "@/libs/utils/formInputValidationRules"

type TextFieldProps = {
  field: string
  placeholder: string
}

export default function TextField({ field, placeholder }: TextFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <div className="relative text-field">
      <input
        {...register(field, todosTitleValidationRules)}
        className={`
          w-full
          px-6 py-3 
          rounded-sm 
          bg-slate-50 
          text-base font-normal text-basic placeholder:text-slate-400
          border focus:border-blue-500 focus:outline-none
          ${
            errors.title
              ? "border-error hover:border-error"
              : "border-slate-50 hover:border-blue-300"
          }
          `}
        type="text"
        autoComplete="off"
        placeholder={placeholder}
      />
      <p className="text-sm font-normal text-error mx-4 mt-2 w-full">
        {errors[`${field}`]?.message as string}
      </p>
    </div>
  )
}

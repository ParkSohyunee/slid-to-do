type LabelProps = {
  htmlFor: string
  children: string
}

export default function Label({ htmlFor, children }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-base font-semibold mb-3 text-basic block"
    >
      {children}
    </label>
  )
}

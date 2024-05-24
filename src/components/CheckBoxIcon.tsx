type CheckBoxProps = {
  state: "inactive" | "active" | "active-white"
}

export default function CheckBoxIcon({ state = "inactive" }: CheckBoxProps) {
  return <img src={`/icons/checkbox-${state}.svg`} alt="checkbox" />
}

import { SelectedOption } from "@/types/todos"
import CheckBoxIcon from "@/components/CheckBoxIcon"

type CheckBoxButtonProps = {
  option: SelectedOption
  selectedOption: SelectedOption
  handleToggleSelect: (value: SelectedOption) => void
}

export default function CheckBoxButton({
  option,
  selectedOption,
  handleToggleSelect,
}: CheckBoxButtonProps) {
  return (
    <button
      className={`
        flex gap-1 
        py-3 pr-3 pl-2
        rounded-button 
        text-base font-medium 
        ${
          selectedOption === option
            ? "bg-slate-900  text-white"
            : "bg-slate-100  text-basic"
        }`}
      onClick={() => handleToggleSelect(option)}
    >
      <CheckBoxIcon
        state={selectedOption === option ? "active-white" : "inactive"}
      />
      {option === "file" ? "파일 업로드" : "링크 첨부"}
    </button>
  )
}

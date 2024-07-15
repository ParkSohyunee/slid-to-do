type PopupMenuProps = {
  onClickEdit: () => void
  onClickDelete: () => void
}

export default function PopupMenu({
  onClickEdit,
  onClickDelete,
}: PopupMenuProps) {
  return (
    <div
      className={`
        absolute right-0 top-1/2 translate-y-1/4
        flex flex-col border border-slate-100
        rounded-sm shadow-lg 
        text-sm font-normal text-slate-700 
        bg-white z-10`}
    >
      <button
        onClick={onClickEdit}
        className="rounded-t-sm px-4 pt-2 pb-[6px] hover:bg-slate-50"
      >
        수정하기
      </button>
      <button
        onClick={onClickDelete}
        className="rounded-b-sm px-4 pb-2 pt-[6px] hover:bg-slate-50"
      >
        삭제하기
      </button>
    </div>
  )
}

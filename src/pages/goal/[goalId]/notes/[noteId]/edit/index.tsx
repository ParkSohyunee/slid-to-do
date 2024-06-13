import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { EditorState, convertFromRaw, convertToRaw } from "draft-js"
import { useForm } from "react-hook-form"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import DefaultEditor from "@/components/editor/DefaultEditor"
import { noteTitleValidationRules } from "@/libs/utils/formInputValidationRules"
import { NoteDetail, NoteFormData } from "@/types/note"
import { QUERY_KEYS } from "@/libs/constants/queryKeys"
import getNoteDetail from "@/pages/api/note/getNoteDetail"
import updateNote from "@/pages/api/note/updateNote"

export default function EditNotePage() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { noteId } = router.query
  const [visibleLink, setVisibleLink] = useState(true)

  const { data: note, isLoading } = useQuery<NoteDetail>({
    queryKey: [QUERY_KEYS.getNoteDetail, Number(noteId)],
    queryFn: () => getNoteDetail(Number(noteId)),
    staleTime: 1000 * 60 * 5,
    enabled: !!noteId,
  })

  const updateNoteMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.getNoteList] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.getNoteDetail] })
      alert("노트를 수정했습니다.")
      router.back()
    },
  })

  const {
    register,
    formState: { errors, isValid },
    watch,
    handleSubmit,
    trigger,
    setValue,
    reset,
  } = useForm<Omit<NoteFormData, "todoId">>({
    mode: "onBlur",
    defaultValues: {
      title: note?.title,
      content: note?.content,
      linkUrl: note?.linkUrl,
    },
  })

  /** editor state */
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  )

  /** 임시 저장하기 */
  const onClickSaveContents = () => {}

  /** 노트 수정하기 */
  const onSubmitUpdateNote = (data: Omit<NoteFormData, "todoId">) => {
    if (!note) return

    const isContent =
      editorState.getCurrentContent().getPlainText("").trim().length > 0
    if (!isContent) {
      alert("노트를 작성해주세요")
      return
    }

    if (
      note?.title === data.title &&
      note.content === data.content &&
      note.linkUrl === data.linkUrl
    ) {
      alert("수정한 내용이 없습니다.")
      return
    }

    const formData: Record<string, unknown> = {}

    if (note.title !== data.title) {
      formData["title"] = data.title
    }
    if (note.content !== data.content) {
      formData["content"] = data.content
    }
    if (note.linkUrl !== data.linkUrl) {
      formData["linkUrl"] = data.linkUrl
    }

    updateNoteMutation.mutate({
      noteId: Number(noteId),
      data: formData,
    })
  }

  useEffect(() => {
    if (note) {
      const contentState = convertFromRaw(JSON.parse(note.content))
      const newEditorState = EditorState.createWithContent(contentState)
      setEditorState(newEditorState)
      const raw = convertToRaw(contentState) // convert ContentState Object to a raw structure

      // update defaultValues
      reset({
        title: note.title,
        content: JSON.stringify(raw),
        linkUrl: note.linkUrl,
      })
    }
  }, [note, reset])

  return (
    <form
      onSubmit={handleSubmit(onSubmitUpdateNote)}
      className="h-full max-w-1200 flex flex-col bg-white"
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold text-slate-900">노트 수정</h1>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClickSaveContents}
            className="text-sm font-semibold text-blue-500 py-3 px-6"
          >
            임시저장
          </button>
          <button
            type="submit"
            className={`
            text-sm font-semibold text-white py-3 px-6 rounded-sm 
            ${
              isValid &&
              editorState.getCurrentContent().getPlainText("").trim().length > 0
                ? "bg-blue-500"
                : "bg-slate-400"
            }
            `}
          >
            수정하기
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-6 h-full">
        <div className="flex flex-col gap-3">
          <h3 className="flex gap-[6px] text-base font-medium text-basic items-center">
            <Image
              className="w-6 h-6 rounded-[6px] bg-slate-800 p-1"
              src="/icons/flag-white.svg"
              alt="목표"
              width={16}
              height={16}
            />
            {note?.goal.title}
          </h3>
          <div className="flex gap-2 items-center">
            <div className="text-xs font-medium text-slate-700 rounded-[4px] bg-slate-100 px-[3px] py-[2px]">
              {note?.todo.done ? "Done" : "To do"}
            </div>
            <span className="text-sm font-normal text-slate-700">
              {note?.todo.title}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-3 grow justify-between">
          <div className="pt-3 pb-3 border-t border-b border-slate-200 flex items-center justify-between">
            <input
              {...register("title", noteTitleValidationRules)}
              placeholder="노트의 제목을 입력해주세요"
              autoFocus
              defaultValue={note?.title}
              className={`
              text-lg font-medium text-basic w-full
              placeholder:text-slate-400 outline-none
              `}
            />
            <div className="flex text-xs font-medium px-1 py-[2px]">
              <span className={errors.title ? "text-error" : ""}>
                {watch("title")?.length ? watch("title").length : 0}
              </span>
              <span className="text-blue-500">{"/30"}</span>
            </div>
          </div>
          <p className="text-error">{errors.title && errors.title.message}</p>
          {note?.linkUrl && visibleLink && (
            <div className="rounded-[20px] bg-slate-200 flex justify-between items-center py-1 px-4 gap-1">
              <button type="button" className="flex items-center gap-2">
                <Image
                  className="bg-blue-500 rounded-full cursor-pointer p-1 w-6 h-6"
                  src="/icons/link-imbed.svg"
                  alt="링크 임베드 버튼"
                  width={24}
                  height={24}
                />
                <div className="text-base font-normal text-basic hover:text-blue-500 truncate">
                  {note.linkUrl}
                </div>
              </button>
              <Image
                onClick={() => setVisibleLink(false)}
                className="bg-slate-500 rounded-full rotate-45 cursor-pointer"
                src="/icons/close-small-white.svg"
                alt="닫기 버튼"
                width={18}
                height={18}
              />
            </div>
          )}
          <DefaultEditor
            setEditorState={setEditorState}
            editorState={editorState}
            trigger={trigger}
            setValue={setValue}
          />
        </div>
      </div>
    </form>
  )
}

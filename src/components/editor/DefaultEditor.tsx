import Image from "next/image"
import { Dispatch, MouseEvent, SetStateAction } from "react"
import { EditorState, RichUtils, convertToRaw } from "draft-js"
import dynamic from "next/dynamic"
import { useFormContext } from "react-hook-form"

import { NoteFormData } from "@/types/note"
import useToggle from "@/hooks/useToggle"
import CreateLinkContainer from "@/components/modal/CreateLinkModal"
import Label from "@/components/Label"
import TextField from "@/components/TextField"
import { noteLinkUrlValidationRules } from "@/libs/utils/formInputValidationRules"

type DefaultEditorProps = {
  editorState: EditorState
  setEditorState: Dispatch<SetStateAction<EditorState>>
}

const Editor = dynamic(() => import("draft-js").then((mod) => mod.Editor), {
  ssr: false,
})

export default function DefaultEditor({
  editorState,
  setEditorState,
}: DefaultEditorProps) {
  const {
    trigger,
    setValue,
    formState: { errors },
  } = useFormContext<NoteFormData & Omit<NoteFormData, "todoId">>()
  const linkPopup = useToggle()

  /** 링크 저장하기 */
  const handleSaveLink = () => {
    if (!errors.linkUrl) {
      trigger("linkUrl")
      linkPopup.close()
    }
  }

  /** 노트 에디터 onChange 이벤트 핸들러 */
  const handleChangeEditor = (e: EditorState) => {
    setEditorState(e)

    const contentState = editorState.getCurrentContent() // editor의 현재 contents를 반환
    const raw = convertToRaw(contentState) // convert ContentState Object to a raw structure

    // register로 등록하지 않고, react-hook-form 값으로 넣어주기
    setValue("content", JSON.stringify(raw))
    trigger("content")
  }

  const toggleInlineStyle = (type: string) => (e: MouseEvent) => {
    e.preventDefault()
    setEditorState(RichUtils.toggleInlineStyle(editorState, type))
  }

  return (
    <>
      {linkPopup.isOpen && (
        <CreateLinkContainer onClose={linkPopup.close} title="링크 업로드">
          <div className="flex flex-col gap-10">
            <div>
              <Label htmlFor="linkUrl">링크</Label>
              <TextField
                field="linkUrl"
                placeholder="영상이나 글, 파일의 링크를 넣어주세요"
                validationRules={noteLinkUrlValidationRules}
              />
            </div>
            <button
              onClick={handleSaveLink}
              type="button"
              className={`
            py-3 flex 
            justify-center items-center 
            self-stretch rounded-sm 
            text-white text-base font-semibold
            outline-none
            hover:bg-blue-600 active:bg-blue-800
            bg-blue-500
            transition-colors duration-500
            `}
            >
              확인
            </button>
          </div>
        </CreateLinkContainer>
      )}
      <div className="flex flex-col gap-4 justify-between grow">
        <div className="grow flex flex-col gap-2">
          <p className="text-xs font-medium text-basic">
            {`공백포함 : 총 ${editorState.getCurrentContent().getPlainText("").length}자 
          | 공백제외 : 총 ${
            editorState
              .getCurrentContent()
              .getPlainText("")
              .trim()
              .split(" ")
              .join("").length
          }자`}
          </p>
          <Editor
            editorState={editorState}
            onChange={handleChangeEditor}
            placeholder="이 곳을 클릭해 노트 작성을 시작해주세요"
          />
        </div>
        <div className="flex justify-between py-[10px] px-4 items-start gap-4 rounded-[21.5px] border border-slate-200 shadow-sm">
          <div className="flex gap-1">
            <button type="button" onMouseDown={toggleInlineStyle("BOLD")}>
              <Image
                src="/icons/editor-bold.svg"
                alt="bold"
                width={24}
                height={24}
              />
            </button>
            <button type="button" onMouseDown={toggleInlineStyle("ITALIC")}>
              <Image
                src="/icons/editor-italic.svg"
                alt="italic"
                width={24}
                height={24}
              />
            </button>
            <button type="button" onMouseDown={toggleInlineStyle("UNDERLINE")}>
              <Image
                src="/icons/editor-underline.svg"
                alt="underline"
                width={24}
                height={24}
              />
            </button>
          </div>
          <button
            onClick={linkPopup.open}
            type="button"
            className="bg-slate-200 rounded-full w-6 h-6 p-[2px]"
          >
            <Image
              src="/icons/link-editor.svg"
              alt="link"
              width={20}
              height={20}
            />
          </button>
        </div>
      </div>
    </>
  )
}

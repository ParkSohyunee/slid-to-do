import Image from "next/image"
import { ChangeEvent, Dispatch, SetStateAction, useRef } from "react"

type UploadFileProps = {
  uploadFile?: File
  setUploadFile: Dispatch<SetStateAction<File | undefined>>
}

export default function UploadFile({
  uploadFile,
  setUploadFile,
}: UploadFileProps) {
  const hiddenInputRef = useRef<HTMLInputElement>(null)

  /** 업로드 할 파일 url 변경 */
  const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      return setUploadFile(e.target.files[0])
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => hiddenInputRef.current?.click()}
        className={`
          h-[184px] rounded-sm bg-slate-50 
          text-base font-normal text-slate-400 
          flex flex-col items-center justify-center gap-2`}
      >
        <Image
          src={
            uploadFile
              ? "/icons/file-uploaded.svg"
              : "/icons/gray-plus-large.svg"
          }
          alt="파일 업로드 버튼"
          width={24}
          height={24}
        />
        {uploadFile ? uploadFile.name : "파일을 업로드해주세요"}
      </button>
      <input
        type="file"
        onChange={handleChangeFile}
        ref={hiddenInputRef}
        className="hidden"
      />
    </>
  )
}

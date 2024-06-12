import Image from "next/image"
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react"

type UploadFileProps = {
  uploadFile?: File
  setUploadFile: Dispatch<SetStateAction<File | undefined>>
  fileUrl?: string
}

export default function UploadFile({
  uploadFile,
  setUploadFile,
  fileUrl,
}: UploadFileProps) {
  const hiddenInputRef = useRef<HTMLInputElement>(null)
  const [visibleImage, setVisibleImage] = useState(true)

  /** 업로드 할 파일 url 변경 */
  const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      return setUploadFile(e.target.files[0])
    }
  }

  const deleteFileImage = () => {
    setVisibleImage(false)
  }

  return (
    <>
      {fileUrl && visibleImage ? (
        <div
          className={`
        relative h-[184px] rounded-sm bg-slate-50 
        text-base font-normal text-slate-400 overflow-hidden
        `}
        >
          <Image
            onClick={deleteFileImage}
            className="absolute right-2 top-2 rotate-45 z-[1] cursor-pointer"
            src="/icons/close-large-white.svg"
            alt="이미지 삭제 버튼"
            width={24}
            height={24}
          />
          <Image
            className="w-full h-full object-cover rounded-sm hover:scale-125 transition-scale duration-500"
            src={fileUrl}
            alt="업로드 파일"
            fill
          />
        </div>
      ) : (
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
      )}

      <input
        type="file"
        onChange={handleChangeFile}
        ref={hiddenInputRef}
        className="hidden"
      />
    </>
  )
}

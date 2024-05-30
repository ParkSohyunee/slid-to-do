type ProgressBarProps = {
  progress?: number
}

export default function ProgressBar({ progress = 0 }: ProgressBarProps) {
  return (
    <div
      className={`
      py-[2px] px-[9px] self-stretch rounded-[13px] 
      border border-slate-100 bg-white 
      flex gap-2 items-center
      `}
    >
      <div className="w-full relative">
        <div className="bg-slate-100 rounded-[6px] h-1"></div>
        <div
          style={{ width: `${progress}%` }}
          className={`
          progress-bar
          bg-slate-900 rounded-[6px] h-1 
          absolute top-0
          `}
        ></div>
      </div>
      <span className="text-xs font-semibold text-slate-900">
        {progress ? progress : 0}%
      </span>
    </div>
  )
}

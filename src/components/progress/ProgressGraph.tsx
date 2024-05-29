type ProgressGraphProps = {
  progress?: number
}

export default function ProgressGraph({ progress = 0 }: ProgressGraphProps) {
  const radius = 67
  const circumference = 2 * Math.PI * radius // 원형 그래프의 둘레
  const offset = circumference - (progress / 100) * circumference // 일정길이만큼(progress) 원형을 그려주는 값

  return (
    <svg
      className="absolute right-[20%] top-[42px]"
      xmlns="http://www.w3.org/2000/svg"
      width="166"
      height="166"
      viewBox="0 0 166 166"
      fill="none"
    >
      <circle cx="83" cy="83" r={radius} stroke="#F8FAFC" strokeWidth="32" />
      <circle
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        cx="83"
        cy="83"
        r={radius}
        stroke="#0F172A"
        strokeWidth="32"
      />
    </svg>
  )
}

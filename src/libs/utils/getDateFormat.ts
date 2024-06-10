/**
 * 날짜를 인자로 받아서 알맞은 형식으로 반환해주는 함수
 * @param date String 날짜
 * @returns format 형식으로 변경된 날짜 반환
 */
const getDateFormat = (date: string) => {
  const currentDate = new Date(date)

  const year = currentDate.getFullYear()
  const month = String(currentDate.getMonth() + 1).padStart(2, "0")
  const day = String(currentDate.getDate()).padStart(2, "0")
  const hours = String(currentDate.getUTCHours()).padStart(2, "0")
  const minutes = String(currentDate.getUTCMinutes()).padStart(2, "0")

  return `${year}. ${month}. ${day}. ${hours}:${minutes}`
}

export default getDateFormat

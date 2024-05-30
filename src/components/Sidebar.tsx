import { useQuery } from "@tanstack/react-query"

import { QUERY_KEYS } from "@/libs/constants/queryKeys"
import getUser from "@/pages/api/user/getUser"

export default function Sidebar() {
  const { data: user } = useQuery({
    queryKey: [QUERY_KEYS.getUser],
    queryFn: getUser,
  })

  console.log(user)

  return (
    <article
      className={`
      bg-blue-200 
        xl:w-[280px] tablet:w-[60px] 
        absolute 
        h-full 
        max-tablet:relative 
        max-tablet:h-12`}
    ></article>
  )
}

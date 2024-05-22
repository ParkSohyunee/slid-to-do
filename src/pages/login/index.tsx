import { ChangeEvent, MouseEvent, useState } from "react"
import createLogin from "@/pages/api/auth/createLogin"

export default function LoginPage() {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  })

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValue({
      ...formValue,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmitForm = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    try {
      const result = await createLogin({
        email: formValue.email,
        password: formValue.password,
      })

      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section>
      <form>
        <label htmlFor="email">아이디</label>
        <input id="email" type="text" onChange={handleChangeInput} />
        <label htmlFor="password">비밀번호</label>
        <input id="password" type="password" onChange={handleChangeInput} />
        <button type="button" onClick={handleSubmitForm}>
          로그인하기
        </button>
      </form>
    </section>
  )
}

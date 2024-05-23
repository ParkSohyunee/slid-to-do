export const emailValidationRules = {
  required: "이메일은 입력해 주세요.",
  pattern: {
    value: /^[a-z]+@[a-z]+.[a-z]{2,3}$/,
    message: "이메일 형식으로 작성해 주세요.",
  },
}

export const passwordValidationRules = {
  required: "비밀번호를 입력해 주세요.",
}

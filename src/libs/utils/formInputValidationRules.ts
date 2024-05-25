export {
  emailValidationRules,
  passwordValidationRules,
  todosTitleValidationRules,
  todosLinkUrlValidationRules,
}

export type ValidationRules = {
  required?: string
  pattern?: {
    value: RegExp
    message: string
  }
  maxLength?: {
    value: number
    message: string
  }
}

const emailValidationRules = {
  required: "이메일은 입력해 주세요.",
  pattern: {
    value: /^[a-z]+@[a-z]+.[a-z]{2,3}$/,
    message: "이메일 형식으로 작성해 주세요.",
  },
}

const passwordValidationRules = {
  required: "비밀번호를 입력해 주세요.",
}

const todosTitleValidationRules = {
  required: "할 일 제목을 입력해 주세요.",
  maxLength: {
    value: 30,
    message: "제목은 최대 30자 이하로 작성해 주세요.",
  },
}

const todosLinkUrlValidationRules = {
  pattern: {
    value:
      /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?(\?[^\s]*)?(#[^\s]*)?$/,
    message: "링크 형식으로 입력해 주세요.",
  },
}

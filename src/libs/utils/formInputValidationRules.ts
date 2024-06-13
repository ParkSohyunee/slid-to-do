export {
  emailValidationRules,
  passwordValidationRules,
  todosTitleValidationRules,
  todosLinkUrlValidationRules,
  noteTitleValidationRules,
  nameValidationRules,
  passwordForSignUpValidationRules,
}

export type ValidationRules = {
  required?: string
  pattern?: {
    value: RegExp
    message: string
  }
  minLength?: {
    value: number
    message: string
  }
  maxLength?: {
    value: number
    message: string
  }
  validate?: (value: string) => string | boolean
}

const nameValidationRules = {
  required: "이름을 입력해 주세요.",
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

const passwordForSignUpValidationRules = {
  required: "비밀번호를 입력해 주세요.",
  minLength: {
    value: 8,
    message: "비밀번호는 최소 8자 이상으로 작성해 주세요.",
  },
  maxLength: {
    value: 20,
    message: "비밀번호는 최대 20자 이하로 작성해 주세요.",
  },
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

const noteTitleValidationRules = {
  required: "노트 제목을 입력해 주세요.",
  maxLength: {
    value: 30,
    message: "제목은 최대 30자 이하로 작성해 주세요.",
  },
  validate: (value: string) => {
    if (!!value.trim()) {
      return true
    }
    return "노트 제목을 입력해 주세요."
  },
}

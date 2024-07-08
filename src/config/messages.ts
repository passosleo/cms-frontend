export const messages = {
  response: {
    error: {
      default: "Algo deu errado, tente novamente mais tarde",
    },
  },
  validations: {
    isRequired: "Campo obrigatório",
    email: {
      isNotValid: "E-mail inválido",
    },
    password: {
      min: (min: number) => `A senha deve ter no mínimo ${min} caracteres`,
    },
    date: {
      isNotValid: "Selecione uma data valida",
    },
    string: {
      isNotEqual: "Os campos não são iguais",
      isEmpty: "O campo está vazio",
    },
  },
};

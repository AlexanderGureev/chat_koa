export default class Validator {
  constructor() {
    this.errorList = [];
    this.validationMethod = {
      login: [
        {
          isValid: input => {
            return input.length < 4;
          },
          errorMessage: "Имя пользователя должно содержать не меньше 4 символов"
        },
        {
          isValid: input => {
            let res = /[^а-яёa-z0-9]/i.test(input);
            return res;
          },
          errorMessage: "Имя пользователя не должно содержать спец. символы"
        },
        {
          isValid: input => {
            let res = input.length == 0;
            return res;
          },
          errorMessage: "Поле не может быть пустым"
        }
      ],
      password: [
        {
          isValid: input => {
            return input.length < 4;
          },
          errorMessage: "Пароль должен содержать не меньше 4 символов"
        },
        {
          isValid: input => {
            let res = input.length == 0;
            return res;
          },
          errorMessage: "Поле не может быть пустым"
        }
      ],
      passwordConfirm: previousPassword => {
        return [
          {
            isValid: password => {
              return !(password === previousPassword);
            },
            errorMessage: "Пароли должны совпадать"
          },
          {
            isValid: input => {
              return input.length < 4;
            },
            errorMessage: "Пароль должен содержать не меньше 4 символов"
          },
          {
            isValid: input => {
              let res = input.length == 0;
              return res;
            },
            errorMessage: "Поле не может быть пустым"
          }
        ];
      },
      email: [
        {
          isValid: input => {
            return !/.+\@.+\..+/.test(input);
          },
          errorMessage: "Введите корректный email (например, email@email.com)"
        },
        {
          isValid: input => {
            let res = /[^а-яёa-z0-9@.]/i.test(input);
            return res;
          },
          errorMessage: "Имя почтового ящика не должно содержать спец. символы"
        },
        {
          isValid: input => {
            let res = input.length == 0;
            return res;
          },
          errorMessage: "Поле не может быть пустым"
        }
      ]
    };
  }

  get errors() {
    return this.errorList;
  }

  isValid(input, type) {
    this.errorList = [];
    const validateMethods = this.validationMethod[type];

    validateMethods.forEach(({ isValid, errorMessage }) => {
      if (isValid(input)) {
        this.errorList.push(errorMessage);
      }
    });

    return !this.errorList.length ? true : false;
  }
}

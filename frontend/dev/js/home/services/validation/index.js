export default class Validator {
  constructor() {
    this.validationMethod = {
      login: [
        {
          checkValidity: input => {
            return input.length < 4;
          },
          errorMessage: "Имя пользователя должно содержать не меньше 4 символов"
        },
        {
          checkValidity: input => {
            let res = /[^а-яёa-z0-9]/i.test(input);
            return res;
          },
          errorMessage: "Имя пользователя не должно содержать спец. символы"
        },
        {
          checkValidity: input => {
            let res = input.length == 0;
            return res;
          },
          errorMessage: "Поле не может быть пустым"
        }
      ],
      password: [
        {
          checkValidity: input => {
            return input.length < 4;
          },
          errorMessage: "Пароль должен содержать не меньше 4 символов"
        },
        {
          checkValidity: input => {
            let res = input.length == 0;
            return res;
          },
          errorMessage: "Поле не может быть пустым"
        }
      ],
      passwordConfirm: passwordConfirm => {
        return [
          {
            checkValidity: password => {
              return !(password === passwordConfirm);
            },
            errorMessage: "Пароли должны совпадать"
          },
          {
            checkValidity: input => {
              return input.length < 4;
            },
            errorMessage: "Пароль должен содержать не меньше 4 символов"
          },
          {
            checkValidity: input => {
              let res = input.length == 0;
              return res;
            },
            errorMessage: "Поле не может быть пустым"
          }
        ];
      },
      email: [
        {
          checkValidity: input => {
            return !/.+\@.+\..+/.test(input);
          },
          errorMessage: "Введите корректный email (например, email@email.com)"
        },
        {
          checkValidity: input => {
            let res = /[^а-яёa-z0-9@.]/i.test(input);
            return res;
          },
          errorMessage: "Имя почтового ящика не должно содержать спец. символы"
        },
        {
          checkValidity: input => {
            let res = input.length == 0;
            return res;
          },
          errorMessage: "Поле не может быть пустым"
        }
      ]
    };
  }

  _isValid(value, type) {
    const errors = [];
    let validateMethods;
    let _value = value;

    if(value instanceof Array && type === "passwordConfirm") {
      validateMethods = this.validationMethod[type](value[0]);
      _value = value[1];
    } else {
      validateMethods = this.validationMethod[type];
    }

    validateMethods.forEach(({ checkValidity, errorMessage }) => {
      if (checkValidity(_value)) {
        errors.push(errorMessage);
      }
    });

    return {
      isValid: !errors.length,
      errors
    };
  }

  loginValidation = ({ value }) => this._isValid(value, "login");
  emailValidation = ({ value })=> this._isValid(value, "email");
  passwordValidation = ({ value }) => this._isValid(value, "password");
  passwordConfirmValidation = (password, passwordConfirm) => this._isValid([password.value, passwordConfirm.value], "passwordConfirm");
}


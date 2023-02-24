export const validationSchema = {
    email: {
        isRequired: {
            message: "Электронная почта обязательна для заполнения"
        },
        isEmail: {
            message: "Электронная почта заполнена некорректно"
        }
    },
    password: {
        isRequired: {
            message: "Пароль обязателен для заполнения"
        },
        isPassword: {
            message:
                "Пароль должен быть не менее 8 символов, содержать (A-z, 0-9) и один из символов (!#$%&?)"
        }
    },
    profession: {
        isRequired: {
            message: "Пожалуйста выберите профессию"
        }
    },
    licence: {
        isRequired: {
            message: "Пожалуйста примите лицензионное соглашение"
        }
    }
};

import Quiz from "../Quiz/Quiz.jsx";
import {useId, useState} from "react";
import styles from './Form.module.scss';
import axios from "axios";

export default function Form({quizData}) {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
    const [pending, setPending] = useState(false);
    const [formSuccess, setFormSuccess] = useState(false);
    const inputNameId = useId();
    const inputMessageId = useId();
    const [quizResult, setQuizResult] = useState([]);

    const setQuizResultHandler = ({quest, answer}) => {
        const resultHasQuest = quizResult.some((resultItem) => resultItem.quest === quest);
        let result = [...quizResult];
        if (resultHasQuest) {
            result = result.map((resultItem) => {
                if (resultItem.quest === quest) {
                    return {...resultItem, answer}
                }

                return resultItem
            })
        } else {
            result = [...result, {
                quest,
                answer
            }]
        }

        setQuizResult(result);
    }

    const submitForm = async () => {
        const checkRequiredFields = name.length && message.length;
        setErrors({})
        const errors = {};

        if (!checkRequiredFields) {
            if (!name.length) {
                errors.name = 'Пожалуйста, введите своё имя'
            }

            if (!message.length) {
                errors.message = 'Пожалуйста, введите ваше сообщение'
            }

            setErrors(errors);
        } else {
            setPending(true)
            const result = await axios.post('/api/send', {
                name,
                message,
                quiz: quizResult
            })
            setPending(false);

            if (result.data?.success) {
                setFormSuccess(true);
                setName('');
                setMessage('');
                setQuizResult([]);
            } else {
                errors.request = 'Не удалось отправить форму'
                setErrors(errors);
            }
        }
    }

    return (
        <div className={styles.form__wrapper}>
            <h2 className={styles.form__title}>
                Пожалуйста, ответьте на вопросы, которые подготовили для вас Жених и Невеста
            </h2>

            <form
                className={`${styles.form} ${pending ? styles.form__pending : null}`}
                onSubmit={(e) => {
                    e.preventDefault()
                    submitForm();
                }}
            >
                {
                    formSuccess
                    &&
                    <div className={styles.form__success}>
                        Благодарим за обращение!
                    </div>
                }
                <div className={styles.form__field}>
                    <label htmlFor={inputNameId}>Ваше имя</label>
                    <input
                        id={inputNameId}
                        className={styles.form__field_input}
                        name="name"
                        onChange={(e) => {
                            setName(e.target.value)
                            if (e.target.value.length) {
                                setErrors((prevState) => {
                                    return {...prevState, name: ''}
                                })
                            }
                        }}
                        value={name}
                    />
                    {
                        errors.name
                        &&
                        <span className={styles.error}>
                            {errors.name}
                        </span>
                    }
                </div>
                <div className={styles.form__field}>
                    <label htmlFor={inputMessageId}>Добавить сообщение для жениха и невесты</label>
                    <textarea
                        id={inputMessageId}
                        className={styles.form__field_input}
                        name="message"
                        rows={4}
                        onChange={(e) => {
                            setMessage(e.target.value)

                            if (e.target.value.length) {
                                setErrors((prevState) => {
                                    return {...prevState, message: ''}
                                })
                            }
                        }}
                        value={message}
                    />
                    {
                        errors.message
                        &&
                        <span className={styles.error}>
                            {errors.message}
                        </span>
                    }
                </div>

                <Quiz
                    quizData={quizData}
                    quizResult={quizResult}
                    onChange={({quest, answer}) => setQuizResultHandler({quest, answer})}
                />
                <button className={styles.form__button} type={'submit'}>
                    Отправить
                </button>
                {
                    errors.request
                    &&
                    <span className={styles.error}>
                        {errors.request}
                    </span>
                }
            </form>
        </div>
    )
}
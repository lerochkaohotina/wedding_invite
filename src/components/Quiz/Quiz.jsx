import styles from './Quiz.module.scss';
import {useState} from "react";

export default function Quiz({quizData, quizResult, onChange}) {
    return (
        <div className={styles.quiz}>
            <div className={styles.quiz__sections}>
                {
                    quizData.map((quizSection, index) => (
                        <div className={styles.quiz__section} key={index}>
                            <div className={styles.quiz__quest}>{quizSection.quest}</div>
                            <div className={styles.quiz__variants}>
                                {
                                    quizSection.variants.map((variant, key) => (
                                        <div className={styles.quiz__variant} key={`quiz-${index}-${key}`}>
                                            <input
                                                className={styles.quiz__variant_input}
                                                type={"radio"}
                                                id={`quiz-${index}-${key}`}
                                                name={`quiz-${index}`}
                                                value={variant}
                                                checked={quizResult.some((quizItem) => {
                                                    return quizSection.quest === quizItem.quest && variant === quizItem.answer;
                                                })}
                                                onChange={(event) => {
                                                    onChange({
                                                        quest: quizSection.quest,
                                                        answer: event.target.value
                                                    })
                                                }}
                                            />
                                            <label
                                                className={styles.quiz__variant_label}
                                                htmlFor={`quiz-${index}-${key}`}
                                            >
                                                {variant}
                                            </label>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
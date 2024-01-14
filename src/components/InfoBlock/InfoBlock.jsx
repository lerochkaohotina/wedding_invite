import styles from './InfoBlock.module.scss';

export default function InfoBlock({date, time, address, colors}) {
    return (
        <div className={styles.info_block}>
            <h2 className={styles.info_block__title}>Дорогой гость</h2>
            <div className={styles.info_block__text}>
                Мы рады сообщить Вам, что {date} состоится главное торжество в нашей жизни -
                день нашей свадьбы. Приглашаем вас разделить с нами радость этого незабываемого дня.
            </div>
            <div className={`${styles.info_block__italic} italic`}>
                Ждем вас
            </div>
            <div className={styles.info_block__date_and_place}>
                <span>
                    {date} в {time}
                </span>
                <span>{address}</span>
            </div>
            <div className={styles.info_block__image}>
                <img src={'/picture-2.jpeg'} alt={'couple'} />
            </div>
            <div className={`${styles.info_block__italic} italic`}>
                Ваши Жених и Невеста
            </div>
            <div className={styles.info_block__colors}>
                Будем благодарны, если при выборе нарядов на наше торжество вы придержитесь следующей палитры

                <div className={styles.info_block__colors_list}>
                    {
                        colors.map((color, index) => (
                            <div
                                className={styles.info_block__colors_item}
                                style={{background: color}}
                                key={index}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
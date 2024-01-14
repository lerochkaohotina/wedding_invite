import styles from './Preview.module.scss';
import moment from "moment/min/moment-with-locales";
import 'moment/locale/ru';
import {useEffect, useState} from "react";

export default function Preview({date, address}) {
    const [timeLeft, setTimeLeft] = useState([]);
    const weddingDate = moment(date, 'DD.MM.YY');
    const formattingWeddingDate = moment(weddingDate).locale('ru').format('dddd, DD MMMM YYYY');
    function pluralizeHandler(number, after) {
        return `${after[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][Math.min(number % 10, 5)]]}`;
    }

    function prepareNumber(number) {
        return number >= 10 ? `${number}` : `0${number}`;
    }

    const setTimeLeftHandler = () => {
        const now = moment();
        const duration = moment.duration(weddingDate.diff(now));

        setTimeLeft([
            {
                title: pluralizeHandler(duration.as('weeks').toFixed(0), ['неделя', 'недели', 'недель']),
                value: prepareNumber(duration.as('weeks').toFixed(0))
            },
            {
                title: pluralizeHandler(duration.get('days'), ['день', 'дня', 'дней']),
                value: prepareNumber(duration.get('days'))
            },
            {
                title: pluralizeHandler(duration.get('hours'), ['час', 'часа', 'часов']),
                value: prepareNumber(duration.get('hours'))
            },
            {
                title: pluralizeHandler(duration.get('minutes'), ['минута', 'минуты', 'минут']),
                value: prepareNumber(duration.get('minutes'))
            },
            {
                title: pluralizeHandler(duration.get('seconds'), ['секунда', 'секунды', 'секунд']),
                value: prepareNumber(duration.get('seconds'))
            }
        ])
    }

    useEffect(() => {
        setTimeLeftHandler();

        setInterval(() => {
            setTimeLeftHandler();
        }, 1000)
    }, [])

    return (
        <div className={styles.preview}>
            <div className={styles.preview__content}>
                <div className={styles.preview__content_left}>
                    <div className={styles.preview__date}>
                        {
                            date.split('.').map((dateItem, index) => (
                                <div className={styles.preview__date_item} key={index}>{dateItem}</div>
                            ))
                        }
                    </div>
                    <div className={styles.line}></div>
                </div>
                <div className={styles.preview__content_right}>
                    <div className={styles.preview__image}>
                        <img src={'/picture-1.jpeg'} alt={'couple'} />
                    </div>
                    <div className={styles.preview__text}>
                        <div className={styles.preview__spouse_names}>
                            <div className={styles.preview__spouse}>Валерия</div>
                            <div className={'italic'}>И</div>
                            <div className={styles.preview__spouse}>Иван</div>
                        </div>
                        <div className={styles.preview__invite}>
                            Приглашаем вас разделить с нами радость главного события в нашей жизни
                        </div>
                        <div className={styles.preview__full_date}>
                            {formattingWeddingDate}
                        </div>
                        <div className={styles.preview__address}>
                            {address}
                        </div>
                        <div className={`${styles.preview__wait_text} italic`}>
                            Ждём Вас на нашей свадьбе!
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.preview__time_left}>
                {
                    timeLeft.map((item, index) => (
                        <div className={styles.preview__time_left_item} key={index}>
                            <div className={styles.preview__time_left_item_value}>{item.value}</div>
                            <div className={styles.preview__time_left_item_title}>{item.title}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
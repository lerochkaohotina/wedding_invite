import styles from './Schedule.module.scss';

export default function Schedule({schedule}) {
    return (
        <div className={styles.schedule}>
            <div className={styles.schedule__title}>
                Свадебное расписание
            </div>
            <div className={styles.schedule__list}>
                {
                    schedule.map((scheduleItem, index) => (
                        <div className={styles.schedule__item} key={index}>
                            <div className={styles.schedule__item_left}>
                                <span className={styles.schedule__item_time}>{scheduleItem.time}</span>
                                <span className={styles.schedule__item_date}>{scheduleItem.date}</span>
                            </div>
                            <div className={styles.schedule__item_right}>
                                <span className={styles.schedule__item_event}>{scheduleItem.event}</span>
                                <span className={styles.schedule__item_place}>{scheduleItem.place}</span>
                                <span className={styles.schedule__item_value}>{scheduleItem.value}</span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
import SaidBar from "../SideBar/saidBar.jsx";
import styles from './analyctics.module.scss'
import HeaderBar from "../HeaderBar/headerBar.jsx";
import {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import Select from "react-select";
import {Chart as ChartJS} from "chart.js/auto";
import {Line, Bar, Doughnut} from "react-chartjs-2"
import analyticsStore from "../../store/analyticsStore.js";
import Preloader from "../Preloader/preloader.jsx";
import dayjs from "dayjs";

// import Preloader from "../Preloader/preloader.jsx";
const Analytics = observer(() => {
    const {counts, fetchCounts, isLoading} = analyticsStore;
    const [curOption, setCurOption] = useState(
        {label: "Поточний місяць",
            value: {
                from: new Date(new Date().setDate(new Date().getMonth()-1)),
                to: new Date()
            }
        },
    );
    useEffect(() => {
        fetchCounts();
    }, [curOption])

    if (isLoading){
        return (
            <Preloader/>
        )
    }
    console.log(counts)

    const optionDate = [
        {label: "Поточний місяць",
            value: {
                    from: dayjs(new Date(new Date().getFullYear(), new Date().getMonth(), 1)).format('YYYY-MM-DD'),
                    to: dayjs(new Date()).format('YYYY-MM-DD'),
                }
        },
        {label: "Попередній місяць",
            value: {
                    from: dayjs(new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1)).format('YYYY-MM-DD'),
                    to: dayjs(new Date(new Date().getFullYear(), new Date().getMonth() - 2, 1)).format('YYYY-MM-DD')
            }
        },
        {label: "За весь час", value: {}},
    ]

    const onChangeOptionDate = (option) => {
        console.log(option)
    }

    return (
        <div className={styles.mainContainer}>
            <SaidBar/>
            <div className={styles.sidebarLayout}></div>
            <div className={styles.mainBar}>
                <HeaderBar title='Аналітика' aboutPage='Звіт'/>
                <div className={styles.analyticsBar}>
                    <div className={styles.totals}>
                        <div className={styles.total}>
                            <span>Всього замовлень</span>
                            <span>{counts.ordersCount}</span>
                        </div>
                        <div className={styles.total}>
                            <span>Всього товарів</span>
                            <span>{counts.productsCount}</span>
                        </div>
                        <div className={styles.total}>
                            <span>Всього платежів</span>
                            <span>{counts.paymentsCount}</span>
                        </div>
                        <div className={styles.total}>
                            <span>Всього клієнтів</span>
                            <span>{counts.contactsCount}</span>
                        </div>
                    </div>
                    <div className={styles.reportsBar}>
                        <div className={styles.reports}>
                            <Select options={optionDate}
                                    styles={
                                                {
                                                    control: (baseStyles) => ({
                                                        ...baseStyles,
                                                        width: 300,
                                                    }),
                                                }
                                    }
                                    onChange={onChangeOptionDate}
                                    defaultValue={curOption}
                            />
                            <div className={styles.report}>
                                <span>Звіт по продажам</span>
                                <Line data={{
                                    labels: ['lan', 'feb'],
                                    datasets: [
                                        {
                                            data: ['26', '73']
                                        }
                                    ]
                                }}/>
                            </div>
                            <div className={styles.report}>
                                <span>Звіт по продажам</span>
                                <Bar data={{
                                    labels: ['lan', 'feb'],
                                    datasets: [
                                        {
                                            data: ['26', '73']
                                        }
                                    ]
                                }}/>
                            </div>
                        </div>
                        <div className={styles.reportWithChatBot}>
                            <div className={styles.reportsBot}>
                                <div className={styles.reportBot}>
                                    <Doughnut data={{
                                        labels: ['lan', 'feb'],
                                        datasets: [
                                            {
                                                data: ['26', '73']
                                            }
                                        ]
                                    }}/>
                                </div>
                                <div className={styles.reportBot}>
                                    <Doughnut data={{
                                        labels: ['lan', 'feb'],
                                        datasets: [
                                            {
                                                data: ['26', '73']
                                            }
                                        ]
                                    }}/>
                                </div>
                            </div>
                            <div className={styles.chatBot}>
                                <span>Чат порад від боту!</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Analytics;
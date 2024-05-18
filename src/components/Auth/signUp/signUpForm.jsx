import {observer} from "mobx-react-lite";
import styles from "./signUpForm.module.scss";
import {Link, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {Context} from "../../../index.jsx";

const SignUpForm = () => {
    const [data, setData] = useState({
        name: '',
        surname: '',
        password: '',
        phone: '',
        email: '',
        domain: ''
    });
    const novigate = useNavigate();
    const {store} = useContext(Context);

    return (
        <div className={styles.mainContainer}>
            <div className={styles.imgLogo}/>
            <div className={styles.form}>
                <div className={styles.textRegistration}>
                    <span>Реєстрація</span>
                </div>
                <div className={styles.formColumns}>
                    <div className={styles.formColumnContent}>
                        <div>
                            <span>Імʼя</span>
                            <input
                                type="text"
                                placeholder='Софія'
                                onChange={e => setData((prevState) => {
                                    return {...prevState, name: e.target.value}
                                })}
                            />
                        </div>
                        <div>
                            <span>Призвище</span>
                            <input type="text" placeholder='Харченко'
                            onChange={e => setData((prevState) => {
                                return {...prevState, surname: e.target.value}
                            })}
                            />
                        </div>
                        <div>
                            <span>Пароль</span>
                            <input type="password" placeholder='*********'
                            onChange={e => setData((prevState) => {
                                return {...prevState, password: e.target.value}
                            })}
                            />
                        </div>
                    </div>
                    <div className={styles.formColumnContent}>
                        <div>
                            <span>Телефон</span>
                            <input
                                type="phone"
                                placeholder="+38 (099) 673-24-43"
                                onChange={e => setData((prevState) => {
                                    return {...prevState, phone: e.target.value}
                                })}
                            />
                        </div>
                        <div>
                            <span>Email</span>
                            <input
                                type="email"
                                placeholder="email@gmail.com"
                                onChange={e => setData((prevState) => {
                                    return {...prevState, email: e.target.value}
                                })}
                            />
                        </div>
                        <div>
                            <span>Домен</span>
                            <input
                                type="text"
                                placeholder="SofiAgency"
                                onChange={e => setData((prevState) => {
                                    return {...prevState, domain: e.target.value}
                                })}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.formContainerBtn}>
                    <button onClick={ () => {store.signUp(data.name, data.surname, data.domain, data.phone, data.email, data.password, novigate)}}>
                        Зареєструватися
                    </button>
                </div>
                <div>
                    <Link to="/" className={styles.link}>Вхід</Link>
                </div>
            </div>
        </div>
    );
};

export default observer(SignUpForm);
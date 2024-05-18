import React, {useContext} from 'react';
import {Context} from "../../../index.jsx";
import {observer} from "mobx-react-lite";
import styles from "./signIn.module.scss"
import {Link, useNavigate} from "react-router-dom";


const SignInForm = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [domain, setDomain] = React.useState('');

    const {store} = useContext(Context)

    return (
        <div className={styles.mainContainer}>
            <div className={styles.formContainer}>
                <div className={styles.imgLogo}/>
                <div className={styles.formContent}>
                    <div className={styles.textAuthorization}>
                        <span>Авторизація</span>
                    </div>
                    <div className={styles.form}>
                        <div>
                            <span>Домен</span>
                            <input
                                onChange={e => setDomain(e.target.value)}
                                value={domain}
                                type='text'
                                placeholder='SofiAgency'/>
                        </div>
                        <div>
                            <span>Пошта</span>
                            <input
                                onChange={e => setEmail(e.target.value)}
                                value={email}
                                type='text'
                                placeholder='user@gmail.com'
                                className=""/>
                        </div>
                        <div>
                            <span>Пароль</span>
                            <input
                                onChange={e => setPassword(e.target.value)}
                                value={password}
                                type='password'
                                placeholder='Password'/>
                        </div>
                        <div>
                            <button onClick={() => store.signIn(email, password, domain)}>
                                Увійти
                            </button>
                        </div>
                        <div>
                            <Link to='/' className={styles.link}>Відновити пароль</Link>
                            <Link to="/signUp" className={styles.link}>Реєстрація</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.imgContainer}>
                <div></div>
            </div>
        </div>
    );
};

export default observer(SignInForm);

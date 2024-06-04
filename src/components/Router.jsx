import {BrowserRouter, Routes, Route} from "react-router-dom";
import {useContext, useEffect} from "react";
import {Context} from "../index.jsx";
import {observer} from "mobx-react-lite";
import SignInForm from "./Auth/signIn/signInForm.jsx";
import SignUpForm from "./Auth/signUp/signUpForm.jsx";
import Dashboard from "./Dashboard/dashboard.jsx";
import Orders from "./Orders/orders.jsx";
import Preloader from "./Preloader/preloader.jsx";

const Router = observer(() => {
    const {store} = useContext(Context);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth();
        }
    }, []);

    if (store.isLoading){
        return <Preloader/>
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={store.isAuth ?  <Dashboard/> : <SignInForm/>} />
                <Route path="/signUp" element={store.isAuth ? <Dashboard/> : <SignUpForm/>}/>
                <Route path="/orders" element={store.isAuth ? <Orders/> : <SignInForm/>}/>
            </Routes>
        </BrowserRouter>
    );
});

export default Router;
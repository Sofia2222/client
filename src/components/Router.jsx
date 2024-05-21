import {BrowserRouter, Routes, Route} from "react-router-dom";
import {useContext, useEffect} from "react";
import {Context} from "../index.jsx";
import {observer} from "mobx-react-lite";
import SignInForm from "./Auth/signIn/signInForm.jsx";
import SignUpForm from "./Auth/signUp/signUpForm.jsx";
import Dashboard from "./Dashboard/dashboard.jsx";
import Orders from "./Orders/orders.jsx";

const Router = () => {
    const {store} = useContext(Context);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth();
        }
        console.log(store.isAuth)
    }, []);

    if (store.isLoading){
        return <div>Loading</div>
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={store.isAuth ?  <Dashboard/> : <SignInForm/>} />
                <Route path="/signUp" element={<SignUpForm/>}/>
                <Route path="/orders" element={<Orders/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default observer(Router);
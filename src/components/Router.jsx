import {BrowserRouter, Routes, Route} from "react-router-dom";
import {useContext, useEffect} from "react";
import {Context} from "../index.jsx";
import {observer} from "mobx-react-lite";
import SignInForm from "./Auth/signIn/signInForm.jsx";
import SignUpForm from "./Auth/signUp/signUpForm.jsx";
import Orders from "./Orders/orders.jsx";
import Preloader from "./Preloader/preloader.jsx";
import Contacts from "./Contacts/contacts.jsx";
import Products from "./Products/products.jsx";
import Payments from "./Payments/payments.jsx";
import Analytics from "./Analytics/analytics.jsx";

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
                <Route path="/" element={store.isAuth ?  <Orders/> : <SignInForm/>} />
                <Route path="/signUp" element={store.isAuth ? <Orders/> : <SignUpForm/>}/>
                <Route path="/contacts" element={store.isAuth ? <Contacts/> : <SignInForm/>}/>
                <Route path="/products" element={store.isAuth ? <Products/> : <SignInForm/>}/>
                <Route path="/payments" element={store.isAuth ? <Payments/> : <SignInForm/>}/>
                <Route path="/analytics" element={store.isAuth ? <Analytics/> : <SignInForm/>}/>
            </Routes>
        </BrowserRouter>
    );
});

export default Router;
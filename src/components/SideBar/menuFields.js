import {LuBarChart3, LuBoxes, LuContact, LuShoppingBasket, LuWallet} from "react-icons/lu";
const pages = [
    {
        title: 'Замовлення',
        link: '/',
        icon: LuShoppingBasket
    },
    {
        title: 'Клієнти',
        link: '/contacts',
        icon: LuContact
    },
    {
        title: 'Товари',
        link: '/products',
        icon: LuBoxes
    },
    {
        title: 'Аналітика',
        link: '/analytics',
        icon: LuBarChart3
    },
    {
        title: 'Платежі',
        link: '/payments',
        icon: LuWallet
    }
]

export default pages;
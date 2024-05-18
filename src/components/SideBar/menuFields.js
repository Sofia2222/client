import {LuBarChart3, LuBoxes, LuContact, LuLayoutDashboard, LuShoppingBasket, LuWallet} from "react-icons/lu";
const pages = [
    {
        title: 'Головна сторінка',
        link: '/dashboard',
        icon: LuLayoutDashboard
    },
    {
        title: 'Замовлення',
        link: '/orders',
        icon: LuShoppingBasket
    },
    {
        title: 'Клієнти',
        link: '/contacts',
        icon: LuContact
    },
    {
        title: 'Склад',
        link: '/storages',
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
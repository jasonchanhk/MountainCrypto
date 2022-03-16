import Link from 'next/link';
import { RiDashboardLine, RiCoinsLine, RiHome6Line, RiNewspaperLine, RiSettings3Line } from 'react-icons/ri';
import { GiMountaintop } from 'react-icons/gi'
import { IoMdClose, IoMdMenu, } from 'react-icons/io'
import { IconContext } from "react-icons";
import { useAppContext } from '../context/state';
import styles from './sidebar.module.css'
import { useState } from 'react'

export default function Layout({ children }) {
    const [context, setContext] = useAppContext()
    const [showSidebar, setShowSidebar] = useState(false);
    const menuItems = [
        {
            href: '/',
            title: 'Home',
            icon: <RiHome6Line />
        },
        {
            href: '/dashboard',
            title: 'Dashboard',
            icon: <RiDashboardLine />
        },
        {
            href: '/coins',
            title: 'Coins',
            icon: <RiCoinsLine />
        },
        {
            href: '/news',
            title: 'News',
            icon: <RiNewspaperLine />
        }
    ];

    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            <aside className={`fixed lg:sticky top-0 left-0 bg-indigo-700 w-60 h-screen tracking-wide z-50 ease-in-out duration-300 lg:translate-x-0 ${showSidebar ? "translate-x-0 " : "-translate-x-full"
                }`}>

                <div className='py-10 text-white flex justify-center '>
                    <IconContext.Provider value={{ size: "2.5em" }}>
                        <div className='pr-1 flex items-center'>
                            <GiMountaintop />
                        </div>
                    </IconContext.Provider>
                    <div className={styles.logotext}>MountCrypto</div>
                </div>

                <nav>
                    <ul>
                        {menuItems.map(({ href, title, icon }) => (
                            <li className='my-4' key={title}>
                                <IconContext.Provider value={{ size: "1.5em" }}>
                                    <Link href={href}>
                                        <a
                                            className={context == href ? "flex ml-6 mr-8 my-1 px-5 py-3 rounded-full bg-gradient-to-br from-indigo-800 to-indigo-600 text-white cursor-pointer font-medium" : "flex ml-6 mr-8 my-1 px-5 py-3 rounded-full  text-indigo-300 hover:text-indigo-200 active:text-indigo-400 cursor-pointer font-medium"}
                                            onClick={() => { setContext(href), setShowSidebar(!showSidebar) }}
                                        >
                                            {icon}<span className='pl-3'>{title}</span>
                                        </a>
                                    </Link>
                                </IconContext.Provider>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>            
            <main className="flex-1">
                <div className='h-14 flex justify-between sticky top-0 z-40 lg:hidden bg-indigo-600 text-white'>

                    <IconContext.Provider value={{ size: "2em" }}>
                        <div className='px-4 flex items-center'>
                            <Link href={'/'}>
                                <GiMountaintop />
                            </Link>
                        </div>
                        <div className='px-4 flex items-center'>
                            {showSidebar ? (
                                <button
                                    className=""
                                    onClick={() => setShowSidebar(!showSidebar)}
                                >
                                    <IoMdClose />
                                </button>
                            ) : (
                                <button
                                    onClick={() => setShowSidebar(!showSidebar)}
                                ><IoMdMenu />
                                </button>
                            )}
                        </div>
                    </IconContext.Provider>
                </div>
                {children}
            </main>
        </div>
    );
}
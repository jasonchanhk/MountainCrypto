import Link from 'next/link';
import { RiDashboardLine, RiCoinsLine, RiHome6Line, RiNewspaperLine, RiSettings3Line } from 'react-icons/ri';
import { GiMountaintop } from 'react-icons/gi'
import { IconContext } from "react-icons";
import { useAppContext } from '../context/state';
import styles from './sidebar.module.css'

export default function Layout({ children }) {
    const [context, setContext] = useAppContext()
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
        <div className="flex ">
            <div className="flex flex-col md:flex-row flex-1">
                <aside className='bg-indigo-700 w-full h-16 md:w-60 md:h-screen sticky top-0 tracking-wide'>

                    <div className='md:p-10 text-white flex md:justify-center '>
                        <IconContext.Provider value={{ size: "2.5em" }}>
                            <div className='mx-auto pr-2 inline-block align-middle'>
                                <GiMountaintop />
                            </div>
                        </IconContext.Provider>
                        <div className={styles.logotext} className='invisible md:visible'>MOUNTAIN</div>
                    </div>

                    <nav>
                        <ul>
                            {menuItems.map(({ href, title, icon }) => (
                                <li className='my-4' key={title}>
                                    <IconContext.Provider value={{ size: "1.5em" }}>
                                        <Link href={href}>
                                            <a
                                                className={context == href ? "flex ml-6 mr-8 my-1 px-5 py-3 rounded-full bg-gradient-to-br from-indigo-800 to-indigo-600 text-white cursor-pointer font-medium" : "flex ml-6 mr-8 my-1 px-5 py-3 rounded-full  text-indigo-300 hover:text-indigo-200 active:text-indigo-400 cursor-pointer font-medium"}
                                                onClick={() => { setContext(href) }}
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
                <main className="flex-1">{children}</main>
            </div>
        </div>
    );
}
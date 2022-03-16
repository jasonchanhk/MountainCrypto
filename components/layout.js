import Image from 'next/image'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'
import { useAppContext } from '../context/state';

export function Twosection({ reverse, src, alt, href, children }) {

    const [context, setContext] = useAppContext()
    return (
        <div className={`flex flex-col my-8 ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} `}>
            <div className='flex-1'>
                <div className='px-8 py-8'>
                    {children}

                    <Link href={href} passHref>
                        <button className=' bg-indigo-600 px-4 py-2 rounded-full' onClick={() => { setContext(href) }}>
                            <div className='text-white font-bold whitespace-nowrap flex align-middle'>Visit {alt} <span className='py-1 pl-2'><FaArrowRight /></span></div>
                        </button>
                    </Link>
                </div>
            </div>
            <div className='flex-1'>
                <div className='py-4 px-8 cursor-pointer flex justify-center'>
                    <div className='hover:shadow-xl hover:shadow-indigo-50 w-fit'>
                        <Link href={href} passHref>
                            <Image
                                src={src}
                                alt={alt}
                                width={500}
                                height={350}
                                onClick={() => { setContext(href) }}
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function TopPart({ title, children }) {
    return (
        <div className='flex flex-auto max-w-screen-xl mx-auto border-b-2 border-indigo-50 px-8 py-4 z-20'>
            {children}<h1 className="text-3xl md:text-4xl mt-3 font-bold text-indigo-600 ">{title}</h1>
        </div>
    )
}

export function ImageIntro({src, alt, size, desc, children }) {
    return (
        <div className='flex flex-col justify-center items-center pb-4 mx-auto'>
            <Image
                src={src}
                alt={alt}
                width={size}
                height={size}
            />
            <div className='text-indigo-900 w-fit'>
                <h1 className='font-bold text-4xl text-indigo-600 text-center'>
                    {children}
                </h1>
                <div className='text-center px-4 py-6'>
                    {desc}
                </div>
            </div>
        </div>
    )
}

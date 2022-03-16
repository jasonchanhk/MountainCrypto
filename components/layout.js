import Image from 'next/image'
import Link from 'next/link'
import {FaArrowRight} from 'react-icons/fa'
import { useAppContext } from '../context/state';

export function Twosection({reverse, gif, alt, href, children}){
    
  const [context, setContext] = useAppContext()
    return (
    <div className={`flex flex-col my-8 ${reverse ? 'lg:flex-row-reverse': 'lg:flex-row'} `}>
        <div className='flex-1'>
            <div className='px-8 py-8'>
            {children}
            <Link href={href}>
              <button className=' bg-indigo-600 px-4 py-2 rounded-full' onClick={() => {setContext(href)}}>
                <div className='text-white font-bold whitespace-nowrap flex align-middle'>Visit {alt} <span className='py-1 pl-2'><FaArrowRight/></span></div>
              </button>
            </Link>
            </div>
        </div>
        <div className='flex-1'>
            <div className='py-4 px-8 cursor-pointer flex justify-center'>
                <div className='hover:shadow-xl hover:shadow-indigo-50 w-fit'>
                    <Link href={href}>
                        <Image
                        src={`/images/${gif}.gif`}
                        alt={alt}
                        width={500}
                        height={350}
                        onClick={() => {setContext(href)}}
                        />
                    </Link>
                </div>
            </div>
        </div>
    </div>
    )
}
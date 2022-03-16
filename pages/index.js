import CreateHead from '../components/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { Twosection, TopPart, ImageIntro } from '../components/layout';
import { GiMountaintop } from 'react-icons/gi';
import { IconContext } from "react-icons";

export default function Home() {

  const pageOverview = [
    {
      reverse: false,
      href: '/dashboard',
      alt: 'Dashboard',
      src: '/images/dashboard_demo.gif',
      tagline: 'Track your profit on our bots',
      desc: 'Pay attention to your stats everyday, the bots toke the heavy lifting but you should definitely see how the mircale happens. Be informed with the active trading pairs and actualized profits.'
    },
    {
      reverse: true,
      href: '/coins',
      alt: 'Coins',
      src: '/images/coins_demo.gif',
      tagline: 'Do your own research on Crypto',
      desc: 'Getting to know the top 100 coins in the market for its background stories, historical performance and market position. Make sure you click into each coin for more information'
    },
    {
      reverse: false,
      href: '/news',
      alt: 'News',
      src: '/images/news_demo.gif',
      tagline: 'Stay alert for the market trend',
      desc: 'Cryptocurrecy is a new market that could be very volitate. Catch up with the news whenever you have time, opportunity always knocks at the least opportune moment and you could only seize it if you see it.'
    },
  ];

  const introDesc = (
    <>
      Getting into crypto is just like hiking.<br />
      There are people challenging Mount Everest and some walking up the hill in town.<br />
      We can always start small and benefit from it.
    </>
  )

  return (
    <div className="flex h-full flex-col tracking-wide">
      <CreateHead page={'Home'} />

      <div>
        <TopPart title={'Home'} />

        <div className='flex-auto flex-col w-full max-w-screen-xl flex mx-auto '>

          <div className='border-2 border-indigo-50'>
            <ImageIntro src={`/images/20945663.jpg`} alt={'MountCrypto'} size={450} desc={introDesc}>
              <span className='text-indigo-900'>Welcome to</span>
              <div>
                <IconContext.Provider value={{ size: "1.5em" }}>
                  <div className='mx-auto pb-2 pl-2 pr-1 inline-block align-middle'>
                    <GiMountaintop />
                  </div>
                </IconContext.Provider>
                <span className={styles.hometext}>MountCrypto</span> !
              </div>

            </ImageIntro>
          </div>


          {pageOverview.map(({ reverse, href, alt, src, tagline, desc }, index) => {
            return (
              <Twosection reverse={reverse} src={src} href={href} alt={alt} key={index}>
                <h1 className='font-semibold text-indigo-600 text-4xl'>
                  <span className='font-thin'>Features {`${index + 1}`}:  </span>
                  {alt}
                </h1>
                <h3 className='font-medium opacity-30 text-indigo-900 text-lg py-2'>{tagline}</h3>
                <p className=' pt-4 pb-8  text-indigo-900'>{desc}</p>
              </Twosection>
            )
          })}

        </div>
      </div>
    </div>

  )
}

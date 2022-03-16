import CreateHead from '../components/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { Twosection } from '../components/layout';
import { GiMountaintop } from 'react-icons/gi';
import { IconContext } from "react-icons";

export default function Home() {

  return (
    <div>
      <CreateHead page={'Home'} />
      
      <div className="flex h-full flex-col tracking-wide">
        <div className='flex-auto max-w-screen-xl w-full mx-auto border-b-2 border-indigo-50 px-8 py-4'>
          <h1 className="text-4xl mt-3 font-bold  text-indigo-600 ">Home</h1>
        </div>

        <div className='flex-auto flex-col w-full max-w-screen-xl flex mx-auto '>
          <div className='flex flex-col justify-center items-center pb-4 border-b-2 border-indigo-50 mx-auto'>
            <Image
              src={`/images/20945663.jpg`}
              width={450}
              height={450}
            />
            <div className='text-indigo-900 w-fit'>
              <h1 className='font-bold text-4xl text-indigo-900 text-center'>Welcome to
                <div className='text-indigo-600'>
                  <IconContext.Provider value={{ size: "1.5em" }}>
                    <div className='mx-auto pb-2 pl-2 pr-1 inline-block align-middle'>
                      <GiMountaintop />
                    </div>
                  </IconContext.Provider>
                  <span className={styles.hometext}>MountCrypto</span> !
                </div>
              </h1>
              <div className='text-center px-4'>
                Getting into crypto is just like hiking.<br/>
                There are people challenging Mount Everest and some walking up the hill in town.<br/>
                We can always start small and benefit from it.
              </div>
            </div>
          </div>

          <Twosection reverse={false} gif={'dashboard_demo'} href='/dashboard' alt='Dashboard'>
            <h1 className='font-semibold text-indigo-600 text-4xl'>
              <span className='font-thin'>Features 1:  </span>
              Dashboard
            </h1>
            <h3 className='font-medium opacity-30 text-indigo-900 text-lg py-2'>Track your profit on our bots</h3>
            <p className=' pt-4 pb-8  text-indigo-900'>Pay attention to your stats everyday, the bots toke the heavy lifting but you should definitely see how the mircale happens. Be informed with the active trading pairs and actualized profits.</p>
          </Twosection>

          <Twosection reverse={true} gif={'coins_demo'} href='/coins' alt='Coins'>
            <h1 className='font-semibold text-indigo-600 text-4xl'>
              <span className='font-thin'>Features 2:  </span>
              Coins
            </h1>
            <h3 className='font-medium opacity-30 text-indigo-900 text-lg py-2'>Do your own research on Crypto</h3>
            <p className=' pt-4 pb-8  text-indigo-900'>Getting to know the top 100 coins in the market for its background stories, historical performance and market position. Make sure you click into each coin for more information</p>
          </Twosection>

          <Twosection reverse={false} gif={'news_demo'} href='/news' alt='News'>
            <h1 className='font-semibold text-indigo-600 text-4xl'>
              <span className='font-thin'>Features 3:  </span>
              News
            </h1>
            <h3 className='font-medium opacity-30 text-indigo-900 text-lg py-2'>Stay alert for the market trend</h3>
            <p className=' pt-4 pb-8  text-indigo-900'>Cryptocurrecy is a new market that could be very volitate. Catch up with the news whenever you have time, opportunity always knocks at the least opportune moment and you could only seize it if you see it.</p>
          </Twosection>
        </div>
      </div>
    </div>

  )
}

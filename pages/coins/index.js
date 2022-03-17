import { PercentageBetterment, ReadableNumber } from '../../components/expression'
import { getData } from '../api/fetchingcoin'
import millify from 'millify';
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import CreateHead from '../../components/head';
import { TopPart, ImageIntro } from '../../components/layout';

export async function getServerSideProps() {
  const cryptosList = await getData()
  // Pass data to the page via props
  return {
    props: {
      cryptosList
    }
  }
}

export default function Coins({ cryptosList }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [cryptos, setCryptos] = useState(cryptosList?.data?.coins);

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setCryptos(filteredData)
  }, [cryptosList, searchTerm])

  function renderList() {
    return cryptos && cryptos.map((currency, index) => {
      return (
        <Link href={`/coins/${currency.uuid}`} key={index} passHref>
          <tr className="border-y-2 border-indigo-50 cursor-pointer text-sm md:text-base">
            <td className="py-2 pl-8 md:pl-14 lg:pl-24 font-medium w-21" style={{ width: '12%' }}>{(index + 1)}</td>
            <td className="p-2" style={{ width: '5%' }}>
              <span className='flex align-middle'>
                <Image
                  src={currency.iconUrl}
                  alt="cryptoIcon"
                  width={30}
                  height={30}
                  layout='fixed' />
              </span>
            </td>
            <td className="py-2 font-bold leading-5" style={{ width: '20%' }}>{currency.name}<br /><span className='font-thin'>{currency.symbol}</span></td>
            <td className="py-2 font-medium" style={{ width: '25%' }}>$ {ReadableNumber(currency.price)}</td>
            <td className="py-2 font-medium hidden lg:table-cell" style={{ width: '20%' }}>$ {millify(currency.marketCap, {
              precision: 2,
              units: ['', 'K', 'Million', 'Billion', 'Tillion', 'P', 'E'],
              space: true,
            })}</td>
            <td className="py-2 pr-8 md:pr-14" style={{ width: '18%' }}><PercentageBetterment percentage={currency.change} /></td>
          </tr>
        </Link>
      );
    })
  }

  const introDesc = (
    <>
      Everyday new project launches, hyping up the market with perfect numbers, <br />
      futuristic arts and visionary roadmaps. But investment is not just about word of mouth. <br />
      Do You Own Research and made your own investment decision.
    </>
  )

  return (
    <div className="flex h-full flex-col tracking-wide text-indigo-900">

      <CreateHead page={'Coins'} />

      <div>

        <TopPart title={'Coins'} />

        <div className='mt-10'>
          <ImageIntro src={`/images/pound.png`} alt={'Capital'} size={230} desc={introDesc}>
            Cryptocurrency Research Lab
          </ImageIntro>
        </div>

        <div className="flex mx-auto max-w-screen-xl justify-center mb-8">
          <span className="flex items-center input-group-text pr-3 font-bold rounded-l-full bg-indigo-50 py-2 pl-4 text-indigo-600">Search</span>
          <span className="py-2 pr-4 rounded-r-full bg-white border-2 border-indigo-50">
            <input
              className="focus:outline-none font-medium uppercase pl-2 tracking-wider"
              type="text"
              placeholder="Cryptocurrency"
              onChange={(e) => setSearchTerm(e.target.value)} />
          </span>
        </div>

        <div className="flex-auto mt-6 h-fit max-w-screen-xl justify-center mx-auto">
          <table className="table-auto px-36" style={{ width: "100%" }} >
            <thead>
              <tr className='text-left tracking-widest text-indigo-600  text-sm md:text-base'>
                <th key="cryptocurrency" className="pl-8 md:pl-14 lg:pl-24" colSpan="3">CRYPTOCURRENCY</th>
                <th key="price" className="">PRICE</th>
                <th key="marketcap" className="hidden lg:table-header-group">MARKET CAP</th>
                <th key="24h" className="pr-8 md:pr-14">24H</th>
              </tr>
            </thead>
            <tbody>
              {renderList()}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
import { formatDistanceToNowStrict, parseISO } from 'date-fns'
import { getData } from './api/fetchingnews'
import CreateHead from '../components/head'
import Image from 'next/image'
import { TopPart } from '../components/layout'

export async function getServerSideProps() {
  const newsList = await getData()
  // Pass data to the page via props
  return {
    props: {
      newsList
    }
  }
}

export default function News({ newsList }) {

  function renderNews() {

    const demoImage = "https://ih1.redbubble.net/image.959951874.3860/pp,840x830-pad,1000x1000,f8f8f8.jpg"

    return newsList && newsList.value.map((news, index) => {
      return (

        <a href={news.url} target="_blank" rel="noreferrer" key={index}>
          <div className='h-48 md:h-80  bg-gradient-to-br from-indigo-50 to-white shadow shadow-indigo-200 rounded-lg px-6 py-5 flex flex-col justify-between hover:shadow-indigo-600'>

            <div>
              <div className="flex flex-row">
                <div className="basis-3/4">
                  <h6 className="font-bold leading-5 pr-2">{news.name}</h6>
                </div>
                <div className="basis-1/4	">
                  <Image
                    src={news?.image?.thumbnail?.contentUrl || demoImage}
                    alt="news"
                    width={100}
                    height={100} />


                </div>
              </div>

              <div className="mt-4 hidden md:block">
                <p className="font-normal text-sm leading-5">{news.description.length > 180 ? `${news.description.substring(0, 180)} ...` : news.description}</p>
              </div>
            </div>

            <div className="flex md:justify-end">
              <span className="text-sm">
                <p className="font-bold md:text-right">{news.provider[0].name}</p>
                <p className="md:text-right">{formatDistanceToNowStrict(parseISO(news.datePublished))} agos</p>
              </span>
            </div>

          </div>
        </a>
      )
    })
  }

  return (


    <div className="flex h-full flex-col tracking-wide text-indigo-900">

      <CreateHead page={'News'} />

      <div>
        <TopPart title={'News'}/>

        <div className="flex-auto max-w-screen-xl px-8 py-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderNews()}
          </div>
        </div>
      </div>
    </div>
  );
}
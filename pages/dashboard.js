import { parseISO, format } from 'date-fns'
import { RiArrowDropRightFill } from 'react-icons/ri';
import { IconContext } from "react-icons";
import { Chart } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from 'chart.js';
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import CreateHead from '../components/head'

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
);

export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(`https://blokbot-dashboard-test.herokuapp.com/`)
  const data = await res.json()
  const ATP = await data?.dashboardinfo?.find(({ section }) => section === 'Active Trading Pairs');
  const TFCM = await data?.dashboardinfo?.find(({ section }) => section === 'Total for Current Month');
  const LWP = await data?.dashboardinfo?.find(({ section }) => section === 'Last 7 days profit');
  const TFPM = await data?.dashboardinfo?.find(({ section }) => section === 'Total for Previous Month');
  const AT = await data?.dashboardinfo?.find(({ section }) => section === 'Account Total');
  // Pass data to the page via props
  return { props: { ATP, TFCM, LWP, TFPM, AT } }
}

export default function Dashboard({ ATP, TFCM, LWP, TFPM, AT }) {

  function cumulativeArray() {
    let new_array = [];
    LWP &&
      Object.values(LWP.profits).reduce((a, b, i) => {
        return (new_array[i] = a + b);
      }, 0)
    let new_array_2dp = new_array.map(value => value.toFixed(2))
    return new_array_2dp
  }

  function profit_labels() {
    return LWP &&
      Object.keys(LWP.profits).map(value => value.substring(0, 3).toUpperCase())
  }

  function renderMixChart() {
    return LWP &&
      <Chart type='bar'
        data={{
          labels: profit_labels(),
          datasets: [
            {
              type: 'line',
              label: 'Cumulative profit',
              borderColor: 'rgb(238 242 255)',
              data: cumulativeArray(),
              borderWidth: 3
            },
            {
              type: 'bar',
              label: 'Daily profit',
              backgroundColor: 'rgb(165 180 252)',
              hoverBackgroundColor: 'rgb(129 140 248)',
              data: Object.values(LWP.profits),
              barThickness: 40,
              borderRadius: 5,
            }
          ]
        }}
        height={"250px"}
        options={{
          maintainAspectRatio: false,
          elements: {
            point: {
              radius: 8,
              hoverBorderWidth: 3,
              hoverRadius: 10,
              backgroundColor: 'rgb(79 70 229)',
            }
          },
          scales: {
            x: {
              ticks: {
                color: 'rgb(79,70,229,1)',
                font: {
                  weight: 'bold',
                  size: 14
                }
              },
              grid: {
                display: false
              }
            },
            y: {
              ticks: {
                color: 'rgb(165,180,252,0.6)',
                maxTicksLimit: 7,
                font: {
                  weight: 'bold',
                  size: 12
                }
              },
              grid: {
                drawBorder: false,
                borderDash: [3],
                drawTicks: false
              }
            }
          },
          plugins: {
            legend: {
              display: false,
            },
            annotation: {
              clip: false,
            },
            tooltip: {
              backgroundColor: 'rgb(165 180 252)',
              xAlign: 'center',
              yAlign: 'bottom',
              padding: 10,
              displayColors: false,
              titleAlign: 'center',
              titleColor: 'white',
              titleMarginBottom: 3,
              titleFont: {
                size: 14,
                weight: 'bold'
              },
              bodyAlign: 'center',
              bodyColor: 'rgb(79 70 229)',
              bodyFont: {
                size: 16,
                weight: 'bold'
              },
              callbacks: {
                label: function (context) {
                  return '$' + context.parsed.y;
                }
              }
            },
          }
        }}
      />;
  }

  function renderBody() {
    return ATP && ATP.pairs.map((obj, index) => {
      const twopairs = obj.pair.split('/');
      const sellingcoins = twopairs[0];
      const buyingcoins = twopairs[1];
      return (
        <div className="p-2 bg-white rounded-md  text-indigo-900 flex flex-row mb-3" key={index}>

          <div className="flex flex-1 flex-col">
            <div className="flex-1 px-1 text-xs ">
              <span className='mr-2 bg-indigo-100 text-indigo-500 rounded-full px-2'>{format(parseISO(obj.date), 'dd LLL, yyyy').toUpperCase()}</span><span className='bg-yellow-100 text-yellow-500 rounded-full px-2'>{obj.time}</span>
            </div>

            <div className='flex flex-row'>
              <div className="flex-1 px-2">
                <span className='text-xl font-thin'>{sellingcoins}</span>
                <p className='text-md font-bold'>{obj.bought_amount}</p>
              </div>

              <div className="my-auto">
                <IconContext.Provider value={{ size: "2em" }}>
                  <span className='text-xl font-bold'><RiArrowDropRightFill /> </span>
                </IconContext.Provider>
              </div>

              <div className="flex-1 px-2">
                <span className='text-xl font-thin'>{buyingcoins}</span>
                <p className='text-md font-bold'>{obj.bought_volume}</p>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  function renderCard(icon, section, total) {
    return (
      <div className='h-48 w-44 bg-gradient-to-br from-indigo-50 to-white shadow shadow-indigo-200 rounded-lg px-6 py-5'>
        {icon}
        <h1 className="text-md pt-1 h-14 font-thin opacity-80 leading-snug">{section}</h1>
        <h3 className="text-2xl mt-1 font-bold ">${total}</h3>
      </div>
    )
  }

  function renderTable() {
    return profit_labels().map((key, index) => {
      return (
        <tr className='text-indigo-900 text-sm' key={index}>
          <td className='pl-4 px-2 border-y-2 border-indigo-50 py-1 font-light opacity-50'>{key}</td>
          <td className='text-center border-y-2 px-2 border-indigo-50 py-1 font-bold opacity-50'>${Object.values(LWP.profits)[index]}</td>
        </tr>
      )
    })
  }

  function findActiveDeal() {
    let sum = 0
    ATP && ATP.pairs.forEach(element => {
      sum = sum + element.bought_amount;
    });
    return sum.toFixed(2)
  }


  return (
    <div className="flex h-full flex-col w-full tracking-wide">

      <CreateHead page={'Dashboard'} />
      <div>
        <div className='flex-auto max-w-screen-xl mx-auto border-b-2 border-indigo-50 px-8 py-4'>
          <h1 className="text-4xl mt-3 font-bold  text-indigo-600 ">Dashboard</h1>
        </div>

        <div className='flex flex-col flex-auto md:flex-row px-8 py-6 my-auto max-w-screen-xl  mx-auto'>
          <div className='flex-1'>
            <div className='text-2xl font-bold text-indigo-600 py-4'>Overview</div>

            <div className='grid grid-cols-2 md:grid-cols-4 text-indigo-900'>
              <div>{renderCard(
                <Image
                  src="/images/wallet.png"
                  alt="Picture of the author"
                  width={55}
                  height={55}
                  className="text-indigo-200" />, AT.section, AT.total)}</div>
              <div>{renderCard(
                <Image
                  src="/images/currency.png"
                  alt="Picture of the author"
                  width={55}
                  height={55}
                  className="text-indigo-200" />,
                'Current Active Deal', findActiveDeal())}</div>
              <div>{renderCard(
                <Image
                  src="/images/rocket-launch.png"
                  alt="Picture of the author"
                  width={55}
                  height={55}
                  className="text-indigo-200" />, TFCM.section, TFCM.total)}</div>
              <div>{renderCard(
                <Image
                  src="/images/agreement.png"
                  alt="Picture of the author"
                  width={55}
                  height={55}
                  className="text-indigo-200" />, TFPM.section, TFPM.total)}</div>
            </div>

            <div className='text-2xl font-bold text-indigo-600 py-4'>Statistic</div>
            <div className=''>
              <div className='grid md:grid-cols-4'>
                <div className='md:col-span-3'>
                  {renderMixChart()}
                </div>
                <div className='md:mr-6'>
                  <div className='bg-indigo-50  rounded-lg text-center px-2 py-2 my-6'>
                    <div className='text-md font-thin w-full '>Last 7 Days Profit</div>
                    <div className='text-xl font-bold w-fit mx-auto text-indigo-900'>${cumulativeArray()[cumulativeArray().length - 1]}</div>
                  </div>
                  <div className=' my-6'>
                    <table className='table-auto w-full'>
                      <tbody>
                        {renderTable()}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full md:w-80  bg-indigo-50 p-4 shadow shadow-indigo-200 rounded-lg md:flex-none h-fit">
            <h1 className="text-2xl mb-5 font-bold text-indigo-600">History</h1>
            <div className={styles.noscrollbar + " h-[35rem] overflow-y-auto overflow-hidden"}>
              {renderBody()}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
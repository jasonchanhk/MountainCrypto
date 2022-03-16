import { IoPodiumOutline, IoTrophyOutline, IoWaterOutline } from "react-icons/io5";
import { AiOutlineDollar } from "react-icons/ai";
import { useEffect, useState } from "react";
import { MdWater } from "react-icons/md";
import { IconContext } from "react-icons";
import HTMLReactParser from 'html-react-parser';
import millify from 'millify';
import styles from '../../styles/Home.module.css'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { fromUnixTime, format } from 'date-fns'
import { PercentageBetterment, ReadableNumber } from '../../components/expression'
import { getData } from '../api/fetchingcoin/[...params]'
import CreateHead from '../../components/head';
import Image from 'next/image'


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

Tooltip.positioners.top = function (items) {
    const pos = Tooltip.positioners.average(items);

    // Happens when nothing is found
    if (pos === false) {
        return false;
    }

    const chart = this.chart;

    return {
        x: pos.x,
        y: chart.chartArea.top,
        xAlign: 'center',
        yAlign: 'bottom',
    };
};

export async function getServerSideProps(context) {
    const { uuid } = await context.query;
    const coin = await getData(uuid)
    const coinDetail = await coin?.data?.coin
    return {
        props: {
            coinDetail
        }
    };
}

export default function CoinDetail({ coinDetail }) {

    const [time, setTime] = useState('24h')
    const [history, setHistory] = useState([])
    const uuid = coinDetail && coinDetail.uuid

    useEffect(() => {

        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/fetchingcoin/${uuid}/${time}`)
            .then((res) => res.json())
            .then((data) => {
                const currentHistory = data.data
                setHistory(currentHistory)
                console.log(currentHistory)
            })
            .catch((error) => {
                console.log('error', error)
            })
    }, [time, uuid])

    function renderCryptoLineChart() {
        let coinPrice = [];
        let coinTimeStamp = []
        for (var i = history.length - 1; i >= 0; i--) {
            coinPrice.push(ReadableNumber(history[i].price))
            if (time == '1y' || time == '3y' || time == '5y') {
                coinTimeStamp.push(format(fromUnixTime(history[i].timestamp), 'PP').toUpperCase())
            } else {
                coinTimeStamp.push(format(fromUnixTime(history[i].timestamp), 'LLL dd, p').toUpperCase())
            }
        }
        return (<Line
            data={{
                labels: coinTimeStamp,
                datasets: [
                    {
                        data: coinPrice,
                        label: 'Price in USD',
                        borderColor: 'rgba(79 70 229)',
                        backgroundColor: (context) => {
                            const { ctx, chartArea } = context.chart;
                            if (!chartArea) return null;
                            const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                            gradient.addColorStop(0, 'rgb(255,255,255)');
                            gradient.addColorStop(1, 'rgb(165 180 252)');
                            return gradient;
                        },
                        fill: {
                            target: 'start'
                        }
                    }]
            }}
            height={400}
            options={{
                maintainAspectRatio: false,
                filler: {
                    propagate: false,
                },
                elements: {
                    point: {
                        radius: 0,
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: 'rgb(49 46 129)',
                            maxTicksLimit: 6,
                            maxRotation: 0,
                            font: {
                                weight: 'bold',
                                size: 12
                            },
                            callback: function (value, index, ticks) {

                                if (time == '5y') {
                                    return this.getLabelForValue(value).substring(this.getLabelForValue(value).length - 4);
                                }
                                else if (time == '3m' || time == '1y' || time == '3y') {
                                    return this.getLabelForValue(value).substring(0, 3);
                                }
                                else if (time == '7d' || time == '30d') {
                                    return this.getLabelForValue(value).substring(0, 6);
                                } else {
                                    return this.getLabelForValue(value).substring(this.getLabelForValue(value).length - 8);
                                }
                            }
                        },
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: false,
                        position: {
                            x: 5
                        },
                        ticks: {
                            color: 'rgb(49 46 129)',
                            maxTicksLimit: 2,
                            font: {
                                weight: 'bold',
                                size: 12
                            },
                            z: 20,
                            callback: function (value, index, ticks) {
                                return '$' + value;
                            }
                        },
                        grid: {
                            display: false,
                            drawBorder: false,
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index',
                },
                tooltips: {
                    intersect: false,
                    mode: 'index',
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        backgroundColor: 'rgba(79 70 229)',
                        animation: false,
                        padding: 10,
                        displayColors: false,
                        position: 'top',
                        titleAlign: 'center',
                        titleColor: 'white',
                        titleMarginBottom: 3,
                        titleFont: {
                            size: 14,
                            weight: 'bold'
                        },
                        bodyAlign: 'center',
                        bodyColor: 'white',
                        bodyFont: {
                            size: 18,
                            weight: 'bolder'
                        },
                        callbacks: {
                            label: function (context) {
                                return '$ ' + context.parsed.y;
                            }
                        }
                    },
                    hover: {
                        mode: 'index',
                        intersect: false
                    }
                }
            }}
            plugins={[{
                afterDraw: (chart) => {
                    // eslint-disable-next-line no-underscore-dangle
                    if (chart.tooltip._active && chart.tooltip._active.length) {
                        // find coordinates of tooltip
                        const activePoint = chart.tooltip._active[0];
                        const { ctx } = chart;
                        const { x } = activePoint.element;
                        const topY = chart.scales.y.top + 50;
                        const bottomY = chart.scales.y.bottom;
                        // draw vertical line
                        ctx.save();
                        ctx.beginPath();
                        ctx.moveTo(x, topY);
                        ctx.lineTo(x, bottomY);
                        ctx.lineWidth = 3;
                        ctx.strokeStyle = 'rgba(79 70 229)';
                        ctx.stroke();
                        ctx.restore();
                    }
                },
            }]}
        />)
    }
    function renderCryptoStatBody() {
        const price = coinDetail && ReadableNumber(coinDetail.price);
        const rank = coinDetail && coinDetail.rank;
        const volume = coinDetail && millify(coinDetail['24hVolume'], {
            units: ['', 'K', 'Million', 'Billion', 'Tillion', 'P', 'E'],
            space: true,
        });
        const cap = coinDetail && millify(coinDetail.marketCap, {
            units: ['', 'K', 'Million', 'Billion', 'Tillion', 'P', 'E'],
            space: true,
        });
        const high = coinDetail && ReadableNumber(coinDetail.allTimeHigh.price);
        const stats = [
            {
                title: 'Price to USD',
                value: `$ ${price}`,
                icon: <AiOutlineDollar />
            },
            {
                title: 'Rank',
                value: `${rank}`,
                icon: <IoPodiumOutline />
            },
            {
                title: '24h Volume',
                value: `$ ${volume}`,
                icon: <IoWaterOutline />
            },
            {
                title: 'Market Cap',
                value: `$ ${cap}`,
                icon: <MdWater />
            },
            {
                title: 'All-time-high (daily avg.)',
                value: `$ ${high}`,
                icon: <IoTrophyOutline />
            },
        ];
        return stats && stats.map((stat, index) => {
            return (
                <tr className="border-y-2 border-indigo-50" key={index}>
                    <IconContext.Provider value={{ size: "1.5em" }}>
                        <td className="py-3 text-indigo-600">{stat.icon}</td>
                    </IconContext.Provider>
                    <td className="py-3 ">{stat.title}</td>
                    <td className="py-3 font-medium text-right">{stat.value}</td>
                </tr>
            );
        });
    }
    function renderProjectLinkBody() {
        return coinDetail && coinDetail.links.map((link, index) => {
            return (
                <tr className="border-y-2 border-indigo-50 cursor-pointer" key={index}>
                    <td className="py-3  font-medium"><a href={link.url} >{link.type.charAt(0).toUpperCase() + link.type.slice(1)}</a></td>
                    <td className="py-3 text-right"><a href={link.url} >{link.name}</a></td>
                </tr>
            );
        });
    }
    function renderSelectTime() {
        const allTime = ['3h', '24h', '7d', '30d', '3m', '1y', '3y', '5y']
        return allTime.map((timeSlot, index) => {
            return (
                <button key={index} onClick={() => setTime(timeSlot)} className={time == timeSlot ? 'font-medium md:font-bold py-1 px-2 md:px-4 bg-indigo-600 text-white rounded-md' : 'font-medium md:font-bold py-1 px-2 md:px-4 text-indigo-600'}>{timeSlot.toUpperCase()}</button>
            )
        })
    }

    return (
        <div className="flex h-full flex-col tracking-wide text-indigo-900">

            <CreateHead page={coinDetail.name} />
            <div>
                <div className='flex-auto max-w-screen-xl bg-white border-b-2 border-indigo-50 px-8 py-4 mx-auto flex'>
                    <span className="align-middle mt-3">
                        <Image
                            src={coinDetail.iconUrl}
                            alt="cryptoIcon"
                            width={40}
                            height={40}/>
                    </span>
                    <h1 className="text-3xl md:text-4xl mt-3 font-bold pl-3">{coinDetail.name} ({coinDetail.symbol})</h1>
                </div>

                <div className="flex-auto max-w-screen-xl px-8 pt-4 mx-auto">
                    <div className="md:flex justify-between">
                        <div className="text-xl md:text-2xl font-bold py-2">{coinDetail.symbol.toUpperCase()} price chart</div>
                        <div className="flex rounded-lg border-2 border-indigo-50 py-2 px-6 font-bold w-fit">
                            <div className="pr-4">
                                <span className="text-xs">Price to USD</span><br />
                                <span className='text-xl md:text-2xl font-bold align-middle'>${ReadableNumber(coinDetail.price)}</span>
                            </div>
                            <div className="pl-4">
                                <span className="text-xs">{time.toUpperCase()} change</span><br />
                                <div className="py-1"><PercentageBetterment percentage={coinDetail.change} /></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-auto max-w-screen-xl px-8 py-4 mx-auto">
                    {renderCryptoLineChart()}
                </div>
                <div className="flex-auto max-w-screen-xl px-8 py-2 mx-auto">
                    <div className=" mx-auto rounded-md border-2 border-indigo-50 w-fit p-1 text-sm md:text-base">
                        {renderSelectTime()}
                    </div>
                </div>
                <div className="flex-auto flex flex-col md:flex-row max-w-screen-xl py-4 mx-auto">
                    <div className="flex-1 px-8 text-lg">
                        <h3 className="font-bold text-xl md:text-2xl py-4">{coinDetail.symbol} Value Statistics</h3>
                        <table className="table text-sm md:text-base w-full">
                            <tbody>
                                {renderCryptoStatBody()}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex-1 px-8 text-lg">
                        <h3 className="font-bold text-xl md:text-2xl py-4">Project links</h3>
                        <table className="table text-sm md:text-base w-full">
                            <tbody>
                                {renderProjectLinkBody()}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="flex-auto max-w-screen-xl px-8 py-4 mx-auto">
                    <div className="md:w-[50%]">
                        <h3 className="font-bold text-xl md:text-2xl ">What is {coinDetail?.name}</h3>
                        <div className={styles.description}>
                            {coinDetail && HTMLReactParser(coinDetail.description)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
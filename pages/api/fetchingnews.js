import axios from 'axios'

const cryptoApiHeaders = {
  'x-bingapis-sdk': 'true',
  'x-rapidapi-host': `${process.env.NEWS_X_RAPIDAPI_HOST}`,
  'x-rapidapi-key': `${process.env.NEWS_X_RAPIDAPI_KEY}`
};

export default async function(req, res) {
  // Fetch data from external API
  const response = await axios.get(`https://bing-news-search1.p.rapidapi.com/news/search?q=cryptocurrency&safeSearch=Off&textFormat=Raw&freshness=Day&count=16`, { headers: cryptoApiHeaders })
  // Pass data to the page via props
  res.status(200).json({ data: response.data })
}

export async function getData() {
  const response = await fetch(`https://bing-news-search1.p.rapidapi.com/news/search?q=cryptocurrency&safeSearch=Off&textFormat=Raw&freshness=Day&count=16`, { headers: cryptoApiHeaders })
  const jsonData = await response.json()
  return jsonData
}
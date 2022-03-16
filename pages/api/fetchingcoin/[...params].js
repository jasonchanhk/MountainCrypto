const cryptoApiHeaders = {
    'x-rapidapi-host': process.env.COINLIST_X_RAPIDAPI_HOST,
    'x-rapidapi-key': process.env.COINLIST_X_RAPIDAPI_KEY,
};

export default async function handler(req, res) {
    const { params } = req.query
    console.log(params)
    if (params.length > 1) {
        const uuid = params[0]
        const time = params[1]
        const response = await fetch(`https://coinranking1.p.rapidapi.com/coin/${uuid}/history/?timePeriod=${time}`, { headers: cryptoApiHeaders })
        const jsonData = await response.json()
        const history = await jsonData.data.history
        // Pass data to the page via props
        res.status(200).json({ data: history })
    } else {
        const uuid = params[0]
        const response = await fetch(`https://coinranking1.p.rapidapi.com/coin/${uuid}`, { headers: cryptoApiHeaders })
        const jsonData = await response.json()
        // Pass data to the page via props
        res.status(200).json({ data: jsonData })
    }
}

export async function getData(uuid) {
    const response = await fetch(`https://coinranking1.p.rapidapi.com/coin/${uuid}`, { headers: cryptoApiHeaders })
    const jsonData = await response.json()
    return jsonData
}
const cryptoApiHeaders = {
    'x-rapidapi-host': process.env.COINLIST_X_RAPIDAPI_HOST,
    'x-rapidapi-key': process.env.COINLIST_X_RAPIDAPI_KEY,
};

export default async function (req, res) {
    const { uuid } = req.query
    const response = await fetch(`https://coinranking1.p.rapidapi.com/coin/${uuid}`, { headers: cryptoApiHeaders })
    // Pass data to the page via props
    res.status(200).json({ data: response.data })
}

export async function getData(uuid) {
    const response = await fetch(`https://coinranking1.p.rapidapi.com/coin/${uuid}`, { headers: cryptoApiHeaders })
    const jsonData = await response.json()
    return jsonData
}
import axios from "axios";

const cryptoApiHeaders = {
    'x-rapidapi-host': process.env.COINLIST_X_RAPIDAPI_HOST,
    'x-rapidapi-key': process.env.COINLIST_X_RAPIDAPI_KEY,
};

export default async function (req, res) {
    // Fetch data from external API
    const response = await axios.get(`https://coinranking1.p.rapidapi.com/coins/?limit=${100}`, { headers: cryptoApiHeaders })
    // Pass data to the page via props
    res.status(200).json({ data: response.data })
}

export async function getData() {
    const response = await fetch(`https://coinranking1.p.rapidapi.com/coins/?limit=${100}`, { headers: cryptoApiHeaders })
    const jsonData = await response.json()
    return jsonData
}
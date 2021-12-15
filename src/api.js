const apiBase = 'https://api.coincap.io/v2';

function getAssets(){
    return fetch(`${apiBase}/assets?limit=20`)
        .then(res => res.json())
        .then(res => res.data)
}

function getAsset(name){
    return fetch(`${apiBase}/assets/${name}`)
        .then(res => res.json())
        .then(res => res.data)
}

function getAssetHistory(coin){
    const now = new Date
    const end = now.getTime()
    now.setDate(now.getDate() - 1)
    const start = now.getTime()

    return fetch(`${apiBase}/assets/${coin}/history?interval=h1&start=${start}&end=${end}`)
        .then(res => res.json())
        .then(res => res.data)
}

function getMarkets(coin){
    return fetch(`${apiBase}/assets/${coin}/markets?limit=5`)
        .then(res => res.json())
        .then(res => res.data)
}

function getExchange(id){
    return fetch(`${apiBase}/exchanges/${id}`)
        .then(res => res.json())
        .then(res => res.data)
}

export default {
    getAssets,
    getAsset,
    getAssetHistory,
    getMarkets,
    getExchange
}
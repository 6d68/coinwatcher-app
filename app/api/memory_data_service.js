
export async function findCurrencyInfos(currencyIds) {
    return _currencies.filter(_ => currencyIds.indexOf(_.id)!== -1)
}

export async function findCurrency(symbol) {
    return _currencies_available;
};

let _currencies = [
    {
        "last_updated": "1502012649",
        "percent_change_1h": "-0.21",
        "symbol": "USDT",
        "keywords": "tether usdt",
        "source": "coinmarketcap",
        "price": "0.998024",
        "id": "tether",
        "name": "Tether",
        "price_currency": "USD",
        "percent_change_7d": "-0.11",
        "percent_change_24h": "-0.21"
    },
    {
        "last_updated": "1502012672",
        "percent_change_1h": "3.28",
        "symbol": "DICE",
        "keywords": "etheroll dice",
        "source": "coinmarketcap",
        "price": "5.09717",
        "id": "etheroll",
        "name": "Etheroll",
        "price_currency": "USD",
        "percent_change_7d": "-2.43",
        "percent_change_24h": "9.79"
    },
    {
        "last_updated": "1502012653",
        "percent_change_1h": "1.89",
        "symbol": "ETH",
        "keywords": "ethereum eth",
        "source": "coinmarketcap",
        "price": "259.674",
        "id": "ethereum",
        "name": "Ethereum",
        "price_currency": "USD",
        "percent_change_7d": "29.45",
        "percent_change_24h": "9.76"
    },
    {
        "last_updated": "1502012658",
        "percent_change_1h": "0.99",
        "symbol": "ETC",
        "keywords": "ethereum classic etc",
        "source": "coinmarketcap",
        "price": "15.6267",
        "id": "ethereum-classic",
        "name": "Ethereum Classic",
        "price_currency": "USD",
        "percent_change_7d": "11.78",
        "percent_change_24h": "1.28"
    }
];

let _currencies_available = [
    {
        "id": "ethereum",
        "name": "Ethereum",
        "symbol": "ETH"
    },
    {
        "id": "etheroll",
        "name": "Etheroll",
        "symbol": "DICE"
    },
    {
        "id": "ethereum-classic",
        "name": "Ethereum Classic",
        "symbol": "ETC"
    },
    {
        "id": "tether",
        "name": "Tether",
        "symbol": "USDT"
    }
];

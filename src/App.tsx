import {useEffect, useState} from 'react'
import './App.css'
import {INonHandledTrade, ITrade} from "./Types.ts";
import Table from "./Table.tsx";

const URL_OF_CONNECTION = 'wss://stream.binance.com:9443/ws';

const request = {
    method: 'SUBSCRIBE',
    params: ['btcusdt@trade'],
    id: 1,
};

function App() {
    const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
    const [trades, setTrades] = useState<ITrade[]>([]);
    useEffect(() => {
        const webSocketClient = new WebSocket(URL_OF_CONNECTION);
        webSocketClient.onopen = (event: Event) => {
            console.log("WebSocket connection success", event);
            setWebSocket(webSocketClient);
            webSocketClient.send(JSON.stringify(request));
        }
        webSocketClient.onmessage = (data: MessageEvent) => {
            const receivedTrade = parseTrade(JSON.parse(data.data) as INonHandledTrade);
            if(receivedTrade) setTrades((prev)=>[receivedTrade, ...prev ]);
        }
        webSocketClient.onclose = () =>  console.log("WebSocket connection closed");
    }, []);

    const parseTrade = (trade: INonHandledTrade)=>{
        if(trade.e !== "trade") return null;
        return ({
            id: trade.t,
            type: trade.e,
            pair: trade.s,
            price: (+trade.p).toFixed(2),
            quantity: trade.q,
            buyerId: trade.b,
            sellerId: trade.a,
            time: new Date(trade.T * 1000).toTimeString()
        }) as ITrade;
    }

    return (
        <>
          <Table trades={trades}/>
        </>
    )
}

export default App

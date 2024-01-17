import {FormEvent, SyntheticEvent, useEffect, useState} from 'react'
import './App.css'

const URL_OF_CONNECTION = 'wss://echo.websocket.org';

function App() {
    const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
    const [inputValue, setInputValue] = useState<string>('');
    useEffect(() => {
        const webSocketClient = new WebSocket(URL_OF_CONNECTION);
        webSocketClient.onopen = (event: Event) => {
            console.log("WebSocket loaded", event);
            setWebSocket(webSocketClient);
        }
        webSocketClient.onmessage = (data: MessageEvent) => {
            console.log("Received ws message: ", data.data);
        }
        webSocketClient.onclose = () => {
            console.log("WebSocket connection closed");
        }
    }, []);

    function echoHandler(event: SyntheticEvent) {
        event.preventDefault();
        webSocket?.send(inputValue);
    }

    return (
        <>
            <form onSubmit={echoHandler}>
                <input type="text" required
                       onInput={(e: FormEvent<HTMLInputElement>) => setInputValue((e.target as HTMLInputElement)?.value || '')}/>
                <button>Echo</button>
            </form>
        </>
    )
}

export default App

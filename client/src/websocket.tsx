import { createContext, useEffect, useState } from 'react';
import { Sockittt } from 'sockittt';

type Status = 'connecting' | 'open' | 'closed';

export interface WebSocketContextType {
  sendMessage: (message: ArrayBuffer | string) => void;
  receivedMessage: string | null;
  status: Status;
}

export const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [receivedMessage, setReceivedMessage] = useState<string | null>(null);
  const [wss, setWss] = useState<Sockittt | null>(null);
    const [status, setStatus] = useState<Status>('connecting');
  useEffect(() => {
    const socket = new Sockittt('ws://localhost:8080', {
      onMessage(message) {
        console.log("Received:", message);
        setReceivedMessage(message.data.toString());
      },
      onOpen() {
        console.log("WebSocket connected");
        setStatus('open');
      },
      onClose() {
        setStatus('closed');
        console.log("WebSocket closed, retrying...");
        setTimeout(() => socket.open(), 5000);
      },
    });

    socket.open();
    setWss(socket);

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = (message: ArrayBuffer | string) => {
    if (wss) {
      wss.send(message);
    }
  };

  return (
    <WebSocketContext.Provider value={{ sendMessage, receivedMessage, status }}>
      {children}
    </WebSocketContext.Provider>
  );
};



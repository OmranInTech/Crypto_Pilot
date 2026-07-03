export function createCryptoSocket(
  onData: (data: Record<string, number>) => void,
  onStatus: (connected: boolean) => void
) {
  let ws: WebSocket | null = null;

  const connect = () => {
   ws = new WebSocket("ws://127.0.0.1:8001/ws/crypto/");
   
    ws.onopen = () => {
      console.log("🚀 Connected");
      onStatus(true);
    };

    ws.onmessage = (event) => {
      const parsed = JSON.parse(event.data);

      const prices = parsed.prices;

      onData({ ...prices });
    };

    ws.onclose = () => {
      onStatus(false);
      setTimeout(connect, 1000);
    };
  };

  connect();

  return () => ws?.close();
}
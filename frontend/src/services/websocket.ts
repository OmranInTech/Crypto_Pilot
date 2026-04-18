export function createCryptoSocket(
  onData: (data: Record<string, number>) => void,
  onStatus: (connected: boolean) => void
) {
  let ws: WebSocket | null = null;
  let retry = 0;
  let closedByUser = false;

  const connect = () => {
    ws = new WebSocket("ws://127.0.0.1:8000/ws/crypto/");

    ws.onopen = () => {
      console.log("🚀 WebSocket Connected");
      retry = 0;
      onStatus(true);
    };

    ws.onmessage = (event) => {
      try {
        console.log("RAW:", event.data);

        const parsed = JSON.parse(event.data);
        console.log("PARSED:", parsed);

        // IMPORTANT FIX 👇
        const prices = parsed?.prices || parsed;

        console.log("PRICES:", prices);

        onData(prices);
      } catch (err) {
        console.log("WS parse error:", err);
      }
    };

    ws.onerror = () => {
      console.log("❌ WebSocket error");
      onStatus(false);
    };

    ws.onclose = () => {
      console.log("❌ WebSocket closed");
      onStatus(false);

      if (closedByUser) return;

      retry++;

      setTimeout(() => {
        connect();
      }, Math.min(1000 * retry, 10000));
    };
  };

  connect();

  return () => {
    closedByUser = true;
    ws?.close();
  };
}
declare module "@novnc/novnc" {
  const RFB: new (target: HTMLElement, urlOrChannel: string | WebSocket, options?: Record<string, unknown>) => import("./vnc").RfbInstance;
  export default RFB;
}

import { useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

// obligé je dois revisé ca une autre fois
export const useWebSocket = (token, onNotificationReceived) => {
  const callbackRef = useRef(onNotificationReceived);

  useEffect(() => {
    callbackRef.current = onNotificationReceived;
  }, [onNotificationReceived]);

  useEffect(() => {
    if (!token) return;

    const stompClient = new Client({
      webSocketFactory: () =>
        new SockJS("http://localhost:9999/ws-notifications"),

      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },

      debug: (str) => {
        console.log("[STOMP Debug]:", str);
      },

      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,

      onConnect: () => {
        console.log("✅ Connecté au serveur WebSocket STOMP!");

        stompClient.subscribe("/user/queue/notifications", (message) => {
          if (message.body) {
            const notification = JSON.parse(message.body);
            if (callbackRef.current) {
              callbackRef.current(notification);
            }
          }
        });
      },

      onStompError: (frame) => {
        console.error("❌ Erreur STOMP :", frame.headers["message"]);
      },
    });

    stompClient.activate();

    return () => {
      if (stompClient.active) {
        stompClient.deactivate();
        console.log("🔌 Déconnecté du WebSocket.");
      }
    };
  }, [token]);
};

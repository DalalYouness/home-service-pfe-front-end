import { useEffect } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

// token : 3tini lbadge bach nqdr ndkhol fl backend onjbd luserid
export const useWebSocket = (token, onNotificationReceived) => {
  useEffect(() => {
    if (!token) return;
    const stompClient = new Client({
      webSocketFactory: () =>
        new SockJS("http://localhost:8082/ws-notifications"),

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

        // using closure
        stompClient.subscribe("/user/queue/notifications", (message) => {
          if (message.body) {
            const notification = JSON.parse(message.body);
            onNotificationReceived(notification);
          }
        });
      },
      onStompError: (frame) => {
        console.error("❌ Erreur STOMP :", frame.headers["message"]);
      },
    });
    // toujours les callbacks c'est des fonction a execyté apres une action

    stompClient.activate();
    return () => {
      if (stompClient.active) {
        stompClient.deactivate();
        console.log("🔌 Déconnecté du WebSocket.");
      }
    };
  }, [token]);
};

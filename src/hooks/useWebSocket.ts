import { useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export const useWebSocket = (token, onNotificationReceived) => {
  // 1. Déclarer le Ref pour garder la dernière version de la fonction callback
  const callbackRef = useRef(onNotificationReceived);

  // 2. Mettre à jour le Ref à chaque re-render sans reconnecter le WebSocket
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

        // 🟢 S'abonner à la file d'attente personnelle
        stompClient.subscribe("/user/queue/notifications", (message) => {
          console.log("📩 [STOMP Payload Received]:", message.body);

          if (message.body) {
            try {
              const notification = JSON.parse(message.body);

              // ⚡ Déclencher le callback via le Ref le plus récent
              if (typeof callbackRef.current === "function") {
                callbackRef.current(notification);
              }
            } catch (error) {
              console.error("❌ Erreur de parsing du JSON reçue :", error);
            }
          }
        });
      },

      onStompError: (frame) => {
        console.error("❌ Erreur STOMP :", frame.headers["message"]);
        console.error("Détails :", frame.body);
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

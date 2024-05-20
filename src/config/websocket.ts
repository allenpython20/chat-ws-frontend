import { type App, inject } from 'vue';

// Definir el símbolo para el WebSocket
const WebSocketSymbol = Symbol('WebSocket');

// Crear una función para crear la instancia de WebSocket
const createWebSocket = (url: string) => {
  return new WebSocket(url);
};

export const createWebSocketPlugin = (url: string) => {
  // Crear una única instancia de WebSocket
  const socket = createWebSocket(url);

  return {
    install(app: App) {
      // Proporcionar la instancia de WebSocket a la aplicación
      app.provide(WebSocketSymbol, socket);
    },
  };
};

 const useWebSocket = () => {
  // Obtener la instancia de WebSocket proporcionada
  const socket = inject<WebSocket>(WebSocketSymbol);
  if (!socket) {
    throw new Error('WebSocket not provided');
  }
  return socket;
};
export const SOCKET_CONFIG = {
  URL: process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:8080',
  DEFAULT_TRANSPORTS: ['websocket'],
};

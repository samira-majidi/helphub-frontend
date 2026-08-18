'use client';

import { useNotificationSocket } from "../hook/useNotificationSocket";


export default function NotificationListener() {

  useNotificationSocket();

  return null; 
}

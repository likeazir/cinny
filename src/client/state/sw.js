import {selectRoom} from '../action/navigation';
import navigation from "./navigation";

navigation.messaging.onBackgroundMessage(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png'
    }
    self.registration.showNotification(notificationTitle,
        notificationOptions)
    selectRoom(roomId, mEventId)
});
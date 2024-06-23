// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker
import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage} from "firebase/messaging/sw";
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'

// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST);

// clean old assets
cleanupOutdatedCaches();

self.addEventListener('notificationclick', (event) => {
    const clickedNotification = event.notification;
    clickedNotification.close();

    const urlToOpen = new URL(self.location.origin).href;
    const promiseChain = clients
        .matchAll({
            type: 'window',
            includeUncontrolled: true,
        })
        .then((windowClients) => {
            let matchingClient = null;
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                if (windowClient.url === urlToOpen) {
                    matchingClient = windowClient;
                    break;
                }
            }
            if (matchingClient) {
                return matchingClient.focus();
            } else {
                return clients.openWindow(urlToOpen);
            }
        });
    event.waitUntil(promiseChain);
})


const firebaseConfig = {
    apiKey: "AIzaSyCPjKH9BHta9jFcWkO2U9Ylv3-GjQlS3vE",
    authDomain: "cinny-a29d3.firebaseapp.com",
    projectId: "cinny-a29d3",
    storageBucket: "cinny-a29d3.appspot.com",
    messagingSenderId: "592847498257",
    appId: "1:592847498257:web:7c3e7a8b949546ea4955b0",
    measurementId: "G-B5T26BNBYB"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

console.log('uwu <3');
onBackgroundMessage(messaging, (payload) => {
    if (payload.data.content_algorithm) {
        const notificationTitle = payload.data.room_name;
        const notificationOptions = {
            body:"𝘦𝘯𝘤𝘳𝘺𝘱𝘵𝘦𝘥 𝘮𝘦𝘴𝘴𝘢𝘨𝘦",
        };
        self.registration.showNotification(notificationTitle,
            notificationOptions);
    }
    if (payload.data.content_msgtype === "m.text") {
        const notificationTitle = payload.data.room_name;
        const notificationOptions = {
            body: payload.data.sender_display_name + ": " + payload.data.content_body,
        };
        self.registration.showNotification(notificationTitle,
            notificationOptions);
    }
    console.log('Message received. ', payload);
});



self.skipWaiting();
clientsClaim();
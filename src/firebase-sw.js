// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker
import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage} from "firebase/messaging/sw";
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'
import { NavigationRoute, registerRoute } from 'workbox-routing'

precacheAndRoute(self.__WB_MANIFEST)
cleanupOutdatedCaches()

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

console.log('uwu');
onBackgroundMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
});

clientsClaim()
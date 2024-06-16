import { selectRoom } from '../action/navigation';
self.addEventListener('notificationclick', function(event) {
    [roomId, mEventId] = event.notification.data
    event.notification.close(); // Android needs explicit close.
    selectRoom(roomId, mEventId)
});
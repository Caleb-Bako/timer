import { Vibration, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

// Set Notification Handler (Ensures notifications behave correctly)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true, // Plays the default system sound
    shouldSetBadge: false,
  }),
});

// Request permission for notifications
export async function requestPermissions() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    alert('Permission for notifications was denied!');
  }
}

// Function to schedule a notification with default sound and vibration
export async function schedulePushNotification() {
  if (Platform.OS === 'android') {
    // Vibration.vibrate([0, 500, 250, 500]);
    Vibration.vibrate(2000);
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Look at that notification!',
      body: "I'm so proud of myself!",
      sound: "default", // Default system sound on iOS & Android
    },
    trigger: { seconds: 10 },
  });
  console.log('Triggerd 2')
}

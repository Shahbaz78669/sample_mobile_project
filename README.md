# E-Commerce App Assessment 🛒

Hello! 👋 This is my submission for the mobile app assessment. I built this sample React Native application to demonstrate my understanding of core mobile dev concepts like structured state management, clean architecture, and performance-aware UI building.

## 📱 App Functionality
- **Main Catalog (Pagination & Search)**: The Home screen features a feed of products fetched from the public DummyJSON endpoint `https://dummyjson.com/products`. It supports infinite scrolling and pulls down to refresh. There's also a debounced search bar at the top!
- **Favorites (Local Persistence)**: Users can bookmark specific products they like. Even if the app is killed or sent to the background, these favorite items are safely restored using `redux-persist` when you open the app again.
- **Product Details**: Tapping a product lets you view a richer breakdown of its data (price, description, availability, rating) and allows you to toggle its favorite status.
- **App Lifecycle**: Implemented a custom hook (`useAppLifecycle`) hooking into React Native's `AppState` to monitor when the app moves between 'active', 'background', or 'inactive' states!

## 🚀 How to Run the Project

1. Clone this repository and dive into the directory:
   ```bash
   cd sample_mobile_project
   ```
2. Install the necessary Node packages:
   ```bash
   npm install
   ```
3. Run the packager and then start the desired native environment:
   ```bash
   # For Android
   npx react-native run-android
   
   # For iOS (make sure you run `cd ios && pod install` first!)
   npx react-native run-ios
   ```

## 🛠️ Key Technical Decisions
- **React Native CLI & ES6 Javascript**: Bootstrapped using standard React Native (no Expo) and written entirely in clean, modern ES6+ JavaScript to demonstrate a strong foundational grasp of React architectures without relying on TypeScript magic.
- **Redux Toolkit & Persistence**: I chose Redux Toolkit to reduce boilerplate when setting up the store and thunks for fetching. I paired it with `@react-native-async-storage/async-storage` precisely to ensure the user's favorites array safely survives app restarts.
- **No Third-Party UI Libraries**: I stuck entirely to core components (`View`, `Text`, `FlatList`, `TextInput`, `TouchableOpacity`, etc.) and used the standard `StyleSheet` for styling. This ensures there's no UI bloat and gives absolute control over the pixels.
- **Performance Awareness**: I implemented virtualized list rendering using `FlatList`, using `onEndReached` along with fetching states to prevent duplicate network calls. The search bar uses a pure JavaScript `setTimeout` debounce hook to prevent spamming the DummyJSON search API every time a letter is typed!

## 💡 Improvements with More Time
- **Enhanced Data Caching**: I’d introduce RTK Query or React Query to handle caching server states automatically, reducing unnecessary calls.
- **Unit Testing**: Given more time, I would set up `Jest` and `@testing-library/react-native` to cover standard user flows (like ensuring the favorite button effectively mutates the Redux store) and test edge cases on the API service level.
- **Image Optimization**: Using an image cache handler like `react-native-fast-image` to prevent re-fetching large image binaries repeatedly across list scroll boundaries.
- **Offline Mode Detection**: Tapping into `NetInfo` to notify the user if they lost connection while scrolling.

Thank you for checking out my codebase! I leaned into keeping things clean, structured, and native. 🚀

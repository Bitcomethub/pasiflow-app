# Pasiflow Mobile App

iOS ve Android için Pasiflow Gayrimenkul Yatırım Danışmanlığı mobil uygulaması.

## 🚀 Tech Stack

- **Expo SDK 54** - React Native framework
- **Expo Router** - File-based routing
- **TypeScript** - Type safety

## 📱 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npx expo start

# Run on iOS Simulator
npm run ios

# Run on Android Emulator
npm run android
```

## 📦 Building

```bash
# Login to EAS
eas login

# Development build
eas build --platform all --profile development

# Production build
eas build --platform all --profile production
```

## 🔧 Configuration

- **Bundle ID:** `com.pasiflow.app`
- **App Name:** Pasiflow

## 📁 Project Structure

```
pasiflow-app/
├── app/                # Expo Router screens
│   ├── _layout.tsx     # Root layout
│   └── index.tsx       # Home screen
├── components/         # Reusable components
├── lib/               # Utilities & API
├── assets/            # Images & fonts
├── app.json           # Expo config
└── eas.json           # EAS build config
```

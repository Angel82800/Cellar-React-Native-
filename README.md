React Native App (Typescript)
==================

This project is based on the Mobile Starter Kit for [React Native](https://facebook.github.io/react-native/) + [NativeBase](http://nativebase.io/) + [Redux](http://redux.js.org) + [CodePush](https://github.com/Microsoft/react-native-code-push) + [TypeScript](https://www.typescriptlang.org/) Apps (iOS & Android).

### Getting Started

Clone or fork this repository:

```sh
git clone 

Install dependencies (one time only):

```sh
yarn
react-native link
```

Also please note, you need to install the Facebook SDK. You can get it from here: 
https://developers.facebook.com/docs/ios/getting-started/#download - The SDK is a ZIP file 
that must be installed into `~/Documents/FacebookSDK`.


Build the source-code with TypeScript:

```sh
# Build once
yarn run build

# Build and watch for changes
yarn run watch
```

You can also build using `tsc -p src` from the project folder.

Start React Native Server:

```sh
yarn start
```

### Debug
http://localhost:8081/debugger-ui
```
react-native log-ios
react-native log-android
```

### Test 

### Run 

#### iOS Simulator

```sh
yarn run ios
```

Reload code: 
1. `yarn run build` to rebuild the typescript code (or `tsc -p src` from the root directory of the repo)
2. Press Command+R in the simulator

#### Android Simulator

```sh
yarn run android
```

### Reset 

```sh
react-native upgrade
react-native link
```

### CodePush

import React, { useState } from 'react';
import { createStore } from "redux";
import { Provider } from "react-redux";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';

import Login from "./screens/Login";
import Home from "./screens/Home";

const Stack = createStackNavigator();

const initialState = {
    action: ""
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "OPEN_CARD":
            return { ...state, action: "openCard" };
        case "CLOSE_CARD":
            return { ...state, action: "closeCard" };
        default:
            return state;
    }
};

const store = createStore(reducer);

export default function App(props) {
    const [isLoadingComplete, setLoadingComplete] = useState(false);

    if (!isLoadingComplete && !props.skipLoadingScreen) {
        return (
            <AppLoading
                startAsync={loadResourcesAsync}
                onError={handleLoadingError}
                onFinish={() => handleFinishLoading(setLoadingComplete)}
            />
        );
    } else {
        return (
            <Provider store={store}>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Home" component={Home} />
                    </Stack.Navigator>
                </NavigationContainer>
            </Provider>
        );
    }
}

async function loadResourcesAsync() {
    await Promise.all([
        Asset.loadAsync([
        ]),
        Font.loadAsync({
            // ...Ionicons.font,
            'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),
            'OpenSans-Light': require('./assets/fonts/OpenSans-Light.ttf'),
            'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
            'OpenSans-ExtraBold': require('./assets/fonts/OpenSans-ExtraBold.ttf')
        }),
    ]);
}

function handleLoadingError(error) {
    // In this case, you might want to report the error to your error reporting
    // service, for example Sentry
    console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
    setLoadingComplete(true);
}
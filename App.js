import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Newsscreen from './Src/Screens/Newsscreen';

const App = () => {

    return (
        <SafeAreaView style={{ flex: 1 }} >
            <Newsscreen />
        </SafeAreaView>
    );
};


export default App;
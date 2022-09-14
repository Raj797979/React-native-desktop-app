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

import * as Colors from '../../Utility/color';
import Fontsize from '../../Utility/Fontsize';

const Header = () => {

    return (
        <>
            <View style={{ backgroundColor: Colors.fcolor, height: 50, width: "100%", justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ letterSpacing: 0.5, color: Colors.white, fontSize: Fontsize.font16, fontWeight: '700' }}>News</Text>
            </View>
        </>
    );
};


export default Header;
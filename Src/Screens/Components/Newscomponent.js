import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';

import * as Colors from '../../Utility/color';
import Fontsize from '../../Utility/Fontsize';

const Newscomponent = (props) => {

    const { item, index, onpress } = props;

    return (
        <>
            <TouchableOpacity activeOpacity={0.8} onPress={onpress} style={{ backgroundColor: Colors.white, width: "100%", justifyContent: 'center', alignItems: 'center' }}>

                <View style={{ flexDirection: 'row', width: "100%", padding: 10 }}>

                    <Text style={{ fontSize: Fontsize.font16, color: Colors.gray }}>{index}.</Text>

                    <View style={{ width: '100%', marginLeft: 10, }}>

                        <Text style={{ fontSize: Fontsize.font15, color: Colors.black }}>{item.title}</Text>

                    </View>

                </View>

            </TouchableOpacity>
        </>
    );
};


export default Newscomponent;
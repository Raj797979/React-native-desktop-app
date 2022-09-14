import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    LogBox,
    Linking,
    View,
    FlatList,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import Header from '../Components/Header';

import * as Colors from '../../Utility/color';
import Fontsize from '../../Utility/Fontsize';

import Newscomponent from '../Components/Newscomponent';

const Newsscreen = () => {
 
    const [row, setRow] = useState(30);
    const [loadingMore, setLoadingMore] = useState(false);
    const [NewsArrayList, setNewsArrayList] = useState([]);

    let flatListRef = useRef();

    const ListArray = useRef();
    const pageIndex = useRef();

    useEffect(() => {
        GetAllNewStories()
        return () => {
        }
    }, []);

    // Get all news array with ids
    const GetAllNewStories = async () => {
        try {
            pageIndex.current = 1;
            setLoadingMore(true)
            let response = await fetch('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty');
            let responseJson = await response.json();
            
            ListArray.current = responseJson;

            Pagination(responseJson);

            // return responseJson;
        } catch (error) {
            console.error(error);
        }
    }

    // Pagination for news
    const Pagination = async (responseJson) => {

        const startIndex = (pageIndex.current - 1) * row;
        const endIndex = pageIndex.current * row;

        if (startIndex > 500) {
            setLoadingMore(false)
            return;
        }

        let results = ListArray.current.slice(startIndex, endIndex);

        let array = [];

        for (let index = 0; index < results.length; index++) {
            const element = results[index];
            array.push(await GetSingleNews(element));
        }

        setLoadingMore(false)
        setNewsArrayList([...NewsArrayList, ...array])

        pageIndex.current = pageIndex.current + 1
    }

    // Get single news data
    const GetSingleNews = async (data) => {
        try {
            let response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${data}.json?print=pretty`);
            let responseJson = await response.json();
            // console.log(data, " => ", responseJson);

            return responseJson;
        } catch (error) {
            console.error(error);
        }
    }

    // Check for scroll to bottom
    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - 1;
    };

    // scroll callback
    const onScroll = useCallback(async ({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent) && !loadingMore) {
            setLoadingMore(true)
            Pagination(ListArray.current);

        }
    }, [])

    // News press for navigate to full article
    const ItemClick = async (item) => {
        const canOpen = await Linking.canOpenURL(item?.url)
        if (canOpen) {
            Linking.openURL(item?.url)
        }
    }

    LogBox.ignoreAllLogs(true);
    LogBox.ignoreLogs(['Remote debugger']);
    return (
        <>
            <View style={{ flex: 1 }}>
                <Header />

                <FlatList
                    ref={flatListRef}
                    data={NewsArrayList}
                    style={{ width: '100%', flex: 1, paddingTop: 10, backgroundColor: Colors.white }}
                    // showsVerticalScrollIndicator={false}
                    bounces={false}
                    keyboardShouldPersistTaps="always"
                    removeClippedSubviews
                    initialNumToRender={row}
                    maxToRenderPerBatch={row}
                    onEndReachedThreshold={0.1}
                    keyExtractor={item => item.id}
                    onScroll={onScroll}
                    renderItem={({ item, index }) => (
                        <View key={index.toString()} style={{ width: "100%", alignItems: 'center' }}>
                            <Newscomponent item={item} index={index + 1} onpress={() => { ItemClick(item) }} />
                        </View>
                    )
                    }
                    ListFooterComponent={() =>
                        loadingMore && <View style={{ height: 50, width: "100%", backgroundColor: Colors.white, justifyContent: 'center', alignItems: 'center', }}>
                            <ActivityIndicator size={'large'} color={Colors.fcolor} />
                        </View>}
                />

            </View>
        </>
    );
};


export default Newsscreen;
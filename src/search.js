import React, {useState, useCallback, useEffect, useRef} from 'react';
import {TextInput, Button, View, Keyboard, FlatList, Text, ActivityIndicator} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductItem from './productItem';


const Search = ({navigation}) => {

    const [text, setText] = useState('');
    const [searchData, setSearchData] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [loadingData, setLoadingData] = useState(false);
    const listRef = useRef(null);
    
    const searchUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=08ca9e5d18d7b5d967f7b9738a4fedc3&text=${text}&page=${pageNumber}&format=json&nojsoncallback=1`
    const onTextChange = (text) => {
        setText(text);
    }

    const parseResponse = (res) => {
        const photos = res?.photos?.photo;
        const updatedPhotos = photos?.map((photoData) => {
            return {
                id: photoData.id,
                url: `https://live.staticflickr.com/${photoData.server}/${photoData.id}_${photoData.secret}.jpg`,
                title: photoData.title
            }
        });
        return {
            ...res,
            photos: {
                ...res.photos,
                photo: updatedPhotos
            }
        }
    }

    const getSearchData = useCallback(async(url = '') => {
        setLoadingData(true);
        const headers = new Headers({
            'Content-Type' : 'application/json',
        })
       try{      
        const response = await fetch(url, { headers, method : 'GET'})
        const jsonRes = await response.json();
        const parsedRes = parseResponse(jsonRes);
        if(parsedRes?.photos?.photo){
            if(searchData?.length > 0 && pageNumber !== 1){
                setSearchData((prevData) => [...prevData, ...parsedRes?.photos?.photo]);
            }else{
                setSearchData(parsedRes?.photos?.photo);
            }
        }
        setLoadingData(false);
       }catch(error){
           console.log(error);
           setLoadingData(false);
       }
      },[pageNumber, text])

     useEffect(() => {
        getSearchData(searchUrl);
     },[pageNumber]) 

     const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 0;
        return layoutMeasurement.height + contentOffset.y >=
          contentSize.height - paddingToBottom;
      };
    return(
        <SafeAreaView
            style = {{
                paddingHorizontal : 10,
                backgroundColor : 'white',
                flex : 1
            }}
        >
            <View
                style = {{
                    flexDirection : 'row'
                }}
            >
                <TextInput
                    placeholder='Search image by text'
                    style = {{
                        borderWidth: 1,
                        paddingVertical : 10,
                        paddingHorizontal : 7,
                        flexGrow : 1
                    }}
                    value = {text}
                    onChangeText = {onTextChange}
                />
                <Button
                    title = {'Search'}
                    onPress = {() => {
                        Keyboard.dismiss();
                        if(text){
                            setPageNumber(1);
                            listRef?.current?.scrollToOffset({ animated: true, offset: 0 });
                            setTimeout(() => {
                                getSearchData(searchUrl);
                            }, 1000)
                        }
                    }}
                />
        </View>
        <>
        {
            searchData?.length > 0 ? 
            <FlatList
            ref = {listRef}
            style = {{
                flexGrow : 1
            }}
            onScroll={({nativeEvent}) => {
                if (isCloseToBottom(nativeEvent) && !loadingData) {
                    setPageNumber((prevState) => prevState+1)
                }
              }}
              scrollEventThrottle={400}
            data = {searchData}
            ListFooterComponent = {() => {
                return(
                <View style = {{
                    flexGrow : 1,
                    paddingVertical : 10
                }}>
                    <ActivityIndicator
                        size={'large'}
                    />
                </View>
                )
            }}
            renderItem={(item) => {
                return(
                    <ProductItem
                    key = {item?.id}
                    data = {item?.item}
                    onClick = {() => {
                        navigation.navigate('Detail', {
                            item: item?.item
                        });
                    }}
                />
                )
            }}
        />
        :
        <View
            style = {{
                flexGrow : 1,
                alignItems : 'center',
                justifyContent : 'center'
            }}
        >
            <Text>
                No records found
            </Text>
        </View>
        }
       </>
        </SafeAreaView>
    )
}

export default Search;
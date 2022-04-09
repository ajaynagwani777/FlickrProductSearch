import React from 'react';
import {Text, Image, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const Detail = ({route, navigation}) => {
    const data = route?.params?.item;
    return(
        <SafeAreaView
        style = {{
            paddingHorizontal : 10,
            backgroundColor : 'white',
            flex : 1
        }}
    >
        <TouchableOpacity
            onPress={() => navigation.goBack()}
        >
        <Text>
            {'< Back'}
        </Text>
        </TouchableOpacity>
        <Image
            source={{uri : data?.url}}
            style = {{
                // width : '70%',
                height : '70%',
                marginTop : 15
            }}
        />
        <Text
            style = {{
                paddingTop : 15
            }}
        >
            {data?.title}
        </Text>
    </SafeAreaView>
    )
}

export default Detail;
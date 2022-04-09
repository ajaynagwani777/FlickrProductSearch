import React from 'react';
import {TouchableOpacity, Image, Text, View} from 'react-native';

const ProductItem = ({data, onClick}) => {
    return(
        <View
            style = {{
                elevation: 10,
                shadowColor: 'black', 
                shadowOpacity : 0.4,
                flex : 1,
                backgroundColor: 'white',
                marginVertical : 10,
                borderRadius : 10,
                shadowOffset: {width: -2, height: 2},
                paddingVertical : 7,
                paddingHorizontal : 10
            }}
        >
        <TouchableOpacity
            onPress = {onClick}
            style = {{
                flexDirection : 'row',
            }}
        >
            <Image
                style = {{
                    width : 70,
                    height: 70,
                    borderRadius : 5
                }}
                source = {{uri : data?.url}}
            />
            <View
                style = {{
                    paddingHorizontal : 10,
                    flexShrink : 1
                }}
            >
                <Text>
                    {data?.title}
                </Text>
            </View>
        </TouchableOpacity>
        </View>
    )
}

export default ProductItem;
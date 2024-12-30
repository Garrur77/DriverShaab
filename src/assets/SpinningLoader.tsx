import { View, Text } from 'react-native'
import React from 'react'
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { COLORS } from '../assets/Theme';


interface prop {
    loader: boolean | undefined
}



export default function SpinningLoader(props: prop) {
    return (
        <View>
            <Spinner
                overlayColor='rgba(0,0,0,0.75)'
                visible={props.loader}
                color={COLORS.ORANGE}
            />
        </View>
    )
}
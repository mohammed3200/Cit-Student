import { View, Text } from 'react-native'
import React from 'react'

interface WelcomeProps { }

const welcome: React.FC<WelcomeProps> = () => {
    return (
        <View>
            <Text>welcome</Text>
        </View>
    )
}

export default welcome
import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

interface NextButtonProp {
    label: string;
    variant: "default" | "primary";
    onPress: () => void;
}

const NextButton: React.FC<NextButtonProp> = ({ label, variant = "default", onPress }) => {

    const backgroundColor = variant === "primary" ? "#FF6600" : "rgba(12, 13, 52, 0.05)";

    return (
        <TouchableOpacity
            style={{ backgroundColor }}
            className='h-auto py-5 justify-center items-center px-24 rounded-full bg-red-200'
            onPress={onPress}
            activeOpacity={.5}
        >
            <View>
                <Text
                    className={`font-DNNestLT text-base text-center
                    ${variant === "primary" ?
                            "text-white" :
                            "text-[#0C0D34]"}
                    `}
                >{label}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default NextButton
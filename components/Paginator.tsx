import { View, useWindowDimensions, Animated, StyleSheet } from "react-native";
import React from "react";

interface PaginatorProp {
    data: any;
    scrollX: any;
}

const Paginator: React.FC<PaginatorProp> = ({ data, scrollX }) => {
    const { width } = useWindowDimensions();


    return (
        <View className="flex-row h-16">
            {data.map((_: any, i: number) => {
                const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [10, 20, 10],
                    extrapolate: 'clamp'
                });

                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.3, 1, 0.3],
                    extrapolate: 'clamp'
                })
                return <Animated.View
                    style={[styles.dot, { width: dotWidth, opacity }]}
                    className="bg-secondary-100"
                    key={i.toString()}
                />
            })}
        </View>
    );
};

export default Paginator;

const styles = StyleSheet.create({
    dot: {
        height: 10,
        borderRadius: 5,
        marginHorizontal: 8
    }
})
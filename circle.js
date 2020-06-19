import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";
 
export const RADIUS = 7

class Circle extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const x = this.props.position[0] - RADIUS / 2;
        const y = this.props.position[1] - RADIUS / 2;
        return (
            <View style={[styles.finger, { left: x, top: y }]} />
        );
    }
}
 
const styles = StyleSheet.create({
    finger: {
        borderColor: "#CCC",
        borderRadius: RADIUS * 2,
        width: RADIUS * 2,
        height: RADIUS * 2,
        backgroundColor: "rgba(10,32,255,0.7)",
        position: "absolute"
    }
});
 
export { Circle };
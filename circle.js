import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";

class Circle extends PureComponent {
    constructor() {
        super();
    };

    render() {
        const x = this.props.position[0] - this.props.radius;
        const y = this.props.position[1] - this.props.radius;
        const r = this.props.radius;
        return (
            <View style={[styles.finger, { left: x, top: y, width: r * 2, height: r * 2, borderRadius: r * 2 }]} />
        );
    };
}
 
const styles = StyleSheet.create({
    finger: {
        borderColor: "#CCC",
        backgroundColor: "rgba(10,32,255,0.7)",
        position: "absolute"
    }
});
 
export { Circle };
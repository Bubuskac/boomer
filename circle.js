import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";

class Circle extends PureComponent {
    backgroundColor = "";
    type = "circle";
    
    constructor(props) {
        super(props);
        this.backgroundColor = props.backgroundColor ? props.backgroundColor : "rgba(10, 32, 255, 0.7)";
    };

    render() {
        const x = this.props.position[0] - this.props.radius;
        const y = this.props.position[1] - this.props.radius;
        const r = this.props.radius;
        return (
            <View style={[styles.finger, {
                left: x,
                top: y,
                width: r * 2,
                height: r * 2,
                borderRadius: r * 2,
                backgroundColor: this.backgroundColor
            }]} />
        );
    };
}
 
const styles = StyleSheet.create({
    finger: {
        position: "absolute"
    }
});
 
export { Circle };
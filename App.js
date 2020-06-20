import React, { PureComponent } from "react";
import { AppRegistry, StyleSheet, StatusBar, Dimensions, TouchableWithoutFeedback, View } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { Circle } from "./circle";
import { Movement } from "./movement"
 
export const RADIUS = 7;

export default class BestGameEver extends PureComponent {
    circles = 0
    
    constructor() {
        super();
        this.entities = {};
        for (let i = 0; i < 10; i++) {
            this.entities[i] = this.createCircle();
            this.circles++;
        }
    }

    createCircle() {
        let posX = 5;
        let posY = 5;
        let partialSpeed = Math.random()
        let speedX = partialSpeed;
        let speedY = 1 - partialSpeed;
        partialSpeed = Math.random();
        speedX += partialSpeed;
        speedY += 1 - partialSpeed;
        speedX /= 2;
        speedY /= 2;
        if (Math.random() > 0.5) {
            speedX *= -1;
        }
        if (Math.random() > 0.5) {
            speedY *= -1;
        } 
        posX += Math.floor(Math.random() * (Dimensions.get('window').width - RADIUS * 2));
        posY += Math.floor(Math.random() * (Dimensions.get('window').height - RADIUS * 2));
        return {
            position: [posX,  posY],
            speed: [speedX, speedY],
            direction: [0, 0],
            radius: RADIUS,
            phase: 0, 
            renderer: <Circle />
        }
    }

    boomer(event) {
        let me = this.children._owner.stateNode
        if (!me.entities[me.circles]) {
            me.entities[me.circles] = me.createCircle();
            me.entities[me.circles].speed = [0, 0];
            me.entities[me.circles].position = [event.nativeEvent.pageX - RADIUS / 2 + 1, event.nativeEvent.pageY - RADIUS / 2 + 1];
            me.entities[me.circles].phase = 1;
        }
    }
     
    render() {
        return (
            <GameEngine
                style={styles.container}
                systems={[Movement]}
                entities={this.entities}
                running={true}>
                <StatusBar hidden={true} />
                <TouchableWithoutFeedback onPress={this.boomer}>
                    <View style={styles.captureLayer}/>
                </TouchableWithoutFeedback>
            </GameEngine>
        );
    }
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#AAA"
    },
    captureLayer: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0)"
    }
});
 
AppRegistry.registerComponent("BestGameEver", () => BestGameEver);
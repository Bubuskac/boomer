import React, { PureComponent } from "react";
import { AppRegistry, StyleSheet, StatusBar, Dimensions } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { Circle, RADIUS } from "./circle";
import { Movement } from "./movement"
 
export default class BestGameEver extends PureComponent {
    constructor() {
        super();
        this.entities = {};
        for (let i = 0; i < 50; i++) {
            let posX = 5;
            let posY = 5;
            let partialSpeed = Math.random()
            let speedX = partialSpeed;
            let speedY = 1 - partialSpeed;
            partialSpeed = Math.random();
            speedX += partialSpeed;
            speedY += 1 - partialSpeed;
            if (Math.random() > 0.5) {
                speedX *= -1;
            }
            if (Math.random() > 0.5) {
                speedY *= -1;
            } 
            posX += Math.floor(Math.random() * (Dimensions.get('window').width - RADIUS * 2));
            posY += Math.floor(Math.random() * (Dimensions.get('window').height - RADIUS * 2));
            this.entities[i] = {
                position: [posX,  posY],
                speed: [speedX, speedY],
                direction: [0, 0], 
                renderer: <Circle radius={RADIUS} />
            }
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
         
            </GameEngine>
        );
    }
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#AAA"
    }
});
 
AppRegistry.registerComponent("BestGameEver", () => BestGameEver);
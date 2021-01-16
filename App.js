import React, { PureComponent } from "react";
import { AppRegistry, StyleSheet, StatusBar, Dimensions, TouchableWithoutFeedback, View, Button } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { Circle } from "./circle";
import { Square } from "./square";
import { Movement } from "./movement"
 
export const RADIUS = 7;

export const NUM_OF_CIRCLES = 10;

export const signal = (message) => {
    me.listen(message);
};

let me = null;

export default class Boomer extends PureComponent {
    circles = 0;
    booming = 0;
    died = -1;
    
    constructor() {
        super();
        this.gameEngine = null;
        this.state = {
            running: false
        };
        me = this;
    };

    createCircle(backgroundColor) {
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
            backgroundColor: backgroundColor, 
            renderer: <Circle />
        }
    };

    createSquare(backgroundColor) {
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
            backgroundColor: backgroundColor, 
            renderer: <Square />
        };
    }

    boomer(event) {
        if (!this.entities[this.circles]) {
            this.entities[this.circles] = this.createSquare("rgba(255, 10, 32, 0.7)");
            this.entities[this.circles].speed = [0, 0];
            this.entities[this.circles].position = [event.nativeEvent.pageX - RADIUS / 2 + 1, event.nativeEvent.pageY - RADIUS / 2 + 1];
            this.entities[this.circles].phase = 1;
            this.booming++;
        }
    };

    listen(message) {
        if (message == 'hit') {
            this.booming++;
        }
        if (message == 'died') {
            this.booming--;
            this.died++;
            if (this.booming == 0 && this.entities[this.circles]) {
                this.setState({running: false});
                this.gameEngine.stop();
                console.log(this.died);
            }
        }
    };

    start() {
        this.entities = {};
        this.circles = 0;
        this.booming = 0;
        this.died = -1;
        for (let i = 0; i < NUM_OF_CIRCLES; i++) {
            this.entities[i] = this.createCircle();
            this.circles++;
        }
        if (this.gameEngine) {
            this.gameEngine.swap(this.entities);
        }
        this.setState({running: true});
    };
     
    render() {
        return (
            <GameEngine
                ref={(ref) => {
                    this.gameEngine = ref;
                }}
                style={styles.container}
                systems={[Movement]}
                entities={this.entities}
                running={this.state.running}>
                <StatusBar hidden={true} />
                <TouchableWithoutFeedback onPress={(event) => this.boomer(event)}>
                    <View style={styles.captureLayer}/>
                </TouchableWithoutFeedback>
                {!this.state.running && <View style={styles.fullScreen}>
                    <Button style={{color: 'white', fontSize:48}} onPress={() => this.start()} title="Start"></Button>
                </View>}
            </GameEngine>
        );
    };

}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#AAA",
        overflow: "hidden"
    },
    captureLayer: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0)"
    },
    fullScreen: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'black',
        opacity: 0.8,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
 
AppRegistry.registerComponent("Boomer", () => Boomer);
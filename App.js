import React, { PureComponent } from "react";
import { AppRegistry, StyleSheet, StatusBar, Dimensions, TouchableWithoutFeedback, View, Button } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { Circle } from "./circle";
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
    died = 0;
    
    constructor() {
        super();
        this.gameEngine = null;
        this.state = {
            running: false
        };
    };

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
    };

    boomer(event) {
        if (!me.entities[me.circles]) {
            me.entities[me.circles] = me.createCircle();
            me.entities[me.circles].speed = [0, 0];
            me.entities[me.circles].position = [event.nativeEvent.pageX - RADIUS / 2 + 1, event.nativeEvent.pageY - RADIUS / 2 + 1];
            me.entities[me.circles].phase = 1;
            me.booming++;
        }
    };

    listen(message) {
        if (message == 'hit') {
            me.booming++;
        }
        if (message == 'died') {
            me.booming--;
            me.died++;
            if (me.booming == 0 && me.entities[me.circles]) {
                me.setState({running: false});
                me.gameEngine.stop();
                console.log(me.died);
            }
        }
    };

    start() {
        me.entities = {};
        me.circles = 0;
        me.booming = 0;
        me.died = 0;
        for (let i = 0; i < NUM_OF_CIRCLES; i++) {
            me.entities[i] = me.createCircle();
            me.circles++;
        }
        if (me.gameEngine) {
            me.gameEngine.swap(me.entities);
        }
        me.setState({running: true});
    };
     
    render() {
        return (
            <GameEngine
                ref={(ref) => {
                    this.gameEngine = ref;
                    me = this;
                }}
                style={styles.container}
                systems={[Movement]}
                entities={this.entities}
                running={this.state.running}>
                <StatusBar hidden={true} />
                <TouchableWithoutFeedback onPress={this.boomer}>
                    <View style={styles.captureLayer}/>
                </TouchableWithoutFeedback>
                {!this.state.running && <View style={styles.fullScreen}>
                    <Button style={{color: 'white', fontSize:48}} onPress={this.start} title="Start"></Button>
                </View>}
            </GameEngine>
        );
    };

}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#AAA"
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
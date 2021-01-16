import { RADIUS, NUM_OF_CIRCLES, signal } from "./App"
import { GameEngine } from "react-native-game-engine";

const END_OF_LIFE = 120;

const Movement = (entities, data) => {
    happening(entities, data.layout);

    collosionDetect(entities);

    return entities;
};

const happening = (entities, layout) => {
    for (let i in entities) {
        let circle = entities[i];
        if (circle.phase == 0) {
            move(circle, layout);
        } else if (circle.phase == 1) {
            blow(circle);
        } else if (circle.phase > 1 && circle.phase < END_OF_LIFE) {
            circle.phase += 1;
        } else if (circle.phase == END_OF_LIFE) {
            shrink(circle);
        }
    }
}

const move = (circle, layout) => {
    let directionX = circle.speed[0] + circle.direction[0];
    let directionY = circle.speed[1] + circle.direction[1];
    let newX = circle.position[0];
    let newY = circle.position[1];
    [directionX, newX] = applySpeed(directionX, newX);
    [directionY, newY] = applySpeed(directionY, newY);

    if (layout && newX > layout.width - circle.radius - 1) {
        circle.speed = [
            Math.abs(circle.speed[0]) * -1,
            circle.speed[1]
        ];
    }
    if (newX < circle.radius + 1) {
        circle.speed = [
            Math.abs(circle.speed[0]),
            circle.speed[1]
        ];
    }
    if (layout && newY > layout.height - circle.radius - 1) {
        circle.speed = [
            circle.speed[0],
            Math.abs(circle.speed[1]) * -1
        ];
    }
    if (newY < circle.radius + 1) {
        circle.speed = [
            circle.speed[0],
            Math.abs(circle.speed[1])
        ];
    }
    circle.position = [newX, newY];
    circle.direction = [directionX, directionY];
}

const blow = (circle) => {
    if (circle.radius > RADIUS * 10) {
        circle.phase = 2;
    }
    circle.radius += 1;
    redraw(circle);
}

const shrink = (circle) => {
    if (circle.radius < 0) {
        circle.phase = END_OF_LIFE + 1;
        circle.position = [-5, -5];
        signal('died');
    }
    circle.radius -= 1;
    redraw(circle);
}

const redraw = (circle) => {
    circle.position = [
        circle.position[0],
        circle.position[1]
    ];
}

const collosionDetect = (entities) => {
    for (let i in entities) {
        let shape = entities[i];
        if (shape.phase > 0) {
            for (let j in entities) {
                let otherShape = entities[j];
                if (i != j && otherShape.phase == 0) {
                    if (shape.type == "circle" && otherShape.type == "circle") {
                        let jX = otherShape.position[0];
                        let jY = otherShape.position[1];
                        let jR = otherShape.radius;
                        let iX = shape.position[0];
                        let iY = shape.position[1];
                        let iR = shape.radius;
                        if (iR + jR > Math.sqrt((jX - iX) * (jX - iX) + (jY - iY) * (jY - iY))) {
                            otherShape.phase = 1;
                            signal('hit');
                        }
                    } else if (shape.type == "square" && otherShape.type == "square"){
                        //TBD
                    } else {
                        let sX = shape.type == "square" ? shape.position[0] : otherShape.position[0];
                        let sY = shape.type == "square" ? shape.position[1] : otherShape.position[1];
                        let sR = shape.type == "square" ? shape.radius : otherShape.radius;
                        let cX = shape.type == "square" ? otherShape.position[0] : shape.position[0];
                        let cY = shape.type == "square" ? otherShape.position[1] : shape.position[1];
                        let cR = shape.type == "square" ? otherShape.radius : shape.radius;
                        if (!(cX + cR < sX || cX - cR > sX + sR) && !(cY + cR < sY || cY - cR > sY + sR)) {
                            otherShape.phase = 1;
                            signal('hit');
                        } 
                    }
                }
            }
        }
    }
}

const applySpeed = (direction, position) => {
    while (direction > 1) {
        position += 1;
        direction -= 1;
    }
    while (direction < -1) {
        position -= 1;
        direction += 1;
    }
    return [direction, position];
};
 
export { Movement };
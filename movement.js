import { RADIUS } from "./App"

const END_OF_LIFE = 180;

const Movement = (entities, data) => {
    for (let i in entities) {
        let circle = entities[i];
        if (circle.phase == 0) {
            let directionX = circle.speed[0] + circle.direction[0];
            let directionY = circle.speed[1] + circle.direction[1];
            let newX = circle.position[0];
            let newY = circle.position[1];
            [directionX, newX] = applySpeed(directionX, newX);
            [directionY, newY] = applySpeed(directionY, newY);
            if (data.layout && newX > data.layout.width - circle.radius - 1) {
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
            if (data.layout && newY > data.layout.height - circle.radius - 1) {
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
        else if (circle.phase == 1) {
            if (circle.radius > RADIUS * 10) {
                circle.phase = 2;
            }
            circle.radius += 1;
            circle.position = [
                circle.position[0],
                circle.position[1] 
            ]
        }
        else if (circle.phase > 1 && circle.phase < END_OF_LIFE) {
            circle.phase += 1;
        }
        else if (circle.phase == END_OF_LIFE) {
            if (circle.radius < 0) {
                circle.phase = END_OF_LIFE + 1;
                circle.position = [-5, -5];
            }
            circle.radius -= 1;
            circle.position = [
                circle.position[0],
                circle.position[1]
            ]
        }
    }

    for (let i in entities) {
        let circle = entities[i];
        if (circle.phase > 0) {
            for (let j in entities) {
                let otherCircle = entities[j]; 
                if (i != j && otherCircle.phase == 0) {
                    let jX = otherCircle.position[0];
                    let jY = otherCircle.position[1];
                    let jR = otherCircle.radius;
                    let iX = circle.position[0];
                    let iY = circle.position[1];
                    let iR = circle.radius; 
                    if (iR + jR > Math.sqrt((jX - iX) * (jX - iX) + (jY - iY) * (jY - iY))) {
                        otherCircle.phase = 1;
                    }
                }
            }
        }
    }
 
    return entities;
};

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
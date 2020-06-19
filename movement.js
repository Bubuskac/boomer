const Movement = (entities, data) => {
    for (let i in entities) {
        let circle = entities[i];
        let directionX = circle.speed[0] + circle.direction[0];
        let directionY = circle.speed[1] + circle.direction[1];
        let newX = circle.position[0];
        let newY = circle.position[1];
        [directionX, newX] = applySpeed(directionX, newX);
        [directionY, newY] = applySpeed(directionY, newY);
        if (data.layout && newX > data.layout.width - circle.renderer.props.radius * 2) {
            circle.speed = [
                Math.abs(circle.speed[0]) * -1,
                circle.speed[1]
            ];
        }
        if (newX < 5) {
            circle.speed = [
                Math.abs(circle.speed[0]),
                circle.speed[1]
            ];
        }
        if (data.layout && newY > data.layout.height - circle.renderer.props.radius * 2) {
            circle.speed = [
                circle.speed[0],
                Math.abs(circle.speed[1]) * -1
            ];                      
        }
        if (newY < 5) {
            circle.speed = [
                circle.speed[0],
                Math.abs(circle.speed[1])
            ];
        }
        circle.position = [newX, newY];
        circle.direction = [directionX, directionY];
    }
    data.touches.filter(t => t.type === "move").forEach(t => {
        let circle = entities[t.id];
        if (circle && circle.position) {
            circle.position = [
                circle.position[0] + t.delta.pageX,
                circle.position[1] + t.delta.pageY
            ];
        }
    });
 
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
function Block() {
    let o = {
        x: 500,
        y: 500,//480
        w: 200,
        h: 50,
        speed: 10,
    };
    o.moveLeft = function () {
        o.x -= o.speed;
    }
    return o;
}
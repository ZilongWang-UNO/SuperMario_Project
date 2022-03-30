function BackGround() {
    let o = {
        x: 0,
        y: 0,
        w: window.innerWidth,
        h: window.innerHeight,
        speed: 10,
    };
    o.moveLeft = function () {
        o.x -= o.speed;
        o.w += o.speed;
    }
    return o;
}
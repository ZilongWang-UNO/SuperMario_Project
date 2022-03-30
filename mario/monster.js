function Monster() {
    let o = {
        x: 800,
        y: 650,
        w: 50,
        h: 50,
        speed: 5,
        kill: false,
    };
    o.move = function () {
        o.x -= o.speed;
    };
    o.killed = function () {
        o.kill = true;
    };
    return o;
};
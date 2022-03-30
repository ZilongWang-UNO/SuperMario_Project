function Bullet() {
    let o = {
        x: mario.x,
        y: mario.y + mario.h/2,
        w: 10,
        h: 10,
        speed: 15,
        fire: false,
        distance: 0,
        left: mario.faceLeft,
        right: mario.faceRight,
    };
    o.move = function () {
        if (o.left) {
            o.x -= o.speed;
        }
        else if (o.right)
            o.x += o.speed;
        o.distance += o.speed;
    };
    o.fired = function () {
        o.fire = true;
    };
    o.gone = function () {
        o.fire = false;
    }
    o.collide = function (m) {
        if (!m.kill) {
            if ((o.y + o.h <= m.y + m.h) && (o.y + o.h >= m.y)) {
                if ((o.x + o.w >= m.x && o.x + o.w <= m.x + m.w) || (o.x >= m.x && o.x <= m.x + m.w)) {
                    //o.score++;
                    return true;
                }
            }
            return false;
        }
    }
    return o;
};
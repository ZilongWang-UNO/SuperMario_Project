function Mario() {
    let o = {
        x: 64,
        y: 416,
        w: 32,
        h: 32,
        speed: 0.4,
        maxSpeed: 7,
        //jspeed: 20,
        jumpHeight: 96,
        standY: 448,
        vx: 0,
        mx: 0,
        vy: 0,
        gy: 10,
        //topY: 300,
        //standY: 600,
        hp: 3,
        score: 0,
        coin: 0,
        color: "yellow",
        colorInv: "red",
        invulnerable: false,
        invulnerableTime: 0,
        //jump: false,
        endJump: false,
        jumped: false,
        jumping: false,
        faceLeft: false,
        faceRight: true,
    };

    o.moveLeft = function () {
        o.vx -= o.speed
        o.mx = o.speed / 2
    }
    o.moveRight = function () {
        o.vx += o.speed
        o.mx = -o.speed / 2
    }
    o.moveJump = function () {
        o.vy = -10
    }
    o.collideWithMonster = function (m) {
        if (!m.kill) {
            //face to face without jumping
            if ((o.y + o.h == m.y + m.h) && !o.invulnerable) {
                if ((o.x + o.w >= m.x && o.x + o.w <= m.x + m.w) || (o.x >= m.x && o.x <= m.x + m.w)) {
                    o.hp--;
                    o.invulnerable = true;
                    return false;
                }
            }
            //jump onto it
            else if (o.jump && (o.y + o.h - o.jspeed <= m.y) && (o.y + o.h >= m.y)) {
                if ((o.x + o.w >= m.x && o.x + o.w <= m.x + m.w) || (o.x >= m.x && o.x <= m.x + m.w)) {
                    o.score++;
                    return true;
                }
            }
            return false;
        }
    }
    return o;
};
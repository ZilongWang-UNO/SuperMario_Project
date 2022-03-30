function update() {
    //head touch check
    offset = Math.abs(offsetX / map.tileSize)
    i = Math.round(mario.x / map.tileSize + offset)
    j = Math.ceil(mario.y / map.tileSize) - 1
    if (map.headTouch(i + 1, j)) {
        i = Math.ceil(mario.x / map.tileSize + offset)
    }
    else if (map.headTouch(i - 1, j)) {
        i = Math.floor(mario.x / map.tileSize + offset)
    }
    headTouch = map.headTouch(i, j)

    if (headTouch) {
        i2 = i
        j2 = j
        let index = i * map.th + j
        if (tiles[index] == 2) {
            tiles[index] = 1
            mario.score += 200
            mario.coin++
        }
        /*
        if (coin.some(item => item.index == index)) {
            for (let key in coin) {
                if (coin[key].index == index) {
                    coin[key].number++
                }
            }
        }
        else {
            coin.push({ "index": index, "number": 1 })
        }
    }*/
        mario.vy *= -1
        mario.jumping = false
        mario.y = (j + 1) * map.tileSize + 1 //move 1 space down in case error occurs
    }

    //touch block check and update mario's x
    if (mario.faceRight) {
        i = Math.floor((mario.x + mario.w) / map.tileSize + offset)
    }
    else if (mario.faceLeft) {
        i = Math.ceil((mario.x - mario.w) / map.tileSize + offset)
    }

    j = Math.floor(mario.y / map.tileSize)
    if (mario.h == 64) {
        touchBlock = map.touchBlock(i, j) || map.touchBlock(i, j + 1)
    }
    else {
        touchBlock = map.touchBlock(i, j)
    }

    if (touchBlock) {
        mario.vx = 0
        if (mario.faceRight) {
            mario.x = (i - 1 - offset) * map.tileSize
        }
        else {
            mario.x = (i + 1 - offset) * map.tileSize
        }
    }
    else {
        mario.vx += mario.mx
    }

    if (Math.abs(mario.vx) >= mario.maxSpeed) {
        mario.vx = parseInt(mario.vx)
    }

    if (mario.vx * mario.mx > 0) {
        mario.vx = 0
        mario.mx = 0
    }
    else {
        mario.x += mario.vx
    }

    //on ground check
    i = Math.round(mario.x / map.tileSize + offset)
    j = Math.floor(mario.y / map.tileSize) + (mario.h / map.tileSize)
    if (map.onGround(i + 1, j)) {
        i = Math.ceil(mario.x / map.tileSize + offset)
    }
    else if (map.onGround(i - 1, j)) {
        i = Math.floor(mario.x / map.tileSize + offset)
    }

    onGround = map.onGround(i, j)

    if (onGround && mario.vy > 0) {
        mario.standY = mario.y + mario.h
        mario.vy = 0
        mario.jumping = false
        mario.endJump = true
    }
    else {
        mario.y += mario.vy
        mario.vy += mario.gy * 0.15
        i = Math.round(mario.x / map.tileSize + offset)
        j = Math.floor(mario.y / map.tileSize) + (mario.h / map.tileSize)
        if (map.onGround(i + 1, j)) {
            i = Math.ceil(mario.x / map.tileSize + offset)
        }
        else if (map.onGround(i - 1, j)) {
            i = Math.floor(mario.x / map.tileSize + offset)
        }
        onGround = map.onGround(i, j)
        if (onGround) {
            mario.y = (j) * map.tileSize - mario.h
        }
        //cannot jump during drop
        else {
            mario.endJump = false
        }

    }
    if (mario.y < mario.standY - mario.jumpHeight - mario.h) {
        mario.jumping = false
        mario.endJump = false
    }

    //update each bullet movement
    for (let i = 0; i < bullets.length; i++) {
        if (bullets[i].fire) {
            bullets[i].move()
            if (bullets[i].distance >= 350) {
                bullets[i].gone()
            }
        }
    }
    bullets = bullets.filter(b => b.fire == true)
    //monsters = monsters.filter(m => m.kill == false)
    //bullets = bullets.filter(b => b.fire == true)
    //invulnerable buff
    /*if (mario.invulnerable) {
        mario.invulnerableTime++;
        marioColor = mario.colorInv;
        if (mario.invulnerableTime >= fps * 1) {//1 sec invulnerable buff
            mario.invulnerable = false;
            marioColor = mario.color;
            mario.invulnerableTime = 0;
        }
    }
*/

    if (mario.x <= 0) {
        mario.x = 0
    }
    else if (mario.x >= canvas.width / 2) {
        mario.x = canvas.width / 2
        if (right) {
            offsetX -= Math.floor(mario.vx)
        }
    }

    if (enemies.length > 0) {
        for (let key in enemies) {
            enemies[key].speed -= 1

            let pos = enemies[key].position
            let tempSpeed = enemies[key].speed
            let x = Math.floor(pos / map.th) * map.tileSize + offsetX

            //let y = (i % map.th) * map.tileSize
            let y = enemies[key].y

            i = Math.round((x + tempSpeed) / map.tileSize + offset)
            console.log(i)
            j = Math.floor(y / map.tileSize) + 1
            if (map.onGround(i + 1, j)) {
                i = Math.ceil((x + tempSpeed) / map.tileSize + offset)
            }
            else if (map.onGround(i - 1, j)) {
                i = Math.floor((x + tempSpeed) / map.tileSize + offset)
            }
            onGround = map.onGround(i, j)
            //console.log(i, j, 'yes')
            if (!onGround) {
                enemies[key].y += enemies[key].vy
                enemies[key].dropSpeed += enemies[key].vy
                enemies[key].vy += mario.gy * 0.1

                //console.log(i, j, 'yes')
                //mario.y = (j) * map.tileSize - mario.h
            }
            else {
                enemies[key].y = j * map.tileSize - 32
                //[key].dropSpeed = 0
                enemies[key].vy = 0
                //console.log('yes')
            }
        }
        //TODO:
        //FIXME:
        //BUG when remove the value from array, 
        //the next loop will return error because array length reduced
        for (let key in enemies) {
            if (enemies[key].y > 470) {
                let pos = enemies[key].position
                tiles[pos] = 0
                enemies = enemies.filter(a => a.position != pos)
            }
        }
    }
};
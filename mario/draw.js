function draw() {
    ctx.clearRect(0, 0, 1000, 1000);
    ctx.fillStyle = '#5C94FC'
    ctx.fillRect(0, 0, 1000, 1000)

    ctx.fillStyle = "white";
    ctx.font = "20px serif";
    ctx.fillText("SCORE: " + mario.score, 20, 30);
    ctx.fillText("COINS: " + mario.coin, 250, 30);
    ctx.fillText("LIVES: " + mario.hp, 500, 30);
    //mario
    ctx.fillStyle = "pink";
    ctx.fillRect(mario.x, mario.y, mario.w, mario.h);
    //monsters
    /*for (let i = 0; i < monsters.length; i++) {
        //if (!monsters[i].kill) {
            ctx.fillStyle = "purple";
            ctx.fillRect(monsters[i].x, monsters[i].y, monsters[i].w, monsters[i].h);
        //}
    }*/

    //tiles[1333] = 3
    //bullets
    for (let i = 0; i < bullets.length; i++) {

        ctx.fillStyle = "red";
        if (bullets[i].right)
            ctx.fillRect(bullets[i].x + mario.w, bullets[i].y, bullets[i].w, bullets[i].h);
        else
            ctx.fillRect(bullets[i].x, bullets[i].y, bullets[i].w, bullets[i].h);
    }
    //map
    let offsetIndex = Math.abs(parseInt(offsetX / map.tileSize)) * map.th
    let numberOfTiles = map.th * (21)
    let maxIndex = offsetIndex + numberOfTiles
    if (maxIndex > tiles.length) {
        offsetIndex = 0
    }
    //console.log(offsetIndex, numberOfTiles, maxIndex)
    for (let i = offsetIndex; i < maxIndex; i++) {
        /*if (headTouch) {
            let index = i2 * map.th + j2
            //if (tiles[index] == 1)
            //tiles[index] = 0
            if (tiles[index] == 2) {
                //for (let key in coin) {
                    //if (coin[key].index == index) {
                        //if (coin[key].number == 4) {
                            tiles[index] = 1
                            //coin = coin.filter(item => item.index != index)
                        //}
                    //}
                //}
            }
        }*/
        let index = tiles[i]
        if (index != 0) {
            let x = Math.floor(i / map.th) * map.tileSize + offsetX
            let y = (i % map.th) * map.tileSize
            ctx.fillStyle = map.colors[index - 1];
            if (index == 5) {//enemy move
                //console.log(i)
                if (!enemies.some(item => item.position == i)) {
                    enemies.push({ "number": enemyCount, "position": i, "speed": 0, "dropSpeed": 0, "vy": 0, "y": y })
                    enemyCount++
                }
                for (let key in enemies) {
                    if (enemies[key].position == i) {
                        x += enemies[key].speed
                        y = enemies[key].y
                        //console.log(y, enemies[key].dropSpeed, enemies[key].vy)
                    }
                }
                if (x >= 0) {
                    ctx.fillRect(x, y, map.tileSize, map.tileSize);
                }
                else{
                    //if not draw, delete from map and enemies array
                    tiles[i] = 0
                    enemies = enemies.filter(a => a.position != i)
                }
                /////////////////
                //////////////////
                ////////////////FIXME
                //FIXME
                ////////////////////////////////////////////
                //check on ground of enemy
                //a is not correct
                /*let a = Math.floor((x-offsetX) / map.tileSize * map.th + y / map.tileSize)

                if (i - 16 * temp - a < 16)
                    a = i - 16 * temp
                else {
                    temp++
                    a = i - 16 * temp
                }
                a += Math.ceil(enemyVy / 32)
                //console.log(tiles[a+1])
                if (tiles[a + 1] == 0) {
                    for (let key in enemies) {
                        if (enemies[key].position == i) {
                            y += enemies[key].dropSpeed
                            enemies[key].dropSpeed += mario.gy * 0.1
                            //console.log(enemies[key].speed)
                        }
                    }
                    //console.log(y)
                    //y += enemyVy
                    //enemyVy += mario.gy * 0.4
                    //console.log(enemyVy)
                }
                else if (tiles[a + 1] == 1) {
                    //y = 200
                    //console.log('yes')
                    //enemyVy = 
                    //y = (a % map.th) * map.tileSize
                    //console.log('yes')
                    //console.log('no')
                    for (let key in enemies) {
                        if (enemies[key].position == i) {
                            //enemies[key].dropSpeed = 0
                            //enemyVy = 0
                        }
                    }
                }
                //console.log(y)*/
            }
            else
                ctx.fillRect(x, y, map.tileSize, map.tileSize);
        }
    }
}
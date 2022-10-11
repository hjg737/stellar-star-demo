namespace SpriteKind {
    export const projectile2 = SpriteKind.create()
    export const prog2 = SpriteKind.create()
    export const boss = SpriteKind.create()
}
namespace StatusBarKind {
    export const bosshealth = StatusBarKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    timer.throttle("action", 600, function () {
        projectile = sprites.createProjectileFromSprite(assets.image`projectile`, mySprite, 0, -50)
    })
})
info.onScore(100, function () {
    game.over(true)
})
info.onLifeZero(function () {
    game.over(false)
})
controller.A.onEvent(ControllerButtonEvent.Repeated, function () {
    timer.throttle("action", 800, function () {
        projectile = sprites.createProjectileFromSprite(assets.image`projectile`, mySprite, 0, -50)
    })
})
sprites.onOverlap(SpriteKind.projectile2, SpriteKind.Player, function (sprite, otherSprite) {
    sprite.destroy()
    info.changeLifeBy(-1)
    statusbar.value += -25
    scene.cameraShake(4, 500)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 200)
    sprite.destroy()
    info.changeScoreBy(1)
})
let myenemy2: Sprite = null
let projectile2: Sprite = null
let myenemy1: Sprite = null
let projectile: Sprite = null
let statusbar: StatusBarSprite = null
let mySprite: Sprite = null
scene.setBackgroundImage(assets.image`bg1`)
scroller.scrollBackgroundWithSpeed(0, 10)
mySprite = sprites.create(assets.image`playership1`, SpriteKind.Player)
controller.moveSprite(mySprite, 100, 0)
mySprite.setStayInScreen(true)
animation.runImageAnimation(
mySprite,
assets.animation`playershipanim`,
150,
true
)
mySprite.setPosition(80, 105)
statusbar = statusbars.create(20, 4, StatusBarKind.Health)
statusbar.attachToSprite(mySprite, -23, 0)
let enemyspeed1 = 50
let enemyspeed2 = -50
statusbar.value = 200
info.setLife(4)
forever(function () {
    myenemy1 = sprites.createProjectileFromSide(assets.image`enemy1`, enemyspeed1, 0)
    myenemy1.y = randint(15, 23)
    myenemy1.setKind(SpriteKind.Enemy)
    animation.runImageAnimation(
    myenemy1,
    assets.animation`enemyanim`,
    150,
    true
    )
    projectile2 = sprites.createProjectileFromSprite(assets.image`projectileenemy`, myenemy1, randint(15, 70), 60)
    projectile2.setKind(SpriteKind.projectile2)
    pause(700)
})
forever(function () {
    myenemy2 = sprites.createProjectileFromSide(assets.image`enemy4`, enemyspeed2, 0)
    myenemy2.y = randint(30, 45)
    myenemy2.setKind(SpriteKind.Enemy)
    animation.runImageAnimation(
    myenemy2,
    assets.animation`enemyanim2`,
    200,
    true
    )
    projectile2 = sprites.createProjectileFromSprite(assets.image`projectileenemy`, myenemy2, randint(-15, -70), 60)
    projectile2.setKind(SpriteKind.projectile2)
    pause(700)
})

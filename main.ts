function ReadButtons() {
    
    lastButtonNum = buttonNum
    buttonVal = pins.analogReadPin(AnalogPin.P2)
    if (buttonVal < 256) {
        buttonNum = 1
    } else if (buttonVal < 597) {
        buttonNum = 2
    } else if (buttonVal < 725) {
        buttonNum = 3
    } else if (buttonVal < 793) {
        buttonNum = 4
    } else if (buttonVal < 836) {
        buttonNum = 5
    } else if (buttonVal < 938) {
        buttonNum = 6
    } else {
        buttonNum = 0
    }
    
}

function ReadJoystickX(): number {
    return pins.analogReadPin(AnalogPin.P0)
}

function IncreaseY() {
    
    posY += 1
    if (posY > 4) {
        posY = 4
    }
    
}

function IncreaseX() {
    
    posX += 1
    if (posX > 4) {
        posX = 4
    }
    
}

function ReadJoystickY(): number {
    return pins.analogReadPin(AnalogPin.P1)
}

function DecreaseX() {
    
    posX += 0 - 1
    if (posX < 0) {
        posX = 0
    }
    
}

function DecreaseY() {
    
    posY += -1
    if (posY < 0) {
        posY = 0
    }
    
}

let oldPosY = 0
let oldPosX = 0
let buttonVal = 0
let lastButtonNum = 0
let buttonNum = 0
let posX = 0
let posY = 0
posY = 2
posX = 2
buttonNum = 0
basic.clearScreen()
led.plot(posX, posY)
basic.forever(function on_forever() {
    
    ReadButtons()
    oldPosX = posX
    oldPosY = posY
    // led.unplot(0, 0)
    // led.plot_bar_graph(pins.analog_read_pin(AnalogPin.P2), 6)
    if (lastButtonNum != buttonNum) {
        if (buttonNum == 2) {
            IncreaseX()
        } else if (buttonNum == 4) {
            // led.plot(0, 0)
            DecreaseX()
        } else if (buttonNum == 3) {
            IncreaseY()
        } else if (buttonNum == 1) {
            DecreaseY()
        } else if (buttonNum == 5) {
            soundExpression.slide.play()
        } else if (buttonNum == 6) {
            soundExpression.yawn.play()
        }
        
    }
    
    if (ReadJoystickX() > 600) {
        IncreaseX()
    } else if (ReadJoystickX() < 400) {
        DecreaseX()
    }
    
    if (ReadJoystickY() < 400) {
        IncreaseY()
    } else if (ReadJoystickY() > 600) {
        DecreaseY()
    }
    
    if (oldPosX != posX || oldPosY != posY) {
        led.unplot(oldPosX, oldPosY)
        led.plot(posX, posY)
    }
    
    control.waitMicros(100)
})

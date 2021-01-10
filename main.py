def ReadButtons():
    global lastButtonNum, buttonVal, buttonNum
    lastButtonNum = buttonNum
    buttonVal = pins.analog_read_pin(AnalogPin.P2)
    if buttonVal < 256:
        buttonNum = 1
    elif buttonVal < 597:
        buttonNum = 2
    elif buttonVal < 725:
        buttonNum = 3
    elif buttonVal < 793:
        buttonNum = 4
    elif buttonVal < 836:
        buttonNum = 5
    elif buttonVal < 938:
        buttonNum = 6
    else:
        buttonNum = 0
def ReadJoystickX():
    return pins.analog_read_pin(AnalogPin.P0)
def IncreaseY():
    global posY
    posY += 1
    if posY > 4:
        posY = 4
def IncreaseX():
    global posX
    posX += 1
    if posX > 4:
        posX = 4
def ReadJoystickY():
    return pins.analog_read_pin(AnalogPin.P1)
def DecreaseX():
    global posX
    posX += 0 - 1
    if posX < 0:
        posX = 0
def DecreaseY():
    global posY
    posY += -1
    if posY < 0:
        posY = 0
oldPosY = 0
oldPosX = 0
buttonVal = 0
lastButtonNum = 0
buttonNum = 0
posX = 0
posY = 0
posY = 2
posX = 2
buttonNum = 0
basic.clear_screen()
led.plot(posX, posY)

def on_forever():
    global oldPosX, oldPosY
    ReadButtons()
    oldPosX = posX
    oldPosY = posY
    #led.unplot(0, 0)
    #led.plot_bar_graph(pins.analog_read_pin(AnalogPin.P2), 6)
    if lastButtonNum != buttonNum:
        if buttonNum == 2:
            IncreaseX()
            #led.plot(0, 0)
        elif buttonNum == 4:
            DecreaseX()
        elif buttonNum == 3:
            IncreaseY()
        elif buttonNum == 1:
            DecreaseY()
        elif buttonNum == 5:
            soundExpression.slide.play()
        elif buttonNum == 6:
            soundExpression.yawn.play()
    if ReadJoystickX() > 600:
        IncreaseX()
    elif ReadJoystickX() < 400:
        DecreaseX()
    if ReadJoystickY() < 400:
        IncreaseY()
    elif ReadJoystickY() > 600:
        DecreaseY()
    if oldPosX != posX or oldPosY != posY:
        led.unplot(oldPosX, oldPosY)
        led.plot(posX, posY)
    control.wait_micros(100)
basic.forever(on_forever)

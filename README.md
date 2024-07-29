# mybuddy

**This is javascript API for mybuddy.**


<details>
<summary>Catalogue:</summary>

<!-- vim-markdown-toc GFM -->

- [mybuddy](#mybuddy)
- [MyBuddy](#mybuddy-1)
  - [Overall status](#overall-status)
    - [connect](#connect)
    - [powerOn](#poweron)
    - [powerOff](#poweroff)
    - [isPowerOn](#ispoweron)
    - [releaseAllServos](#releaseallservos)
  - [MDI mode and operation](#mdi-mode-and-operation)
    - [getAngles](#getangles)
    - [sendAngle](#sendangle)
    - [sendAngles](#sendangles)
    - [getCoords](#getcoords)
    - [sendCoord](#sendcoord)
    - [sendCoords](#sendcoords)
    - [isInPosition](#isinposition)
  - [JOG mode and operation](#jog-mode-and-operation)
    - [jogAngle](#jogangle)
    - [jogCoord](#jogcoord)
    - [jogStop](#jogstop)
    - [programPause](#programpause)
    - [programResume](#programresume)
    - [stop](#stop)
    - [setEncoder](#setencoder)
    - [getEncoder](#getencoder)
    - [setEncoders](#setencoders)
    - [getEncoders](#getencoders)
  - [Running status and Settings](#running-status-and-settings)
    - [getSpeed](#getspeed)
    - [setSpeed](#setspeed)
    - [getJointMin](#getjointmin)
    - [getJointMax](#getjointmax)
  - [Servo control](#servo-control)
    - [isServoEnable](#isservoenable)
    - [isAllServoEnable](#isallservoenable)
    - [setServoData](#setservodata)
    - [getServoData](#getservodata)
    - [setServoCalibration](#setservocalibration)
    - [releaseServo](#releaseservo)
    - [focusServo](#focusservo)
  - [Atom IO](#atom-io)
    - [setColor](#setcolor)
    - [setPinMode](#setpinmode)
    - [setDigitalOutput](#setdigitaloutput)
    - [getDigitalInput](#getdigitalinput)
    - [getGripperValue](#getgrippervalue)
    - [setGripperState](#setgripperstate)
    - [setGripperValue](#setgrippervalue)
    - [setGripperIni](#setgripperini)
    - [isGripperMoving](#isgrippermoving)
  - [Basic](#basic)
    - [setBasicOutput](#setbasicoutput)
    - [getBasicOutput](#getbasicoutput)

<!-- vim-markdown-toc -->
</details>

# MyBuddy

**Import to your project**:

```javascript
// basic demo
var mybuddy = require("@marcbuils/mybuddy")

// obj Based on SerialPort
var obj = mybuddy.connect("/dev/ttyACM0",115200)

obj.write(mybuddy.powerOn(0))

obj.on("data",(data)=>{
    res = mybuddy.processReceived(data)
    console.log("res:", res)
})
```



## Overall status

### connect

- **Prototype**: `connect(deviceId, port, baud)`

- **Description**: Create objects, connect devices (default open).

- **Parameters**:
  - `deviceId`: 0/1/2/3 (ALL/L/R/W)

### powerOn

- **Prototype**: `powerOn(deviceId)`

- **Description**: Atom open communication (default open).

- **Parameters**:
  - `deviceId`: 0/1/2/3 (ALL/L/R/W)

### powerOff

- **Prototype**: `powerOff(deviceId)`

- **Description**: Atom turn off communication.

- **Parameters**:
  - `deviceId`: 0/1/2/3 (ALL/L/R/W)

### isPowerOn

- **Prototype**: `isPowerOn(deviceId)`

- **Description**: Adjust robot arm whether power on.

- **Parameters**:
  - `deviceId`: 0/1/2/3 (ALL/L/R/W)

- **Returns**

  - `1`: power on
  - `0`: power off

### releaseAllServos

- **Prototype**: `releaseAllServos(deviceId)`

- **Description**: Set robot arm into free moving mode.

- **Parameters**:
  - `deviceId`: 0/1/2/3 (ALL/L/R/W)

## MDI mode and operation

### getAngles

- **Prototype**: `getAngles(deviceId)`

- **Description**: Get the degree of all joints.

- **Parameters**:
  - `deviceId`: 0/1/2/3 (ALL/L/R/W)

- **Returns**: `object`: A float list of all degree.

### sendAngle

- **Prototype**: `sendAngle(deviceId, id, degree, speed)`

- **Description**: Send one degree of joint to robot arm.

- **Parameters**

  - `deviceId`: 0/1/2/3 (ALL/L/R/W)
  - `id`: Joint id
  - `degree`: degree value(`number`)
  - `speed`: (`number`) 0 ~ 100

- **Example**

  ```javascript
  obj.write(mybuddy.sendAngle(0, 1, 50, 50))
  ```

### sendAngles

- **Prototype**: `sendAngles(deviceId, angles, speed)`

- **Description**: Send the degrees of all joints to robot arm.

- **Parameters**

  - `deviceId`: 0/1/2/3 (ALL/L/R/W)
  - `angles`: a list of degree value(`Array`).
  - `speed`: (`number`) 0 ~ 100

- **Example**

  ```javascript
  obj.write(mybuddy.sendAngles(0, [0,0,0,0,0,0], 60))
  ```

### getCoords

- **Prototype**: `getCoords(deviceId)`

- **Description**: Get the Coords from robot arm, coordinate system based on base.

- **Parameters**:

  - `deviceId`: 0/1/2/3 (ALL/L/R/W)

- **Returns**: `object`: A float list of coord - `mybuddy:[x, y, z, rx, ry, rz]; mypalletizer:[x, y, z, θ]`

### sendCoord

- **Prototype**: `sendCoord(deviceId, id, coord, speed)`

- **Description**: Send one coord to robot arm.

- **Parameters**

  - `deviceId`: 0/1/2/3 (ALL/L/R/W)
  - `id`: coord id
  - `coord`: coord value(`number`)
  - `speed`: (`number`) 0 ~ 100

- **Example**

  ```javascript
  obj.write(mybuddy.sendCoord(0, x, 20, 50))
  ```

### sendCoords

- **Prototype**: `sendCoords(deviceId, coords, speed, mode)`

- **Description**: Send all coords to robot arm.

- **Parameters**

  - `deviceId`: 0/1/2/3 (ALL/L/R/W)
  - `coords`: a list of coords value(`Array`).
  - `speed`: (`number`) 0 ~ 100
  - `mode`: `0` - angular, `1` - linear

- **Example**

  ```javascript
  obj.write(mybuddy.sendCoords(0, [160, 160, 160, 0, 0, 0], 70, 0))
  ```

### isInPosition

- **Prototype**: `isInPosition(deviceId, data, flag)`

- **Description**: Judge whether in the position.

- **Parameters**

  - `deviceId`: 0/1/2/3 (ALL/L/R/W)
  - `data`: A data list, angles or coords.
  - `flag`: Tag the data type, `0` - angles, `1` - coords.

- **Returns**
  - `1` - true
  - `0` - false

## JOG mode and operation

### jogAngle

- **Prototype**: `jogAngle(deviceId, jointId, direction, speed)`

- **Description**: Jog control angle

- **Parameters**

  - `deviceId`: 0/1/2/3 (ALL/L/R/W)
  - `jointId`: (`int`) 1 ~ 6
  - `direction`: `0` - decrease, `1` - increase
  - `speed`: 0 ~ 100

### jogCoord

- **Prototype**: `jogCoord(deviceId, coordId, direction, speed)`

- **Description**: Jog control coord.

- **Parameters**

  - `deviceId`: 0/1/2/3 (ALL/L/R/W)
  - `coordId`: (`int`) 1 ~ 6
  - `direction`: `0` - decrease, `1` - increase
  - `speed`: 0 ~ 100

### jogStop

- **Prototype**: `jogStop(deviceId)`

- **Description**: Stop jog moving.

- **Parameters**:

  - `deviceId`: 0/1/2/3 (ALL/L/R/W)

### programPause

- **Prototype**: `programPause(deviceId)`

- **Description**: Pause movement.

- **Parameters**:

  - `deviceId`: 0/1/2/3 (ALL/L/R/W)

### programResume

- **Prototype**: `programResume(deviceId)`

- **Description**: Recovery movement.

- **Parameters**:

  - `deviceId`: 0/1/2/3 (ALL/L/R/W)

### stop

- **Prototype**: `stop(deviceId)`

- **Description**: Stop moving.

- **Parameters**:

  - `deviceId`: 0/1/2/3 (ALL/L/R/W)

### setEncoder

- **Prototype**: `setEncoder(deviceId, jointId, encoder)`

- **Description**: Set a single joint rotation to the specified potential value.

- **Parameters**

  - `deviceId`: 0/1/2/3 (ALL/L/R/W)
  - `jointId`: 1 ~ 6
  - `encoder`: 0 ~ 4096

### getEncoder

- **Prototype**: `getEncoder(deviceId, jointId)`

- **Description**: Obtain the specified joint potential value.

- **Parameters**

  - `deviceId`: 0/1/2/3 (ALL/L/R/W)
  - `jointId`: 1 ~ 6

- **Returns**: `encoder`: 0 ~ 4096

### setEncoders

- **Prototype**: `setEncoders(deviceId, encoders, speed)`

- **Description**: Set the six joints of the manipulator to execute synchronously to the specified position.

- **Parameters**
  - `deviceId`: 0/1/2/3 (ALL/L/R/W)
  - `encoders`: A encoder list, length 6.
  - `speed`: 0 - 100

### getEncoders

- **Prototype**: `getEncoders(deviceId)`

- **Description**: Get the all joints of the manipulator.

- **Parameters**:

  - `deviceId`: 0/1/2/3 (ALL/L/R/W)

- **Returns**: the list of encoder (`Array`)

## Running status and Settings

### getSpeed

- **Prototype**: `getSpeed(deviceId)`

- **Description**: Get speed.

- **Parameters**:

  - `deviceId`: 0/1/2/3 (ALL/L/R/W)

- **Returns**: speed

### setSpeed

- **Prototype**: `setSpeed(deviceId, speed)`

- **Description**: Set speed.

- **Parameters**

  - `deviceId`: 0/1/2/3 (ALL/L/R/W)
  - `speed`: 0 ~ 100

### getJointMin

- **Prototype**: `getJointMin(deviceId, jointId)`

- **Description**: Gets the minimum movement angle of the specified joint.

- **Parameters**

  - `deviceId`: 0/1/2/3 (ALL/L/R/W)
  - `jointId`

- **Returns**: angle value (`float`)

### getJointMax

- **Prototype**: `getJointMax(deviceId, jointId)`

- **Description**: Gets the maximum movement angle of the specified joint.

- **Parameters**

  - `deviceId`: 0/1/2/3 (ALL/L/R/W)
  - `jointId`

- **Returns**: angle value (`float`)

## Servo control

### isServoEnable

- **Prototype**: `isServoEnable(deviceId, servoId)`

- **Description**: Determine whether all steering gears are connected.

- **Parameters**

  - `deviceId`: 0/1/2/3 (ALL/L/R/W)
  - `servoId`: 1 ~ 6

- **Returns**
  - `0`: disable
  - `1`: enable

### isAllServoEnable

- **Prototype**: `isAllServoEnable(deviceId)`

- **Description**: Determine whether the specified steering gear is connected.

- **Parameters**:
  - `deviceId`: 0/1/2/3 (ALL/L/R/W)

- **Returns**
  - `0`: disable
  - `1`: enable

### setServoData

- **Prototype**: `setServoData(deviceId, servo_no, dataId, value)`

- **Description**: Set the data parameters of the specified address of the steering gear.

- **Parameters**

  - `deviceId`: 0/1/2/3 (ALL/L/R/W)
  - `servo_no`: Serial number of articulated steering gear, 1 - 6.
  - `dataId`: Data address.
  - `value`: 0 - 4096

### getServoData

- **Prototype**: `getServoData(deviceId, servo_no, dataId)`

- **Description**: Read the data parameter of the specified address of the steering gear.

- **Parameters**

  - `deviceId`: 0/1/2/3 (ALL/L/R/W)
  - `servo_no`: Serial number of articulated steering gear, 1 - 6.
  - `dataId`: Data address.

- **Returns**: `value`: 0 - 4096

  - `0`: disable
  - `1`: enable
  - `-1`: error

### setServoCalibration

- **Prototype**: `setServoCalibration(deviceId, servo_no)`

- **Description**: The current position of the calibration joint actuator is the angle zero point, and the corresponding potential value is 2048.

- **Parameters**

  - `deviceId`: 0/1/2/3 (ALL/L/R/W)
  - `servo_no`: Serial number of articulated steering gear, 1 - 6.

### releaseServo

- **Prototype**: `releaseServo(deviceId, servoId)`

- **Description**: Power off designated servo.

- **Parameters**

  - `deviceId`: 0/1/2/3 (ALL/L/R/W)
  - `servoId`: 1 ~ 6

### focusServo

- **Prototype**: `focusServo(deviceId, servoId)`

- **Description**: Power on designated servo.

- **Parameters**

  - `deviceId`: 0/1/2/3 (ALL/L/R/W)
  - `servoId`: 1 ~ 6

## Atom IO

### setColor

- **Prototype**: `setColor(deviceId, r, g, b)`

- **Description**: Set the color of the light on the top of the robot arm.

- **Parameters**
  - `deviceId`: 0/1/2/3 (ALL/L/R/W)
  - `r`: 0 ~ 255
  - `g`: 0 ~ 255
  - `b`: 0 ~ 255

### setPinMode

- **Prototype**: `setPinMode(deviceId, pin_no, pinMode)`

- **Description**: Set the state mode of the specified pin in atom.

- **Parameters**

  - `deviceId`: 0/1/2/3 (ALL/L/R/W)
  - `pin_no`: Pin number.
  - `pinMode`: 0 - input, 1 - output, 2 - inputPullup

### setDigitalOutput

- **Prototype**: `setDigitalOutput(deviceId, pin_no, pinSignal)`

- **Description**: Set the digital output of a pin.

- **Parameters**

  - `deviceId`: 0/1/2/3 (ALL/L/R/W)
  - `pin_no`
  - `pinSignal`: 0 / 1

### getDigitalInput

- **Prototype**: `getDigitalInput(deviceId, pin_no)`

- **Description**: Get the digital input of a pin.

- **Parameters**

  - `deviceId`: 0/1/2/3 (ALL/L/R/W)
  - `pin_no`

- **Returns**: signal value

### getGripperValue

- **Prototype**: `getGripperValue(deviceId)`

- **Description**: Get gripper value.

- **Parameters**:

  - `deviceId`: 0/1/2/3 (ALL/L/R/W)

- **Returns**: gripper value

### setGripperState

- **Prototype**: `setGripperState(deviceId, flag, speed)`

- **Description**: Set gripper switch state.

- **Parameters**

  - `deviceId`: 0/1/2/3 (ALL/L/R/W)
  - `flag`: 0 - open, 1 - close
  - `speed`: 0 ~ 100

### setGripperValue

- **Prototype**: `setGripperValue(deviceId, value, speed)`

- **Description**: Set gripper value.

- **Parameters**

  - `deviceId`: 0/1/2/3 (ALL/L/R/W)
  - `value`: 0 ~ 100
  - `speed`: 0 ~ 100

### setGripperIni

- **Prototype**: `setGripperIni(deviceId)`

- **Description**: Set the current position to zero, set current position value is `2048`.

- **Parameters**:

  - `deviceId`: 0/1/2/3 (ALL/L/R/W)

### isGripperMoving

- **Prototype**: `isGripperMoving(deviceId)`

- **Description**: Judge whether the gripper is moving or not.

- **Parameters**:

  - `deviceId`: 0/1/2/3 (ALL/L/R/W)

- **Returns**

  - `0`: not moving
  - `1`: is moving

## Basic

### setBasicOutput

- **Prototype**: `setBasicOutput(deviceId, pin_no, pinSignal)`

- **Description**: Set bottom pin.

- **Parameters**

  - `deviceId`: 0/1/2/3 (ALL/L/R/W)
  - `pin_no`: Pin number.
  - `pinSignal`: 0 / 1

### getBasicOutput

- **Prototype**: `getBasicOutput(deviceId, pin_no)`

- **Description**: Get bottom pin.

- **Parameters**

  - `deviceId`: 0/1/2/3 (ALL/L/R/W)
  - `pin_no`: Pin number.

---

More demo can go to [here](../demo).

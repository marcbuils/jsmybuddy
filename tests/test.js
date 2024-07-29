
var mybuddy = require("../src/index")

var obj = mybuddy.connect("/dev/ttyACM0", 115200)

// 发送指令

// obj.write(mybuddy.powerOn())
// obj.write(mybuddy.powerOff())
// obj.write(mybuddy.isPowerOn())
// obj.write(mybuddy.releaseAllServos())
// obj.write(mybuddy.getAngles())
// obj.write(mybuddy.sendAngle(1, 100, 50))
// obj.write(mybuddy.getCoords())
// obj.write(mybuddy.sendCoord())
obj.write(mybuddy.isInPosition(1, [58.5, -0.1, 80, 89.99, -17.4, -57.91], 1))
// obj.write(mybuddy.jogAngle(1, 0, 20))

// obj.write(mybuddy.setGripperState(2, 60))
// obj.write(mybuddy.getGripperValue())

// obj.write(mybuddy.setColor(100, 100, 100))
// 监听并接收数据
obj.on("data", (data) => {
  // console.log(data)
  // 数据转换
  res = mybuddy.processReceived(data)
  console.log("res:", res)
  // console.log(typeof res)
  // console.log(res[0])
  // 关闭连接
  obj.close()
})
// console.log(dat)
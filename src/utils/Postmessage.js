import store from "../store"

// Postmessage类，嵌入式应用场景中，用于处理跨窗口消息传递和接收，
class Postmessage {
  constructor() {
    // 根据环境变量设置目标来源。在生产环境中，设置当前窗口的来源；在开发环境中，设置为本地开发服务器的地址
    this.targetOrigin =
      process.env.NODE_ENV === "production"
        ? window.location.origin
        : "http://127.0.0.1:3011"
    // 定义消息类型，用于再发生消息时标识消息的目的
    this.postMessageType = {
      pageHeightChange: "pageHeightChange",
      pageChange: "pageChange",
      setActive: "setActive",
    }
  }
  // 发送消息
  postMessage(type, json) {
    let message = {
      type: this.postMessageType[type],
      value: json,
    }
    window.parent.postMessage(message, this.targetOrigin)
  }
  // 接收消息
  listenMessage() {
    // 当第三个参数为 false 时，事件监听器在冒泡阶段被调用
    window.addEventListener(
      "message",
      (event) => {
        // 防止跨域请求伪造攻击
        if (event.origin === this.targetOrigin) {
          switch (event.data.type) {
            case "pageChange":
              store.commit("changeComponent", event.data.value)
              break
            case "setPreview":
              store.commit("setPreview", event.data.value)
              break
            case "deletePreview":
              store.commit("deletePreview", event.data.value)
              break
            case "setActive":
              store.commit("setActiveId", event.data.value)
              break
            default:
          }
        }
      },
      false,
    )
  }
}
export default new Postmessage()

import nodeFetch from "../utils/nodeFetch" // 封装的axios

export async function getH5PageJson(params) {
  const res = await nodeFetch.get(`/getH5PageJson`, { params })
  return res.data
}

// /getH5PageJson后端地址

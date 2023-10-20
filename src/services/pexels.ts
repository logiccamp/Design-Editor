import axios from "axios"

const PEXELS_KEY = import.meta.env.VITE_APP_PEXELS_KEY
console.log("pexels", PEXELS_KEY)
const pexelsClient = axios.create({
  baseURL: "https://api.pexels.com",
  headers: {
    Authorization: PEXELS_KEY,
  },
})

export const getPexelsVideos = (query: string) => {
  return [
    {
      src : "/dist/respect.mp4",
      id: 1448735,
      type: "StaticVideo",
      duration: 1,
      "url": "https://www.pexels.com/video/video-of-forest-1448735/",
      preview: "https://images.pexels.com/videos/1448735/free-video-1448735.jpg?fit=crop&w=1200&h=630&auto=compress&cs=tinysrgb",
    },
    {
      src : "/dist/zlatan.mp4",
      id: 144873,
      type: "StaticVideo",
      duration: 1,
      "url": "https://www.pexels.com/video/video-of-forest-1448735/",
      preview: "https://images.pexels.com/videos/1448735/free-video-1448735.jpg?fit=crop&w=1200&h=630&auto=compress&cs=tinysrgb",
    }
  ]
  
}

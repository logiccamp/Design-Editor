import { httpGetWithToken } from "~/utils/http_utils";

export interface PixabayImage {
  id: string
  webformatURL: string
  previewURL: string
}
export interface beentosVideos {
  id: any,
  type: string,
  src: string,
  url: string,
  preview: string,
  duration: number,
}
export function getPixabayImages(query: string): PixabayImage[] {
  let encodedWord = query.replace(/\s+/g, "+").toLowerCase()
  return [
    {
      id: "string",
  webformatURL: "string",
  previewURL: "string"
    }
  ];
}

export async function getBrandVideos(): Promise<beentosVideos[]> {
  const videos:any = await httpGetWithToken("brand/posts")
  if(videos.error){
    console.log(videos.error)
    return [
      {
        src : "/dist/respect.mp4",
        id: 1448735,
        type: "StaticVideo",
        duration: 1,
        url: "https://www.pexels.com/video/video-of-forest-1448735/",
        preview: "https://images.pexels.com/videos/1448735/free-video-1448735.jpg?fit=crop&w=1200&h=630&auto=compress&cs=tinysrgb",
      }
    ];
  }else{
    var vs = videos.data.data.docs
    // console.log("vs", vs)
    const vids = vs.map((vid: any) => ({
      id: vid._id,
      type: "StaticVideo",
      // src : "/dist/respect.mp4",
      // src: vid.media.mediaSecureUrl,
      src : "https://beentos.s3.eu-west-1.amazonaws.com/post/1690883378955/Beentos-dbec6c15-0754-48cf-a2c0-74afe44fbdd8.mp4",
      preview: vid.thumbnailUrl,
      duration: 60,
    }))
    return vids;
  }
}

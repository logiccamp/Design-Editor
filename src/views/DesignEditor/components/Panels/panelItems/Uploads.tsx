import React, { useEffect } from "react"
import { Block } from "baseui/block"
import AngleDoubleLeft from "~/components/Icons/AngleDoubleLeft"
import Scrollable from "~/components/Scrollable"
import { Button, SIZE } from "baseui/button"
import DropZone from "~/components/Dropzone"
import { useEditor } from "@layerhub-io/react"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"
import { nanoid } from "nanoid"
import { captureDuration, captureFrame, loadVideoResource } from "~/utils/video"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"
import { httpGetWithToken, httpPostWithToken } from "~/utils/http_utils"
import ls from 'localstorage-slim'
import PlaySolid from "~/components/Icons/PlaySolid"
import { audioIcon } from "~/images/images"
export default function () {
  const inputFileRef = React.useRef<HTMLInputElement>(null)

  const [page, setPage] = React.useState<number>(1)
  const [fileLoading, setFileLoading] = React.useState<boolean>(true)
  const [fileUploading, setFileUploading] = React.useState<boolean>(false)
  const [totalPages, setTotalPages] = React.useState<number>(1)
  const [uploads, setUploads] = React.useState<any[]>([])
  const editor = useEditor()
  const setIsSidebarOpen = useSetIsSidebarOpen()
  const { scenes, setScenes, currentScene } = useDesignEditorContext()
  const fetchUploads = async () => {
    setFileLoading(true)
    const b = ls.get("brandid", { decrypt: true });
    const uploadss: any = await httpGetWithToken(`file?userId=${b}&page=${page}&sourceType=uploaded`)
    setFileLoading(false)
    if (uploadss.error) {
      return;
    }
    let uu = uploadss.data.data.docs;
    setTotalPages(uploadss.data.data.totalPages);
    let u = uu.map((item: any, i: number) => {
      return {
        id: item._id,
        url: item.secureUrl,
        type: item.fileType
      }
    })
    if (page === 1) {
      setUploads(u)
    } else {
      setUploads([...uploads, ...u])
    }
  }

  useEffect(() => {
    fetchUploads()
  }, [page])
  const handleDropFiles = async (files: FileList) => {
    const file = files[0]
    const url = URL.createObjectURL(file)
    const b = ls.get("brandid", { decrypt: true });
    const formdata = new FormData();
    setFileUploading(true)
    formdata.append("file", file)
    await httpPostWithToken(`file/upload/${b}`, formdata)
    setPage(0)
    setFileUploading(false)
    setUploads([])
    setTimeout(() => {
      setPage(1)
    }, 400);
  }

  const handleInputFileRefClick = () => {
    inputFileRef.current?.click()
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (fileUploading) return;
    handleDropFiles(e.target.files!)
  }
  const addObject = React.useCallback(
    async (options: any) => {
      if (editor) {
        const video = await loadVideoResource(options.src)
        const frame = await captureFrame(video)
        const duration = Number(await captureDuration(video))
        editor.objects.add({ ...options, duration, preview: frame })
        const updatedScenes = scenes.map((scn) => {
          if (scn.id === currentScene?.id) {
            return {
              ...currentScene,
              duration: duration * 1000 > currentScene.duration! ? duration * 1000 : currentScene.duration!,
            }
          }
          return scn
        })
        setScenes(updatedScenes)
      }
    },
    [editor, scenes, currentScene]
  )
  const addImageToCanvas = (url: string) => {
    const options = {
      type: "StaticImage",
      src: url,
    }
    console.log("option", options)
    editor.objects.add(options)
  }
  return (
    <DropZone handleDropFiles={!fileUploading ? handleDropFiles : () => { }}>
      <Block $style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Block
          $style={{
            display: "flex",
            alignItems: "center",
            fontWeight: 500,
            justifyContent: "space-between",
            padding: "1.5rem",
          }}
        >
          <Block>Uploads</Block>

          <Block onClick={() => setIsSidebarOpen(false)} $style={{ cursor: "pointer", display: "flex" }}>
            <AngleDoubleLeft size={18} />
          </Block>
        </Block>
        <Scrollable>
          <Block padding={"0 1.5rem"}>
            <Button
              color="rgb(11, 1, 73)"
              onClick={!fileUploading ? handleInputFileRefClick : () => { }}
              size={SIZE.compact}
              overrides={{
                Root: {
                  style: {
                    width: "100%",
                  },
                },
              }}
            >
              Upload file
            </Button>
            <input onChange={handleFileInput} type="file" id="file" ref={inputFileRef} style={{ display: "none" }} />
            <div
              style={{
                marginTop: "1rem",
                marginBottom: "1rem",
                display: "grid",
                gap: "0.5rem",
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              {uploads.map((upload: any) => (
                <div
                  key={upload.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => addImageToCanvas(upload.url)}

                >
                  <div style={{ textAlign: "center", position: "relative" }}>
                    {
                      upload.type.includes("video") ?
                        <>
                          <video style={{ objectFit: "cover", height: "100px", width: "100px" }} src={`${upload.url}#1`} />
                          <div
                            style={{
                              position: "absolute",
                              top: "25px",
                              left: "25px",
                            }}
                          >
                            <PlaySolid color="white" size={52} />
                          </div>
                        </>
                        : (
                          upload.type.includes("audio") ?
                            <img style={{ objectFit: "cover", height: "100px", width: "100px" }} src={audioIcon} alt="preview" />
                            :
                            <img style={{ objectFit: "cover", height: "100px", width: "100px" }} src={upload.url} alt="preview" />
                        )
                    }
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{ textAlign: "center" }}
            >
              {
                totalPages > page &&
                <Button
                  style={{ opacity: fileLoading ? 0.4 : 1 }}
                  onClick={() => {
                    if (fileLoading) return;
                    setPage(page + 1)
                  }}
                  size="mini" >{fileLoading ? "Loading files..." : "load more"}</Button>
              }
            </div>
          </Block>
        </Scrollable>
      </Block>
    </DropZone>
  )
}

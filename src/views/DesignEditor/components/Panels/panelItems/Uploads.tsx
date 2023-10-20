import React from "react"
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

export default function () {
  const inputFileRef = React.useRef<HTMLInputElement>(null)
  const [uploads, setUploads] = React.useState<any[]>([])
  const editor = useEditor()
  const setIsSidebarOpen = useSetIsSidebarOpen()
  const { scenes, setScenes, currentScene } = useDesignEditorContext()

  const handleDropFiles = (files: FileList) => {
    const file = files[0]
    const url = URL.createObjectURL(file)
    const upload = {
      id: nanoid(),
      url,
    }
    console.log(upload, url)
    setUploads([...uploads, upload])
  }

  const handleInputFileRefClick = () => {
    inputFileRef.current?.click()
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    editor.objects.add(options)
  }
  return (
    <DropZone handleDropFiles={handleDropFiles}>
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
              onClick={handleInputFileRefClick}
              size={SIZE.compact}
              overrides={{
                Root: {
                  style: {
                    width: "100%",
                  },
                },
              }}
            >
              Computer
            </Button>
            <input onChange={handleFileInput} type="file" id="file" ref={inputFileRef} style={{ display: "none" }} />

            <div
              style={{
                marginTop: "1rem",
                display: "grid",
                gap: "0.5rem",
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              {uploads.map((upload) => (
                <div
                  key={upload.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => addImageToCanvas(upload.url)}
                  
                >
                  <div>
                    <img width="100%" src={upload.url} alt="preview" />
                  </div>
                </div>
              ))}
            </div>
          </Block>
        </Scrollable>
      </Block>
    </DropZone>
  )
}

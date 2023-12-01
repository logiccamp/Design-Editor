import React from "react"
import { Block } from "baseui/block"
import ReactPlayer from "react-player"
import { useEditor } from "@layerhub-io/react"
import Loading from "~/components/Loading"
import useDesignEditorPages from "~/hooks/useDesignEditorScenes"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"
import { IDesign } from "~/interfaces/DesignEditor"
import { httpPostWithToken } from "~/utils/http_utils"

function Video() {
  const editor = useEditor()
  const pages = useDesignEditorPages()
  const { scenes, currentDesign } = useDesignEditorContext()
  const [loading, setLoading] = React.useState(true)
  const [state, setState] = React.useState({
    video: "",
  })

  const makePreview = React.useCallback(async () => {
    const template = editor.scene.exportToJSON()


    const currentScene = editor.scene.exportToJSON()
    const updatedScenes = scenes.map((scn) => {
      if (scn.id === currentScene.id) {
        return {
          id: scn.id,
          duration: scn.duration,
          layers: currentScene.layers,
          name: currentScene.name ? currentScene.name : "",
        }
      }
      return {
        id: scn.id,
        duration: scn.duration,
        layers: scn.layers,
        name: scn.name ? scn.name : "",
      }
    })
    const videoTemplate: IDesign = {
      id: currentDesign.id,
      type: "VIDEO",
      name: currentDesign.name,
      frame: currentDesign.frame,
      scenes: updatedScenes,
      metadata: {},
      preview: "",
    }
    console.log("hello world", videoTemplate)
    await httpPostWithToken("video-editing/edit-video", videoTemplate)
    // const clips = pages.map((page) => {
    //   const currentTemplate = editor.scene.exportToJSON()
    //   if (page.id === currentTemplate.id) {
    //     return {
    //       duration: page.duration! / 1000,
    //       layers: currentTemplate.layers,
    //     }
    //   }
    //   return {
    //     duration: 5,
    //     layers: page.layers,
    //   }
    // })

    // const options = {
    //   outPath: "./position.mp4",
    //   verbose: false,
    //   duration: 5,
    //   fps: 25,
    //   dimension: template.frame,
    //   clips: clips,
    // }
    // console.log(options)
    // fetch("https://render.layerhub.io/render", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(options),
    // })
    //   .then((res) => {
    //     return res.json()
    //   })
    //   .then((res) => {
    //     setState({ video: res.url })
    //     setLoading(false)
    //   })
    //   .catch((err) => console.error(err))
  }, [editor])

  React.useEffect(() => {
    makePreview()
  }, [editor])

  return (
    <Block $style={{ flex: 1, alignItems: "center", justifyContent: "center", display: "flex", padding: "5rem" }}>
      {loading ? (
        <Loading text="Generating output" />
      ) : (
        <ReactPlayer
          muted={false}
          className="react-player"
          width={"100%"}
          height={"100%"}
          controls
          autoPlay
          url={state.video}
        />
      )}
    </Block>
  )
}

export default Video

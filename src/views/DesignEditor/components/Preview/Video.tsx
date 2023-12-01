import React from "react"
import { Block } from "baseui/block"
import ReactPlayer from "react-player"
import { useEditor } from "@layerhub-io/react"
import Loading from "~/components/Loading"
import useDesignEditorPages from "~/hooks/useDesignEditorScenes"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"
import { IDesign } from "~/interfaces/DesignEditor"
import { httpPostWithToken } from "~/utils/http_utils"
import { downloadIcon } from "~/images/images"

function Video() {
  const editor = useEditor()
  const pages = useDesignEditorPages()
  const { scenes, currentDesign, setOutputMessage } = useDesignEditorContext()
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
    const response = await httpPostWithToken("video-editing/edit-video", videoTemplate)
    // console.log(response)
    const url = response.data.secureUrl;
    setOutputMessage("Project exported successfully")
    setLoading(false)
    setState({ video: url })
  }, [editor])

  React.useEffect(() => {
    makePreview()
  }, [editor])

  return (
    <Block $style={{ flex: 1, alignItems: "center", justifyContent: "center", display: "flex", padding: "5rem" }}>
      {loading ? (
        <Loading text="Generating output" />
      ) : (
        <>
          {
            state.video && <a style={{
              position: "fixed",
              bottom: 10,
              right: 10,
            }} href={state.video} ><img style={{
              height: "50px",
              width: "50px"
            }} src={downloadIcon} /></a>
          }
          <ReactPlayer
            muted={false}
            className="react-player"
            width={"100%"}
            height={"100%"}
            controls
            autoPlay
            url={state.video}
          />
        </>
      )}
    </Block>
  )
}

export default Video

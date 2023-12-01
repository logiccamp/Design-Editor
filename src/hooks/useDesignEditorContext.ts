import { useContext } from "react"
import { DesignEditorContext } from "~/contexts/DesignEditor"

function useDesignEditorContext() {
  const {
    brandId,
    setBrandId,
    editorType,
    setEditorType,
    displayPlayback,
    setDisplayPlayback,
    setDisplayPreview,
    displayPreview,
    currentScene,
    setCurrentScene,
    setScenes,
    scenes,
    maxTime,
    setMaxTime,
    contextMenuTimelineRequest,
    setContextMenuTimelineRequest,
    currentDesign,
    setCurrentDesign,
    outputMessage,
    setOutputMessage,
    showLoader,
    setShowLoader
  } = useContext(DesignEditorContext)
  return {
    editorType,
    setEditorType,
    displayPlayback,
    setDisplayPlayback,
    setDisplayPreview,
    displayPreview,
    currentScene,
    setCurrentScene,
    setScenes,
    scenes,
    maxTime,
    setMaxTime,
    contextMenuTimelineRequest,
    setContextMenuTimelineRequest,
    currentDesign,
    setCurrentDesign,
    outputMessage,
    setOutputMessage,
    showLoader,
    setShowLoader,
    brandId,
    setBrandId
  }
}

export default useDesignEditorContext

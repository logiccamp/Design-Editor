import Navbar from "./components/Navbar"
import Panels from "./components/Panels"
import Canvas from "./components/Canvas"
import Footer from "./components/Footer"
import Toolbox from "./components/Toolbox"
import EditorContainer from "./components/EditorContainer"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from "react"
import Loader from "~/utils/loader"

function VideoEditor() {
  const { outputMessage, showLoader } = useDesignEditorContext()
  useEffect(()=> {
    console.log(outputMessage)
if(outputMessage !== "") toast.success(outputMessage)
  }, [outputMessage])
  return (
    <>
    {
      showLoader && <Loader /> 
    }
      <EditorContainer>
        
        <Toaster />
        <Navbar />
        <div style={{ display: "flex", flex: 1 }}>
          <Panels />
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <Toolbox />
            <Canvas />
            <Footer />
          </div>
        </div>
      </EditorContainer>

    </>
  )
}

export default VideoEditor

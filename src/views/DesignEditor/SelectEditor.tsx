import React, { useEffect } from "react"
import { Block } from "baseui/block"
import { Button } from "baseui/button"
import { DesignType } from "~/interfaces/DesignEditor"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"
import Video from "~/components/Icons/Video"
import Images from "~/components/Icons/Images"
import Presentation from "~/components/Icons/Presentation"
import ButtonLoader from "~/utils/button_loader"

export default function () {
  const [selectedEditor, setSelectedEditor] = React.useState<DesignType>("VIDEO")
  const { setEditorType } = useDesignEditorContext()
  useEffect(()=> {
    setTimeout(() => {
      setEditorType(selectedEditor)
    }, 3000);
  }, [])
  return (
    <Block
      $style={{
        height: "100vh",
        width: "100vw",
        background: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Block>
      <div className="min-h-[100px] flex flex-col min-w-[200px] justify-center items-center bg-blue text-center shadow w-[95%] rounded shadow max-w-[200px]">
            <ButtonLoader />
            <p className="text-center text-white">Please wait</p>
        </div>
      </Block>
    </Block>
  )
}

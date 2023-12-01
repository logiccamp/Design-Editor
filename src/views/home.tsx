import React, { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { httpGetWithToken, httpPostWithToken, httpPutWithToken } from "~/utils/http_utils"

import useDesignEditorContext from "~/hooks/useDesignEditorContext"
import ls from 'localstorage-slim'

function Home() {
    const {setBrandId} = useDesignEditorContext()

    const navigate = useNavigate()
    useEffect(()=> {
        createProject()
    },[])
    const createProject = async () => {
        const brand:any = await httpGetWithToken("brand/profile")
        const b = brand.data.data.brand.brandId
        setBrandId(b)
        ls.set("brandid", b, {encrypt : true})
        const project = await httpPostWithToken("editor", {
            name : "Project",
            content : ""
        });
        if(project.error){

        }else{
            const id = project.data._id;
            navigate("/"+id)
        }
        // console.log(project)
    }
  return <div>
    please wait...
  </div>
}

export default Home

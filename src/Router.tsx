import { BrowserRouter, Routes, Route } from "react-router-dom"
import DesignEditor from "~/views/DesignEditor"
import Dashboard from "~/views/Dashboard"
import FFM from "~/views/Test/ffmpeg"
import Home from "./views/home"

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/manage" element={<Dashboard />} />
        <Route path="/test" element={<FFM />} />
        {/* <Route path="/manage" element={<Dashboard />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/:projectid" element={<DesignEditor />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router

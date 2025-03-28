import { StationIndex } from "./cmps/StationIndex"
import { AppHeader } from "./cmps/AppHeader"
import { AppFooter } from "./cmps/AppFooter"
import { LeftSideBar } from "./cmps/LeftSideBar"
import { RightSideBar } from "./cmps/RightSideBar"

function App() {

  return (
    <section className="app">
      <AppHeader />
      <LeftSideBar />
      <StationIndex />
      <RightSideBar />
      <AppFooter />
    </section>

  )
}

export default App

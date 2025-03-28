import { StationIndex } from "./pages/StationIndex"
import { AppHeader } from "./cmps/AppHeader"
import { AppFooter } from "./cmps/AppFooter"
import { LeftSideBar } from "./cmps/LeftSideBar"
import { RightSideBar } from "./cmps/RightSideBar"
import { StationDetails } from "./pages/StationDetails"
import { HashRouter as Router, Route, Routes } from "react-router-dom"

function App() {

    return (
        <Router>
            <section className="app">
                <AppHeader />
                <LeftSideBar />
                <Routes>
                    <Route element={<StationIndex />} path="/" />
                    <Route element={<StationDetails />} path="/station/:stationId" />
                </Routes>
                <RightSideBar />
                <AppFooter />
            </section>
        </Router>

    )
}

export default App

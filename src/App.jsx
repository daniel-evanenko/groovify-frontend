import { HashRouter as Router, Route, Routes } from "react-router-dom"
import { StationIndex } from "./pages/StationIndex"
import { AppHeader } from "./cmps/AppHeader"
import { AppFooter } from "./cmps/AppFooter"
import LeftSideBar from "./cmps/left-side-bar/LeftSideBar"
import { RightSideBar } from "./cmps/RightSideBar"
import { StationDetails } from "./pages/StationDetails"
import { AudioPlayer } from "./cmps/AudioPlayer"
import { CategoriesPage } from "./pages/CategoriesPage"
import { useEffect } from "react"
import { loadStations } from "./store/actions/library.actions"

function App() {
    useEffect(() => {
        loadStations()
    }, [])

    return (
        <Router>
            <section className="app">
                <AppHeader />
                <LeftSideBar />
                <Routes>
                    <Route element={<StationIndex />} path="/" />
                    <Route element={<StationDetails />} path="/station/:stationId" />
                    <Route element={<CategoriesPage />} path="/search" />
                </Routes>
                <RightSideBar />
                <AppFooter />
            </section>
            <AudioPlayer />
        </Router>
    )
}

export default App


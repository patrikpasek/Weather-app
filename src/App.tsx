import WeatherBox from "./components/WeatherBox"
import NavBar from "./assets/NavBar"
import Footer from "./assets/Footer"

const App: React.FC = () => {
  return <>
        <NavBar />
        <WeatherBox />
        <Footer />
  </>
}

export default App
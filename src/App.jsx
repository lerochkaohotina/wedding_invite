import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import './assets/scss/global.scss';
import Schedule from "./components/Schedule/Schedule.jsx";
import data from './data.json';
import Preview from "./components/Preview/Preview.jsx";
import InfoBlock from "./components/InfoBlock/InfoBlock.jsx";
import Form from "./components/Form/Form.jsx";

function App() {
    return (
        <div>
            <Header/>
            <main>
                <Preview
                    date={data.event_date}
                    address={data.marriage_registry_address}
                />
                <InfoBlock
                    date={data.event_date}
                    time={data.event_time_start}
                    address={data.marriage_registry_address}
                    colors={data.clothes_colors}
                />

                <Form quizData={data.quiz} />

                <Schedule schedule={data.schedule}/>
            </main>
            <Footer map={data.map}/>
        </div>
    )
}

export default App

import React, { useReducer } from 'react'
import Visual from './components/Visual/Visual'
import Context from './components/Context'
import Information from './components/Inoformation/Information'
import Reducer from './reducer'
import { getWeatherData } from './reducer'
import './App.css'

function App() {

    const [state, dispatch] = useReducer(Reducer, {
        weather: {},
        correctCity: true,
    })

    return (
        <Context.Provider value={{ dispatch, getWeatherData }} >
            <div className="weather clearSky" >
                <Visual
                    correctCity={state.correctCity}
                    dayPercent={state.dayPercent}
                    info={state.weather}
                    visual={state.visual}
                />
                <Information city={state.city}
                    info={state.weather}
                /> </div>
        </Context.Provider>
    );
}

export default App;
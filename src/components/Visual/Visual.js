import React from 'react'
import Form from './Form/Form'
import Styles from './Visual.module.css'
import Visualisation from './Visualisation/Visualisation';
import PropTypes from 'prop-types'


function Visual(props) {
    return (
        <div className={`${Styles.weather} ${Styles.clearSky}`} >
            <Visualisation
                dayPercent={props.dayPercent}
                info={props.info}
                visual={props.visual}
            />
            <Form
                correctCity={props.correctCity}
            />
        </div>
    )
}

Visual.propTypes = {
    dayPercent: PropTypes.number,
    info: PropTypes.object,
    visual: PropTypes.object,
    correctCity: PropTypes.bool.isRequired,
}

export default Visual;
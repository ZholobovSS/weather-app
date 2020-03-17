import React, { useContext, useState } from 'react';
import Styles from './Form.module.css';
import Context from '../../Context';
import PropTypes from 'prop-types'


function useCustomInput(defaultValue = '') {
    const [value, setValue] = useState(defaultValue);
    const { dispatch } = useContext(Context);

    return {
        forInputTag: {
            value,
            onChange: event => {
                setValue(event.target.value);
                dispatch({
                    type: 'setCorrectCity',
                    payload: {correctCity: true}
                  })},
        },
        value: () => value,
        clear: () => setValue(''),
    }
}

function Form(props) {

    const input = useCustomInput();
    const { dispatch, getWeatherData } = useContext(Context);

    function submitHandler(event) {
        event.preventDefault();

        if (input.value().trim()) {
            getWeatherData(input.value().trim()).then(data => {
                dispatch({
                    type: 'setWeatherInfo',
                    payload: data,
                });
            });
            
            input.clear();
        }
    }

    return (
        
        <form className={`${Styles.form} ${props.correctCity ? '' : Styles.shakeLr}`} onSubmit={submitHandler}>
            <input className={Styles.input} {...input.forInputTag} />
            <button className={Styles.button}>Get Info</button>
        </form>
    );
}

Form.propTypes = {
    correctCity: PropTypes.bool.isRequired,  
}


export default Form;
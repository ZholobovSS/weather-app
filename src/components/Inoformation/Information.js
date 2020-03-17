import React from 'react'
import Styles from './Information.module.css'
import PropTypes from 'prop-types'
import InfoItem from './InfoItem/InfoItem'
import {
    CSSTransition,
} from 'react-transition-group';


function Information(props) {

    const fillInfo = () => {
        let items = [];
        for (const i in props.info) {
            if (props.info.hasOwnProperty(i)) {
                items.push(<InfoItem key={i} value={props.info[i]} />);

            }
        }

        return items;
    }

    return (
        <div className={Styles.information}>
            <div className={Styles.city}>{props.city}</div>
            <div className={Styles.wr}>
                {props.info ? fillInfo().map((element, idx) => (
                    <CSSTransition
                        key={idx}
                        in={true}
                        appear={true}
                        timeout={500}
                        classNames='weatherItem'
                    >
                        {element}
                    </CSSTransition>
                )) : null}
            </div>
        </div>
    )
}

Information.propTypes = {
    info: PropTypes.object,
    city: PropTypes.string,
}

export default Information

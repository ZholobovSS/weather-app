import React from 'react'
import Styles from './InfoItem.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';
import PropTypes from 'prop-types'


function InfoItem(props) {
    function checkMask() {
        let maskInfo = {};
        if (props.value.maskIcon) {
            maskInfo = {
                transform: props.value.maskTransform || '',
                mask: props.value.maskIcon,
            }
        }
        return maskInfo;
    }

    const mask = checkMask();

    return (
        <div className={Styles.item}>
            <FontAwesomeIcon 
                icon={props.value.icon} 
                className={Styles.icon} 
                size="2x" 
                fixedWidth 
                {...mask} />
            <TransitionGroup className={Styles.wrValue}>
                <CSSTransition
                    key={props.value.id}
                    timeout={500}
                    classNames="value"
                >
                    <span className={Styles.value}>{props.value.value}</span>
                </CSSTransition>
            </TransitionGroup>
        </div >
    )
}

InfoItem.propTypes = {
    value: PropTypes.object,
}

export default InfoItem

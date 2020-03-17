import React from 'react'
import Styles from './Visualisation.module.css'
import Cloud from './Cloud/Cloud'
import uuid from 'react-uuid'
import PropTypes from 'prop-types'

function Visualisation(props) {

    function updateSunPosition(percent) {
        if (percent < 25) {

            return `translate(-50%) rotate(-90deg)`;

        } else if (percent >= 25 && percent <= 50) {

            let sunDeg = -90 + 90 * ((percent - 25) / 25);
            return `translate(-50%) rotate(${sunDeg}deg)`;

        } else if (percent > 50 && percent <= 75) {

            let sunDeg = 90 * ((percent - 50) / 25);
            return `translate(-50%) rotate(${sunDeg}deg)`;

        } else if (percent > 75) {

            return `translate(-50%) rotate(90deg)`;

        }
    }

    function updateMoonPosition(percent) {
        if (percent < 25) {

            let moonDeg = 90 * (percent / 25);
            return `translate(-50%) rotate(${moonDeg}deg)`;

        } else if (percent >= 25 && percent <= 50) {

            return `translate(-50%) rotate(120deg)`;

        } else if (percent > 50 && percent <= 75) {

            return `translate(-50%) rotate(-120deg)`;

        } else if (percent > 75) {

            let moonDeg = -120 + 120 * ((percent - 75) / 25);
            return `translate(-50%) rotate(${moonDeg}deg)`;

        }
    }

    function getCloudSpeed(type, speed) {
        switch (type) {
            case "small":
                return speed / 1.1;
            case "big":
                return speed * 1.1;
            default:
                return speed;
        }
    }

    function getClouds(count, speed) {
        let items = [];
        document.documentElement.style.setProperty('--cloudAnimationWidth', window.innerWidth + 'px');
        Object.keys(count).forEach((el) => {
            let currentSpeed = getCloudSpeed(el, speed);
            for (let i = 0; i < count[el]; i++) {
                items.push(
                    <Cloud
                        type={el}
                        animationDelay={(speed / 10) * i}
                        animationSpeed={(Math.random() * (1.1 - 0.9) + 0.9) * currentSpeed}
                        key={uuid()}
                    />
                );

            }
        });
        return items;

    }


    const sunPosition = updateSunPosition(props.dayPercent);
    const moonPosition = updateMoonPosition(props.dayPercent);


    return (
        <div className={Styles.visual} style={{ backgroundPosition: props.dayPercent + "% 100%" }}>
            <div className={Styles.visual__sky}>
                <div className={Styles.visual__sun} style={{ transform: sunPosition }}>
                </div>
                <div className={Styles.visual__moon} style={{ transform: moonPosition }}>
                    <div className={`${Styles.visual__crater} ${Styles.visual__crater1}`}></div>
                    <div className={`${Styles.visual__crater} ${Styles.visual__crater2}`}></div>
                    <div className={`${Styles.visual__crater} ${Styles.visual__crater3}`}></div>
                </div>

            </div>
            <div className={`${Styles.visual__clouds} ${props.visual ? props.visual.clouds : null}`} >
                {(props.visual) ? getClouds(props.visual.cloudsCount, props.visual.cloudsSpeed) : null}
            </div>
            <div className={Styles.visual__watter}>
            </div>
            <div className={Styles.visual__ground}>
                <div className={Styles.mountains}>
                    <div className={`${Styles.mountain} ${Styles['mountain--normal']}`}>
                    </div>
                    <div className={`${Styles.mountain} ${Styles['mountain--small']}`}>
                    </div>
                    <div className={`${Styles.mountain} ${Styles['mountain--big']}`}>
                    </div>
                    <div className={`${Styles.mountain} ${Styles['mountain--big']}`}>
                    </div>
                </div>
            </div>
        </div>

    )
}

Visualisation.propTypes = {
    dayPercent: PropTypes.number,
    info: PropTypes.object,
    visual: PropTypes.object,
}

export default Visualisation

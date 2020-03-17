import React from 'react'
import './Cloud.css'

function Cloud(props) {
    return (
        <div  className={`cloud cloud--${props.type}`} 
              style={{ 
                animationDuration: props.animationSpeed + "s", 
                animationDelay: props.animationDelay + "s", 
                }} 
                >
            <div className="rain">
              <div className="drop drop--1"></div>
              <div className="drop drop--2"></div>
              <div className="drop drop--3"></div>
              <div className="drop drop--4"></div>
              <div className="drop drop--5"></div>
              <div className="drop drop--6"></div>
              <div className="drop drop--7"></div>
              <div className="drop drop--8"></div>
              <div className="drop drop--9"></div>
              <div className="drop drop--10"></div>
            </div>
            <div className="snow">
              <div className="snowflake">&#10052;</div>
              <div className="snowflake">&#10052;</div>
              <div className="snowflake">&#10052;</div>
              <div className="snowflake">&#10052;</div>
              <div className="snowflake">&#10052;</div>
              <div className="snowflake">&#10052;</div>
              <div className="snowflake">&#10052;</div>
              <div className="snowflake">&#10052;</div>
            </div>
          </div>
    )
}

export default Cloud

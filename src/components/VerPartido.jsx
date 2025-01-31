import React from 'react'
import '../assets/styles/styleComponents.css'

export default function VerPartido({partido}) {
    
    return (
        <div className='partidos'>
            <h3>{partido.equipos}</h3>
            <div>
                <p>{partido.lugar}</p>
            </div>
            <div>
                <p>{partido.fecha}</p>
            </div>
        </div>
    )
}
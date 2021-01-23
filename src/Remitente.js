import React from 'react'

export default function Remitente({conditionalStyle}) {
    return (
        <div className="remitente" style={conditionalStyle}>
            <div>VDT S.L.</div>
            <div>C/Don Juan de Austria 4, 140</div>
            <div>46002, Valencia</div>
            <div>España</div>
        </div>
    )
}

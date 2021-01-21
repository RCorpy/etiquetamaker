import React from 'react'

export default function Destinatario({order}) {
    return (
        <div className="destinatario">
            <div>{order.billing_address.first_name +" "+ order.billing_address.last_name}</div>
            <div>{order.billing_address.address1 + order.billing_address.address2}</div>
            <div>{order.billing_address.zip} , {order.billing_address.city}</div>
            <div>{order.billing_address.province}, {order.billing_address.country}</div>
        </div>
    )
}

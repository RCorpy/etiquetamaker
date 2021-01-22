import React from 'react'
 
export default function Destinatario({order}) {

    const fullName = order.billing_address.first_name +" "+ order.billing_address.last_name
    const fullAddress = order.billing_address.address1 + " " +order.billing_address.address2

    const smallFont = {
        fontSize: "0.4cm"
    }
    return (
        <div className="destinatario">
            <div style={fullName.length>23 ? smallFont : {}}>{fullName}</div>
            <div style={fullAddress.length>23 ? smallFont : {}}>{fullAddress}</div>
            <div>{order.billing_address.zip} , {order.billing_address.city}</div>
            <div>{order.billing_address.province}, {order.billing_address.country}</div>
        </div>
    )
}

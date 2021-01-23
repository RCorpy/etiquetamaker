import React from 'react'
 
export default function Destinatario({order}) {

    const fullName = order.billing_address.first_name +" "+ order.billing_address.last_name
    const fullAddress = order.billing_address.address1 + " " +order.billing_address.address2

    const isEmpty = order.line_items[0].quantity===0 ? {display: "none"} : {}
    const smallFont = {
        fontSize: "0.4cm"
    }
    const verySmallFont = {
        fontSize: "0.3cm"
    }
    return (
        <div className="destinatario" style={isEmpty}>
            <div style={fullName.length>23 ? fullName.length>40 ? verySmallFont : smallFont : {}}>{fullName}</div>
            <div style={fullAddress.length>23 ? fullAddress.length>40 ? verySmallFont : smallFont : {}}>{fullAddress}</div>
            <div style={(order.billing_address.zip.length+ order.billing_address.city.length)>23 ? (order.billing_address.zip.length+ order.billing_address.city.length)>40 ? verySmallFont : smallFont : {}}>{order.billing_address.zip} , {order.billing_address.city}</div>
            <div style={(order.billing_address.province.length+ order.billing_address.country.length)>23 ? (order.billing_address.province.length+ order.billing_address.country.length)>40 ? verySmallFont : smallFont : {}}>{order.billing_address.province}, {order.billing_address.country}</div>
        </div>
    )
}

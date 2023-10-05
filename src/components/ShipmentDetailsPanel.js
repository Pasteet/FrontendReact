import React from "react";

const ShipmentDetailsPanel = ({shipment, updateShipmentData}) => {
  return (
    <div className="shipment-details-panel">
      <h3>Shipment Details</h3>
      <p>Order Number: {shipment.orderNo}</p>
      <p>Date: {shipment.date}</p>
      <p>Customer: {shipment.customer}</p>
      <p>Tracking Number: {shipment.trackingNo}</p>
      <p>Status: {shipment.status}</p>
      <p>Consignee: {shipment.consignee}</p>
    </div>
  );
};

export default ShipmentDetailsPanel;

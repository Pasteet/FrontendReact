import React, {useState, useEffect, useMemo} from "react";
import {useTable} from "react-table";
import ShipmentDetailsPanel from "../components/ShipmentDetailsPanel";

// const request = new XMLHttpRequest();
// const getData = (callback) => {
//   request.addEventListener("readystatechange", () => {
//     if (request.readyState === 4 && request.status === 200) {
//       const data = JSON.parse(request.responseText);
//       callback(undefined, data);
//     } else if (request.readyState === 4) {
//       callback("Could not get data", undefined);
//     }
//   });
// };

// request.open("GET", "https://my.api.mockaroo.com/shipments.json?key=5e0b62d0");
// // request.open("GET", "Shipments.json");
// request.send();

// getData((err, data) => {
//   //   console.log("callback fired");
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });

// fetch("Shipments.json")
//   .then((response) => {
//     console.log("resolved", response);
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log("rejected", err);
//   });

// ShipmentContext.js

const ShipmentContext = () => {
  const [ships, setShips] = useState([]);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [editedShips, setEditedShips] = useState([]);

  useEffect(() => {
    fetch("Shipments.json")
      .then((response) => response.json())
      .then((data) => {
        setShips(data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  const data = useMemo(() => ships, []);
  const columns = useMemo(
    () => [
      {
        Header: "ORDERNO",
        accessor: "orderNo",
      },
      {
        Header: "DATE",
        accessor: "date",
      },
      {
        Header: "CUSTOMER",
        accessor: "customer",
      },
      {
        Header: "TRACKINGNO",
        accessor: "trackingNo",
      },
      {
        Header: "STATUS",
        accessor: "status",
      },
      {
        Header: "CONSIGNEE",
        accessor: "consignee",
      },
      {
        Header: "Actions",
        accessor: "actions",
      },
    ],
    []
  );

  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} =
    useTable({columns, data: ships});
  const openDetailsPanel = (shipment) => {
    setSelectedShipment(shipment);
  };

  const closeDetailsPanel = () => {
    setSelectedShipment(null);
  };

  return (
    <div className="container">
      <table id="shipmentsData" className="table" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <React.Fragment key={cell.getCellProps().key}>
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    {cell.column.id === "actions" && (
                      <td>
                        <button
                          id="viewBtn"
                          onClick={() => openDetailsPanel(row.original)}>
                          Details
                        </button>
                      </td>
                    )}
                  </React.Fragment>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {selectedShipment && (
        <div className="details-panel">
          <ShipmentDetailsPanel shipment={selectedShipment} />
          <button onClick={closeDetailsPanel}>Close</button>
        </div>
      )}
    </div>
  );
};

export default ShipmentContext;

import React from "react";

function Ticket(props) {
  const { ticketData } = props;
  return Object.entries(ticketData).map((entry) => {
    let [key, value] = entry;
    return <div>{value}</div>;
  });
}

export default Ticket;

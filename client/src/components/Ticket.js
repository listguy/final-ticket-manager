import React from "react";
import "../styles/Ticket.css";

function Ticket(props) {
  const { ticketData } = props;

  //   const makeTicketPart = (key, value) => {
  //     if (key === "id") return;
  //     return <div className={`ticket-${key}`}>{value}</div>;
  //   };

  return (
    // <div className="ticket">
    //   {Object.entries(ticketData).map((entry) => {
    //     let [key, value] = entry;
    //     return makeTicketPart(key, value);
    //   })}
    // </div>
    <div className="ticket">
      <div className="ticket-title">{ticketData.title}</div>
      <div className="ticket-content">{ticketData.content}</div>
      <div className="ticket-footer">
        <div className="info">
          By <span className="footer-email">{ticketData.userEmail}</span> |{" "}
          <span className="footer-time">
            {convertTime(ticketData.creationTime)}
          </span>
        </div>
        {ticketData.labels && (
          <div className="lables">
            {ticketData.labels.map((label) => (
              <span className="lable">{label}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function convertTime(timeInms) {
  let date = new Date(timeInms);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}, ${
    date.getHours() > 12 ? date.getHours() - 12 : date.getHours()
  }:${date.getMinutes()}:${date.getSeconds()} ${
    date.getHours() > 12 ? "PM" : "AM"
  }`;
}

export default Ticket;

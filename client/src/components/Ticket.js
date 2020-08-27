import React from 'react';
import '../styles/Ticket.css';

function Ticket(props) {
  const {
    ticketData, hide, hidden, setLabelActive,
  } = props;

  const convertTime = (timeInms) => {
    const date = new Date(timeInms);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}, ${
      date.getHours() > 12 ? date.getHours() - 12 : date.getHours()
    }:${date.getMinutes()}:${date.getSeconds()} ${
      date.getHours() > 12 ? 'PM' : 'AM'
    }`;
  };
  return hidden ? null : (
    <>
      <div className="ticket">
        <div className="hideTicketButton" onClick={() => hide(ticketData.id)}>
          Hide
        </div>
        <div className="ticket-title">{ticketData.title}</div>
        <div className="ticket-content">{ticketData.content}</div>
        <div className="ticket-footer">
          <div className="info">
            By
            {' '}
            <span className="footer-email">{ticketData.userEmail}</span>
            {' '}
            |
            {' '}
            <span className="footer-time">
              {convertTime(ticketData.creationTime)}
            </span>
          </div>
          {ticketData.labels && (
            <div className="lables">
              {ticketData.labels.map((label) => (
                <span className="label" onClick={() => setLabelActive(label)}>
                  {label}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Ticket;

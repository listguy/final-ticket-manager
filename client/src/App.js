import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "./logo.svg";
import Ticket from "./components/Ticket.js";
import "./App.css";

function App() {
  const [tickets, setTickets] = useState();
  const [searchText, setSearchText] = useState();
  // const [ticketsVisibility, setTicketsVisibility] = useState();
  const [hiddenTickets, setHiddenTickets] = useState([]);

  const fetchTickets = async () => {
    let url = `/api/tickets${searchText ? `?searchText=${searchText}` : ``}`;
    const { data } = await axios.get(url);
    setTickets(data);
  };

  useEffect(() => {
    fetchTickets();
  }, [searchText]);

  const hideTicket = (id) => {
    let updatedArr = hiddenTickets.slice();
    updatedArr.push(id);
    setHiddenTickets(updatedArr);
  };

  const printTickets = () => {
    return tickets.map((t, i) => (
      <Ticket
        key={`ticket${i}`}
        ticketData={t}
        hide={hideTicket}
        hidden={hiddenTickets.includes(t.id)}
      />
    ));
  };

  return (
    <>
      <div className="head">
        <div id="headers">
          <h1 id="header">Ticket Mannager</h1>
          <h3 id="subheader">The WIX way</h3>
        </div>
        <div id="search-container">
          <input
            id="searchInput"
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="I'm looking for..."
          ></input>
          <div className="head-messages">
            <span>{searchText && `Showing ${tickets.length} results `}</span>
            {hiddenTickets[0] && (
              <span className="hidden-tickets-msg">
                (<span id="hideTicketsCounter">{hiddenTickets.length}</span>{" "}
                hidden tickets -{" "}
                <span
                  id="restoreHideTickets"
                  onClick={() => setHiddenTickets([])}
                >
                  restore
                </span>
                )
              </span>
            )}
          </div>
        </div>
      </div>
      <main>{tickets && printTickets()}</main>
    </>
  );
}

export default App;

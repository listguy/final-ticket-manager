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
        <input
          id="searchInput"
          onChange={(event) => setSearchText(event.target.value)}
        ></input>
        {searchText && `Showing ${tickets.length} results`}
        {hiddenTickets[0] && (
          <div className="hidden-tickets-msg">
            (<span id="hideTicketsCounter">{hiddenTickets.length}</span>
            tickets hidden -
            <span id="restoreHideTickets" onClick={() => setHiddenTickets([])}>
              restore
            </span>{" "}
            )
          </div>
        )}
      </div>
      <main>{tickets && printTickets()}</main>
    </>
  );
}

export default App;

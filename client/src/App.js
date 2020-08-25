import React, { useEffect, useState } from "react";
import axios from "axios";
import Ticket from "./components/Ticket.js";
import { ThemeProvider } from "styled-components";
import { BodyStyle } from "./components/GlobalStyle.js";
import { lightTheme, darkTheme } from "./components/Themes.js";
import { useDarkMode } from "./components/useDarkMode.js";
import { FiSun, FiMoon } from "react-icons/fi";
import "./App.css";

function App() {
  const [tickets, setTickets] = useState();
  const [searchText, setSearchText] = useState();
  const [hiddenTickets, setHiddenTickets] = useState([]);
  const [theme, changeTheme, themeLoaded] = useDarkMode();

  const currentStyle = theme === "light" ? lightTheme : darkTheme;

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
        theme={currentStyle}
        key={`ticket${i}`}
        ticketData={t}
        hide={hideTicket}
        hidden={hiddenTickets.includes(t.id)}
      />
    ));
  };

  return themeLoaded ? (
    <ThemeProvider theme={currentStyle}>
      <>
        <BodyStyle />
        <div id="app">
          <div id="theme-toggler" onClick={changeTheme}>
            {theme === "light" ? <FiSun /> : <FiMoon />}{" "}
          </div>
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
                <span>
                  {searchText && `Showing ${tickets.length} results `}
                </span>
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
        </div>
      </>
    </ThemeProvider>
  ) : (
    <div />
  );
}

export default App;

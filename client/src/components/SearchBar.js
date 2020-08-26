import React from 'react';
import '../styles/SearchBar.css';

export default function SearchBar(props) {
  const {
    setSearchText,
    resultsCounter,
    hiddenTickets,
    setHiddenTickets,
  } = props;
  return (
    <div id="search-container">
      <input
        id="searchInput"
        onChange={(event) => setSearchText(event.target.value)}
        placeholder="I'm looking for..."
      />
      <div className="head-messages">
        <span>
          {resultsCounter !== 0 && `Showing ${resultsCounter} results `}
        </span>
        {hiddenTickets[0] && (
          <span className="hidden-tickets-msg">
            (
            <span id="hideTicketsCounter">{hiddenTickets.length}</span>
            {' '}
            hidden
            tickets -
            {' '}
            <span id="restoreHideTickets" onClick={() => setHiddenTickets([])}>
              restore
            </span>
            )
          </span>
        )}
      </div>
    </div>
  );
}

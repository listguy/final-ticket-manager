import React from 'react';
import '../styles/LabelsBar.css';

export default function LabelsBar(props) {
  const {
    allLabels,
    activeLabels,
    removeActiveLabel,
    addActiveLabel,
    setFilterByAll,
  } = props;

  return (
    <div id="filter-lables">
      <div id="lables-container">
        {allLabels[0]
          && allLabels.map((l) => {
            const aState = activeLabels.includes(l);
            return (
              <span
                className={aState ? 'active-label' : 'inactive-label'}
                onClick={() => (aState ? removeActiveLabel(l) : addActiveLabel(l))}
              >
                {l}
              </span>
            );
          })}
      </div>
      <div id="filterToggler">
        <input
          type="checkbox"
          onClick={(event) => setFilterByAll(event.target.checked)}
        />
        {' '}
        include all labels?
      </div>
    </div>
  );
}

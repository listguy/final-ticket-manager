import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';

export default function (props) {
  const FloatingAddButton = styled.div`
     {
      position: fixed;
      top: 90vh;
      left: 93vw;
      background-color: rgba(230, 210, 40, 0.7);
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  `;

  return (
    <FloatingAddButton id="addButton" onClick={props.clickHandler}>
      <AddIcon />
    </FloatingAddButton>
  );
}

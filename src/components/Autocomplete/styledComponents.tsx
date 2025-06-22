import styled from 'styled-components';

const OVERLAY_INDEX = 1;

export const Container = styled.div`
  box-sizing: border-box;
  width: 100%;

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;

    /* TESTING */
    background: rgba(255, 0, 0, 0.1);
  }
`;

export const InvisibleOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: transparent;
  z-index: ${OVERLAY_INDEX};

  /* TESTING */
  background: rgba(255, 0, 0, 0.1);
`;

export const Label = styled.label``;

export const InteractiveElements = styled.div`
  position: relative;
  z-index: ${OVERLAY_INDEX + 1};
`;

export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  border: 1px solid black;

  * {
    white-space: nowrap;
  }
`;

export const Input = styled.input`
  width: 100%;
  border: none;
`;

export const SelectedInputsArea = styled.div`
  display: flex;
`;

export const SelectedInputPill = styled.div`
  display: flex;
  border: 1px solid black;
`;

export const List = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  min-width: 200px;
  border: 1px solid black;
`;

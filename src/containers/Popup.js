import React from 'react'
import styled from 'styled-components';

const PopupContainer = styled.div`
    position: absolute;
    z-index: 99999;
    width: 400px;
    height: 300px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #FFF;
`;

function Popup() {
    return (
        <PopupContainer>
            <h1>팝업 테스트</h1>
        </PopupContainer>
    )
}

export default Popup;

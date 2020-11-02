import React from 'react'
import styled from 'styled-components';

const MenuContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 250px;
    height: 100%;
    border-right: 1px solid #eee;
    z-index: 9999;
    background-color: #fff;
`;

function Menu() {
    return (
        <MenuContainer>
            <h1>Leaflet GIS TEST</h1>
            <button>로그인</button>
            <button>회원가입</button>
            <ul>
                <li>Geoserver 기본 WMS 오버레이</li>
                <li>메뉴 01</li>
                <li>메뉴 01</li>
                <li>메뉴 01</li>
                <li>메뉴 01</li>
                <li>메뉴 01</li>
                <li>메뉴 01</li>
                <li>메뉴 01</li>
                <li>메뉴 01</li>
                <li>메뉴 01</li>
                <li>메뉴 01</li>
                <li>메뉴 01</li>
                <li>메뉴 01</li>
            </ul>
        </MenuContainer>
    )
}

export default Menu;


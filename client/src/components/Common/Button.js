import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    background: #7289da;
    border: 0;
    padding: 8px 12px;
    border-radius: 3px;
    transition: background-color 1s;
    color: inherit;
    cursor: pointer;

    &:hover {
        background-color: #6079d2;
    }
`;

export default Button;
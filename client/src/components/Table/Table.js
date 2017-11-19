import React from 'react';
import styled from 'styled-components';

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

export const Thead = styled.thead`
    & > tr > th {
        border-bottom: 2px solid black;
        text-align: left;
    }
`;

export const Tbody = styled.tbody`
    & > tr > td {
        border-top: 1px solid #333;
    }
    & > tr:nth-child(odd) {
        background: #ccc;
    }
    & > tr.new {
        background: #fff;
        color: #666;
    }
`;

export const Tr = styled.tr`

`;

export const Th = styled.th`

`;

export const Td = styled.td`

`;
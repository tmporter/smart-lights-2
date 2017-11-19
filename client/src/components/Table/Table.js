import React from 'react';
import styled from 'styled-components';

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin: 5px 0 15px 0;
`;

export const Thead = styled.thead`
    & > tr > th {
        border-bottom: 1px solid #3a3e44;
        text-align: left;
    }
`;

export const Tbody = styled.tbody`
    & > tr > td {
        border-top: 1px solid #333;
    }
`;

export const Tr = styled.tr`

`;

export const Th = styled.th`
    padding: 4px;
`;

export const Td = styled.td`
    padding: 4px;
`;
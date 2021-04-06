import styled, { css } from 'styled-components';

export const ModeDerailsContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const List = styled.ul`
    display: flex;
    flex-wrap: wrap;
    row-gap: 16px;
    list-style: none;
    padding: 16px 40px;
    background: #FFFFFF;
    transition: 500ms;
    max-height: 400px;
    overflow: hidden;

    ${({ collapsed }) => !collapsed && css`
        max-height: 0px;
        padding: 0px;

        & > li {
            opacity: 0;
        }
    `}

    & > li {
        display: flex;
        flex-basis: 50%;
        transition: 100ms;
        opacity: 1;
    }

    & > li:nth-child(even) {
        justify-content: flex-end;
    }
`;

export const ListItem = styled.li`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: rgba(0, 0, 0, .75);
`;

export const ListItemContent = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ToggleExpandButton = styled.button`
    border: none;
    outline: none;
    background: #2B2B2B;
    color: #FFFFFF;
    padding: 4px;
    cursor: pointer;
    opacity: ${({ collapsed }) => collapsed ? .6 : 1};
    transition: 250ms;

    &:hover {
        opacity: 1;
    }
`;
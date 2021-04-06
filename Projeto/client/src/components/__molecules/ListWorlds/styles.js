import styled, { css } from 'styled-components';

export const ListWorldsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const WelcomeMessageContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 8px 16px;

    & a {
        cursor: pointer;
        font-style: italic;

        &:hover {
            text-decoration: underline;
        }
    }
`;

export const List = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 8px;
    list-style: none;
    padding: 16px 8px;
    max-height: 300px;
    overflow-y: auto;
    background: rgba(0, 0, 0, .1);
`;

export const Item = styled.li`
    position: relative;
    min-height: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
    opacity: .85;
    transition: 250ms;

    &:hover {
        opacity: 1;
    }

    ${({ disabled }) => disabled && css`
        opacity: .4;
        pointer-events: none;
    `}

    ${({ joined }) => !joined && css`
        filter: grayscale(1);
    `}
`;

export const ItemLabel = styled.label`
    position: absolute;
    left: 16px;
    font-size: 24px;
    font-weight: bold;
    color: #FFFFFF;
`;

import styled from 'styled-components'
import { IButtonProps } from './type'


export const ButtonStyled = styled.button<IButtonProps>`
    background: ${(props: any) => props.isActive ?
        props.theme.colors.blue : props.theme.colors.gray};
    color: ${(props: any) => props.isActive ?
        props.theme.colors.white : props.theme.colors.darkGray};
    width: ${(props: any) => props.style?.width ??  '450.3px'};
    height: ${(props: any) => props.style?.height ?? '67.92px'};
    border-radius: 5.03126px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    svg{ 
        margin-left: 1rem;
    }

    :hover {
        background: ${(props: any) => props.theme.colors.blue};
        color: ${(props: any) => props.theme.colors.white};
    }
`;
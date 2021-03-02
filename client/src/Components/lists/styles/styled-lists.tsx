import styled from 'styled-components'
import { FontsStyles } from '../../Styled/Fonts'
import { ThemeType } from '../../Styled/Themes'

export const ListsWrapper = styled.div `
display: grid;
width: 90%;
grid-template-rows: auto 1fr;
justify-self: center;
gap: 10px;
align-items: baseline;
.spiner {
  height: 100px;
  justify-self: center;
  align-self: baseline;
}
.lists {
  overflow-y: auto;
  display: grid;
  align-content: baseline;
  gap: 20px;
  padding-bottom: 15px;
}
`

export const ListItemSt = styled.div `
  display: grid;
  grid-template-columns: 1fr auto;
  border-radius: 5px;
  border: 1px solid ${({theme} : {theme: ThemeType}) => theme.CardBorderColor};
  background-color: ${({theme} : {theme: ThemeType}) => theme.CardsBg};
  a {
    color: ${({theme} : {theme: ThemeType}) => theme.SecondaryTextColor};
  }
  svg {
    height: 16px;
  }
  .name {
    padding: 10px;
    .spiner {
      height: 16px;
    }
    span {
      ${() => FontsStyles.cardText}
      word-break: break-word;
    }
    textarea {
      height: auto;
      resize: none;
      width: 100%;
    }
    input {
      ${() => FontsStyles.cardText}
      min-width: 50px;
      font-size: 16px;
      border-top: unset;
      border-left: unset;
      border-right: unset;
      color: ${({theme} : {theme: ThemeType}) => theme.MainTextColor};
      background-color: ${({theme} : {theme: ThemeType}) => theme.MainBg};
    }
    :hover {
      cursor: pointer;
    }
  }
  .functions {
    padding: 10px;
    display: grid;
    align-content: center;
    border-left: 1px solid ${({theme} : {theme: ThemeType}) => theme.CardBorderColor};
    gap: 10px;
    grid-auto-flow: column;
    svg {
      path {
        fill: ${({theme} : {theme: ThemeType}) => theme.ListItemButtonsColor};
      }
      :hover {
        cursor: pointer;
      }
    }
  }
`
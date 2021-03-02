import styled from 'styled-components'
import { FontsStyles } from '../../Styled/Fonts'
import { ThemeType } from '../../Styled/Themes'

export const WordsWrapper = styled.div `
  display: grid;
  width: 90%;
  grid-template-rows: auto auto 1fr;
  gap: 10px;
  justify-self: center;
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
    svg:hover {
     cursor: pointer;
    }
  }
`

export const WordItemSt = styled.div `
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: 1fr 1fr;
  border-radius: 5px;
  border: 1px solid ${({theme} : {theme: ThemeType}) => theme.CardBorderColor};
  background-color: ${({theme} : {theme: ThemeType}) => theme.CardsBg};
  color: ${({theme} : {theme: ThemeType}) => theme.SecondaryTextColor};
  span:hover {
    cursor: default;
  }
  input {
    ${() => FontsStyles.cardText}
    min-width: 50px;
    border-top: unset;
    border-left: unset;
    border-right: unset;
    color: ${({theme} : {theme: ThemeType}) => theme.MainTextColor};
    background-color: ${({theme} : {theme: ThemeType}) => theme.MainBg};
  }
  .spiner {
    margin-left: 10px;
    height: 38px;
    padding: 5px;
    justify-self: left;
    grid-row: 1/3;
    align-self: center;
  }
  .word {
    ${() => FontsStyles.cardText}
    padding: 10px;
    border-bottom: 1px solid ${({theme} : {theme: ThemeType}) => theme.CardBorderColor};
    .transcription {
      ${() => FontsStyles.cardTranscriptionText}
      color: grey;
      margin-left: 10px;
    }
  }
  .translate {
    ${() => FontsStyles.cardText}
    padding: 10px;
    grid-row: 2;
  }
  .functions {
    grid-column: 2;
    grid-row: 1/3;
    padding: 10px;
    display: grid;
    border-left: 1px solid ${({theme} : {theme: ThemeType}) => theme.CardBorderColor};
    gap: 10px;
    grid-auto-flow: column;
    align-content: center;
    svg path {
      fill: ${({theme} : {theme: ThemeType}) => theme.ListItemButtonsColor}
    }
  }
`

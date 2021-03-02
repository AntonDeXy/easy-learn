import styled from "styled-components"
import { FontsStyles } from "../../Styled/Fonts"
import { ThemeType } from "../../Styled/Themes"

export const ProfileSt = styled.div`
display: grid;
padding: 15px 0;
.wrapper {
  @media screen and (max-width: 768px) {
    width: 90% !important;
    grid-template-columns: 100% !important;
    img, .userImg {
      width: 50% !important;
      justify-self: center;
    }
  }
  @media screen and (max-width: 440px) {
    img, .userImg {
      width: 80% !important;
      justify-self: center;
    }
  }
  @media screen and (max-width: 350px) {
    img, .userImg {
      width: 100% !important;
      justify-self: center;
    }
  }
  display: grid;
  width: 80%;
  align-content: baseline;
  justify-self: center;
  grid-template-columns: 20% auto;
  gap: 10px;
  img {
    grid-column: 1;
    width: 100%
  }
  .userImg {
    width: 100%;
    height: 150px;
    display: grid;
    align-items: center;
    justify-content: center;
    background-color: gray;
    span {
      color: #eee;
    }
  }
  .info {
    display: grid;
    grid-auto-flow: row;
    gap: 15px;
    align-content: baseline;
    color: ${({theme} : {theme: ThemeType}) => theme.SecondaryTextColor};
    span, a, time {
      ${() => FontsStyles.cardText}
    }
    .label {
      text-transform: capitalize;
    }
    div {
      display: grid;
      gap: 10px;
      justify-content: left;
      text-align: left;
      grid-template-columns: auto 1fr;
      grid-auto-flow: column;
      align-content: center;
      span {
        align-self: center;
      }
    }
    .tests-wrapper {
      @media screen and (max-width: 768px) {
        grid-template-columns: 100% !important;
        .tests {
          grid-row: 2;
        }
      }
      .tests {
        display: grid;
        max-height: 40vh;
        align-content: baseline;
        border: 2px solid gray;
        width: 100%;
        grid-auto-flow: row;
        grid-template-columns: 100%;
        grid-auto-rows: 60px;
        background-color: #c1c1c1;
        gap: 5px;
        overflow-y: scroll;
        border-radius: 10px;
        .test-item {
          align-content: center;
          background-color: ${({theme} : {theme: ThemeType}) => theme.CardsBg};
          display: grid;
          width: 100%;
          grid-template-columns: 1fr auto auto;
          padding: 0 10px;
          align-items: center;
          ${() => FontsStyles.menuItem}
          .list-name {
            padding: 5px;
            grid-column: 1;
            h2 {
              margin: 0;
              font-size: 1em;
              color: ${({theme} : {theme: ThemeType}) => theme.MainTextColor};
            }
          }
          .date {
            grid-column: 3;
          }
          .info {
            display: grid;
            border-top: 1px solid grey;
            grid-column: 1/4;
            grid-row: 2;
            gap: 10px;
            grid-template-columns: 100%;
            grid-auto-flow: row;
            .questions {
              display: grid;
              grid-auto-flow: row;
              border: 1px solid gray;
              grid-template-columns: 100%;
              .question {
                
              }
            }
          }
        }
      }
    }
  }
}
`

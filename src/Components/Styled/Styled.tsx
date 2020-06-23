import styled from 'styled-components'
import { FontsStyles } from './Fonts'
import { ThemeType } from './Themes'

export const HeaderSt = styled.header `
  display: grid;
  font-family: 'Roboto', sans-serif;
  height: 10vh;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.25);
  background-color: ${({theme} : {theme: ThemeType}) => theme.FooterHeaderBg};
  .wrapper {
    display: grid;
    width: 90%;
    justify-self: center;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    .menu path {
      fill: ${({theme} : {theme: ThemeType}) => theme.SecondaryOrangeInactiveTab};
    }
    .menu-active path {
      fill: ${({theme} : {theme: ThemeType}) => theme.MainOrangeActiveTab};
    }
    span {
      ${() => FontsStyles.h1}
      padding: 0 10px;
      overflow-y: scroll;
      max-height: 9vh;
      color: ${({theme} : {theme: ThemeType}) => theme.MainOrangeActiveTab};
      :hover {
        cursor: default;
      }
    }
    .logIn {
      display: grid;
      justify-items: right;
      text-align: right;
      path {
        align-self: center;
        fill: #F3A184;
      }
    }
    .userImg {
      a {
        display: grid;
      }
      img {
        height: 5vh;
        border-radius: 100%;
        justify-self: right;
      }
    }
  }
`

export const MainSt = styled.main `
  display: grid;
  height: 80vh;
  width: 100vw;
  font-family: 'Roboto', sans-serif;
  overflow-y: auto;
  background-color: ${({theme} : {theme: ThemeType}) => theme.MainBg};
  .pleaseLogin {
    width: 100vw;
    text-align: center;
    padding-top: 15px;
  }
  .spiner {
    height: 100px;
    justify-self: center;
    align-self: center;
  }
`

export const PlusSt = styled.div `
  justify-content: center;
  display: grid;
  padding: 15px 0;
  grid-template-columns: 1fr auto 1fr;
  div {
    display: grid;
    align-items: center;
  }
  svg {
    height: 50px;
    :hover {
      cursor: pointer;
    }
  }
`

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

export const SpinerStyled = styled.svg `
  @keyframes rotating {
    from{
      transform: rotate(0deg);
    }
    to{
      transform: rotate(360deg);
    }
  }
  display: grid;
  animation: rotating 2s linear infinite;
  path {
    fill: ${({theme} : {theme: ThemeType}) => theme.MainTextColor}
  }

`

export const FooterSt = styled.footer `
  display: grid;
  height: 10vh;
  box-shadow: 0px -4px 30px rgba(0, 0, 0, 0.25);
  background-color: ${({theme} : {theme: ThemeType}) => theme.FooterHeaderBg};
  .wrapper {
    display: grid;
    width: 90%;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    align-items: center;
    justify-self: center;
    justify-items: center;
    a, svg {
      color: ${({theme} : {theme: ThemeType}) => theme.SecondaryOrangeInactiveTab};
    }
    .activeTab {
      color: ${({theme} : {theme: ThemeType}) => theme.MainOrangeActiveTab};
    }
  }
`

export const ModalSt = styled.div `
  display: grid;
  height: 80vh;
  background-color: rgba(0, 0, 0, 0.3);
  height: 80vh;
  width: 100vw;
  font-family: 'Roboto', sans-serif;
  position: absolute;
  top: 10vh;
  left: 0;
  .modal {
    display: grid;
    justify-self: center;
    z-index: 1;
    align-self: center;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(256, 256, 256, 0.4);
    background-color: ${({theme} : {theme: ThemeType}) => theme.CardsBg};
    grid-template-rows: auto 1fr;
    width: auto;
    min-width: 320px;
    height: auto;
    color: ${({theme} : {theme: ThemeType}) => theme.MainTextColor};
    .header {
      padding: 5px;
      display: grid;
      grid-template-columns: 1fr auto auto;
      border-bottom: 2px solid #C7D1D9;
      text-align: left;
      gap: 10px;
      .modal-title {
        ${() => FontsStyles.h1}
      }
      svg {
        align-self: center;
        :hover {
          cursor: pointer;
        }
      }
    }
    .test {
      display: grid;
      grid-auto-flow: row;
      gap: 10px;
      align-content: baseline;
      padding: 10px;
      .answers {
        display: grid;
        grid-auto-flow: row;
        gap: 10px;
        button {
          min-height: 30px;
          border-radius: 10em;
          color: #4285f4;
          border: 2px solid #4285f4;
          background-color: #ffffff;
          box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12);
          transition: all.5s;
          :active {
            background-color: gainsboro;
            box-shadow: 0 5px 11px 0 rgba(0,0,0,0.18),0 4px 15px 0 rgba(0,0,0,0.15);
          }
        }
        .rightAnswer {
          color: #00b500;
          border-color: #00b500;
        }
        .wrongAnswer {
          color: #ff3547;
          border-color: #ff3547;
        }
      }
    }
    .choose-test-type {
      display: grid;
      grid-template-columns: repeat(1fr, 3);
      align-content: baseline;
      gap: 10px;
      padding: 10px;
      .title {
        grid-column: 1/4;
      }
      .questionsCount {
        display: grid;
        gap: 5px;
        grid-auto-flow: column;
        justify-content: left;
        align-items: center;
        grid-column: 1/4;
      }
      button {
        height: 30px;
        border-radius: 10em;
        color: #fff;
        border: 2px solid #4285f4;
        background-color: ${({theme} : {theme: ThemeType}) => theme.DefButtonColor};
        box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12);
        transition: all.5s;
        :active {
          background-color: gainsboro;
          box-shadow: 0 5px 11px 0 rgba(0,0,0,0.18),0 4px 15px 0 rgba(0,0,0,0.15);
        }
      }
    }
    .main {
      display: grid;
      grid-auto-flow: row;
      gap: 10px;
      align-content: baseline;
      padding: 10px;
      .resultText {
        text-align: center;
      }
      .error {
        color: red;
      }
      .item {
        display: grid;
        grid-auto-flow: row;
        span {
          ${() => FontsStyles.modalInputLabel}
          color: ${({theme} : {theme: ThemeType}) => theme.MainTextColor};
        }
        input {
          border-radius: 5px;
          height: 30px;
          border: 1px solid ${({theme} : {theme: ThemeType}) => theme.CardBorderColor};
          background-color: ${({theme} : {theme: ThemeType}) => theme.CardsBg};
          color: ${({theme} : {theme: ThemeType}) => theme.MainTextColor}
        }
        textarea {
          border-radius: 5px;
          border: 1px solid #C7D1D9;
          resize: none;
        }
      }
      .playAudio {
        height: 30px;
        width: 35px;
        :hover {
          cursor: pointer
        }
        svg {
          height: 100%;
        }
      }
      .spiner {
        justify-self: center;
        height: 35px;
      }
      .translates {
        display: grid;
        grid-auto-flow: row;
        h2 {
          color: ${({theme} : {theme: ThemeType}) => theme.MainTextColor};
          font-size: 16px;
          margin: 0;
        }
        .translate {

        }
        ul {
          li {
            :hover {
              color: #8a0000;
              cursor: pointer;
            }
          }
        }
      }
      button {
        width: 60%;
        background-color: ${({theme} : {theme: ThemeType}) => theme.DefButtonColor};
        color: #fff;
        height: 35px;
        border: unset;
        justify-self: center;
        border-radius: 5px;
        font-style: normal;
        font-weight: 500;
        font-size: 17px;
      }
    }
  }
`

export const MenuSt = styled.div`
  @keyframes menuAnimIn {
    from {right: 100vw;}
    to {right: 0;}
  }
  @keyframes menuAnimOut {
    from {right: 0;}
    to {right: 100vw;}
  }
  display: grid;
  height: 80vh;
  background-color: ${({theme} : {theme: ThemeType}) => theme.FooterHeaderBg};
  width: 100vw;
  font-family: 'Roboto', sans-serif;
  position: absolute;
  top: 10vh;
  animation-duration: 0.5s;
  font-size: 20px;
  z-index: 10;
  .wrapper {
    display: grid;
    justify-self: center;
    width: 90%;
    align-content: baseline;
    gap: 10px;
    .theme-switcher {
      button {
        border-radius: 5px;
        border: 2px solid ${({theme} : {theme: ThemeType}) => theme.MainTextColor};
        color: ${({theme} : {theme: ThemeType}) => theme.MainTextColor};
        background-color: unset;
      }
    }
    a {
      ${() => FontsStyles.menuItem}
      color: ${({theme} : {theme: ThemeType}) => theme.MainOrangeActiveTab};
      :hover {
        color: #6f6f6f !important;
      }
    }
  }
`

export const NotesSt = styled.div `
  
`

export const AddListUrlStyled = styled.div `
  display: grid;
  width: auto;
  justify-self: center;
  align-self: center;
  max-height: 90%;
  justify-content: center;
  box-shadow: 0 0 20px black;
  gap: 10px;
  overflow-y: scroll;
  border-radius: 20px;
  .header {
    padding: 10px 10px 0 10px;
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr auto;
    border-bottom: 2px solid #C7D1D9;
  }
  .main {
    padding: 0 10px 10px 10px;
    display: grid;
    grid-template-rows: auto auto 1fr;
    gap: 5px;
    .error {
      color: red;
    }
    svg {
      height: 10px;
    }
    .list-content {
      display: grid;
      grid-template-columns: 1fr auto;
      align-items: center;
    }
    .active {
      transform: rotate(180deg);
    }
    h2 {
      margin: 0;
    }
    span {

    }
    .content {
      display: grid;
      grid-auto-flow: row;
      gap: 15px;
      .list-item {
        display: grid;
        grid-auto-flow: row;
        border: 1px solid #C7D1D9;
        border-radius: 10px;
        div {
          padding: 5px;
        }
        .word {
          border-bottom: 1px solid #C7D1D9;
        }
        .translate {

        }
      }
    }
    button {
      background-color: ${({theme} : {theme: ThemeType}) => theme.GreenButton} ;
      justify-self: center;
      color: #fff;
      border-radius: 10px;
      border: unset;
      padding: 10px;
      width: 90%;
    }
  }
`

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
      div {
        display: grid;
        gap: 10px;
        justify-content: left;
        text-align: left;
        grid-template-columns: auto 1fr;
        grid-auto-flow: column;
        align-content: baseline;
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
              grid-column: 1;
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

export const HelpPageSt = styled.div `
  display: grid;
  padding: 15px 0;
  .wrapper {
    display: grid;
    width: 80%;
    justify-self: center;
    align-content: baseline;
    .ant-collapse {
      max-width: 100%;
      overflow: scroll;
      border: unset;
      box-shadow: 0 0 10px ${({theme}: {theme: ThemeType}) => theme.helpTabsShadowColor};
    }
    .ant-collapse-header {
      ${() => FontsStyles.cardText}
      color: ${({theme}: {theme: ThemeType}) => theme.SecondaryTextColor};
      background-color: ${({theme}: {theme: ThemeType}) => theme.CardsBg};
    }
    .ant-collapse-content-box {
      background-color: ${({theme}: {theme: ThemeType}) => theme.MainBg};
      color: ${({theme}: {theme: ThemeType}) => theme.SecondaryTextColor};
      img {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      }
    }
  }
`

export const AdminPanelSt = styled.div `
  display: grid;
  padding: 15px 0;
  .wrapper {
    display: grid;
    width: 80%;
    justify-self: center;
    align-content: baseline;
    .ant-tabs-nav {
      color: ${({theme}: {theme: ThemeType}) => theme.SecondaryTextColor};
    }
    .textEditor {
      min-height: 80vh;
    }
    /* temporary remove img uploading */
    /* .ck-file-dialog-button {
      display: none
    } */
    .helpItemsWrapper {
      display: grid;
      grid-auto-flow: row;
      gap: 5px;
      color: ${({theme}: {theme: ThemeType}) => theme.SecondaryTextColor};
      .helpItem {
        display: grid;
        grid-template-columns: 1fr auto;
        padding: 10px 10px;
        border: 1px solid ${({theme}: {theme: ThemeType}) => theme.CardBorderColor};
        background-color: ${({theme}: {theme: ThemeType}) => theme.CardsBg};
        border-radius: 5px;
        font-weight: 500;
        .name {
          display: grid;
          align-items: center;
        }
        .icons {
          display: grid;
          align-items: center;
          grid-auto-flow: column;
          gap: 10px;
          justify-content: right;
        }
      }
      h2 {
        color: ${({theme}: {theme: ThemeType}) => theme.SecondaryTextColor};
      }
    }
    .jodit_container {
      color: black;
    }
    button {
      border: unset;
      color: #fff;
      background-color: ${({theme}: {theme: ThemeType}) => theme.GreenButton};
      ${() => FontsStyles.modalButtonText}
    }

  }
`

export const LoginPanelSt = styled.div `
  display: grid;
  grid-auto-flow: row;
  align-content: baseline;
  /* background-color: ${({theme}: {theme: ThemeType}) => theme.CardsBg }; */
  border-radius: 10px;
  height: auto;
  width: auto;
  min-width: 30vw;
  justify-self: center;
  align-self: center; 
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  .header {
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid ${({theme}: {theme: ThemeType}) => theme.MainOrangeActiveTab };
    h2 {
      ${() => FontsStyles.h1}
      margin: 0;
      color: ${({theme}: {theme: ThemeType}) => theme.MainTextColor };
    }
  }
  .body {
    display: grid;
    grid-auto-flow: row;
    padding: 10px;
    gap: 10px;
    .msg {
      color: #ff3c00;
    }
    button {
      color: #fff;
      border: unset;
      background-color: ${({theme} : {theme: ThemeType}) => theme.DefButtonColor};
    }
  }
`

export const PanelItemSt = styled.div `
  grid-auto-flow: row;
  display: grid;
  span {
    color: ${({theme}: {theme: ThemeType}) => theme.MainTextColor };
    text-transform: capitalize;
  }
  input {
    ${() => FontsStyles.modalInputLabel}
    border-top: unset;
    border-left: unset;
    border-right: unset;
    padding: 5px;
    color: ${({theme} : {theme: ThemeType}) => theme.MainTextColor};
    background-color: ${({theme} : {theme: ThemeType}) => theme.MainBg};
  }
`

export const AdditionalPanelLinksSt = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
`
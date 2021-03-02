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
      overflow-y: auto;
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
      display: grid;
      justify-content: right;
      a {
        display: grid;
      }
      svg {
        path {
          fill: ${({theme} : {theme: ThemeType}) => theme.MainOrangeActiveTab} ;
        }
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
  .back-arrow {
    justify-self: left;
  }
  svg {
    height: 50px;
    :hover {
      cursor: pointer;
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
      ${() => FontsStyles.modalInputLabel}
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
          background-color: ${({theme} : {theme: ThemeType}) => theme.MainBg};
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

export const LanguageSwitcherSt = styled.div `
  display: grid;
  grid-auto-flow: column;
  justify-self: left;
  width: auto;
  color: ${({theme} : {theme: ThemeType}) => theme.MainTextColor};
  background-color: unset;
  gap: 0 !important;
  font-size: 19px;
  div {
    border: 2px solid ${({theme} : {theme: ThemeType}) => theme.MainTextColor};
    gap: 0 !important;
    padding: 1px 7px 2px 7px;
    display: inline-block;
    color: ${({theme} : {theme: ThemeType}) => theme.MainTextColor};
    transition: all .2s ease-in;
    :hover {
      cursor: pointer;
    }
  }
  .current {
    border-color: ${({theme} : {theme: ThemeType}) => theme.GreenButton};
  }
  & :nth-last-child(1) {
    border-radius: 0 5px 5px 0;
  }
  & :first-child {
    border-radius: 5px 0 0 5px;
  }
`
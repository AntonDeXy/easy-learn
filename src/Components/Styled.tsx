import styled from 'styled-components'

// main-orange-text #F24405
// main-orange-items #F3A184
// items
// text #020F59
// border #C7D1D9
// icons #5B659A

export const HeaderSt = styled.header `
  display: grid;
  font-family: 'Roboto', sans-serif;
  height: 10vh;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.25);
  background-color: #ffffff;
  .wrapper {
    display: grid;
    width: 90%;
    justify-self: center;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    span {
      color: #F24405;
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
  border: 1px solid #C7D1D9;
  span:hover {
    cursor: default;
  }
  input {
    font-size: 16px;
    border-top: unset;
    border-left: unset;
    border-right: unset;
  }
  .spiner {
    margin-left: 10px;
    height: 42px;
    justify-self: left;
    grid-row: 1/3;
    align-self: center;
  }
  .word {
    padding: 10px;
    border-bottom: 1px solid #C7D1D9;
  }
  .translate {
    padding: 10px;
    grid-row: 2;
  }
  .functions {
    grid-column: 2;
    grid-row: 1/3;
    padding: 10px;
    display: grid;
    border-left: 1px solid #C7D1D9;
    gap: 10px;
    grid-auto-flow: column;
    align-content: center;
  }
`

export const ListItemSt = styled.div `
  display: grid;
  grid-template-columns: 1fr auto;
  border-radius: 5px;
  border: 1px solid #C7D1D9;
  svg {
    height: 16px;
  }
  .name {
    padding: 10px;
    .spiner {
      height: 16px;
    }
    span {
      word-break: break-word;
    }
    textarea {
      height: auto;
      resize: none;
      width: 100%;
    }
    input {
      font-size: 16px;
      border-top: unset;
      border-left: unset;
      border-right: unset;
    }
    :hover {
      cursor: pointer;
    }
  }
  .functions {
    padding: 10px;
    display: grid;
    align-content: center;
    border-left: 1px solid #C7D1D9;
    gap: 10px;
    grid-auto-flow: column;
    svg:hover {
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
`

export const FooterSt = styled.footer `
  display: grid;
  height: 10vh;
  box-shadow: 0px -4px 30px rgba(0, 0, 0, 0.25);
  background-color: #ffffff;
  .wrapper {
    display: grid;
    width: 90%;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    align-items: center;
    justify-self: center;
    justify-items: center;
    a, svg {
      color: #FFC5B0;
    }
    .activeTab {
      color: #FF7B4C;
    }
  }
`

export const ModalSt = styled.div `
  display: grid;
  height: 80vh;
  background-color: rgba(0, 0, 0, 0.1);
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
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.4);
    background-color: #ffffff;
    grid-template-rows: auto 1fr;
    width: 320px;
    height: auto;
    color: #010440;
    .header {
      padding: 5px;
      display: grid;
      grid-template-columns: 1fr auto auto;
      border-bottom: 2px solid #C7D1D9;
      svg {
        align-self: center;
        :hover {
          cursor: pointer;
        }
      }
    }
    .testHeader {
      text-align: left;
      gap: 10px;
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
          height: 30px;
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
      button {
        height: 30px;
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
          font-weight: 500;
          color: #010440;
        }
        input {
          border-radius: 5px;
          height: 30px;
          border: 1px solid #C7D1D9;
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
        background-color: #0091CF;
        color: white;
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
  background-color: #ffffff;
  width: 100vw;
  font-family: 'Roboto', sans-serif;
  position: absolute;
  top: 10vh;
  animation-duration: 0.5s;
  .wrapper {
    display: grid;
    justify-self: center;
    width: 90%;
    align-content: baseline;
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
      background-color: #1c1;
      justify-self: center;
      color: white;
      border-radius: 10px;
      border: unset;
      padding: 10px;
      width: 90%;
    }
  }
`

export const ProfileSt = styled.div`
  display: grid;
  padding-top: 15px;
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
      div {
        display: grid;
        gap: 10px;
        justify-content: left;
        text-align: left;
        grid-auto-flow: column;
      }
    }
  }
`
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
    }
    .logIn {
      display: grid;
      justify-items: right;
      text-align: right;
      /* justify-self: right; */
      path {
        align-self: center;
        fill: #F3A184;
      }
    }
    .userImg {
      /* display: grid; */
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
  /* overflow: hidden; */
  overflow-y: auto;
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
`

export const ListsWrapper = styled.div `
  display: grid;
  width: 90%;
  grid-template-rows: auto 1fr;
  justify-self: center;
  gap: 10px;
  svg:hover {
    cursor: pointer;
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
  svg:hover {
    cursor: pointer;
  }
  .lists {
    overflow-y: auto;
    display: grid;
    align-content: baseline;
    gap: 20px;
    padding-bottom: 15px;
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
    /* height: 11px; */
    border-top: unset;
    border-left: unset;
    border-right: unset;
  }
  .word {
    padding: 10px;
    border-bottom: 1px solid #C7D1D9;
  }
  .translate {
    padding: 10px;
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
  .name {
    padding: 10px;
    textarea {
      resize: both;
    }
    :hover {
      cursor: pointer;
    }
  }
  .functions {
    padding: 10px;
    display: grid;
    border-left: 1px solid #C7D1D9;
    gap: 10px;
    grid-auto-flow: column;
  }
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
      /* grid-template-columns: 1fr auto; */
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
      /* justify-items: right; */
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
          height: 22px;
          border: 1px solid #C7D1D9;
        }
        /* gap: 5px; */
      }
      button {
        /* display: grid; */
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
  display: grid;
  height: 80vh;
  background-color: #ffffff;
  height: 80vh;
  width: 100vw;
  font-family: 'Roboto', sans-serif;
  position: absolute;
  top: 10vh;
  /* left: 0; */
  /* right: 0; */
  animation-name: menuAnimIn;
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
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
    .menu {

    }
    span {
      color: #F24405;
    }
    .logOut {
      justify-self: right;
    }
  }
`

export const MainSt = styled.main `
  display: grid;
  height: 80vh;
  width: 100vw;
  font-family: 'Roboto', sans-serif;
  overflow: hidden;
  /* overflow-y: auto; */
`

export const PlusSt = styled.div `
  justify-content: center;
  display: grid;
  padding: 15px 0;
`

export const ListsWrapper = styled.div `
  display: grid;
  width: 90%;
  grid-template-rows: auto 1fr;
  justify-self: center;
  gap: 10px;
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
  grid-template-rows: auto 1fr;
  gap: 10px;
  justify-self: center;
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
  /* box-shadow: 0px -4px 30px rgba(0, 0, 0, 0.25); */
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
      grid-template-columns: 1fr auto;
      border-bottom: 2px solid #C7D1D9;
    }
    .main {
      display: grid;
      grid-auto-flow: row;
      gap: 10px;
      align-content: baseline;
      padding: 10px;
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
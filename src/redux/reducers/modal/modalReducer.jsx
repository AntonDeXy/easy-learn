import { itemsAPI } from "../../../API/Api"

const modalState = {
  isActive: false,
  type: '',
  listId: '',
  test: {
    type: '',
    questionsCount: 0,
    questionId: 0,
    rightAnswersCount: 0,
    initialItems: [],
    shufledItems: [],
    itemsForTest: [],
    currentQuestion: {}
  }
}

const modalReducer = (state = modalState, action) => {
  switch (action.type) {
    case 'SET_MODAL': {
      return {...state, ...action.modalData}
    }
    case 'SHUFLE_ITEMS': {
      let newState = {...state}
      const shuffle = (a) => {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
      }
      const shufledItems = shuffle([...newState.test.initialItems])
      newState.test.shufledItems = shufledItems
      return newState
    }
    case 'SET_ITEMS_FOR_TEST_WORD_TO_TRANSLATES': {
      let newState = {...state}
      let itemsForTest = []
      for (let i = 0; i < newState.test.shufledItems.length; i++) {
        let temporaryItem = {
          value1: '',
          rightAnswer: '',
          variants: []
        }

        temporaryItem.value1 = newState.test.shufledItems[i].word
        temporaryItem.rightAnswer = newState.test.shufledItems[i].translate

        for (let v = 0; v < action.data.variantsCount; v++) {
          let isItemOnArray = true
          let randomNum
          while (isItemOnArray) {
            let temp = Math.random() * (newState.test.shufledItems.length)
            randomNum = Math.floor(temp)
            let temporaryVariants = []
            temporaryItem.variants.forEach(v => temporaryVariants.push(v.value))
            if (!temporaryVariants.includes(newState.test.shufledItems[randomNum].translate)) {
              isItemOnArray = false
            }
          }
          temporaryItem.variants.push({value: newState.test.shufledItems[randomNum].translate, key: Math.random() * 10})
        }

        let temporaryVariants = []
        temporaryItem.variants.forEach(v => temporaryVariants.push(v.value))
        
        if (!temporaryVariants.includes(temporaryItem.rightAnswer)) {
          let randomNum = Math.floor(Math.random() * 10)
          randomNum %= action.data.variantsCount - 1
          temporaryItem.variants[randomNum] = {value: temporaryItem.rightAnswer, key: Math.random() * 10}
        }

        itemsForTest.push(temporaryItem)
      }

      newState.test.currentQuestion = itemsForTest[0]
      newState.test.itemsForTest = itemsForTest
      newState.test.questionsCount = itemsForTest.length
      newState.test.questionId = 0
      newState.test.rightAnswersCount = 0
      
      return newState
    }
    case 'SET_ITEMS_FOR_TEST_TRANSLATE_TO_WORDS': {
      let newState = {...state}
      let itemsForTest = []
      for (let i = 0; i < newState.test.shufledItems.length; i++) {
        let temporaryItem = {
          value1: '',
          rightAnswer: '',
          variants: []
        }

        temporaryItem.value1 = newState.test.shufledItems[i].translate
        temporaryItem.rightAnswer = newState.test.shufledItems[i].word

        for (let v = 0; v < action.data.variantsCount; v++) {
          let isItemOnArray = true
          let randomNum
          while (isItemOnArray) {
            let temp = Math.random() * (newState.test.shufledItems.length)
            randomNum = Math.floor(temp)
            let temporaryVariants = []
            temporaryItem.variants.forEach(v => temporaryVariants.push(v.value))
            if (!temporaryVariants.includes(newState.test.shufledItems[randomNum].translate)) {
              isItemOnArray = false
            }
          }
          temporaryItem.variants.push({value: newState.test.shufledItems[randomNum].word, key: Math.random() * 10})
        }

        let temporaryVariants = []
        temporaryItem.variants.forEach(v => temporaryVariants.push(v.value))
        
        if (!temporaryVariants.includes(temporaryItem.rightAnswer)) {
          let randomNum = Math.floor(Math.random() * 10)
          randomNum %= action.data.variantsCount - 1
          temporaryItem.variants[randomNum] = {value: temporaryItem.rightAnswer, key: Math.random() * 10}
        }

        itemsForTest.push(temporaryItem)
      }

      newState.test.currentQuestion = itemsForTest[0]
      newState.test.itemsForTest = itemsForTest
      newState.test.questionsCount = itemsForTest.length
      newState.test.questionId = 0
      newState.test.rightAnswersCount = 0
      
      return newState
    }
    case 'NEXT_QUESTION': {
      let newState = {...state}

      if (action.answer === newState.test.currentQuestion.rightAnswer) {
        newState.test.rightAnswersCount++
      }
      
      newState.test.questionId += 1

      newState.test.currentQuestion = newState.test.itemsForTest[newState.test.questionId]
      
      if (newState.test.questionId >= newState.test.itemsForTest.length) {
        newState.type = 'result'
      }

      return newState
    }
    default: return state
  }
}

export const setModal = (modalData) => ({type: 'SET_MODAL', modalData})
export const shufleItems = () => ({type: 'SHUFLE_ITEMS'})
export const setItemsForTestWordToTranslates = (variantsCount) => ({type: 'SET_ITEMS_FOR_TEST_WORD_TO_TRANSLATES', data: {variantsCount: variantsCount ? variantsCount : 3}})
export const setItemsForTestTranslateToWords = (variantsCount) => ({type: 'SET_ITEMS_FOR_TEST_TRANSLATE_TO_WORDS', data: {variantsCount: variantsCount ? variantsCount : 3}})
export const getNextQuestion = (answer) => ({type: 'NEXT_QUESTION', answer})

export const setTestModal = (modalData, variantsCount) => async (dispatch) => {
  await dispatch(setModal(modalData))
  await dispatch(shufleItems())
  if (modalData.test.type === 'wordTranslates') {
    await dispatch(setItemsForTestWordToTranslates(variantsCount))
  } else if (modalData.test.type === 'translateWords') {
    await dispatch(setItemsForTestTranslateToWords(variantsCount))
  }
}

export default modalReducer
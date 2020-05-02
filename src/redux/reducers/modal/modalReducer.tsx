import { SET_ITEMS_FOR_TEST_TRANSLATE_TO_WORDS, NEXT_QUESTION, SET_ITEMS_FOR_TEST_WORD_TO_TRANSLATES, SHUFLE_ITEMS, SET_MODAL } from "./modalReducerTypes"
import { ItemType } from "../main/mainReducer"
import { testsAPI, userAPI } from '../../../API/Api';
import { UserQuestionType, addCompletedTest } from "../users/usersReducer";

export type QuestionType = {
  value1: string
  rightAnswer: string
  usersAnswer: string
  variants: Array<{value: string, key: number}>
}

export type TestType = {
  type: string
  questionsCount: number
  questionId: 0
  rightAnswersCount: 0
  initialItems: Array<ItemType>
  shufledItems: Array<ItemType>
  itemsForTest: Array<QuestionType>
  currentQuestion: QuestionType
}

export type ModalStateType = {
  isActive: boolean
  type: string
  errorMessage: string
  listId: string
  test: TestType
}

const modalState:ModalStateType = {
  isActive: false,
  type: '',
  listId: '',
  errorMessage: '',
  test: {
    type: '',
    questionsCount: 0,
    questionId: 0,
    rightAnswersCount: 0,
    initialItems: [],
    shufledItems: [],
    itemsForTest: [],
    currentQuestion: {
      value1: '',
      rightAnswer: '',
      usersAnswer: '',
      variants: []
    }
  }
}

const modalReducer = (state = modalState, action:any) => {
  switch (action.type) {
    case SET_MODAL: {
      return {...state, ...action.modalData}
    }
    case SHUFLE_ITEMS: {
      let newState = {...state}
      const shuffle = (a:Array<ItemType>) => {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]]
        }
        return a
      }
      const shufledItems = shuffle([...newState.test.initialItems])
      newState.test.shufledItems = shufledItems
      return newState
    }
    case SET_ITEMS_FOR_TEST_WORD_TO_TRANSLATES: {
      let newState = {...state}
      let itemsForTest = []
      for (let i = 0; i < newState.test.shufledItems.length; i++) {
        let temporaryItem:QuestionType = {
          value1: '',
          rightAnswer: '',
          usersAnswer: '',
          variants: [],
        }

        temporaryItem.value1 = newState.test.shufledItems[i].word
        temporaryItem.rightAnswer = newState.test.shufledItems[i].translate

        for (let v = 0; v < action.data.variantsCount; v++) {
          let isItemOnArray = true
          let randomNum:number = 0
          while (isItemOnArray) {
            randomNum = Math.floor(Math.random() * (newState.test.shufledItems.length))
            let temporaryVariants:Array<string> = []
            temporaryItem.variants.forEach(v => temporaryVariants.push(v.value))
            if (!temporaryVariants.includes(newState.test.shufledItems[randomNum].translate)) {
              isItemOnArray = false
            }
          }
          temporaryItem.variants.push({value: newState.test.shufledItems[randomNum].translate, key: Math.random() * 10})
        }

        let temporaryVariants:Array<string> = []
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
    case SET_ITEMS_FOR_TEST_TRANSLATE_TO_WORDS: {
      let newState = {...state}
      let itemsForTest = []
      for (let i = 0; i < newState.test.shufledItems.length; i++) {
        let temporaryItem:QuestionType = {
          value1: '',
          rightAnswer: '',
          usersAnswer: '',
          variants: []
        }

        temporaryItem.value1 = newState.test.shufledItems[i].translate
        temporaryItem.rightAnswer = newState.test.shufledItems[i].word

        for (let v = 0; v < action.data.variantsCount; v++) {
          let isItemOnArray = true
          let randomNum:number = 0
          while (isItemOnArray) {
            let temp = Math.random() * (newState.test.shufledItems.length)
            randomNum = Math.floor(temp)
            let temporaryVariants:Array<string> = []
            temporaryItem.variants.forEach(v => temporaryVariants.push(v.value))
            if (!temporaryVariants.includes(newState.test.shufledItems[randomNum].translate)) {
              isItemOnArray = false
            }
          }
          temporaryItem.variants.push({value: newState.test.shufledItems[randomNum].word, key: Math.random() * 10})
        }

        let temporaryVariants:Array<string> = []
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
    case NEXT_QUESTION: {
      let newState = {...state}

      if (action.answer === newState.test.currentQuestion.rightAnswer) {
        newState.test.rightAnswersCount++
      }
      
      newState.test.itemsForTest[newState.test.questionId].usersAnswer = action.answer

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

type SetModalActionType = {
  type: typeof SET_MODAL
  modalData: ModalStateType | SetModalType
}


export type SetModalType = {
  isActive: boolean
  type: string
  listId?: string
}

export const setModal = (modalData:ModalStateType|SetModalType):SetModalActionType => ({type: SET_MODAL, modalData})

type ShufleItemsActionType = {
  type: typeof SHUFLE_ITEMS
}
export const shufleItems = ():ShufleItemsActionType => ({type: SHUFLE_ITEMS})

type SetItemsForTestWordToTranslatesActionType = {
  type: typeof SET_ITEMS_FOR_TEST_WORD_TO_TRANSLATES
  data: {
    variantsCount: number
  }
}
export const setItemsForTestWordToTranslates = (variantsCount:number):SetItemsForTestWordToTranslatesActionType => ({type: SET_ITEMS_FOR_TEST_WORD_TO_TRANSLATES, data: {variantsCount: variantsCount ? variantsCount : 3}})

type SetItemsForTestTranslateToWords = {
  type: typeof SET_ITEMS_FOR_TEST_TRANSLATE_TO_WORDS
  data: {
    variantsCount: number
  }
}
export const setItemsForTestTranslateToWords = (variantsCount:number):SetItemsForTestTranslateToWords => ({type: SET_ITEMS_FOR_TEST_TRANSLATE_TO_WORDS, data: {variantsCount: variantsCount ? variantsCount : 3}})

type getNextQuestion = {
  type: typeof NEXT_QUESTION
  answer: string
}
export const getNextQuestion = (answer:string) => ({type: NEXT_QUESTION, answer})

export const createNewTestThunk = (test:UserQuestionType, userId:string) => async (dispatch:any) => {
  let data = await testsAPI.createTest({
    test,
    userId
  })
  if (data.success) {
    let addToProfileRes = await userAPI.addTestToProfile({userId, testId: data.doc._id})
    if (addToProfileRes.success) {
      dispatch(addCompletedTest(test))
    }
  }
}

export const setTestModal = (modalData:ModalStateType, variantsCount:number) => async (dispatch:any) => {
  await dispatch(setModal(modalData))
  await dispatch(shufleItems())
  if (modalData.test.type === 'wordTranslates') {
    await dispatch(setItemsForTestWordToTranslates(variantsCount))
  } else if (modalData.test.type === 'translateWords') {
    await dispatch(setItemsForTestTranslateToWords(variantsCount))
  }
}

export default modalReducer
import axios from 'axios'
import { ListType, ItemType } from '../redux/reducers/main/mainReducer'
import { NoteType } from '../redux/reducers/notes/notesReducer'
import { UserQuestionType } from '../redux/reducers/users/usersReducer'
import { HelpItemType } from '../redux/reducers/help/helpPageReducer'

// export const baseURL = 'http://localhost:5001/api/v1/'
// export const baseURL = 'https://cors-anywhere.herokuapp.com/https://dexy.site/api/v1/'
// export const baseURL = '/api/v1/'
export const baseURL = 'https://easy-lern-backend.herokuapp.com/api/v1/'


const instance = axios.create({
  baseURL
})

export const listsAPI = {
  getLists(userId:string) {
    return instance.get(`lists/by-author-id/${userId}`)
      .then(res => res.data)
  },
  updateList(listId:string, newData:ListType) {
    return instance.put(`lists/edit/${listId}`, newData)
      .then(res => res.data)
  },
  createList(listData:ListType) {
    return instance.post('lists/new/', listData)
      .then(res => res.data)
  },
  removeList(listId:string) {
    return instance.delete(`lists/remove/${listId}`)
      .then(res => res.data)
  },
  isListExist(listId:string) {
    return instance.get(`lists/by-list-id/${listId}`)
      .then(res => res.data)
  },
  isUserHaveList(data:{userId: string, listId: string}) {
    return instance.get(`users/get-profile/${data.userId}`)
      .then(res => {
        if (res.data.success) {
          let haveUserThisList = false
          res.data.user.addedLists.forEach((list: { _id: string }) => {
            if (data.listId === list._id) haveUserThisList = true
          })
          if (haveUserThisList) {
            return({isUserHave: true})
          }
          return({isUserHave: false})
        } else return ({error: 'Something went wrong'})
      })
  },
  isUserListOwner(data:{userId: string, listId: string}) {
    return instance.get(`lists/by-author-id/${data.userId}`)
      .then(res => {
        for (let id = 0; id < res.data.data.length; id++) {
          if (res.data.data[id]._id === data.listId) {
            return({isUserOwner: true})
          }
        }
        return({isUserOwner: false})
      })
  },
  duplicateListToOwns(data:{userId: string, listForDuplicate: string}) {
    return instance.post('lists/add-list-to-owns', data)
      .then(res => res.data)
  }
} 

export const itemsAPI = {
  createItem(data: any) {
    return instance.post(`items/new/`, data)
      .then(res => res.data)
  },
  updateItem(data: {itemId:string, newItem:ItemType}) {
    return instance.put(`items/edit/${data.itemId}`, data.newItem)
      .then(res => res.data)
  },
  removeMany(data:Array<string>) {
    return instance.post('itemsRemoveMany', {ids: data})
      .then(res => res.data)
  },
  removeItem(itemId:string) {
    return instance.delete(`items/remove/${itemId}`)
      .then(res => res.data)
  },
  getAutoTranslate(phrase:string) {
    if (phrase.length > 0) {
      const url = `https://cors-anywhere.herokuapp.com/api.lingualeo.com/gettranslates?word=${phrase}`
      return axios
              .get(url)
              .then(res => res.data)
    } else {
      return ([])
    }
  }
}

export const testsAPI = {
  createTest(data: {test: UserQuestionType, userId: string}) {
    return instance.post('/tests/create-test/', data)
      .then(res => res.data)
  }
}

export const userAPI = {
  getNewToken(refreshToken: string) {
    return instance.post('/users/get-new-token', {refreshToken})
      .then(res => res.data)
  },
  login(username: string, password: string) {
    return instance.post('/users/login', {username, password})
      .then(res => res.data)
  },
  logout(refreshToken: string) {
    return instance.post('/users/logout', {refreshToken})
      .then(res => res.data)
  },
  register(username: string, password: string) {
    return instance.post('/users/register', {username, password})
      .then(res => res.data)
  },
  requestPasswordReset(email: string) {
    return instance.post('/users/request-reset-password', {email})
      .then(res => res.data)
  },
  resetPassword(newPass: string) {
    return instance.post('/users/reset-password', {newPass})
      .then(res => res.data)
  },
  addListToProfile(data: { userId: string; listId: string }) {
    return instance.post('/lists/add-to-profile', data)
      .then(res => res.data)
  },
  addTestToProfile(data: { userId: string; testId: string }) {
    return instance.put('users/add-test', data)
      .then(res => res.data)
  },
  removeAddedList(data: { userId: string; listId: string }) {
    return instance.put(`users/remove-list/${data.userId}`, {listId: data.listId})
      .then(res => res.data)
  },
  getUser(userId: string) {
    return instance.get(`users/get-profile/${userId}`)
      .then(res => res.data)
  },
  createNewUser(userId: string, email:string) {
    return instance.post('users/new', {userIdFromAuth0: userId, email})
      .then(res => res.data)
  },
  changeTheme(userId: string, theme: string) {
    return instance.put('users/change-theme', {userId, theme})
      .then(res => res.data)
  },
  changeLanguage(userId: string, language: string) {
    return instance.put('users/change-language', {userId, language})
      .then(res => res.data)
  }
}

export const notesAPI = {
  getNotes (userId:string) {
    return instance.get(`notes/${userId}`)
      .then(res => res.data)
  },
  updateNote (noteId:string, newContent:string) {
    return instance.put(`notes/edit/${noteId}`, {newContent})
      .then(res => res.data)
  },
  createNote (userId:string, data:NoteType) {
    return instance.post(`notes/new`, data)
      .then(res => res.data)
  },
  removeNote (noteId:string) {
    return instance.delete(`notes/remove/${noteId}`)
      .then(res => res.data)
  }
}

export const helpPageApi = {
  getHelpPageItems () {
    return instance.get('help-page/get-all')
      .then(res => res.data)
  },
  createHelpPageItem (item: HelpItemType) {
    return instance.post('help-page/new', {item})
      .then(res => res.data)
  },
  removeHelpPageItem (itemId: string) {
    return instance.delete(`help-page/remove/${itemId}`)
      .then(res => res.data)
  },
  editHelpPageItem (itemId: string, newData: HelpItemType) {
    return instance.put(`help-page/edit/${itemId}`, newData)
      .then(res => res.data)
  }
}
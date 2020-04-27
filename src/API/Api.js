import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:5001/api/v1/'
})

export const listsAPI = {
  getLists(userId) {
    return instance.get(`lists/by-author-id/${userId}`)
      .then(res => res.data)
  },
  updateList(listId, newData) {
    return instance.put(`lists/edit/${listId}`, newData)
      .then(res => res.data)
  },
  createList(listData) {
    return instance.post('lists/new/', listData)
      .then(res => res.data)
  },
  removeList(listId) {
    return instance.delete(`lists/remove/${listId}`)
      .then(res => res.data)
  },
  isListExist(listId) {
    return instance.get(`lists/by-list-id/${listId}`)
      .then(res => res.data)
  },
  isUserHaveList(data) {
    return instance.get(`users/get-profile/${data.userId}`)
      .then(res => {
        if (res.data.success) {
          let haveUserThisList = false
          res.data.user.addedLists.forEach(list => {
            if (data.listId === list._id) haveUserThisList = true
          })
          if (haveUserThisList) {
            return({isUserHave: true})
          }
          return({isUserHave: false})
        } else return ({error: 'Something went wrong'})
      })
  },
  isUserListOwner(data) {
    return instance.get(`lists/by-author-id/${data.userId}`)
      .then(res => {
        for (let id = 0; id < res.data.data.length; id++) {
          if (res.data.data[id]._id === data.listId) {
            return({isUserOwner: true})
          }
        }
        return({isUserOwner: false})
      })
  }
} 

export const itemsAPI = {
  createItem(listId, translate, word) {
    return instance.post(`items/new/`, {listId, translate, word})
      .then(res => res.data)
  },
  updateItem(data) {
    return instance.put(`items/edit/${data.itemId}`, data.newItem)
      .then(res => res.data)
  },
  removeMany(data) {
    return instance.post('itemsRemoveMany', {ids: data})
      .then(res => res.data)
  },
  removeItem(itemId) {
    return instance.delete(`items/remove/${itemId}`)
      .then(res => res.data)
  },
  getAutoTranslate(phrase) {
    if (phrase.length > 0) {
      const url = `https://cors-anywhere.herokuapp.com/api.lingualeo.com/gettranslates?word=${phrase}`
      return axios
              .get(url)
              .then(res => res.data.translate)
    } else {
      return ([])
    }
  }
}

export const userAPI = {
  addListToProfile(data) {
    return instance.post('/lists/add-to-profile', data)
      .then(res => res)
  },
  removeAddedList(data) {
    return instance.put(`users/remove-list/${data.userId}`, {listId: data.listId})
      .then(res => res)
  },
  getUser(userId) {
    return instance.get(`users/get-profile/${userId}`)
      .then(res => res.data)
  },
  createNewUser(userId) {
    return instance.post('users/new', {userIdFromAuth0: userId})
      .then(res => res.data)
  }
}

export const notesAPI = {
  getNotes (userId) {
    return instance.get(`notes/${userId}`)
      .then(res => res.data)
  },
  updateNote (noteId, newContent) {
    return instance.put(`notes/edit/${noteId}`, {newContent})
      .then(res => res.data)
  },
  createNote (userId, data) {
    return instance.post(`notes/new`, data)
      .then(res => res.data)
  },
  removeNote (noteId) {
    return instance.delete(`notes/remove/${noteId}`)
      .then(res => res.data)
  }
}

// export const usersAPI = {
//   getUsers(currentPage = 1, pageSize = 10) {
//     return instance.get(`users?page=${currentPage}&count=${pageSize}`)
//       .then(response => response.data)
//   },
//   follow(userId: number) {
//     return instance.post(`follow/${userId}`)
//   },
//   unfollow(userId: number) {
//     return instance.delete(`follow/${userId}`)
//   }
// }
export default class LocalStorageHelper {
  static setLocalStorage(data: any) {
    localStorage.setItem('user', JSON.stringify(data))
  }

  static getLocalStorage() {
    const localStore = localStorage.getItem('user')

    return JSON.parse(localStore || '{}')
  }
}

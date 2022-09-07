import Cookies from 'js-cookie'
import qs from 'qs'
import { QuasarResolver } from 'unplugin-vue-components/resolvers'

/**
 * 获取 token 值
 * @param {*} TokenKey 
 */
export function getToken(TokenKey:string) {
  return Cookies.get(TokenKey)
}

/**
 * 设置 token 值
 * @param {*} TokenKey 
 * @param {*} token 
 */
export function setToken(TokenKey:string, token:string) {
  return Cookies.set(TokenKey, token)
}

/**
 * 移除 token 值
 * @param {*} TokenKey 
 */
export function removeToken(TokenKey:string) {
  return Cookies.remove(TokenKey)
}

/**
 * 获取 localstorageStorage 值
 * @param {*} localStorageKey 
 */
export function getLocalStorage(localStorageKey:string) {
  return localStorage.getItem(localStorageKey)
}

/**
 * 设置 localstorageStorage 值
 * @param {*} localStorageKey 
 * @param {*} value 
 */
export function setLocalStorage(localStorageKey:string, value:any) {
  const _toString = Object.prototype.toString
  const _value = _toString.apply(value) === '[object Object]' || _toString.apply(value) === '[object Array]' ? qs.stringify(value) : value || []
  return localStorage.setItem(localStorageKey, _value)
}

/**
 * 移除 localstorageStorage 值
 * @param {*} localStorageKey 
 */
export function removeLocalStorage(localStorageKey:string) {
  return localStorage.removeItem(localStorageKey)
}
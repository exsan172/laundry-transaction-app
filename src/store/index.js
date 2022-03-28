import { atom } from 'recoil'

export const lang = atom({
    key: "lang",
    default : "en"
})

export const alertWarning = atom({
    key: "warning",
    default : false
})

export const alertSuccess = atom({
    key: "success",
    default : false
})

export const alertError = atom({
    key: "error",
    default : false
})

export const loadingStore = atom({
    key: "load",
    default : false
})
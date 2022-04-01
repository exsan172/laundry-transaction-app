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

export const income = atom({
    key: "income",
    default : 0
})

export const totalTransaction = atom({
    key: "totTrans",
    default : 0
})

export const selectDate = atom({
    key: "selectDate",
    default : false
})

export const modalCreateTransaction = atom({
    key: "createTransaction",
    default : false
})

export const modalSettings = atom({
    key: "settings",
    default : false
})

export const listStoreHome = atom({
    key: "listStore",
    default : []
})

export const storeInputModalsTransaction = atom({
    key: "storeTransaction",
    default : ""
})

export const customerInputModalsTransaction = atom({
    key: "customerTransaction",
    default : ""
})

export const weightInputModalsTransaction = atom({
    key: "weightTransaction",
    default : ""
})

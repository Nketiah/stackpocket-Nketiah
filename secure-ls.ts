import SecureLS from "secure-ls"


let ls:any  = null
if(typeof window !== "undefined") {
    ls = new SecureLS({ encodingType: "aes" })
}


export const encryptAndStore = (key: string, value: any) => {
    ls.set(key, value)
 console.log("value ?????? ", ls.set(key, value))
}


export const decryptAndUse = (key: string) => {
    const value = ls.get(key)
    return value
}
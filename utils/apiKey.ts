import { randomUUID } from 'crypto'
import crypto from 'crypto-js'
const cypherSecret: string = process.env.SECRET!

const generator = () => {
    const uuid = randomUUID()
    // const uuid = '0b067f6b-a37f-435b-ae93-132d40a2e654'
    console.log(uuid)
    const encryption = crypto.SHA256(uuid).toString()

    return { uuid, encryption } //give client uuid key, and store encryption in db everytime they send api, encrypt it and check db
}

const readApiKey = (key: string) => {
    try {
        return crypto.SHA256(key).toString()
    } catch (error) {
        return null
    }
}


export { generator, readApiKey }
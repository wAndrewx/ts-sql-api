import pool from '../../db/index'

const admin = {
    "auth": 9,
    "isPaid": true,
    "name": "admin",
}

export const makeAdmin = async () => {
    const fakeKey = "4613ea21-5b29-42a4-a336-98aaecf53856"
    const queryText =
        `
    INSERT INTO apilogs ("api_key","auth_level","paid","name")
    VALUES ($1, $2, $3, $4)
       `
    try {
        const query = await pool.query(queryText, [fakeKey, admin.auth, admin.isPaid, admin.name])
        return fakeKey

    } catch (error) {
        console.log("Server Error in test")
    }
}

export const wipeApiKeys = async () => {

    try {
        const query = await pool.query(`DELETE FROM apilogs`)
        console.log("apilogs Wiped")

    } catch (error) {
        console.log("Server Error in test")
    }
}

export const wipeProjects = async () => {

    try {
        const query = await pool.query(`DELETE FROM projects`)
        console.log("Projects Wiped")

    } catch (error) {
        console.log("Server Error in test")
    }
}

// export const seedData = async () => {
//     try {
//         const query = await pool.query(`
//             INSERT INTO projects
//             VALUES            
//             `)
//     } catch (error) {

//     }
// }
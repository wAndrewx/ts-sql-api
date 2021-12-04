import supertest from 'supertest'
import app from '../app'
import { generator, readApiKey } from '../utils/apiKey'
import pool from '../db'
import { makeAdmin, wipeApiKeys } from "./utils/apiKeyTest";
import { request } from "./utils/superHook";



beforeAll(async () => {
    let connect = await pool.connect()
    await makeAdmin()

})

describe('GET /', () => {

    test('should connect ', async () => {
        return request.get('/').expect('Connected')
    })


})

describe('GET /key/generate', () => {

    test('should respond with generated key ', async () => {

        let res = await request.get('/key/generate').send({
            "auth": 2,
            "isPaid": false,
        })

        expect(res.body).toHaveProperty('key')
        expect(res.statusCode).toBe(200)
    })


})

describe('GET /api/projects', () => {

    test('should respond with multiple rows of projects', async () => {

        let res = await request.get('/api/projects')
        expect(res.body.length).toBeGreaterThan(0)
    })


})

describe.only('POST /api/projects', () => {
    const testEntry = {
        "projectName": "Test Entry",
        "projectLink": "testlink.com",
        "projectGithub": "github.com",
        "projectAuthor": "Test Author"
    }

    test('should insert into postgreSQL ', async () => {


        const res = await request.post('/api/projects').send(testEntry).set('Accept', 'application/json')
        expect(res.text).toEqual('Inserted into table')
        const query = await pool.query(`
            SELECT * FROM projects
            WHERE project_name = $1 AND project_author = $2 AND project_link = $3 AND project_github = $4
           `, [testEntry.projectName, testEntry.projectAuthor, testEntry.projectLink, testEntry.projectGithub])
        expect(query.rows[0]).toHaveProperty("project_name")
        expect(query.rows[0]).toHaveProperty("project_link")
        expect(query.rows[0]).toHaveProperty("project_github")
        expect(query.rows[0]).toHaveProperty("project_author")
        expect(query.rows[0]).toHaveProperty("project_submitter")
        expect(query.rows[0]).toHaveProperty("project_date_entry")

    })


})

// describe('PATCH /api/projects', () => {
//     const options = {
//         projectName: "Portfolio",
//         author: " Andrew Huynh",
//         column: "project_name",
//         newValue: "New Portfolio"
//     }
//     test(' ', async () => {
//         let query = await pool.query(`
//         INSERT INTO projects ("project_name", "project_link", "project_github", "project_author")
//         VALUES ($1,$2,$3,$4,$5)
//     `, ["Fake name", "test.com", options.projectGithub, options.projectAuthor])

//         const res = await request.patch('/api/projects').query()

//     })


// })

// describe('DELETE /api/projects', () => {

//     test(' ', () => {

//     })


// })

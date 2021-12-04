import { query, Router } from 'express'
import pool from '../db/index'
let router = Router();

router.get('/projects', async (req, res) => { // anyone can get these
    console.log(res.locals.apiKeyInfo)
    try {
        let query = await pool.query(
            `
            SELECT * FROM projects
            ORDER BY project_id ASC
        `
        )
        return res.send(query.rows)
    } catch (error) {
        return res.status(500).send('Server error')
    }
})

router.get('/projects/:author', async (req, res) => { // anyone can get these
    try {
        let author = req.params.author
        let query = await pool.query(
            `
            SELECT * FROM projects
            WHERE project_author = $1
        `, [author])
        return res.send(query.rows)
    } catch (error) {
        return res.status(500).send('Server error')

    }
})

router.post('/projects', async (req, res) => {//only auth level of 2 or greater can post
    let authLevel = res.locals.apiKeyInfo.auth_level
    if (authLevel < 2) {
        return res.status(401).send("Buy Premium")
    }

    let authKey = res.locals.apiKeyInfo.api_key
    const { projectName, projectLink, projectGithub, projectAuthor } = req.body

    try {
        let query = await pool.query(`
                INSERT INTO projects ("project_name", "project_link", "project_github", "project_author", "project_submitter")
                VALUES ($1,$2,$3,$4,$5)
            `, [projectName, projectLink, projectGithub, projectAuthor, authKey])
        res.send('Inserted into table')
    } catch (error) {
        console.log(error)
        res.status(500).send('Server error')
    }

})

router.patch('/projects/', async (req, res) => { // only auth level of 3 or greater can update
    const authLevel = res.locals.apiKeyInfo.auth_level

    if (authLevel < 3) {
        return res.status(401).send("Buy Premium")
    }

    const conditionProjectName = req.query.projectName
    const conditionAuthor = req.query.author
    const projectColumn = req.query.column
    const newValue = req.query.newValue
    try {//needs fixing
        let queryText = `
        UPDATE projects 
        SET ${projectColumn} = $1
        WHERE "project_name" = $2 AND "project_author" = $3
        `
        const query = await pool.query(queryText, [newValue, conditionProjectName, conditionAuthor])
        return res.send("Updated Column")
    } catch (error) {
        console.log(error)
        return res.status(400).send("Check your Query")
    }


})

router.delete('/projects', async (req, res) => { // only auth level of 4 or greater can delete
    const authLevel = res.locals.apiKeyInfo.auth_level

    if (authLevel < 4) {
        return res.status(401).send("Buy Premium")
    }
    
    const conditionProjectName = req.query.projectName
    const conditionAuthor = req.query.author
    if (!conditionAuthor || !conditionProjectName) {
        return res.send('Provide the queries')
    }
    try {
        const query = await pool.query(`
        DELETE FROM projects 
        WHERE project_name = $1 AND
        project_author = $2
        RETURNING project_author, project_name
       `, [conditionProjectName, conditionAuthor])

        if (query.rowCount > 0) {
            return res.status(200).send('Deleted')
        } else {
            return res.send(400).send('Delete failed check parameters')
        }

    } catch (error) {
        res.status(400).send(error)
    }
})

export default router
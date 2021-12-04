import { Pool } from 'pg'

// const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PW}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
const connectionString = 'postgresql://andrew:andrew@localhost:5432/ts-project'
// console.log(connectionString)

const server = new Pool({
    connectionString: connectionString
})

export default server
//db name is ts-project
//tables : projects, apilogs
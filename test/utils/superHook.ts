import supertest from "supertest";
import app from "../../app";

const req = supertest(app)

const authHandler = (method = 'post') => (endpoint): supertest.Test =>
    req[method](endpoint)
        .set({ 'x-api-key': "53d4c6b5-1d3c-4ec6-9228-5ec64fd5b5f2" });

const request = {
    post: authHandler('post'),
    get: authHandler('get'),
    put: authHandler('put'),
    patch: authHandler('patch'),
    delete: authHandler('delete'),
};

export { request }
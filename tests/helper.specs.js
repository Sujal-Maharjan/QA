const axios = require('axios');
import { expect } from '@playwright/test';
import { get } from 'http';

let apiurl

async function authenticateUser(username, password, {request}) {
     const apiurl = await getApiBaseUrl();
     const headers = {
        'Content-Type': 'application/json',
     };
     const requestBody = {
        email: username,
        password: password,
     };
     const response = await request.post(`${apiurl}/user/login`, {
        headers,
        data: requestBody,
     });
     expect(response.status()).toBe(200);
     const responseBody = await response.json();
     const token = responseBody.token;
     return token;
}

async function getApiBaseUrl() {
    apiurl - process.env.API_BASE_URL || 'http://localhost:3000/api';
    if (!apiurl) {
       apiurl="http://thinking-tester-contact-list.herokuapp.com/api";
    }
    return apiurl;
}

async function createEntity(userData, accessToken, module, {request}) {
    const apiurl = await getApiBaseUrl();
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'authorization': "Bearer " + accessToken,
    };
    const response = await request.post(apiurl + module, {
        headers,
        data: userData,
    });

}

async function deleteEntity( accessToken, module, {request}) {
    const apiurl = await getApiBaseUrl();
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'authorization': "Bearer " + accessToken,
    };
    const response = await request.delete(apiurl + module, {
        headers,
    });
    const statusCode = response.status();
    expect(statusCode).toBe(200);
}

async function validateEntity( accessToken, module,status, {request}) {
    const apiurl = await getApiBaseUrl();
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'authorization': "Bearer " + accessToken,
    };
    const response = await request.get(apiurl + module, {
        headers,
    });
    const statusCode = response.status();
    expect(statusCode).toBe(parseInt((status)));
}

async function getEntity( accessToken, module,status, {request}) {
    const apiurl = await getApiBaseUrl();
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'authorization': "Bearer " + accessToken,
    };
    const response = await request.get(apiurl + module, {
        headers,
    });
    const statusCode = response.status();
    expect(statusCode).toBe(parseInt((status)));
    const responseBody = await response.json();
    if(responseBody && responseBody[0]._id){
        return responseBody[0]._id;
    }else{
        return null;
    }
}

module.exports = {authenticateUser, createEntity, deleteEntity, getApiBaseUrl};

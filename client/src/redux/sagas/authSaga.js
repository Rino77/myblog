import axios from 'axios';
import { call, put, takeEvery,all,fork } from "redux-saga/effects";
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "../types";


// login

const loginUserAPI=(loginData)=>{
    console.log(loginData, "logindata")
    const config = {
        headers: {
            "Content-Type" : "application/json"
        }
    }
    return axios.post("api/auth", loginData,config)
}

function* loginUser(action)
{
    try {
        const result = yield call(loginUserAPI, action.payload)
        console.log(result)
        yield put({
            type: LOGIN_SUCCESS,
            payload: result.data
        })
    } catch (e) {
        yield put({
            type: LOGIN_FAILURE,
            payload: e.response
        })
    }
}

function* watchLoginUser(){
    yield takeEvery(LOGIN_REQUEST,loginUser)
}

export default function* autuSaga()
{
    yield all([
        fork(watchLoginUser)
    ])
}
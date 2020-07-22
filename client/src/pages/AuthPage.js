import React, { useState, useEffect, useContext } from 'react'
import { useHTTP } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/auth.context'

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const { loading, request, error, clearError } = useHTTP()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...form })
        } catch (e) { }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...form })
            console.log('data: ', data)
            auth.login(data.token, data.userID)
        } catch (e) { }
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Cut your link!</h1>
                <div className="row">
                    <div className="card blue darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">Authentication</span>
                            <div className="input-field">
                                <input
                                    placeholder="Email"
                                    id="email"
                                    type="email"
                                    name="email"
                                    className="yellow-input"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Enter your email</label>
                            </div>
                            <div className="input-field">
                                <input
                                    placeholder="password"
                                    id="password"
                                    type="password"
                                    className="yellow-input"
                                    name="password"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="password">Enter your password</label>
                            </div>
                        </div>
                        <div className="card-action auth-page__buttons">
                            <button
                                className="btn yellow darken-4"
                                disabled={loading}
                                onClick={loginHandler}
                            >
                                Войти
                            </button>
                            <button
                                className="btn grey lighten-1 black-text"
                                disabled={loading}
                                onClick={registerHandler}
                            >
                                Регистрация
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
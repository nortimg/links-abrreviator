import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useHTTP } from '../hooks/http.hook'
import { AuthContext } from '../context/auth.context'

export const CreatePage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const { request } = useHTTP()
    const [link, setLink] = useState('')

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const pressHandler = async event => {
        if (event.key === 'Enter') {
            try {
                const data = await request('/api/link/generate', 'POST', { from: link }, {
                    Authorization: `Bearer ${auth.token}`
                })
                history.push(`/detail/${data.link._id}`)
            } catch (e) {

            }
        }
    }

    return (
        <div className="row">
            <div className="col s8 offset-s2 create-page">
                <input
                    placeholder="Paste your link"
                    id="link"
                    type="text"
                    value={link}
                    onChange={e => setLink(e.target.value)}
                    onKeyPress={pressHandler}
                />
                <label htmlFor="link">Enter your link</label>
            </div>
        </div>
    )
}
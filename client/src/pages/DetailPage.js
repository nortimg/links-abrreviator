import React, { useState, useCallback, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useHTTP } from '../hooks/http.hook'
import { AuthContext } from '../context/auth.context'
import { Loader } from '../components/Loader'
import { LinkCard } from '../components/LinkCard'

export const DetailPage = () => {
    const { token } = useContext(AuthContext)
    const { request, loading } = useHTTP()
    const [link, setLink] = useState(null)
    const linkID = useParams().id

    const getLink = useCallback(async () => {
        try {
            const fetched = await request(`/api/link/${linkID}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLink(fetched)
        } catch (e) {

        }
    }, [token, linkID, request])

    useEffect(() => {
        getLink()
    }, [getLink])

    if (loading) {
        return <Loader />
    }
    return (
        <>
            {!loading && link && <LinkCard link={link} />}
        </>
    )
}
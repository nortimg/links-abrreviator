import React from 'react'
import { Link } from 'react-router-dom'

export const LinksList = ({ links }) => {
    if (!links.length) {
        return <p className="center">There is no links yet :(</p>
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Link №</th>
                    <th>Original</th>
                    <th>Abbreviated</th>
                    <th>Open</th>
                </tr>
            </thead>

            <tbody>
                {links.map(
                    (link, index) =>
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{link.from}</td>
                            <td>{link.to}</td>
                            <td>
                                <Link to={`/detail/${link._id}`}>
                                    Open
                                </Link> 
                            </td>
                        </tr>
                )}
            </tbody>
        </table>
    )
}
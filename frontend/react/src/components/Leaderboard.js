import React, { Fragment, useEffect, useState } from "react";

const Arrow = ({pressed}) => {
    if (pressed) {
        return(
            <svg className="bi bi-arrow-down text-dark" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M4.646 9.646a.5.5 0 0 1 .708 0L8 12.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z"/>
            <path fillRule="evenodd" d="M8 2.5a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-1 0V3a.5.5 0 0 1 .5-.5z"/>
            </svg>
        )
    }
    return(
        <svg className="bi bi-arrow-down-up text-muted" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M11 3.5a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
        <path fillRule="evenodd" d="M10.646 2.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L11 3.707 8.354 6.354a.5.5 0 1 1-.708-.708l3-3zm-9 7a.5.5 0 0 1 .708 0L5 12.293l2.646-2.647a.5.5 0 1 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z"/>
        <path fillRule="evenodd" d="M5 2.5a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-1 0V3a.5.5 0 0 1 .5-.5z"/>
        </svg>
    )
}

const Leaderboard = () => {
    const [sortByPage, setSortByPage] = useState(true);
    const [leaderboard, setLeaderboard] = useState([]);
    const getLeaderboard = async () => {
        try {
            const response = await fetch(`https://reading-challenge-backend.herokuapp.com/leaderboard/`);
            const jsonData = await response.json();
            setLeaderboard(jsonData.sort((a, b) => b.page - a.page));
        } catch (err) {
            console.error(err.message)
        }
    }
    const sortLeaderboard = () => {
        if (sortByPage) {
            setLeaderboard(leaderboard.sort((a, b) => b.book - a.book));
        } else {
            setLeaderboard(leaderboard.sort((a, b) => b.page - a.page));
        }
    }
    useEffect(() => {
        getLeaderboard();
    }, []);

    return (
        <Fragment>
            <h1 className="text-center mt-5">Leaderboard</h1>
            <table className="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th onClick={e => {sortLeaderboard(); setSortByPage(false)}}>Book <Arrow pressed={!sortByPage}/></th>
                        <th onClick={e => {sortLeaderboard(); setSortByPage(true)}}>Page <Arrow pressed={sortByPage}/></th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.map(l => (
                        <tr key={l.user__name}>
                            <td>{l.user__name}</td>
                            <td>{l.book}</td>
                            <td>{l.page}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
};

export default Leaderboard;

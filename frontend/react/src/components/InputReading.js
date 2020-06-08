import React, { Fragment, useState } from "react";


const InputReading = (props) => {

    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [page, setPage] = useState('')
    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { name, author, page };
            fetch(`https://reading-challenge-backend.herokuapp.com/users/${props.user}/readings/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            .then(response => response.json())
            .then(() => {window.location.reload()});
        } catch (err) {
            console.error(err.message)
        }
    };

    return (
        <Fragment>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <input placeholder="Name" id="name" type="text" className="form-control mr-5" value={name} onChange={e => setName(e.target.value)}/>
                <input placeholder="Author" id="author" type="text" className="form-control mr-5" value={author} onChange={e => setAuthor(e.target.value)}/>
                <input placeholder="Page" id="page" type="text" className="form-control mr-5" value={page} onChange={e => setPage(e.target.value)}/>
                <button className="btn btn-success">Add</button>
            </form>

        </Fragment>
    );
}

export default InputReading;

import React, { Fragment, useState } from "react";


const EditReading = ({reading}) => {
    const [name, setName] = useState(reading.name);
    const [author, setAuthor] = useState(reading.author);
    const [page, setPage] = useState(reading.page);

    const updateReading = async (e) => {
        e.preventDefault();
        try {
            const body = { name, author, page };
            fetch(`https://reading-challenge-backend.herokuapp.com/users/${reading.user}/readings/${reading.id}/`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            .then(response => response.json())
            .then(() => {window.location.reload()});
        } catch (err) {
            console.error(err.message);
        }
    };
    return (
        <Fragment>
            <button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#modal-${reading.id}`}>
            Edit
            </button>

            <div className="modal" id={`modal-${reading.id}`} onClick={e => {setName(reading.name); setAuthor(reading.author); setPage(reading.page)}}>
            <div className="modal-dialog">
                <div className="modal-content">

                <div className="modal-header">
                    <h4 className="modal-title">Edit Reading</h4>
                    <button type="button" className="close" data-dismiss="modal" onClick={e => {setName(reading.name); setAuthor(reading.author); setPage(reading.page)}}>&times;</button>
                </div>

                <div className="modal-body">
                    <form>
                        <div className="form-group row">
                            <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                            <div className="col-sm-10">
                                <input placeholder="Name" id="name" type="text" className="form-control mr-5 mb-1" value={name} onChange={e => setName(e.target.value)}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="author" className="col-sm-2 col-form-label">Author</label>
                                <div className="col-sm-10">
                            <input placeholder="Author" id="author" type="text" className="form-control mr-5 mb-1" value={author} onChange={e => setAuthor(e.target.value)}/>
                            </div>                            
                        </div>
                        <div className="form-group row">
                            <label htmlFor="page" className="col-sm-2 col-form-label">Page</label>
                            <div className="col-sm-10">
                                <input placeholder="Page" id="page" type="text" className="form-control mr-5 mb-1" value={page} onChange={e => setPage(e.target.value)}/>
                            </div>                            
                        </div>
                    </form>
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-warning" data-dismiss="modal" onClick={e => updateReading(e)}>Edit</button>
                    <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={e => {setName(reading.name); setAuthor(reading.author); setPage(reading.page)}}>Close</button>
                </div>

                </div>
            </div>
            </div>            
        </Fragment>
    );
};

export default EditReading;

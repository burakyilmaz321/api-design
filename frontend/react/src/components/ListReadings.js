import React, { Fragment, useCallback, useEffect, useState } from "react";
import EditReading from "./EditReading.js";


const ListReadings = (props) => {
    const [readings, setReadings] = useState([]);
    const getReadings = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:8000/users/${props.user.id}/readings/`);
            const jsonData = await response.json();
            setReadings(jsonData);
        } catch (err) {
            console.error(err.message)
        }
    }, [props.user])
    const deleteReading = async (id) => {
        try {
            fetch(`http://localhost:8000/users/${props.user.id}/readings/${id}`, {method: "DELETE"});
            setReadings(readings.filter(reading => reading.id !== id))
        } catch (err) {
            console.error(err.message);
        }
    };
    useEffect(() => {
        if (props.user) {
            getReadings();
        }
    }, [getReadings, props.user]);

    return (
        <Fragment>
            <table className="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Author</th>
                        <th>Page</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {readings.map(reading => (
                        <tr key={reading.id}>
                            <td>{reading.name}</td>
                            <td>{reading.author}</td>
                            <td>{reading.page}</td>
                            <td><EditReading reading={reading} /></td>
                            <td><button className="btn btn-danger" onClick={() => deleteReading(reading.id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
};

export default ListReadings;

import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import axios from 'axios'
function Read(){
    const [data,setData] = useState([])
    const {id} = useParams();
    useEffect(()=>{
        axios
        .get(`https://people-crud-app-ekv6.onrender.com/get_person/${id}`)
        .then((res)=>{
            setData(res.data)
        })
        .catch((err)=>console.log(err))
    }, [id]);
    return (
        <div className='container-fluid bg-primary vh-100 vw-100'>
            <h1>User {id}</h1>
            <Link to="/" className="btn btn-success">Back</Link>
            {data.map((person) => {
                return(
                    <ul className="list-group">
                        <li className="list-group-item">
                            <b>ID: </b>
                            {person["id"]}
                        </li>
                         <li className="list-group-item">
                            <b>Name: </b>
                            {person["name"]}
                        </li>
                         <li className="list-group-item">
                            <b>Email: </b>
                            {person["email"]}
                        </li>
                         <li className="list-group-item">
                            <b>Age: </b>
                            {person["age"]}
                        </li>
                        <li className="list-group-item">
                            <b>Job: </b>
                            {person["job"]}
                        </li>
                    </ul>
                );
            })}

        </div>
                    
            
    )
}

export default Read
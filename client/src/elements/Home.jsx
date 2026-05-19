import React, { useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

function Home(){
    const [data,setData] = useState([])
    const [deleted, setDeleted] = useState(true)
    useEffect(()=>{
        if(deleted){
            setDeleted(false)
        
        axios.get(`https://people-crud-app-ekv6.onrender.com/people`)
        .then((res)=>{
            setData(res.data)
        })
        .catch((err)=>console.log(err))
    }   
    }, [deleted])

    function handleDelete(id){
        axios.delete(`https://people-crud-app-ekv6.onrender.com/delete/${id}`)
        .then((res)=>{
            setDeleted(true)
        })
        .catch((err) => console.log(err))
    }

    return (
        <div className='container-fluid vh-100 vw-100' style={{backgroundColor: '#899dff'}}>
            <h3>Employee Log</h3>
            <div className='d-flex justify-content-end'>
                <Link className='btn btn-success' to='/create'>Add Person</Link>
            </div>
            <table className='table table-bordered table-striped'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Department</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((person)=>{
                            return (<tr>
                                <td>{person.id}</td>
                                <td>{person.name}</td>
                                <td>{person.email}</td>
                                <td>{person.age}</td>
                                <td>{person.job}</td>
                                <td>
                                    <Link className='btn btn-success' to={`/read/${person.id}`}>Read</Link>
                                    <Link className='btn btn-warning' to={`/edit/${person.id}`}>Edit</Link>
                                    <button onClick={()=>handleDelete(person.id)}className='btn btn-danger' to=''>Delete</button>
                                </td>
                            </tr>)
                        })
                    }
                </tbody>
            </table>
        </div>
    )

}

export default Home
import React, {useState, useEffect} from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'

function Edit(){
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

    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault()

        axios.post(`https://people-crud-app-ekv6.onrender.com/edit_user/${id}`, data[0])
        .then((res)=>{
            
            navigate('/')
            console.log(res)
        })
        .catch((err)=>console.log(err))
    }

    return (
        <div className='container-fluid bg-primary vh-100 vw-100'>
            <h1>User {id}</h1>
            <Link to="/" className="btn btn-success">Back</Link>
            {data.map((person) => {
                return(
                    <form onSubmit={handleSubmit}>
                    <div className='form-group col-md-6 my-3'>
                        <label htmlFor = 'name'>Name</label>
                        <input value = {person.name} type='text' name='name' className='form-control' required onChange={(e)=> setData([{...data[0], name: e.target.value}])} />
                    </div>
                    <div className='form-group col-md-6 my-3'>
                        <label htmlFor = 'email'>Email</label>
                        <input value = {person.email} type='email' name='email' className='form-control' required onChange={(e)=> setData([{...data[0], email: e.target.value}])} />
                    </div>
                    <div className='form-group col-md-6 my-3'>
                        <label htmlFor = 'job'>Job</label>
                        <input value = {person.job} type='text' name='job' className='form-control' required onChange={(e)=> setData([{...data[0], job: e.target.value}])} />
                    </div>
                    <div className='form-group col-md-6 my-3'>
                        <label htmlFor = 'age'>Age</label>
                        <input value = {person.age} type='number' name='age' className='form-control' required onChange={(e)=> setData([{...data[0], age: e.target.value}])} />
                    </div>
                    <button type='submit' className='btn btn-success'>Submit</button>
                </form>
                );
            })}

        </div>
                    
            
    )
}

export default Edit
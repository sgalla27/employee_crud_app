import React, { useState } from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'

function Create(){
    const [values,setValues] = useState({
        name:'',
        email:'',
        age:'',
        job:'',
    })

    const navigate = useNavigate()
    
    function handleSubmit(e){
        e.preventDefault()

        axios.post('https://people-crud-app-ekv6.onrender.com/add_user', values)
        .then((res)=>{
            
            navigate('/')
            console.log(res)
        })
        .catch((err)=>console.log(err))
    }

    return(
        <div className='container vh-100 vw-100 bg-primary'>
            <div className='row'>
                <h3>Add Person</h3>
                <div className='d-flex justify-content-end' >
                    <Link to='/' className='btn btn-success'>Home</Link>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='form-group col-md-6 my-3'>
                        <label htmlFor = 'name'>Name</label>
                        <input type='text' name='name' className='form-control' onChange={(e)=> setValues({...values, name: e.target.value})} />
                    </div>
                    <div className='form-group col-md-6 my-3'>
                        <label htmlFor = 'email'>Email</label>
                        <input type='email' name='email' className='form-control' onChange={(e)=> setValues({...values, email: e.target.value})} />
                    </div>
                    <div className='form-group col-md-6 my-3'>
                        <label htmlFor = 'job'>Job</label>
                        <input type='text' name='job' className='form-control' onChange={(e)=> setValues({...values, job: e.target.value})} />
                    </div>
                    <div className='form-group col-md-6 my-3'>
                        <label htmlFor = 'age'>Age</label>
                        <input type='text' name='age' className='form-control' onChange={(e)=> setValues({...values, age: e.target.value})} />
                    </div>
                    <button type='submit' className='btn btn-success'>Submit</button>
                </form>
            </div>

        </div>
    )
}

export default Create
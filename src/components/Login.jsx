import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import axios from 'axios'
import toast from 'react-hot-toast'





function Login() {
 
    

    const {
        register,
        handleSubmit,

        formState: { errors },
    } = useForm()
    const [spinner, setSpinner] = useState(false);    


    const onSubmit =async (data) => {
        setSpinner(true);
        const  userInfo ={
            email:data.email,
            password:data.password
        }
        // console.log(userInfo);
        //await axios.post('https://bookstore-backend-v5wi.onrender.com/user/login',userInfo)
        await axios.post('http://localhost:4001/user/login',userInfo)
        .then(res=>{
            // console.log(res.data); 
            setSpinner(false)
            if(res.data){
                
                toast.success('LoggedIn successfully');
                window.localStorage.setItem("users",JSON.stringify(res.data.user))
                document.getElementById('modal_closer').click();
                setTimeout(() => {
                    window.location.reload()
                }, 2000);
            }
        }).catch((err)=>{
            // alert("Error: "+err.response.data.message);
            toast.error("Error: "+err.response.data.message);
            setSpinner(false)

            
        })
    }
    return (
        <>
            <div>
                <dialog id="my_modal_3" className="modal">
                    <div className=" modal-box  dark:bg-slate-900 dark:text-white">
                        <form method="dialog" >
                            {/* if there is a button in form, it will close the modal */}
                            <Link to={'/'} id='modal_closer' onClick={()=>document.getElementById('my_modal_3').close()} className=" btn btn-sm btn-circle btn-ghost absolute right-2 top-2" >✕ </Link>
                            {/* <button   >✕</button> */}
                        </form>
                        <h3 className="font-bold text-lg">Login!</h3>
                        <div>
                            <form className='p-4   ' onSubmit={handleSubmit(onSubmit)}>
                                <label htmlFor="email">Email</label>
                                <br />
                                <input {...register("email", { required: true })} type="email" id='email' placeholder='Enter your email' className='bg-transparent p-2 md:w-4/5 w-full  outline-none border rounded my-4' />
                                {errors.email && <span className='block text-red-500 mt-[-10px] mb-5'>This field is required</span>}
                                <label htmlFor="password" className='block'  >Password</label>
                                <input {...register("password", { required: true })} type="password" id='password' placeholder='Enter your password ' className='w-full md:w-4/5  bg-transparent p-2 outline-none border rounded my-4' />
                                {errors.password && <span className='block text-red-500  mt-[-10px] mb-5'>This field is required</span>}
                                <div className='flex justify-between '>
                                    {
                                        spinner?
                                        <span className="loading loading-spinner loading-lg"></span>
                                        :


                                    <button className='btn btn-sm btn-secondary rounded  block'>Login</button>
                                    }
                                    <h3 className='mt-3'>Not registered? <Link className='text-blue-500 underline cursor-pointer' to='/signup' >Signup</Link></h3>
                                </div>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
        </>
    )
}

export default Login
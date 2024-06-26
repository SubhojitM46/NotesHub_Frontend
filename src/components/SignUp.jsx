import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useForm } from "react-hook-form"
import toast from 'react-hot-toast'



function SignUp() {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()
    const [spinner, setSpinner] = useState(false);    
     
      const onSubmit = async (data) =>{
        const userInfo={
            fname:data.fname,
            lname:data.lname,
            email:data.email,
            password:data.password
        }
        setSpinner(true)
        //await axios.post('https://bookstore-backend-v5wi.onrender.com/user/signup',userInfo)
         await axios.post('http://localhost:4001/user/signup',userInfo)
        .then(res => {
            // console.log(res.data);
            setSpinner(false)
            if(res.data){
                // alert("Signup Successfully!")
                toast.success('SignedUp successfully');
                window.localStorage.setItem("users",JSON.stringify(res.data.user))
                setTimeout(() => {
                    document.getElementById('close').click();
                    window.location.reload()
                }, 200);
            }
        }).catch((err)=>{
            console.log(err);
            setSpinner(false)
            // alert("Error: "+err.response.data.message)
            toast.error("Error: "+err.response.data.message);
        })
        // console.log(userInfo);
        

    }

        

      

    return (
        <div className='flex h-screen  justify-center items-center '><div id="" className="">
            <div className="  dark:bg-slate-900 dark:text-white border-[2px] shadow-2xl shadow-pink-200 py-8 px-8  rounded-2xl w-96    md:w-[600px]">

                <div className='flex justify-between'>
                    <h3 className="font-bold text-lg">SignUp!</h3>
                    <Link to={'/'} id='close'> <img className='w-10 hover:border-[1px]  hover:p-2 rounded-full border-slate-900 transition-all duration-100  ' src="https://cdn2.iconfinder.com/data/icons/symbols-8/50/274C-cross-mark-1024.png" alt="" /> </Link>
                </div>
                <div>
                    <form className='p-4'  onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex md:flex-row flex-col mb-[-10px] '>
                            <div className='px-1'>
                                <label htmlFor='fname'>First Name:</label>
                                <input {...register("fname", { required: true })} type="text" placeholder='Enter your first name' className="focus:border-green-500 w-full bg-transparent p-2 outline-none border rounded my-4" id='fname' />
                                {errors.fname && <span className='block text-red-500 mt-[-10px] mb-5'>This field is required</span>}
                            </div>
                            <div className='px-1'>
                                <label htmlFor='lname'>Last Name:</label>
                                <input {...register("lname", { required: true })} type="text" placeholder='Enater your last name' className="focus:border-green-500 w-full bg-transparent p-2 outline-none border rounded my-4" id='lname' />
                                {errors.lname && <span className='block text-red-500 mt-[-10px] mb-5'>This field is required</span>}
                            </div>
                        </div>
                        <br />
                        <label htmlFor="semail">Email</label>
                        <br />
                        <input {...register("email", { required: true })} type="text" id='semail' placeholder='Enter your email' className='focus:border-green-500 w-full bg-transparent p-2 outline-none border rounded my-4' />
                        {errors.email && <span className='block text-red-500 mt-[-10px] mb-5'>This field is required</span>}
                        <label htmlFor="spassword" className='block'  >Password</label>
                        <input {...register("password", { required: true })} type="password" id='spassword' placeholder='Enter your password ' className='focus:border-green-500 w-full bg-transparent p-2 outline-none border rounded my-4' />
                        {errors.password && <span className='block text-red-500 mt-[-10px] mb-5'>This field is required</span>}
                        <div className='flex justify-between '>
                            {
                                spinner?
                                <span className="loading loading-spinner loading-lg"></span>

                                :
                                <button className='btn btn-sm btn-secondary rounded  block' >SignUp</button>


                            }
               
                            <h3 className='mt-1'>already registerd? <Link className='text-blue-500 underline cursor-pointer' to='/login' >Login</Link >
                            
                            </h3>
                            
                        </div>
                    </form>
                </div>
            </div>
        </div></div>
    )
}

export default SignUp
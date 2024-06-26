import React, { useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/navbar'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'
function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [spinner,setSpinner]=useState(false);
  const onSubmit =async (data) =>{
    
    console.log(data)
    // addConatact api intregation
    setSpinner(true)
    try{
      //const saveContact = await axios.post('https://bookstore-backend-v5wi.onrender.com/contact/contactDetails',data)
      const saveContact = await axios.post('http://localhost:4001/contact/contactDetails',data)
      .then(res=>{
        console.log(res);
        setSpinner(false)
        document.getElementById('contactCloser').click();
        toast.success('You request has been submitted')
      })
    }catch(err){
      console.log(err);
      setSpinner(false)
      toast.error('Network Error')
    }
  } 

    

  return (
    <>
    <div>
      <Navbar/>
      <div className='min-h-screen flex h-screen-2xl pt-28 mb-5   justify-center items-center '><div id="" className="">
            <div className="   dark:bg-slate-900 dark:text-white border-[2px] shadow-2xl shadow-pink-200 py-8 px-8  rounded-2xl w-96    md:w-[600px]">

                <div className='flex justify-between'>
                    <h3 className="font-bold text-lg">Contact Us</h3>
                    <Link to={'/'} id='contactCloser'>  <img className='w-10 hover:border-[1px]  hover:p-2 rounded-full border-slate-900 transition-all duration-100  ' src="https://cdn2.iconfinder.com/data/icons/symbols-8/50/274C-cross-mark-1024.png" alt="" /> </Link>
                </div>
                <div>
                    <form className='p-4 '  onSubmit={handleSubmit(onSubmit)} >
                        <div className='flex md:flex-row flex-col mb-[-10px] '>
                           
                        </div>
                        <br />
                        <label htmlFor="name" className='block'  >Name</label>
                        <input {...register("name", { required: true })} type="text" id='name' placeholder='Enter your Name ' className='focus:border-green-500 w-full bg-transparent p-2 outline-none border rounded my-4' />
                        {errors.name && <span className='block text-red-500 mt-[-10px] mb-5'>This field is required</span>}
                        <label htmlFor="semail" className='block'>Email</label>
                        <input {...register("email", { required: true })} type="text" id='semail' placeholder='Enter your email' className='focus:border-green-500 w-full bg-transparent p-2 outline-none border rounded my-4' />
                        {errors.email && <span className='block text-red-500 mt-[-10px] mb-5'>This field is required</span>}
                        <label htmlFor="msg" className='block'  >Message</label>
                        <textarea  rows={5} {...register("message", { required: true })} type="text" id='msg' placeholder='Enter your Message Here ' className='focus:border-green-500 w-full bg-transparent p-2 outline-none border rounded my-4' />
                        {errors.message && <span className='block text-red-500 mt-[-10px] mb-5'>This field is required</span>}
                        <div className='flex justify-between '>
                          {
                            spinner?
                            <span className="loading loading-spinner loading-lg"></span>
                            :

                            <button className='btn btn-sm btn-secondary rounded  block'>Submit</button>
                          }
               
                            
                            
                        </div>
                    </form>
                </div>
            </div>
        </div></div>
      <Footer/>
    </div>
    </>
  )
}

export default Contact
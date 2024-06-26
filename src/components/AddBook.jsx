import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider';
import toast from 'react-hot-toast';
import axios from 'axios';

function AddBook() {

    const [spinner, setSpinner] = useState(false);
    const [authUser,setAuthUser]=useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
        } = useForm()
    const onSubmit = async (data) =>{
        const bookInfo={
            name:data.bname,
            price:data.bPrice,
            title:data.title,
            category:data.category,
            image:data.imgLink,
            url:data.urlLink
        }
        console.log(bookInfo);
        setSpinner(true)
        try{
             const bookRes= await axios.post('http://localhost:4001/book/addBook',bookInfo)
            //const bookRes= await axios.post('https://bookstore-backend-v5wi.onrender.com/book/addBook',bookInfo)
        .then(res=>{
            
                setSpinner(false);
           
            toast.success('Book added successfully');
            document.getElementById('my_modal_5').close();
            
        })
        .catch((err)=>{
            console.log(err);
            setSpinner(false);
            toast.error("Error: "+err.response.data.message);
            document.getElementById('my_modal_5').close();
        })
        } 
        catch(err){
            console.log("internal server error");
            toast.error("Error: connection error");
            setSpinner(false);
            document.getElementById('my_modal_5').close();
        }
    }

    useEffect(()=>{
        if (!(authUser.email=='admin@gmail.com')) {
            <Navigate to={'/'}/>
        }
    },[])
  return (
    <>
    <dialog id="my_modal_5" className="modal modal-center sm:modal-middle">
        <div className="modal-box  dark:bg-slate-900 dark:text-white">
        <div className='flex justify-between'>
                    <h3 className="font-bold text-lg">Add Book</h3>
                    <Link  onClick={()=>document.getElementById('my_modal_5').close()}> <img className='w-10 hover:border-[1px]  hover:p-2 rounded-full border-slate-900 transition-all duration-100  ' src="https://cdn2.iconfinder.com/data/icons/symbols-8/50/274C-cross-mark-1024.png" alt="" /> </Link>
                </div>
                <div>
                    <form className='p-4'  onSubmit={handleSubmit(onSubmit)}>  
                        <div className='flex  flex-col mb-[-10px] md:flex-row border-1 '>
                            <div className='px-1 w-full md:w-1/2'>
                                <label htmlFor='bname'> Name:</label>
                                <input {...register("bname", { required: true })} type="text" placeholder='Enter the Book name' className="focus:border-green-500 w-full bg-transparent p-2 outline-none border rounded my-4" id='bname' />
                                {errors.bname && <span className='block text-red-500 mt-[-10px] mb-5'>This field is required</span>}
                            </div>
                            <div className='px-1  w-full md:w-1/2'>
                                <label htmlFor='bPrice'> Price:</label>
                                <input {...register("bPrice", { required: true })} type="text" placeholder='Enter the book price' className="focus:border-green-500 w-full bg-transparent p-2 outline-none border rounded my-4" id='bPrice' />
                                {errors.bPrice && <span className='block text-red-500 mt-[-10px] mb-5'>This field is required</span>}
                            </div>
                        </div>
                        <div className='flex  flex-col mb-[-10px] md:flex-row  '>
                            <div className='px-1  w-full md:w-1/2'>
                                <label htmlFor='bname'> Title:</label>
                                <input {...register("title", { required: true })} type="text" placeholder='Enter the book title' className="focus:border-green-500 w-full bg-transparent p-2 outline-none border rounded my-4" id='title' />
                                {errors.title && <span className='block text-red-500 mt-[-10px] mb-5'>This field is required</span>}
                            </div>
                            <div className='px-1 w-full md:w-1/2'>
                                <label htmlFor='bPrice'> Category:</label>
                                <select   {...register("category", { required: true })} type="text"  className="dark:text-white focus:border-green-500 w-full bg-transparent p-2 outline-none border rounded my-4" id='category' >  
                                    <option className='dark:text-black' disabled >Select</option>
                                    <option  className='dark:text-black' selected value='free'>Free</option>
                                    <option className='dark:text-black' required value='paid'>Paid</option>
                                </select>
                                {errors.category && <span className='block text-red-500 mt-[-10px] mb-5'>This field is required</span>}
                            </div>
                        </div>
                        
                        <div className='px-1'>
                                <label htmlFor='bPrice'> Image Link:</label>
                                <input {...register("imgLink", { required: true })} type="text" placeholder='Paste here your img link' className="focus:border-green-500 w-full bg-transparent p-2 outline-none border rounded my-4" id='imgLink' />
                                {errors.imgLink && <span className='block text-red-500 mt-[-10px] mb-5'>This field is required</span>}
                            </div>
                        <br />

                        <div className='px-1'>
                                <label htmlFor='bPrice'> Url Link:</label>
                                <input {...register("urlLink", { required: true })} type="text" placeholder='Paste here your url link' className="focus:border-green-500 w-full bg-transparent p-2 outline-none border rounded my-4" id='imgLink' />
                                {errors.imgLink && <span className='block text-red-500 mt-[-10px] mb-5'>This field is required</span>}
                            </div>
                        <br />
                        
                        <div className='flex justify-between '>
                            {
                                spinner?
                                <span className="loading loading-spinner loading-lg"></span>

                                :
                                <button className='btn btn-sm btn-secondary rounded  block' >Add Book</button>


                            }
               
                            <h3 className='mt-1'>goto  <Link className='text-blue-500 underline cursor-pointer' to='/Course' >Courses</Link >
                            
                            </h3>
                            
                        </div>
                    </form>
                </div>
        </div>
    </dialog>
    </>
  )
}

export default AddBook
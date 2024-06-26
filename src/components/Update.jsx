import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {toast} from 'react-hot-toast'

function Update({setReloadBook}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const [spinner, setSpinner] = useState(false);
    const urlParams = new URLSearchParams(window.location.search);
    const BookId = urlParams.get('id');

    const onSubmit = async (data) => {
        const BookData = {
            bname: data.bname,
            bprice: data.bprice,
            btitle: data.btitle,
            bcategory: data.bcategory,
            bimage: data.bimage
        }
        console.log(BookData);

        // Update Api interigation---------
        const updateDetails = {
            name: BookData.bname,
            price: BookData.bprice,
            category: BookData.bcategory,
            image: BookData.bimage,
            title: BookData.btitle,
        }
        setSpinner(true)
        try {
            const updateBook = await axios.put(`https://noteshub-backend-9.onrender.com/book/update/${BookId}`,updateDetails)
             //const updateBook = await axios.put(`http://localhost:4001/book/update/${BookId}`,updateDetails)
            console.log(updateBook)
            if(updateBook.data!=null){
                toast.success('Book updated successfully');
            }
            else{
                toast.error('Book id not matched !');
            }
            setSpinner(false)
            setReloadBook(true)
            document.getElementById('my_modal_3').close()

        }
        catch (err) {
            console.log(err);
            toast.error("internal server erro");
            setSpinner(false)
            document.getElementById('my_modal_3').close()
        }  
    }

    return (
        <>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            {/* <button className="btn" onClick={() => document.getElementById('my_modal_3').showModal()}>open modal</button> */}
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box  dark:bg-slate-900 dark:text-white">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <Link onClick={()=>document.getElementById('my_modal_3').close()} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>
                    </form>
                    <h3 className="font-bold text-lg">Update Book</h3>
                    <div>
                        <form className='p-4' onSubmit={handleSubmit(onSubmit)}>
                            <div className='flex md:flex-row flex-col mb-[-10px] '>
                                <div className='px-1 md:w-1/2 w-full '>
                                    <label htmlFor='bname'>Book Name:</label>
                                    <input {...register("bname", { required: true })} type="text" className="focus:border-green-500 w-full bg-transparent p-2 outline-none border rounded my-4" id='bname' />
                                    {errors.bname && <span className='block text-red-500 mt-[-10px] mb-5'>This field is required</span>}
                                </div>
                                <div className='px-1 md:w-1/2 w-full'>
                                    <label htmlFor='bprice'>Book Price:</label>
                                    <input {...register("bprice", { required: true })} type="number" className="focus:border-green-500 w-full bg-transparent p-2 outline-none border rounded my-4" id='bprice' />
                                    {errors.bprice && <span className='block text-red-500 mt-[-10px] mb-5'>This field is required</span>}
                                </div>
                            </div>
                            <div className='flex md:flex-row flex-col mb-[-10px]  mt-3'>
                                <div className='px-1 md:w-1/2 w-full'>
                                    <label htmlFor='btitle'>Book Title:</label>
                                    <input {...register("btitle", { required: true })} type="text" className="focus:border-green-500 w-full bg-transparent p-2 outline-none border rounded my-4" id='btitle' />
                                    {errors.btitle && <span className='block text-red-500 mt-[-10px] mb-5'>This field is required</span>}
                                </div>
                                <div className='px-1 md:w-1/2 w-full'>
                                    <label htmlFor='bcategory'>Book Category:</label>
                                    <select {...register("bcategory", { required: true })} type="text" className="focus:border-green-500 w-full bg-transparent p-2 outline-none border rounded my-4" id='bcategory'>
                                        <option value="select" className=' dark:text-black' disabled>Select</option>
                                        <option value="free" className=' dark:text-black' selected >Free</option>
                                        <option value="paid" className=' dark:text-black' >Paid</option>
                                    </select>
                                    {errors.bcategory && <span className='block text-red-500 mt-[-10px] mb-5'>This field is required</span>}
                                </div>
                            </div>
                            <div className='px-1 md:w-1/2 w-full'>
                                <label htmlFor='bimage'>Book Image:</label>
                                <input {...register("bimage", { required: true })} type="text" className="focus:border-green-500 w-full bg-transparent p-2 outline-none border rounded my-4" id='bimage' />
                                {errors.bimage && <span className='block text-red-500 mt-[-10px] mb-5'>This field is required</span>}
                            </div>
                            {
                                spinner?
                                <span className="loading loading-spinner loading-lg"></span>:
                                <button  className='btn btn-sm btn-secondary rounded  block' >Update</button>
                            }
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default Update
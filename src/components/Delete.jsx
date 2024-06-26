import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import {Link,useSearchParams} from 'react-router-dom';

function Delete({setReloadBook}) {
    const [spinner, setSpinner] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const urlParams = new URLSearchParams(window.location.search);
    const BookId = urlParams.get('id');
    
    // funtion for delete book
    const deleleBook= async ()=>{
        //reset param after calling this func
        const param = searchParams.get('id');
        // console.log("idparm",param);
        if (param) {
        // 👇️ Delete each query param
        searchParams.delete('id');

        // 👇️ Update state after
        setSearchParams(searchParams);
        }
        // Delete Api interigation---------
        setSpinner(true);
        try{
             //const deleteBook= await axios.delete(`http://localhost:4001/book/deleteBook/${BookId}`)
            const deleteBook= await axios.delete(`https://noteshub-backend-9.onrender.com//book/deleteBook/${BookId}`)
            .then(res=>{
                    if (!res.data.deleteBook.deletedCount) {
                    toast.error("This book has been already deleted! Please reload the page");
                    setSpinner(false);
                    document.getElementById('my_modal_5').close();
                    }
                    else{
                        toast.success(res.data.message);
                        console.log(res);
                        setSpinner(false);
                        document.getElementById('my_modal_5').close();
                    }
                    setReloadBook(true)
                    
                
            })
        }catch(err){
            toast.error('Error: internal server Error ',err.response.data.message)
            console.log(err);
            setSpinner(false)
            document.getElementById('my_modal_5').close();

        }

    }
    
  return (
    <>
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box  dark:bg-slate-900 dark:text-white">
            <h3 className="font-semibold text-lg inline">Delete Book! </h3>
            (<h5 id='bookName' className='inline'> </h5>)
            <p className="py-4">Are you sure to delete this Book!</p>
            <div className="flex justify-between  ">
                {
                    spinner?
                    <span className="loading loading-spinner loading-lg"></span>
                    :
                    <button className="btn mr-4 btn-sm rounded py-2 px-3 btn-secondary   " onClick={deleleBook} >Delete</button>
                }
                <Link className="btn mr-4 btn-sm rounded py-2 px-3" onClick={()=>document.getElementById('my_modal_5').close()}>Close</Link>
            </div>
        </div>
        </dialog>
    </>
  )
}

export default Delete
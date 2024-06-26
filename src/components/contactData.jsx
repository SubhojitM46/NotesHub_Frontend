import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function ContactData() {

    
    const [data,setData]= useState([]);
    // get subscriber api intregation
    const getcontactDetails= async()=>{
        try{
             //const subscribers= await axios.get('http://localhost:4001/contact/contactDetails')
            const subscribers= await axios.get('https://noteshub-backend-9.onrender.com//contact/contactDetails')
            .then(res=>{
                console.log(res);
                setData(res.data);
                console.log(data);
            })
        }
        catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        getcontactDetails()

    },[])
  return (
    <>
        <dialog id="my_modal_7" className="modal modal-center sm:modal-middle">
        <div className="modal-box  dark:bg-slate-900 dark:text-white">
        <div className='flex justify-between'>
                    <h3 className="font-bold text-lg">Newsletter Subscribers</h3>
                    <Link  onClick={()=>document.getElementById('my_modal_7').close()}> <img className='w-10 hover:border-[1px]  hover:p-2 rounded-full border-slate-900 transition-all duration-100  ' src="https://cdn2.iconfinder.com/data/icons/symbols-8/50/274C-cross-mark-1024.png" alt="" /> </Link>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    {data.map((item,i)=>(
                        <>
                   <table className='w-full md:1/2 flex flex-col text-wrap overflow-auto m-4 p-4 rounded-lg shadow-inner shadow-pink-500 border-2 '>
                        <tr>
                            <th>No.</th>
                            <td>{i+1}</td>
                        </tr>
                        <tr>
                            <th>Name</th>
                            <td>{item.name}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>{item.email}</td>
                        </tr>
                        <tr>
                            <th>Message</th>
                            <td>{item.message}</td>
                        </tr>
                   </table>
                        </>
                    ))
                    }
                    
                </div>
        </div>
    </dialog>
    </>
  )
}

export default ContactData
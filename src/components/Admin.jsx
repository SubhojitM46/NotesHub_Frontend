import React from 'react'
import AddBook from './AddBook';
import SubscriberDetais from './SubscriberDetais';
import ContactData from './contactData';

function Admin() {

    return (
        <>
        <div className='max-w-screen-2xl  container mx-auto md:px-20 px-4'>
            <div className='pt-28  flex justify-center flex-col items-center '>
            <h1 className='font-bold text-2xl  md:text-4xl text-center mb-24'>Admin<span className='text-pink-500'>Portal</span></h1>
            <button onClick={() => document.getElementById('my_modal_5').showModal()} className=' w-full rounded-2xl my-5 btn btn-secondary text-xl md:w-1/3 shadow-md shadow-pink-300 '>Add Book</button>
            <AddBook />
            <button onClick={() => document.getElementById('my_modal_6').showModal()} className=' w-full rounded-2xl my-5 btn btn-secondary text-xl md:w-1/3 shadow-md shadow-pink-300  '>Subscribers</button>
            <SubscriberDetais />
            <button onClick={() => document.getElementById('my_modal_7').showModal()} className=' w-full rounded-2xl my-5 btn btn-secondary text-xl md:w-1/3 shadow-md shadow-pink-300 '>whom try to contact me</button>
            <ContactData />
            </div>
        </div>

           

        </>
    )
}

export default Admin
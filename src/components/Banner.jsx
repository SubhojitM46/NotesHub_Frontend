import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
 //import baanner from "../assets/baanner.png"
 import baner from "../assets/Baner.png"
// import banner from 'https://w7.pngwing.com/pngs/535/280/png-transparent-bookselling-bookshop-store-material-bookshop-area.png'
//const banner = 'https://cdn2.iconfinder.com/data/icons/nuts-4/50/40-512.png'



function Banner() {

    const [spinner, setSpinner] = useState(false);



    const subscribed = async () => {
        const subsEmail = document.getElementById('newsLetterEmail').value;

        const data = {
            email: subsEmail
        }
        console.log(subsEmail.type);


        // just check -> how to fetch data from an api with vanilla js 
        // const res= fetch('http://localhost:4001/book')
        // .then(res=>res.json())
        // .then(data=>console.log(data))
        setSpinner(true)
        // if (data.email == "") {
        //     toast.error('please enter the email');
        //     setSpinner(false)

        // }
        // else{

        try {


             //const res = await axios.post('http://localhost:4001/subscribe/user', data)
            const res = await axios.post('https://noteshub-backend-9.onrender.com/subscribe/user', data)
                .then(res => {
                    // console.log(res);
                    toast.success('Thanks to subscribe the newsLetter');
                    window.localStorage.setItem('subscribed', JSON.stringify(res.data.subscriber.email));
                    setSpinner(false)
                    document.getElementById('newsLetterEmail').value = ''


                }).catch((err) => {
                    console.log(err);
                    toast.error(err.response.data.message);
                    setSpinner(false)


                })


        } catch (error) {
            console.log(error);
            toast.error("Internal server Error");

            setSpinner(false)

        }
    }
    useEffect(()=>{
        const form = document.getElementById('newsLetterForm');
        form.addEventListener('submit',(e)=>{
            e.preventDefault()
        })
    })

    return (
        <>
            <div className='max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row md:py-40 Md:mb-10 ' >
                <div className='w-full md:w-1/2 mt-0 md:mt-30 order-2  md:order-1' >
                    <div className='space-y-12'>

                        <h1 className='text-4xl font-bold mt-20' id='hero-txt'>Hello, welcome to NotesHub, learn something <span className='text-pink-500'>new everyday!!!</span></h1>
                        <p className='text-xl'> NotesHub is your go-to solution for downloading all your important notes in one place. Access and download your notes anytime, anywhere. Stay organized and efficient with NotesHub – start downloading today!






                        </p>
                        <form id='newsLetterForm' onSubmit={subscribed}>

                            <label className="input input-bordered flex items-center gap-2 dark:text-white dark:bg-transparent dark:border-white">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>

                                <input required type="email" className="grow" placeholder="Email" id='newsLetterEmail' />

                            </label>
                            {
                                spinner ?
                                    <span className="loading loading-spinner loading-lg mt-6 mb-10"></span> :



                                    <button type='submit'  className="btn btn-secondary mt-6 mb-10"    >subscribe</button>
                            }
                        </form>
                    </div>

                </div>
                <div className='w-full md:w-1/2  order-1 md:order-2 mt-20 md:mt-0 flex '>
                    <img src={baner} className='h-92 w-92 md:pl-28 pl-0  ' alt="" />
                </div>
            </div>
        </>
    )
}

export default Banner
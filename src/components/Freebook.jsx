import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Cards from './Cards';
import axios from 'axios'

function Freebook() {

  const [reloadBook,setReloadBook]= useState(false);

  var settings = {
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [

      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 1
        }
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const [book, setBook] = useState([]);
  const [loadingBook, setLoadingBook] = useState(true);
  const slideArr= [3,4,5];

  useEffect(() => {
    const getBook = async () => {
      try {
        //const res = await axios.get('http:/localhost:4001/book');
        const res = await axios.get('https://noteshub-backend-9.onrender.com/book');
        const data = res.data;
        const Freebook = data.filter((data) => (data.category === "free"));
        setBook(Freebook);
        setLoadingBook(false)
        // console.log(Freebook);
      }
      catch (err) {
        console.log(err);
      }
    }
    getBook();
      if(reloadBook){
          getBook()
          setReloadBook(false)
        }
  }, [reloadBook])

  return (
    <>
      <div className='max-w-screen-2xl container mx-auto md:px-20 px-5 '>
        <div space-y-10>

          <h1 className='font-semi-bold text-xl pb-2'>Free Offered Course</h1>

        </div>
        <div className='px-5 '>
          {loadingBook ?
            <Slider {...settings}>
              {
              slideArr.map(data=>(
                <div className='p-3 hover:scale-105 duration-200 '>
                <div className=" card w-98 h-96 bg-base-100 shadow-xl mb-10 border-2">
                <div className="skeleton h-full w-full  "></div>
                </div>
              </div>
              ))}
              
            </Slider>
            :
            <Slider {...settings}>
              {
                book.map(item => (
                  <Cards item={item} key={item._id} setReloadBook={setReloadBook} />
                ))}
            </Slider>
          }


        </div>
      </div>
    </>
  )
}

export default Freebook
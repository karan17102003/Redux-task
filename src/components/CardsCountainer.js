import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import ReactSimplyCarousel from 'react-simply-carousel';
import MovieCard from './MovieCard'

//TODO
// in the filter options refine the styling to look better

const CardsContainer = ({containerType,filterOptions,dataStoredIn, setFilter}) => {

  
  const data = useSelector((state)=>state.movieSlice?.[dataStoredIn])
  
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [indicatorDivPosition, setIndicatorDivPosition] = useState(0);

  return (
    <div >
      <div className='flex justify-between mb-4'>
        <h2 className='text-2xl font-bold'>{containerType}</h2>
        <div className='flex gap-5 items-center relative bg-white text-black px-5 py-2 rounded-[30px]'>
          {
            filterOptions.map((elem,index)=>{
              return(
                <p className='z-10 cursor-pointer' key={index} onClick={(e)=>{
                  setFilter(filterOptions[index].toLowerCase())
                  setIndicatorDivPosition(index)
                }}>{elem}</p>
              )
            })
          }
          <div className={indicatorDivPosition===0 ? 'absolute  h-[85%] w-[45%] bg-blue-200 top-[3px] rounded-[30px] left-1' :'absolute  h-[90%] w-1/2 bg-blue-200 top-[3px] rounded-[30px] right-1'}></div>
        </div>
      </div>
      <ReactSimplyCarousel
        activeSlideIndex={activeSlideIndex}
        onRequestChange={setActiveSlideIndex}
        itemsToShow={1}
        itemsToScroll={1}
        forwardBtnProps={{
          //here you can also pass className, or any other button element attributes
          style: {
            alignSelf: 'center',
            background: 'black',
            border: 'none',
            borderRadius: '50%',
            color: 'white',
            cursor: 'pointer',
            fontSize: '20px',
            height: 30,
            lineHeight: 1,
            textAlign: 'center',
            width: 30,
          },
          children: <span>{`>`}</span>,
        }}
        backwardBtnProps={{
          //here you can also pass className, or any other button element attributes
          style: {
            alignSelf: 'center',
            background: 'black',
            border: 'none',
            borderRadius: '50%',
            color: 'white',
            cursor: 'pointer',
            fontSize: '20px',
            height: 30,
            lineHeight: 1,
            textAlign: 'center',
            width: 30,
          },
          children: <span>{`<`}</span>,
        }}
        responsiveProps={[
          {
            itemsToShow: 7,
            itemsToScroll: 1,
            minWidth: 768,
          },
        ]}
        speed={400}
        easing="linear"
      >
        {/* here you can also pass any other element attributes. Also, you can use your custom components as slides */}
        { data.length > 0 &&
          data.map((elem)=>{
            return(
              <MovieCard movieDetails={elem} key={elem.id}/>
            )
          })
        }
      </ReactSimplyCarousel>
    </div>
  )
}

export default CardsContainer
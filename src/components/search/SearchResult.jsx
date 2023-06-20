import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import Header from '../header/Header';
import { fetchDataFromApi } from '../../api';

import NoPageFound from '../../assets/no-results.png';

import "./searchResult.css"

const SearchResult = () => {
  
  const base_url = "https://image.tmdb.org/t/p/original";

    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);  

    const {query} = useParams();
    
    const fetchInitialData = () => {
      fetchDataFromApi(`/search/multi?query=${query}`)
      .then(
        (res) => {
          setData(res);
          setPageNum((prev) => prev + 1);
      })
    };
    console.log(data)
    
  useEffect(()=> {
    fetchInitialData();
  },[query])
    
  return (
    <div className='search__page'>
        <Header/>
        {
          data?.results?.length > 0 ? 
          (
            <div className="search__titles">
              <div className="pageTitle">
                {`Search results of ' ${query} '`}
              </div>
            <div className="search__heading">
              <div className='search__title'>
                Explore title related to <span> :</span>  
              </div>
              <div className="search__resultsTitle">
                <span> 
                  {
                    data?.results.map((title)=> {
                      return (
                        <span key={title.id}>
                          {title?.original_title || title?.original_name} <span className='joinDash_line'>| </span>
                        </span>
                      )
                    })
                  }
                </span>
              </div>
            </div>
            <div className="search__posters">
                <div className='row'>
                <h2>{query}</h2>
                <div className="row__posters">
                {data?.results.map((movie) => {
                    return(
                        <img key={movie.id}
                            alt={movie.name} 
                            src={`${base_url}${ movie?.poster_path }`}
                            className={`row__posterLarge`}
                        />
                    )
                })}
                </div>
                </div>
            </div>
          </div>
          )
          :
          (
            <div className="pageNotFound">
            <div className="bigText">404</div>
            <img src={NoPageFound} alt="" />
            <div className="smallText">Page not found!</div>
        </div>
          )
        }      
    </div>
  )
}

export default SearchResult;
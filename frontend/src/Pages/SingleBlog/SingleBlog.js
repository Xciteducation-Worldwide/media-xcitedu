import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import Navbar from '../../Components/Navbar/Navbar'
import { setAllBlogs, setLatestBlog, setSingleBlog } from '../../redux/action/Action';
import './SingleBlog.css'

const SingleBlog = () => {
    // comment 
    const [comment, setComment] = useState("");
    const dispatch = useDispatch();
    const {id} = useParams();

    // filter single blog
    const filterSingleBlog = (response) => {
        console.log(id);
        response.map((e,i) => {
            if(e._id === id){
                dispatch(setSingleBlog(e));
            }
        })
    }

    // filter latest blog
    const filterLastestBlog = (response) => {
        let arr = []
        // reversing arr for getting latest data
        for (let i = 0; i < response.length; i++) {
            arr.push(response[response.length - (i+1)]);
        }

        // filtering data
        dispatch(setLatestBlog(arr));
    }

    // 
    const getData = async () =>{
       try {
            const response = await axios("https://mediabackend-xcitedu.herokuapp.com/blog/allBlogs");
            let data = response.data.data;
            // filter single blog
            filterSingleBlog(data);
            // filter latest blog
            filterLastestBlog(data);
       } catch (error) {
           console.log('something went wrong',error);
       }
    }

    // 
    useEffect(() => {
        getData();
    },[])

    //get blog
    const blog = useSelector((state) => state.SingleBlog.singleBlog);
    //get latest blog
    const latestBlog = useSelector((state) => state.LatestBlog.latestBlog);
    

    
  return (
    <>
        <Navbar pageName={blog.type}/>
        <>
          <div className="singleBlog-container">
              <div className="singleBlog-container__backgroundContainer">
                    <div className="singleBlog-container__backgroundContainer-bgImbx">
                        <img src={blog.image} alt="" />
                    </div>
                    <div className="singleBlog-container__backgroundContainer-contentContainer">
                        <div>
                            <h1 className="media-title">
                                {blog.title}
                            </h1>
                            <span className='mediaBlog-Creator'>
                            By John Simpson
                            </span>
                            <span className='mediaBlog-createdAt'>
                            <ion-icon name="time-outline"></ion-icon> 13 hours ago
                            </span>
                        </div>
                    </div>
              </div>
              <div className="singleBlog-container__contentContainer">
                  <div className="singleBlog-container__contentContainer-contentBx">
                      <div>
                          <h3 className='media-description'>{blog.description}</h3>
                          <span className="media-body">{blog.body}</span>
                          <div className="extra-section">
                              <div>
                                <span><ion-icon name="heart-outline"></ion-icon></span>
                                <span><ion-icon name="share-social-outline"></ion-icon></span>
                              </div>
                              <div>
                                  <a><ion-icon name="logo-facebook"></ion-icon></a>
                                    <a><ion-icon name="logo-instagram"></ion-icon></a>
                                  <a><ion-icon name="ellipsis-vertical"></ion-icon></a>
                              </div>
                          </div>
                          <span className="media-total-like">
                                Total Like 2,480,000
                          </span>
                          <div className="hr"></div>
                          <form>
                              <div className='addCommentBox'>
                                  <textarea placeholder='Add Your Comment...' name='comment' onChange={(e) => {setComment(e.target.value)}} value={comment}></textarea>
                                  <div>
                                      <input type="submit" value={'post'} disabled={(comment === "" ? true : false)}/>
                                  </div>
                              </div>
                          </form>
                          <div className="hr"></div>
                      </div>
                  </div>
              <div className="singleBlog-container__contentContainer-relatedNews">
                    <span className="bxTitle">
                        Related News
                    </span>
                    <div className="relatedNews_container">
                        {
                            latestBlog.map((e) => {
                                    return (
                                        <a href={`/blog/${e._id}`} >
                                            <div className="relatedNews_container-card">
                                            <div className="relatedNews_container-card__imgBx">
                                                <img src={e.image} alt={e.title} />
                                            </div>
                                            <div className="relatedNews_container-card__contentBx">
                                                <h4 className='card_title'>{e.title}</h4>
                                            </div>
                                        </div>
                                        </a>
                                    )
                            })
                        }
                    </div>
              </div>
              </div>
          </div>
        </>
    </>
  )
}

export default SingleBlog
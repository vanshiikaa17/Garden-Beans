import React from 'react'
import ReactStars from "react-rating-stars-component";
import profile from "./profile.jpg"

export const DiscussionCard = ({discussion}) => {
    const options = {
        edit: false,
        activeColor: "green",
        size: window.innerWidth < 600 ? 20 : 25,
        value: discussion.rating,
        isHalf: true,
      };
  return (
    <div className='discussionCard'>
        <img className='userImg' src={profile} alt="user"/>
        <p>{discussion.userName}</p>
        <ReactStars {...options}/>
        <span>{discussion.comment}</span>
    </div>
  )
}

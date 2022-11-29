/* eslint-disable no-restricted-globals */
import React, { useState, useEffect, useContext } from "react";
import "./loader.scss";
import "./Board.scss";
import { Pagination } from "../Pagination/Pagination";
import { Link } from "react-router-dom";
import { JobsContext } from "../../JobsContext";

export const Board = () => {
  const date = new Date();
  const contextJobs = useContext(JobsContext);
  const [loading, setLoading] = useState(contextJobs.jobs !== undefined);

  const cutText = (text, maxLength) => {
    return (text.length > maxLength) 
      ? text.slice(0, maxLength - 1) + '…' 
      : text;
  }

  const getDays = (jobDate) => {
    const [year, month, day] = jobDate.slice(0, 10).split('-');
    const difference = date - new Date(year, month, day);

    // from milliseconds' difference to days
    return Math.trunc(difference / 1000 / 60 / 60 / 24);
  }

  useEffect(() => {
    setLoading(false);
  }, [contextJobs.jobs])

  return (
    <>
      {window.scrollTo(0, 0)}
      {loading ? (
        <div className="loader">
          <div className="lds-roller"></div>
        </div>
      ) : (
        <div className="jobContainer">
          {contextJobs.jobs.map(job => {
            const daysAgo = getDays(job.createdAt);

            return (
              <Link to={`vacancy-${job.id}`} key={job.id}>
              <div className="job position">
                <img 
                  className="job__image"
                  src={job.pictures[0]}
                  alt="location" 
                />

                <img className="job__bookmark" src="./images/bookmark.svg" alt="" />
                  
                <div className="job__stars">
                  {Array(5).fill('').map((_, index) => (
                    <React.Fragment key={job.id + index}>
                      <img 
                        className="job__star" 
                        src="./images/star.svg"
                        alt="star"
                      />

                      <img 
                        className="job__star--desktop" 
                        src="./images/star-desktop.svg"
                        alt="star"
                      />
                    </React.Fragment>
                  ))}
                </div>
                
                <div className="job__creationDate">Posted {daysAgo} days ago</div>

                <h2 className="job__title">{cutText(job.title, 50)}</h2>
                <h2 className="job__title--desktop">{job.title}</h2>

                <div className="job__details">
                  <span className="job__name">{job.name}</span>
                  <span className="job__bullet"> • </span>
                  <span className="job__address">{job.address}</span>
                </div>

                <div className="job__details job__details--country">
                  <img 
                    className="job__icon" 
                    src="./images/location-icon.svg" 
                    alt="location icon"
                  />
                  <span className="job__country">Vienna, Austria</span>
                </div>
              </div>
              </Link>
            )
          })}
          
          <Pagination count={18} />
        </div>
       )
      }
    </>
  )
}

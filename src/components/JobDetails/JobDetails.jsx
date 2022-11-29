import './JobDetails.scss';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { JobsContext } from '../../JobsContext';

export const JobDetails = () => {
  const navigate = useNavigate();
  const date = new Date();
  const contextJobs = useContext(JobsContext);
  const job = contextJobs.jobs.find(j => `vacancy-${j.id}` === 'vacancy-635ee6d304601d61a71951f6');
  const [
    description, 
    responsibilities, 
    benefits
  ] = job.description.split(/Responsopilities:|Compensation & Benefits:/);

  const formatSalary = (salary) => {
    let [ from, to ] = salary.split('-');

    from = from.split('');
    to = to.split('');

    from.splice(from.length - 1, 1, ' 000');
    to.splice(to.length - 1, 1, ' 000');

    return `${from.join('')}—${to.join('')}`;
  }

  const getDays = (jobDate) => {
    const [year, month, day] = jobDate.slice(0, 10).split('-');
    const difference = date - new Date(year, month, day);

    // from milliseconds' difference to days
    return Math.trunc(difference / 1000 / 60 / 60 / 24);
  }

  window.scrollTo(0, 0);

  return (
    <div className="jobDetails">
      <h1 className="jobDetails__sectionTitle">Job Details</h1>
      <img
        className="jobDetails__separator" 
        src="./images/horisontal-separator.svg" 
        alt="" 
      />
      
      <div className="jobDetails__details">
        <img
          className="jobDetails__empty-star" 
          src="./images/empty-star.svg" 
          alt="" 
        />

        <img 
          className="jobDetails__bookmark"
          src="./images/bookmark.svg"
          alt=""
        />
        
        <span className="jobDetails__detailsText">Save to my list</span>
      </div>
      
      <div className="jobDetails__details">
        <img
          className="jobDetails__shape" 
          src="./images/shape.svg" 
          alt="" 
        />
        <span className="jobDetails__detailsText">Share</span>
      </div>

      <button className="jobDetails__button">Apply now</button>

      <h2 className="jobDetails__title">{job.title}</h2>

      <div className="jobDetails__container">
        <div className="jobDetails__creationDate">Posted {getDays(job.createdAt)} days ago</div>
        <div className="jobDetails__salaryInfo">
          <div className="jobDetails__info">Brutto, per year</div>
          <div className='jobDetails__salary'>€ {formatSalary(job.salary)}</div>
        </div>
      </div>

      <p className="jobDetails__description">{description}</p>
      <div className="jobDetails__responsibilities">
        <h2 className="jobDetails__subtitle">Responsibilities</h2>
        <p>{responsibilities}</p>
      </div>

      <div className="jobDetails__benefits">
        <h2 className="jobDetails__subtitle">Compensation &amp; Benefits:</h2>
        <ul>
          {benefits.split('.').map(benefit => (
            benefit.length > 5 && (
              <li key={`compensation&Benefits-${benefit}`} className='jobDetails__li'>{benefit}</li>
            )
          ))}
        </ul>
      </div>
      <button className="jobDetails__button">Apply now</button>

      <div className="attachedImgContainer">
        <h2 className="jobDetails__subtitle jobDetails__subtitle--big">Attached images</h2>
        <img
          className="jobDetails__separator" 
          src="./images/horisontal-separator.svg" 
          alt="" 
        />

        <div className="jobDetails__pictures">
          <img 
            className="jobDetails__attachedImg" 
            src={job.pictures[0]} 
            alt="company" 
          />
          <img 
            className="jobDetails__attachedImg" 
            src={job.pictures[1]} 
            alt="company" 
          />
          <img 
            className="jobDetails__attachedImg" 
            src={job.pictures[2]} 
            alt="company" 
          />
        </div>
      </div>

      <div className="addInfoContainer">
        <h2 className="jobDetails__subtitle jobDetails__subtitle--big">Additional info</h2>
        <img
          className="jobDetails__separator" 
          src="./images/horisontal-separator.svg" 
          alt="" 
        />

        <h3 className="jobDetails__addInfoTitle">Employment type</h3>
        {job.employment_type.map(type => (
          <div key={`addInfo-${type}`} className="jobDetails__addInfo jobDetails__addInfo--blue">{type}</div>
        ))}


        <h3 className="jobDetails__addInfoTitle">Benefits</h3>
        {job.benefits.map(benefit => (
          <div key={`benefit-${benefit}`} className="jobDetails__addInfo jobDetails__addInfo--yellow">{benefit}</div>
        ))}
      </div>
    
      <div className="jobDetails__hideOnDesktop">
        <h2 className="jobDetails__subtitle jobDetails__subtitle--big">Contacts</h2>
        <img
          className="jobDetails__separator" 
          src="./images/horisontal-separator.svg" 
          alt="" 
        />
      </div>

      <div className="jobDetails__map">
        <h3 className="jobDetails__mapTitle">{job.name}</h3>
        <div className="jobDetails__mapContainer">
          <img 
            className="jobDetails__icon" 
            src="./images/location-icon.svg" 
            alt="location icon"
          />
          <p className="jobDetails__address">{job.address}</p>
        </div>
        <div>
          <p className="jobDetails__phone">{job.phone}</p>
          <p className="jobDetails__mail">{job.email}</p>
        </div>

        <img 
          className="jobDetails__icon--big" 
          src="./images/location-white-icon.svg" 
          alt="location icon"
        />
        <img 
          className="jobDetails__mapImage"
          src="./images/map.svg" 
          alt="" 
        />
      </div>

      <button 
        className="jobDetails__button jobDetails__returnButton"
        onClick={() => navigate(-1)}  
      >Return to job board</button>
    </div>
  )
}

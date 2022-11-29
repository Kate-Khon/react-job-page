import './Pagination.scss';

export const Pagination = ({ count }) => {
  const isSmall = count <= 6;

  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li key="left">
          <button className="
              navigation__arrow 
              navigation__arrow--left 
              h-10 
              px-5
            "
          >
            <img src="./images/arrow-left.svg" alt="" />
          </button>
        </li>

        <li key="separator-1" className='navigation__separator navigation__separator--left'>
          <img src="./images/separator.svg" alt="" />
        </li>

        {isSmall ? (
          Array(count).fill(0).map((_, index) => (
            <li key={`Page-${index + 1}`}>
              <button className="navigation__number">
                {index + 1}
              </button>
            </li>
          ))
        ) : (
          <>
            {Array(5).fill(0).map((_, index) => {
              return index === 1 
                ? (
                  <li key={`Page-${index + 1}`}>
                    <button className="navigation__number">
                      {index + 1}
                    </button>
                  </li>
                ) : (
                  <li key={`Page-${index + 1}`}>
                    <button className="navigation__number">
                      {index + 1}
                    </button>
                  </li>
                )
            })}
            <span>...</span>
            <li key={`Page-${count}`}>
              <button className="navigation__number">
                {count}
              </button>
            </li>
          </>
        )}
        
        <li key="separator-2" className='navigation__separator navigation__separator--right'>
          <img src="./images/separator.svg" alt="" />
        </li>

        <li key="right">
        <button className="
              navigation__arrow 
              navigation__arrow--right 
              h-10 
              px-5
            "
          >
            <img src="./images/arrow-right.svg" alt="" />
          </button>
        </li>
      </ul>
    </nav>
  )
}
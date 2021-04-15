import React from 'react'

const Figure = ({wrongLetters}) => {
  const errors = wrongLetters.length;

  return(
    <>
      <svg height="250" width="200" className="figure-container">

        <line x1="60" y1="20" x2="140" y2="20" />
        <line x1="140" y1="20" x2="140" y2="50" />
        <line x1="60" y1="20" x2="60" y2="230" />
        <line x1="20" y1="230" x2="100" y2="230" />

        {errors > 0 &&
        <circle cx="140" cy="70" r="20" />
        }
        {errors > 1 &&
        <line x1="140" y1="90" x2="140" y2="150" />
        }
        {errors > 2 &&
        <line x1="140" y1="120" x2="120" y2="100" />
        }
        {errors > 3 &&
        <line x1="140" y1="120" x2="160" y2="100" />
        }
        {errors > 4 &&
        <line x1="140" y1="150" x2="120" y2="180" />
        }
        {errors > 5 &&
        <line x1="140" y1="150" x2="160" y2="180" />
        }
        {errors > 6 &&
        <circle cx="130" cy="65" r="1" />
        }
        {errors > 7 &&
        <circle cx="150" cy="65" r="1" />
        }
        {errors > 8 &&
        <path d="  M 135 77 A 8 8 0 0 1 145 77" />
        }
        {errors > 9 &&
        <line x1="160" y1="180" x2="165" y2="175" />
        }
        {errors > 10 &&
        <line x1="120" y1="180" x2="115" y2="175" />
        }
        {errors > 11 &&
        <line x1="120" y1="58" x2="160" y2="58" />
        }

      </svg>
    </>
  )
};

export default Figure

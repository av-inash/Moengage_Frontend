import React from 'react'


const Header = () => {
    return (
        <div className='mainContainer' style={{ position: 'fixed', width: '100%', height: 'auto' }}>
            < div className="navbar" style={{
                height: '5rem',
                width: '100%',

                display: 'flex',

                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                fontFamily: 'cursive',
                fontSize: '4rem',
                fontWeight: 'bold',
                color: 'white',

                backgroundImage: 'url("https://www.mistay.in/travel-blog/content/images/size/w2000/2020/08/brewery-beer.jpg")'

            }}>

                <p> Breweries</p>





            </div>

        </div>
    )
}

export default Header

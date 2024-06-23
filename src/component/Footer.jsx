import React from 'react';

const Footer = () => {
    return (
        <div className="mainContainer" style={{ bottom: 0, width: '100%', height: 'auto' }}>
            <div className="navbar" style={{
                height: '3rem',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                // justifyContent: 'center',
                backgroundColor: 'white',


                fontWeight: 'bold',
                color: 'white',
                backgroundColor: 'black'

            }}>
                copyright © 2024  Brewing Company

            </div>
        </div>
    );
};

export default Footer;

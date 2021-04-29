import React from 'react';

const Logo = (props) => {
    return (
        <div className='logo' onClick ={props.returnHome}>
            The World Data Mapper
        </div>
    );
};

export default Logo;
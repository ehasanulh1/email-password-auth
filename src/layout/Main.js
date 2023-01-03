import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div>
            <h1 className='text-center m-5 text-primary'>My Email Password Authentication</h1>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;
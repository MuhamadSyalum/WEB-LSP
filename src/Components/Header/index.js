import React from 'react';
import Logo from '../../assets/images/logo.png'
import { Link } from 'react-router-dom';



const Header = () => {
    return (
        <>
            <div className='headerWrapper'>
                <div className='top-strip bg-blue'>
                    <div className='container d-flex align-items-center justify-content-between'>
                        <div className='logoWrapper col-sm-2'>
                            <Link to={'/'}><img src={Logo} alt='Logo' /></Link>
                        </div>
                        <div className='textWrapper'>
                            <h1 className='mb-0 mt-0 text-center'>Lembaga Sertifikasi Profesi</h1>
                            <h1 className='text-center'>Administrasi Perkantoran Indonesia</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default Header;
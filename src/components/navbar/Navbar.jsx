import { useContext } from 'react';
import './Navbar.css';
import { GlobalContext } from '../../context/GlobalContext';
import { Link } from 'react-router-dom';


export default function Navbar(){

    const {searchParam, setSearchParam, hSearchFood} = useContext(GlobalContext);

    return(
        <nav className='Navbar_container'>
            <h2>
                <Link to='/'>Food Recipes</Link>
            </h2>
            <form onSubmit={hSearchFood}>
                <input value={searchParam} onChange={(event)=>{setSearchParam(event.target.value)}} />
            </form>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/favorites'>즐겨찾기</Link>
                </li>
            </ul>
            
        </nav>
    )
}
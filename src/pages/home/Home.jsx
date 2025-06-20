import { useContext, useEffect } from 'react';
import './Home.css';
import { GlobalContext } from '../../context/GlobalContext';

export default function Home(props){
    // context에서 보관중인 항목들을 useContext로 가져온다
    const {foodList, hSearchFood} = useContext(GlobalContext);

    useEffect(()=>{
        hSearchFood(null);
    }, [])

    return(
        <div className='Home_container'>
            <p>{foodList[0]?.title}</p>
        </div>
    )
}
import { useContext, useEffect } from 'react';
import './Home.css';
import { GlobalContext } from '../../context/GlobalContext';
import DetailItem from '../../components/detail-item/detail-item';

export default function Home(props){
    // context에서 보관중인 항목들을 useContext로 가져온다
    const {foodList, hSearchFoodDefault, loading} = useContext(GlobalContext);
    if(loading){
        return(
            <div className='Home_Loading'>
                <h2>Loading... Please Wait</h2>
            </div>
        )
    }

    //useEffect(()=>{
    //    hSearchFoodDefault();
    //}, [])
    

    return(
        <div className='Home_container'>
            {
                foodList?.length > 0 ? (
                    foodList.map((item, index)=>{
                        return(
                            <DetailItem item={item} key={item.id} />
                        )
                    })
                ) : (
                    <div className='none-item-style'>
                    <p>검색하세요. banana, apple, mango ...</p>
                    <a href='https://forkify-api.herokuapp.com/phrases.html' target='_blank'>
                        <button className='guide-btn'>검색 항목 안내</button>
                    </a>
                </div>
                )
            }
        </div>
    )
}
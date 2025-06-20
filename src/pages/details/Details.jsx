import { useParams } from 'react-router-dom';
import './Details.css';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../context/GlobalContext';

export default function Details(props){

    // react-router-dom 에서 :변수명으로 넘긴 URL은 useParams 로 가져옴
    const {id} = useParams();

    const {favoritesList, hAddToFavorites} = useContext(GlobalContext);
    const [foodDetailData, setFoodDetailData] = useState(null);

    useEffect(()=>{
        async function getFoodDetail(){
            const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
            const data = await res.json();

            console.log(data);

            if(data?.data){
                setFoodDetailData(data?.data);
            }
        }

        getFoodDetail();        // useEffect 안에서 만든 함수를 쓴다
    }, []);

    return(
        <div className='Details_container'>
            <header>
                <div>
                    <img src={foodDetailData?.recipe?.image_url} />
                </div>
            </header>

            <section>
                <span>{foodDetailData?.recipe?.publisher}</span>
                <h3>{foodDetailData?.recipe?.title}</h3>
                <div>
                    <button onClick={()=>{hAddToFavorites(foodDetailData?.recipe)}}>
                        {
                            favoritesList?.length > 0 && favoritesList?.findIndex((item)=>item?.id === foodDetailData?.recipe?.id) !== -1 ? '즐겨찾기 제거' : '즐겨찾기 추가'
                        }
                    </button>
                </div>
                <div>
                    <span>재료:</span>
                    <ul>
                        {
                            foodDetailData?.recipe?.ingredients.map((item, index)=>{
                                return(
                                    <li key={index}>
                                        <span>{item.quantity} {item.unit}</span>
                                        <span>{item.description}</span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </section>
        </div>
    )
}
import { useContext } from 'react';
import './favorites.css';
import { GlobalContext } from '../../context/GlobalContext';
import DetailItem from '../../components/detail-item/detail-item';

export default function Favorites(props){

    const {favoritesList} = useContext(GlobalContext);

    return (
        <div className='Favorites_container'>
            {
                favoritesList?.length > 0 ? (
                    favoritesList.map((item, index)=>{
                        return(
                            <DetailItem item={item} key={item.id}/>
                        )
                    })
                ) : (
                    <div>
                        <h2>즐겨찾기에 추가된 항목이 없습니다</h2>
                    </div>
                )

                
            }
        </div>
    )
}
import { Link } from 'react-router-dom';
import './detail-item.css';

export default function DetailItem(props){

    return (
        <div className='detail_item_container'>
            <header>
                <img src={props.item?.image_url} alt=''></img>
            </header>
            <div>
                <span>{props.item?.publisher}</span>
                <h3>{props.item?.title}</h3>
                <Link to={`/details/${props.item?.id}`}>레시피 상세보기</Link>
            </div>
        </div>
    )
}
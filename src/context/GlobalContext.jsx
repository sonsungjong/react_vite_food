import { createContext, useState } from "react";
import { RiNewsFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";


// 감싼 컴포넌트들의 변수와 함수들을 보관할 콘텍스트
export const GlobalContext = createContext(null);

// 컴포넌트들을 감쌀 콘텍스트 컴포넌트
// children 은 고정변수명으로 태그 사이에 있는 모든 것들을 의미
export default function GlobalState({children})
{
    // 레시피리스트, 검색값, 로딩표시여부, 레시피디테일정보, 즐겨찾기리스트
    const [foodList, setFoodList] = useState("");
    const [searchParam, setSearchParam] = useState("");
    const [loading, setLoading] = useState(false);
    //const [foodDetailData, setFoodDetailData] = useState(null);
    const [favoritesList, setFavoritesList] = useState([]);

    const navigate = useNavigate();           // 검색을 하면 홈페이지로 이동시키게 navigate('/')

    // 함수
    function hSearchFoodDefault(){
        // https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}
        // https://forkify-api.herokuapp.com/api/v2/recipes/664c8f193e7aa067e94e8873
        fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=banana`)
        .then((res)=>{
            if(res.ok){
                return res.json();
            }else{
                return null;
            }
        })
        .then((data)=>{
            if(data?.data?.recipes){
                setFoodList(data?.data?.recipes);
                console.log(data?.data?.recipes);
            }
        })
        .catch((err)=>{
            console.error(err);
        })
    }
    
    async function hSearchFood(event){
        event?.preventDefault();
        setLoading(true);

        try{
            // https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}
            // https://forkify-api.herokuapp.com/api/v2/recipes/664c8f193e7aa067e94e8873
            const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`)
            const data = await res.json();

            console.log(data);
            if(data?.data?.recipes)
            {
                setFoodList(data?.data?.recipes);
                setLoading(false);
                setSearchParam('');
                navigate('/');
            }
        }catch(e){
            console.error(e);
        }
    }

    function hAddToFavorites(getCurItem){
        console.log('Add To Favorites : '+getCurItem);
        let copyFavoritesList = [...favoritesList];         // 배열과 객체는 분할해서 복제한다
        const index = copyFavoritesList.findIndex((item)=>{return item.id === getCurItem.id});          // 아이디로 비교해서 index를 찾는다

        if(index === -1){
            // 못찾았다
            copyFavoritesList.push(getCurItem);         // 맨뒤에 추가 (즐겨찾기 등록)
        }else{
            // 찾았다
            copyFavoritesList.splice(index);            // 이미 있었으면 제거 (즐겨찾기 취소)
        }

        setFavoritesList(copyFavoritesList);            // 복제본으로 업데이트한다
    }

    // return 안에다가 제공할 것들을 Provider로 만들고 children을 감싼다
    return(
        <GlobalContext.Provider value={{
            foodList, hSearchFoodDefault, hSearchFood, searchParam, setSearchParam, loading
            , hAddToFavorites, favoritesList
            //, foodDetailData, setFoodDetailData
        }}>
            {children}
        </GlobalContext.Provider>
    )
}
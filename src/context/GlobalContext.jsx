import { createContext, useState } from "react";


// 감싼 컴포넌트들의 변수와 함수들을 보관할 콘텍스트
export const GlobalContext = createContext(null);

// 컴포넌트들을 감쌀 콘텍스트 컴포넌트
// children 은 고정변수명으로 태그 사이에 있는 모든 것들을 의미
export default function GlobalState({children})
{
    // 상태변수
    const [foodList, setFoodList] = useState("");

    // 함수
    async function hSearchFood(event){
        event?.preventDefault();

        try{
            // https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}
            const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=banana`)
            const data = await res.json();

            if(data?.data?.recipes)
            {
                setFoodList(data?.data?.recipes);
                console.log(data?.data?.recipes);
            }
        }catch(e){
            console.error(e);
        }
    }

    // return 안에다가 제공할 것들을 Provider로 만들고 children을 감싼다
    return(
        <GlobalContext.Provider value={{foodList, hSearchFood}}>
            {children}
        </GlobalContext.Provider>
    )
}
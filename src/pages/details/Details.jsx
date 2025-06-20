import { useParams } from 'react-router-dom';
import './Details.css';
import { useEffect, useState } from 'react';

export default function Details(props){

    // react-router-dom 에서 :변수명으로 넘긴 URL은 useParams 로 가져옴
    const {id} = useParams();

    return(
        <>
            <h1>{id}</h1>
        </>
    )
}
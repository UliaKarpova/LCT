import mmrgl from 'mmr-gl';
import { useEffect } from 'react'

import 'mmr-gl/dist/mmr-gl.css';

export function VKMap() {
    useEffect( () => {
        mmrgl.accessToken = 'vk1.a.ryCIRHt1-aRHFvjlkHPwLbFVLQEc4-tCBSInEAlhFq0V-pv0mfmIO2Y6J-Ousu_2aqi-sqQotEKjNUyNbDjbQ7eAr3Zyg2EUFieyo0Wdcj5J8G-YJrcAymp4QsB1X_LJmkkOllVomfJo_1xLHS9OtfGGztvuih5KXOVf2OL0lKtC-1KffP_7LFI2WzdePzVUbbeLoVduA2mOm4rFCD91zA';

        const map = new mmrgl.Map({
            container: 'map',
            zoom: 8,
            center: [37.6165, 55.7505],
            style: 'mmr://api/styles/main_style.json',
            hash: true,
        })

        return () => {
            if (map) map.remove();
        }
    })

    return <div id="map" style={{ width: '800px', height: '600px'}} />
}
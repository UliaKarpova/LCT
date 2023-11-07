import { useEffect } from 'react';
import { load } from '@2gis/mapgl';
import { useMapglContext } from './MapglContext.jsx';
import { Clusterer } from '@2gis/mapgl-clusterer';
import { RulerControl } from '@2gis/mapgl-ruler';
import { Directions } from '@2gis/mapgl-directions';
import { MapWrapper } from './MapWrapper.jsx';
import icon from '../../assets/images/icons/placeholder.png'

export const MAP_CENTER = [55.753544, 37.621202];

export default function Mapgl({center, offices, tasks}) {
    const { setMapglContext } = useMapglContext();

    useEffect(() => {
        let map = undefined;
        let directions = undefined;
        let clusterer = undefined;

        load().then((mapgl) => {
            map = new mapgl.Map('map-container', {
                center: [45.044960, 38.977047],
                zoom: 13,
                key: '9e9b5792-8bd1-4217-8f90-92f3a833dbca',
            });

            map.on('click', (e) => console.log(e));

            const rulerControl = new RulerControl(map, { position: 'centerRight' });

            clusterer = new Clusterer(map, {
                radius: 60,
            });

            const markers = [
                { coordinates: [30.412374, 59.983441], icon: icon },
                { coordinates: [55.30771, 25.20314], icon: icon },
                { coordinates: [55.35266, 25.24382], icon: icon },
            ];
            clusterer.load(markers);

            // directions = new Directions(map, {
            //     directionsApiKey: '9e9b5792-8bd1-4217-8f90-92f3a833dbca',
            // });

            //
            // directions.carRoute({
            //     points: [
            //         [55.28273111108218, 25.234131928828333],
            //         [55.35242563034581, 25.23925607042088],
            //     ],
            // });

            setMapglContext({
                mapglInstance: map,
                rulerControl,
                mapgl,
            });
        });

        return () => {
            directions && directions.clear();
            clusterer && clusterer.destroy();
            map && map.destroy();
            setMapglContext({ mapglInstance: undefined, mapgl: undefined });
        };
    }, [setMapglContext]);


    return (
        <>
            <MapWrapper />
        </>
    );
}

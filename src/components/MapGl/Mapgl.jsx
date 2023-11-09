import { useEffect } from 'react';
import { load } from '@2gis/mapgl';
import { useMapglContext } from './MapglContext.jsx';
import { Clusterer } from '@2gis/mapgl-clusterer';
import { RulerControl } from '@2gis/mapgl-ruler';
import { Directions } from '@2gis/mapgl-directions';
import { MapWrapper } from './MapWrapper.jsx';

export default function Mapgl({center, points}) {
    const { setMapglContext } = useMapglContext();

    console.log(points)

    useEffect(() => {
        let map = undefined;
        let directions = undefined;
        let clusterer = undefined;

        load().then((mapgl) => {
            map = new mapgl.Map('map-container', {
                center: center,
                zoom: 13,
                key: '9e9b5792-8bd1-4217-8f90-92f3a833dbca',
            });

            map.on('click', (e) => console.log(e));

            const rulerControl = new RulerControl(map, { position: 'centerRight' });

            clusterer = new Clusterer(map, {
                radius: 60,
            });

            // const taskMarkers = tasks.map(task => ({coordinates: task.branch.location}))
            //
            // const markers = taskMarkers;
            // clusterer.load(markers);

            directions = new Directions(map, {
                directionsApiKey: '9e9b5792-8bd1-4217-8f90-92f3a833dbca',
            });

            directions.carRoute({
                points: points
            });

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

import { getAllRoutes, getListOfRegions, getListOfSeasons, getRoutesByRegion, getRoutesBySeason, getRoutesByRegionAndSeason } from '../models/model.js';

export default async (req, res) => {
    const regionFilter = req.query.region;
    const seasonFilter = req.query.season;

    let routes = await getAllRoutes();

    if (regionFilter && seasonFilter) {
        routes = await getRoutesByRegionAndSeason(regionFilter, seasonFilter);
    } else if (regionFilter) {
        routes = await getRoutesByRegion(regionFilter);
    } else if (seasonFilter) {
        routes = await getRoutesBySeason(seasonFilter);
    }

    const regions = await getListOfRegions(); 
    const seasons = await getListOfSeasons();

    res.render('routes/list', { 
        title: 'Scenic Train Routes',
        regions,
        routes,
        seasons
    });
};
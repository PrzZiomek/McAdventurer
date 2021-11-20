"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callWikiApi = void 0;
const errorHandle_1 = require("../../helpers/errorHandle");
const getDestinationData_1 = require("./getDestinationData");
const pageImagesUrl = "https://en.wikipedia.org/w/api.php?action=query&titles={name}&prop=images&format=json";
const pageCoordinatesUrl = "https://en.wikipedia.org/w/api.php?action=query&titles={name}&prop=coordinates&format=json";
const callWikiApi = async (req, res, next) => {
    const name = res.locals.destinationName;
    const requestOptions = {
        url: `https://en.wikipedia.org/w/api.php?action=query&titles=${name}&prop=extracts|coordinates|pageimages&exintro&explaintext&format=json&exintro=1&indexpageids`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    const destinationRes = await (0, getDestinationData_1.getDestinationData)(requestOptions.url)
        .catch(err => next((0, errorHandle_1.errorHandle)(err, 500)));
    if (!destinationRes)
        return;
    const { title, extract, coordinates } = destinationRes;
    const destination = {
        name: title,
        description: extract,
        coordinates: {
            lat: coordinates[0].lat,
            lon: coordinates[0].lon
        }
    };
    console.log(destination);
    next();
};
exports.callWikiApi = callWikiApi;
/*
parameters for extracts: exintro=1&explaintext=1&exlimit=20 (max exlimit is 20)

parameters for coordinates: coprop=type|dim|globe&colimit=20 (max colimit is 500)

parameters for pageimages: piprop=thumbnail&pithumbsize=400&pilimit=20 (max is 50)


async function executeParallelAsyncTasks () {
const [ valueA, valueB, valueC ] = await Promise.all([ functionA(), functionB(), functionC() ]);
doSomethingWith(valueA);
doSomethingElseWith(valueB);
doAnotherThingWith(valueC);
}*/
/*  request(requestOptions,function(err, response, body) {
     try{
       if(err) console.log("error when calling wiki api: ", err);
       const reqRes:WikiApiResponse = JSON.parse(body);
       const pageId = reqRes.query.pageids[0];
       const content = reqRes.query.pages[pageId];
       console.log("body:", reqRes);
     }
     catch (ex) {
       throw errorHandle(err, 500);
     }
 }) */ 
//# sourceMappingURL=callWikiApi.js.map
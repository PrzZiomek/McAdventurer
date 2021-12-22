"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callWikiApi = void 0;
const errorHandle_1 = require("../../helpers/errorHandle");
const getDestinationData_1 = require("./getDestinationData");
const callWikiApi = async (req, res, next) => {
    const name = res.locals.destinationName;
    const callWiki = res.locals.callWiki;
    if (!callWiki)
        return;
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${name}&prop=extracts|coordinates|pageimages&exintro&explaintext&format=json&exintro=1&indexpageids`;
    const destinationRes = await (0, getDestinationData_1.getDestinationData)(url).catch(err => next((0, errorHandle_1.errorHandle)(err, 500)));
    if (!destinationRes) {
        return res.status(422).send({
            message: "wiki api error"
        });
    }
    const { title, extract, coordinates, pageimage } = destinationRes;
    const destination = {
        name: title,
        content: extract,
        coordinates: {
            lat: coordinates ? coordinates[0].lat : "unset",
            lng: coordinates ? coordinates[0].lon : "unset"
        },
        images: pageimage ? pageimage : "unset"
    };
    res.status(200).json({
        destination,
    });
    res.locals.destination = destination;
    next();
};
exports.callWikiApi = callWikiApi;
/*
parameters for extracts: exintro=1&explaintext=1&exlimit=20 (max exlimit is 20)

parameters for coordinates: coprop=type|dim|globe&colimit=20 (max colimit is 500)

parameters for pageimages: piprop=thumbnail&pithumbsize=400&pilimit=20 (max is 50)

const requestOptions = {
      url: `https://en.wikipedia.org/w/api.php?action=query&titles=${name}&prop=extracts|coordinates|pageimages&exintro&explaintext&format=json&exintro=1&indexpageids`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  };
  
//const pageImagesUrl = "https://en.wikipedia.org/w/api.php?action=query&titles={name}&prop=images&format=json";
//const pageCoordinatesUrl = "https://en.wikipedia.org/w/api.php?action=query&titles={name}&prop=coordinates&format=json";

*/ 
//# sourceMappingURL=callWikiApi.js.map
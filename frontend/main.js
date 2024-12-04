window.onload = setup;

var measure;
var viewer;
//latitude = x
//longitude = y
const top_right_lat = 5.77465380114684;
const top_left_lon = 53.194528716741345;

function setup() {
    const west = 5.798212900532118;
    const south = 53.19304584690279;
    const east = 5.798212900532118;
    const north = 53.19304584690279;

    var rectangle = Cesium.Rectangle.fromDegrees(west, south, east, north);

    Cesium.Camera.DEFAULT_VIEW_FACTOR = 0.0005;
    Cesium.Camera.DEFAULT_VIEW_RECTANGLE = rectangle;



    // Hier stellen we in wat er moet gebeuren zodra er een connectie met de server wordt gemaakt.


    //Sets up a list which is used to select an imagery provider
    //We only support OpenStreetMap
    // const imageryViewModels = [];
    // imageryViewModels.push(new Cesium.ProviderViewModel({
    //     name: "OpenStreetMap",
    //     iconUrl: Cesium.buildModuleUrl("Widgets/Images/ImageryProviders/openStreetMap.png"),
    //     tooltip: "OpenStreetMap (OSM) is a collaborative project to create a free editable map of the world.\nhttp://www.openstreetmap.org",
    //     creationFunction: function() {
    //         return new Cesium.OpenStreetMapImageryProvider({
    //             url: "https://tile.openstreetmap.org/"
    //         });
    //     }
    // }));

    //Sets up the container in which the globe is displayed
    viewer = new Cesium.Viewer('cesiumContainer', {
        baseLayer: false,
        baseLayerPicker: false,
        geocoder: false,
        // mapProjection: new Cesium.WebMercatorProjection(Cesium.Ellipsoid.WGS84)
    });

    //Sets up an invisible layer picker, which sets the correct layer to use
    // const baseLayerPicker = new Cesium.BaseLayerPicker("baseLayerPickerContainer", {
    //     globe: viewer.scene.globe,
    //     imageryProviderViewModels: imageryViewModels
    // });

    // viewer.imagerLayers.addImageryProvider(osm);

    //Removes credit?
    viewer.creditDisplay.removeStaticCredit(Cesium.CreditDisplay._cesiumCredit);

    //Improves tile quality
    viewer.scene.globe.maximumScreenSpaceError = 1;

    // console.log(viewer.scene.globe.maximumScreenSpaceError);

    const condo1 = createBox(200, 300, 50, 40, 70, 0, Cesium.Color.GRAY);
    measure = createBox(0, 0, 3, 3, 30, 0, Cesium.Color.RED);

    var carX = 230;
    var carY = 78;

    const car = createBox(carX,carY, 5, 2, 1.5, 0, Cesium.Color.BLUE);

    function moveCar() {
        carX++;
        carY += 0.35;
        moveEntity(car, carX, carY);
        setTimeout(() => {
            moveCar();
        }, 150);
    }


    createPolygonFromXYs([
        [250, 72], //linksonder-onder
        [230, 85], //linksonder-boven
        [510, 185], //midden-links-boven
        [520, 175] //midden-links-onder
    ], Cesium.Color.WHITE);

    // OPPERVLAKTE IS 360624 M^2
    const redPolygon = viewer.entities.add({
        name: "Spoordok",
        polygon: {
            hierarchy: Cesium.Cartesian3.fromDegreesArray([
                5.787759928698073, 53.197831145908,
                5.789123554275904, 53.19763995957844,
                5.788934967759822, 53.19602353198474,
                5.776937964005922, 53.194528716741345,
                5.774587885853288, 53.196901277127026,
                5.774703939093954, 53.1976225789762,
                5.786410809746187, 53.19704032421097,
            ]),
            material: Cesium.Color.LIGHTGRAY,
        },
    });

    moveCar();

    viewer.entities.add({
        name: "Test",
        position: Cesium.Cartesian3.fromDegrees(5.787759928698073, 53.197831145908, 500),
        box: {
            dimensions: new Cesium.Cartesian3(5, 5, 1000),
            material: Cesium.Color.RED,
        }
    })

    viewer.entities.add({
        name: "Nulpunt",
        position: Cesium.Cartesian3.fromDegrees(5.77465380114684, 53.194528716741345, 500),
        box: {
            dimensions: new Cesium.Cartesian3(5, 5, 1000),
            material: Cesium.Color.GREEN,
        }
    })

    viewer.entities.add({
        name: "Test2",
        position: Cesium.Cartesian3.fromDegrees(5.774587885853288, 53.196901277127026, 500),
        box: {
            dimensions: new Cesium.Cartesian3(5, 5, 1000),
            material: Cesium.Color.GREEN,
        }
    })

    viewer.entities.add({
        name: "Test2",
        position: Cesium.Cartesian3.fromDegrees(5.774703939093954, 53.1976225789762, 500),
        box: {
            dimensions: new Cesium.Cartesian3(5, 5, 1000),
            material: Cesium.Color.BLUE,
        }
    })

}






function latlonFromXY(x, y) {
    // number of km per degree = ~111km (111.32 in google maps, but range varies
    // between 110.567km at the equator and 111.699km at the poles)
    //
    // 111.32km = 111320.0m (".0" is used to make sure the result of division is
    // double even if the "meters" variable can't be explicitly declared as double)
    var coef_x = x / 111320.0;

    var new_lat = top_right_lat + coef_x;

    var coef_y = y / 111320.0;

    // pi / 180 ~= 0.01745
    var new_long = top_left_lon + coef_y / Math.cos(top_right_lat * 0.01745);

    return {"lat":new_lat, "lon":new_long};
}

function XYFromlatlon(lat, lon){
    var x = (lat - top_right_lat) * 111320;
    var y = (lon - top_left_lon) * 111320;


    return {"x":x, "y":y}
}

console.log("0, 0: " + XYFromlatlon(5.77465380114684, 53.194528716741345));
console.log(XYFromlatlon(5.787759928698073, 53.197831145908));
console.log(XYFromlatlon(5.789123554275904, 53.19763995957844));
console.log(XYFromlatlon(5.788934967759822, 53.19602353198474));
console.log(XYFromlatlon(5.776937964005922, 53.194528716741345));
console.log(XYFromlatlon(5.774587885853288, 53.196901277127026));
console.log(XYFromlatlon(5.774703939093954, 53.1976225789762));
console.log(XYFromlatlon(5.786410809746187, 53.19704032421097));

var _box = 1;

function createBox(x, y, width, depth, height, rotation, color) {
    const cords = latlonFromXY(x,y);

    return viewer.entities.add({
        name: "Box_" + _box++,
        position: Cesium.Cartesian3.fromDegrees(cords.lat, cords.lon, height/2.0),
        box: {
            dimensions: new Cesium.Cartesian3(width, depth, height),
            material: color,
        },
    });
}

function moveEntity(entity, x, y) {
    const cords = latlonFromXY(x,y);
    entity.position = Cesium.Cartesian3.fromDegrees(cords.lat, cords.lon, entity.box.dimensions._value.z);
}

var _polygon = 1;

function createPolygonFromXYs(xyArray, color) {
    var degreeArray = [];
    xyArray.forEach(element => {
        const cords = latlonFromXY(element[0], element[1]);
        degreeArray.push(cords.lat);
        degreeArray.push(cords.lon);
    });

    const redPolygon = viewer.entities.add({
        name: "Polygon_" + _polygon++,
        polygon: {
            hierarchy: Cesium.Cartesian3.fromDegreesArray(degreeArray),
            material: color,
        },
    });
}



(function () {
    [].slice.call(document.getElementsByTagName('form')).forEach(tag => tag.addEventListener('submit', (e) => e.preventDefault()));
    document.querySelector('#connect').addEventListener('click', () => connect());
    document.querySelector('#disconnect').addEventListener('click', () => disconnect());
    document.querySelector('#genperson').addEventListener('click', () => generatePerson());
})();
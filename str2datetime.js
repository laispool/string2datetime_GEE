///////////////////////////////////////////////////////////
///// Laís Pool  (lais.pool@gmail.com)                /////                        
///// Florianopolis, 01/06/2023                       /////              
///// Code Editor - Earth Engine                      /////                             
///////////////////////////////////////////////////////////


var pathTideg = 'projects/ee-project-name/assets/'; // change this to the path of the asset containing the tide gauge data
var nameTideg = 'tide_gauge_data'; // name of the tide gauge observations file

/*
declaration: function str2datetime(pathTideg, nameTideg):
This function was made to transform two feature columns (Date and Hour) into one column of datetime type for Earth Engine - Code Editor

    list of parametres:
    • pathTideg: string containing a path of a file (folder).
    • nameTideg: string containing the name of the file.
    global variables: (none)
    libraries needed: (none)
    return value: Updated ee.FeatureCollection
*/
var str2datetime = function (pathTideg, nameTideg) {
    var tg = ee.FeatureCollection(pathTideg + nameTideg); // loading tide gauge observations as a ee.FeatureCollection
    print('First 10 elements of tide gauge:',tg.limit(10)); // this limitations is due to Code Editor don't print more then 5000 elements

    // Define a function to combine the date and time columns into a new column
    var combineDateTime = function(feature) {
        var date = ee.String(feature.get('Date')); // change the 'Date' to the name of your date column 
        var hour = ee.String(feature.get('Hour')); // change the 'Hour' to the name of your hour column 
        var combinedDateTime = ee.String(date).cat(' ').cat(hour);
        return feature.set('dateTime', combinedDateTime);
    };
    var updatedCollection = tg.map(combineDateTime);

    updatedCollection = updatedCollection.map(function(feature) {
        var dateTimeStr = ee.String(feature.get('dateTime'));
        var dateTime = ee.Date.parse('dd-MM-yyyy HH:mm', dateTimeStr); // change this to your date and time format
        return feature.set('dateTime', dateTime);
    });
    print('Updated FeatureCollection:', updatedCollection.limit(10));
};
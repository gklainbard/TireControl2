/**
 * Created by guillermo.klainbard on 09/06/2018.
 */

$(document).ready(function() {

    var name = document.getElementById('name');
    var legajo = document.getElementById("legajo");
    var imagen = document.getElementById("imagen");
    var score = document.getElementById("score");


    $(function sendAudit() {

        var submitBtn = firebase.firestore();

        // Add a new document in collection "cities"
        submitBtn.collection("InspeccionesLavado").add({
            nombre: name.value,
            legajo: legajo.value,
            imagen: imagen.value,
            puntaje: score.value
        })
            .then(function (docRef) {
                alert("Auditoria guardada correctamente");
                console.log("Document successfully written!", docRef.id);
            })
            .catch(function (error) {
                alert("Error al guardar los datos");
                console.error("Error writing document: ", error);
            });
    },


//Query the score
    function Datos() {

        var db = firebase.firestore();


        db.collection("Users").where("score", "<=", 0)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());


// Create the chart

                    Highcharts.chart('container', {
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: 'Basic drilldown'
                        },
                        xAxis: {
                            type: 'category'
                        },

                        legend: {
                            enabled: false
                        },

                        plotOptions: {
                            series: {
                                borderWidth: 0,
                                dataLabels: {
                                    enabled: true
                                }
                            }
                        },

                        series: [{
                            name: 'Objetos',
                            colorByPoint: true,
                            data: [{
                                name: 'Animals',
                                y: 5,
                                drilldown: 'animals'
                            }, {
                                name: 'Fruits',
                                y: 2,
                                drilldown: 'fruits'
                            }, {
                                name: 'Cars',
                                y: 4,
                                drilldown: 'cars'
                            }]
                        }],
                        drilldown: {
                            series: [{
                                id: 'animals',
                                data: [
                                    ['Cats', 4],
                                    ['Dogs', 2],
                                    ['Cows', 1],
                                    ['Sheep', 2],
                                    ['Pigs', 1]
                                ]
                            }, {
                                id: 'fruits',
                                data: [querySnapshot]
                            }, {
                                id: 'cars',
                                data: [
                                    ['Toyota', 4],
                                    ['Opel', 2],
                                    ['Volkswagen', 2]
                                ]
                            }]
                        }
                    });
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });

    })
});

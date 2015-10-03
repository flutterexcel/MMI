
//http://api.otrsw.co.za/mmi/test/depexplorer/objectives for ex2
//http://api.otrsw.co.za/mmi/test/depexplorer/capabilities for ex1
graphMod.controller('graphCtrl', function (chord, ajaxRequest, $scope, $rootScope, $stateParams) {
    var self = this;

//checking the graph selection
    console.log($stateParams.graph);
    $scope.view = $stateParams.graph + ' Dependency Graph'; //setting the page heading
    window.document.title = $scope.view;
    if ($stateParams.graph == 'Capabilities')
    {

        example2(); //funcion for capabilities graph
    }
    else
    {

        example1(); //funcion for Objecive graph

    }
    $scope.spinner = true;   // hiding and showing spinner ,for charts loading
    var Chord = chord;
    // first basic example
    function example1() {
        console.log(1);
        var url = "depexplorer/capabilities";
        var promise = ajaxRequest.send(url);
        promise.then(function (data) {
            $scope.spinner = false;
            var chartEl = document.getElementById('demo').appendChild(document.createElement('div'));

            chartEl.className = 'chart';

            var chord = new Chord(chartEl);
            chord.draw(data);
        });
        promise.catch(function (e) {
            console.log(e);
        });

    }


    // second example
    function example2() {
        console.log(2);
        var url = "depexplorer/objectives";
        var promise = ajaxRequest.send(url);
        promise.then(function (data) {
            $scope.spinner = false;
            var chartEl = document.getElementById('demo').appendChild(document.createElement('div'));
            chartEl.className = 'chart';

            var options = {
                outerRadius: 100,
                innerRadius: 80,
                padding: 100,
                labelText: function (d, detail) {
                    return detail.edata.name;
                },
                groupFillColor: function (d, detail) {
                    return detail.edata.color;
                },
                chordFillColor: function (d, sourceDetail, targetDetail) {
                    return sourceDetail.edata.color;
                },
                groupStrokeColor: function () {
                    return '#999';
                },
                chordStrokeColor: function () {
                    return '#999';
                }
            };

            var chord = new Chord(chartEl, options);
            chord.draw(data);

        });
        promise.catch(function (e) {
            console.log(e);
        });
    }


});
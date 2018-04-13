google.charts.load('current', {
    'packages': ['geochart'],
    // Note: you will need to get a mapsApiKey for your project.
    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
    // Hopefully, you won't stoll it, right?
    'mapsApiKey': 'AIzaSyBuZPXmiSUiYc-GjrTXKl9cevtgIVjv8Xw'
})

google.charts.setOnLoadCallback(drawRegionsMap)

function drawRegionsMap() {
    var data = google.visualization.arrayToDataTable([
      ['Country', 'Ethnic Tension'],
      ['Russia', 2],
      ['USA', 2],
      ['Northern Corea', 2],
      ['Germany', 2],

      ['France', 1],
      ['England', 1],
    ])

    // https://developers.google.com/chart/interactive/docs/gallery/geochart
    var options = {
        // colorAxis: {colors: ['#6f6', '#f66']},
        colorAxis: {colors: ['#dd6', '#f66']},
        backgroundColor: '#81d4fa',

        tooltip: {
            showColorCode: true,
            textStyle: {
                color: '#6699cc',
                fontName: 'monospace',
                fontSize: '16'
            },
        },
    }

    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'))

    google.visualization.events.addListener(chart, 'select', () => {
        console.log( data.og[chart.getSelection()[0].row].c[0] )
    })

    chart.draw(data, options)
}

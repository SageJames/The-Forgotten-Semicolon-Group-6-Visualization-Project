class ViewA {
    #intraLabel;
    constructor(con, root, data) {
        this.con = con;

        const div = root.append('div')
            .style('position', 'fixed')
            .style('top', '0')
            .style('left', '0')
            .style('width', '50%')
            .style('height', '100%')

        const svg = div.append('svg')
            .style('position', 'fixed')
            .style('top', '0')
            .style('left', '0')
            .style('width', '50%')
            .style('height', '100%');

        // Create a foreignObject element and append it to the SVG
        var foreignObject = svg.append("foreignObject")
            .attr("width", 400)
            .attr("height", 400);

        // Create a div element that will contain the Chart.js chart
        var chartDiv = foreignObject.append("xhtml:div")
            .attr("id", "chart-container")
            .style("width", "100%")
            .style("height", "100%");

        // Create the heatmap chart
        var myChart = new Chart(chartDiv, {
            type: 'heatmap',
            data: data,
            options: {
                title: {
                    display: true,
                    text: 'Car Sales by Region'
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            fontSize: 10
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            fontSize: 10
                        }
                    }]
                }
            }
        });

        const label = svg.append('text')
            .text('View A')
            .style('fill', 'white')
            .style('font-size', '50')
            .attr('y', '450')
            .attr('x', '170')
            .on('click', () => {
                this.con.Message(`View A was clicked`);
            });

        this.#intraLabel = svg.append('text')
            .text(this.name)
            .style('fill', 'black')
            .style('font-size', '20')
            .attr('y', '500')
            .attr('x', '170')
            .on('click', () => {
                this.con.Message(`View A was clicked`);
            });

    }
    Hear(str) {
        this.#intraLabel.text(str);
    }
}
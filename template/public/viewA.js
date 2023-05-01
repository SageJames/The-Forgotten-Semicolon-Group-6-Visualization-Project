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
            .attr("width", "100%")
            .attr("height", "100%");

        // Create a div element that will contain the Chart.js chart
        var chartDiv = foreignObject.append("xhtml:div")
            .attr("id", "chart-container")
            .style("width", "100%")
            .style("height", "100%");

        const salesData = data.map(item => {
            const postingDate = new Date(item.posting_date ? item.posting_date : 'December 17, 1995 03:24:00');
            const year = postingDate.getFullYear().toString();
            const state = item.state;
            const price = item.price;

            return {
                x: year,
                y: state,
                heat: price / 1000
            };
        });

        const groupedData = salesData.reduce((acc, item) => {
            const key = `${item.x}-${item.y}`;
            const index = acc.findIndex(d => d.key === key);
            if (index >= 0) {
                acc[index].heat += item.heat;
                acc[index].count++;
            } else {
                acc.push({
                    key,
                    x: item.x,
                    y: item.y,
                    heat: item.heat,
                    count: 1
                });
            }
            return acc;
        }, []);

        const finalData = groupedData.map(item => ({
            x: item.x,
            y: item.y,
            heat: item.heat / item.count
        }));

        anychart.onDocumentReady(() => {

            // create the chart and set the data
            const chart = anychart.heatMap(finalData);
            
            // set the chart title
            chart.title("Sales by region");
            
            // create and configure the color scale.
            var customColorScale = anychart.scales.linearColor();
            customColorScale.colors(["#ACE8D4", "#00726A"]);
            
            // set the color scale as the color scale of the chart
            chart.colorScale(customColorScale);
            
            // set the container id
            chart.container("chart-container");
            
            // initiate drawing the chart
            chart.draw();
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
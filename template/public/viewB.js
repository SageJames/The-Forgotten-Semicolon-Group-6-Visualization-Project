class ViewB {
    #intraLabel;
    constructor(con, root, data) {
        this.con = con;

        const div = root.append('div')
            .style('position', 'fixed')
            .style('top', '0')
            .style('right', '0')
            .style('width', '50%')
            .style('height', '50%');


        const svg = div.append('svg')
            .style('position', 'fixed')
            .style('top', '0')
            .style('right', '0')
            .style('width', '50%')
            .style('height', '50%');


        // Create a foreignObject element and append it to the SVG
        var foreignObject = svg.append("canvas")
            .attr("id", "chart-b")
            .attr("width", "100%")
            .attr("height", "100%");

        const carData = data.map(item => {
            const postingDate = new Date(item.posting_date ? item.posting_date : 'December 17, 1995 03:24:00');
            const label = postingDate.toLocaleString('default', { month: 'short', year: 'numeric' });
            const price = item.price;

            return {
                x: label,
                y: price,
            };
        });

        // Sums up all of the prices with the same time value
        const sum = {};

        for (const { x, y } of carData) {
            if (x in sum) {
                sum[x] += y;
            } else {
                sum[x] = y;
            }
        }

        // Consolidates all of the data points back in the correct format
        const groupedData = []
        for (let [key, value] of Object.entries(sum)) {
            groupedData.push({
                x: key,
                y: value
            })
        }

        // Set up the chart options
        const options = {
            responsive: true,
            scales: {
                y: {
                    id: "y-axis-1",
                    type: "linear",
                    display: true,
                    position: "left",
                    ticks: {
                        beginAtZero: true,
                    },
                }
            },
        };

        // Set up the bar chart data
        const barData = {
            labels: groupedData.map((d) => d.x),
            datasets: [{
                type: 'bar',
                label: "Total Prices",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255,99,132,1)",
                borderWidth: 1,
                data: groupedData.map((d) => d.y),
                yAxisID: "y-axis-1",
            }, {
                type: 'bubble',
                label: "Average Price",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 2,
                fill: false,
                data: groupedData.map((d) => {
                    const count = carData.filter((car) => car.x === d.x).length;
                    return count > 0 ? d.y / count : 0;
                }),
                yAxisID: "y-axis-2",
            }],
        };

        // Create the chart
        const ctx = svg.append("foreignObject")
            .attr("width", "100%")
            .attr("height", "100%")
            .append("xhtml:canvas")
            .attr("id", "chart-b")
            .node();
        const chart = new Chart(ctx, {
            data: barData,
            options: options,
        });

        const label = svg.append('text')
            .text('View B')
            .style('fill', 'white')
            .style('font-size', '50')
            .attr('y', '215')
            .attr('x', '170')
            .on('click', () => {
                this.con.Message(`View B was clicked`);
            });

        this.#intraLabel = svg.append('text')
            .text(this.name)
            .style('fill', 'black')
            .style('font-size', '20')
            .attr('y', '260')
            .attr('x', '170')
            .on('click', () => {
                this.con.Message(`View B was clicked`);
            });
    }
    Hear(str) {
        this.#intraLabel.text(str);
    }
}
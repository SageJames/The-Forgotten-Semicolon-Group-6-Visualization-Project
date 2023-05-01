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
        var foreignObject = svg.append("foreignObject")
            .attr("width", "100%")
            .attr("height", "100%");

        // Create a div element that will contain the Chart.js chart
        var chartDiv = foreignObject.append("xhtml:div")
            .attr("id", "chart-container")
            .style("width", "100%")
            .style("height", "100%");

        const carData = data.map(item => {
            const postingDate = new Date(item.posting_date);
            const year = postingDate;
            const state = item.state;
            const price = item.price;

            return {
                x: year,
                y: price,
            };
        });

        const groupedData = carData.reduce((acc, item) => {
            const key = `${item.x}-${item.y}`;
            const index = acc.findIndex(d => d.key === key);
            if (index >= 0) {
                acc[index].y += item.y;
                acc[index].count++;
            } else {
                acc.push({
                    key,
                    x: item.x,
                    y: item.y,
                    count: 1
                });
            }
            return acc;
        }, []);

        console.log(groupedData)
        // Find all unique years in the data
        //const uniqueYears = [...new Set(carData.map((d) => d.x))];

        // Get the total price for each year
        // const pricesByYear = uniqueYears.map((year) => {
        //     const prices = carData
        //         .filter((d) => d.x === year)
        //         .map((d) => d.y)
        //         .reduce((sum, price) => sum + price, 0);
        //     return { x: year, y: prices };
        // });

        // console.log(pricesByYear)

        // Set up the chart options
        const options = {
            responsive: true,
            scales: {
                xAxes: [
                    {
                        type: "category",
                        labels: carData.x,
                    },
                ],
            },
        };

        // Set up the bar chart data
        const barData = {
            labels: carData.x,
            datasets: [
                {
                    label: "Total Prices",
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    borderColor: "rgba(255,99,132,1)",
                    borderWidth: 1,
                    data: carData.map((d) => d.y),
                    yAxisID: "y-axis-1",
                },
            ],
        };

        // Set up the line chart data
        const lineData = {
            labels: carData.x,
            datasets: [
                {
                    label: "Average Price",
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 2,
                    fill: false,
                    data: carData.map((d) => {
                        const count = carData.filter((car) => car.x === d.x).length;
                        return count > 0 ? d.y / count : 0;
                    }),
                    yAxisID: "y-axis-2",
                },
            ],
        };

        // Create the chart
        const ctx = document.getElementById("chart-container").getContext("2d");
        const chart = new Chart(chartDiv, {
            type: "bar",
            data: barData,
            options: options,
        });

        // Add the line chart as a second dataset
        // chart.data.datasets.push(lineData.datasets[0]);
        // chart.options.scales.yAxes.push({
        //     id: "y-axis-2",
        //     type: "linear",
        //     display: true,
        //     position: "right",
        //     ticks: {
        //         beginAtZero: true,
        //     },
        // });

        // // Update the chart
        // chart.update();

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
class ViewB {
  #intraLabel;
  constructor(con, root, data) {
    this.con = con;

    const div = root
      .append("div")
      .style("position", "fixed")
      .style("top", "0")
      .style("right", "0")
      .style("width", "50%")
      .style("height", "100%")
      .style("overflow", "scroll");

    const svg = div
      .append("svg")
      .style("position", "relative")
      .style("width", "200%")
      .style("height", "200%");

    // Group the data by year and calculate the average price and condition for each year
    const yearData = d3.group(data, (d) => d.year);
    const yearAverages = Array.from(yearData, ([year, cars]) => ({
      year,
      averagePrice: d3.mean(cars, (d) => d.price),
      averageCondition: d3.mean(cars, (d) => d.condition),
    }));

    // Create scales for the x and y axes
    const xScale = d3
      .scaleBand()
      .domain(yearAverages.map((d) => d.year))
      .range([0, innerWidth])
      .paddingInner(0.05) // add 20% padding between the bars
      .paddingOuter(0.5) // add 10% padding to the outer edges of the scale
      .padding(0.5);

    // Adjust the range of yScale to fit the increased height
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(yearAverages, (d) => d.averagePrice)])
      .range([innerHeight * 0.8, 0]);

    // Add the x-axis to the bar chart
    svg
      .append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(xScale));

    // Add the y-axis to the bar chart
    svg.append("g").call(d3.axisLeft(yScale));

    // Add the bars to the bar chart
    svg
      .selectAll("rect")
      .data(yearAverages)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.year))
      .attr("y", (d) => yScale(d.averagePrice))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => innerHeight - yScale(d.averagePrice))
      .attr("fill", "#69b3a2");

    // Add a hover effect to the bars in the bar chart
    svg
      .selectAll("rect")
      .on("mouseover", function (d) {
        d3.select(this)
          .append("text")
          .attr("fill", "black")
          .text(
            `Year: ${d.year}, Avg. Price: $${d3.format(",")(
              Math.round(d.averagePrice)
            )}, Avg. Condition: ${Math.round(d.averageCondition)}%`
          );

        console.log(
          `Year: ${d.year}, Avg. Price: ${d3.format(",")(
            Math.round(d.averagePrice)
          )}, Avg. Condition: ${Math.round(d.averageCondition)}`
        );
        d3.select(this).attr("fill", "#ff9800");
      })

      .on("mouseout", function (d) {
        d3.select(this).select("text").remove();
        d3.select(this).attr("fill", "#69b3a2");
      });

    // Add a label to the x-axis
    svg
      .append("text")
      .attr("x", innerWidth / 2)
      .attr("y", innerHeight + 60) // increase y-coordinate to avoid overlapping with the bars
      .attr("text-anchor", "middle")
      .text("Year");

    // Add a label to the y-axis
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -innerHeight / 2)
      .attr("y", -45) // adjust y-coordinate to center the label
      .attr("text-anchor", "middle")
      .text("Average Price");

    // Add a label to the bars
    svg
      .selectAll(".bar-label")
      .data(yearAverages)
      .enter()
      .append("text")
      .attr("class", "bar-label")
      .attr("x", (d) => xScale(d.year) + xScale.bandwidth() / 2)
      .attr("y", (d) => yScale(d.averagePrice) - 10)
      .attr("text-anchor", "middle")
      .text((d) => `$${d3.format(",")(Math.round(d.averagePrice))}`);
  }
  Hear(str) {
    this.#intraLabel.text(str);
  }
}

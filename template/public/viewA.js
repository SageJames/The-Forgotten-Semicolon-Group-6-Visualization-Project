class ViewA {
  #intraLabel;
  constructor(con, root, data) {
    this.con = con;

    const div = root
      .append("div")
      .style("position", "fixed")
      .style("top", "0")
      .style("left", "0")
      .style("width", "50%")
      .style("height", "100%")
      .style("overflow", "scroll");

      const svg = div
      .append("svg")
      .style("position", "relative")
      .style("left", "10")
      .style("top", "20")
      .style("width", "200%")
      .style("height", "150%");

    // Group the data by region and calculate the average car condition for each region
    const regionData = d3.group(data, (d) => d.region);
    const regionAverages = Array.from(regionData, ([region, cars]) => ({
      region,
      average: d3.mean(cars, (d) => d.condition), 
    }));

    // Create a scale for the color of the heat map based on the average car condition
    const colorScale = d3
      .scaleSequential()
      .interpolator(d3.interpolateViridis)
      .domain([
        d3.min(regionAverages, (d) => d.average),
        d3.max(regionAverages, (d) => d.average),
      ]);

    // Create a rectangle for each region in the heat map
    svg
      .selectAll("rect")
      .data(regionAverages)
      .enter()
      .append("rect")
      .attr("x", (d, i) => (i % 18) * 40)
      .attr("y", (d, i) => Math.floor(i / 18) * 40)
      .attr("width", 30)
      .attr("height", 30)
      .attr("fill", (d) => colorScale(d.average))
      .on("mouseover", function (d) {
        d3.select(this)
          .append("text")
          .attr("x", (d, i) => (i % 18) * 40)
          .attr("y", (d, i) => Math.floor(i / 18) * 40)
          .attr("fill", "black")
          .text((d) => d.region);
      })
      .on("mouseout", function (d) {
        d3.select(this).select("text").remove();
      })
      .append("title") // Add a title element for the tooltip
      .text((d) => `${d.region}, Avg. Condition: ${d.average}`); // Set the title text to the region and average condition
  }

  getConditionNumber(condition) {
    const conditionNumbers = {
      'New': 1,
      'Like new': 2,
      'Excellent': 3,
      'Good': 4,
      'Fair': 5,
      'Salvage': 6
    };
    
    // Check if the input condition exists in the mapping object
    if (condition in conditionNumbers) {
      return conditionNumbers[condition];
    } else {
        
      // If the input condition doesn't exist in the mapping object, return null or throw an error
      return null;
    }
  }
  

  Hear(str) {
    this.#intraLabel.text(str);
  }
}

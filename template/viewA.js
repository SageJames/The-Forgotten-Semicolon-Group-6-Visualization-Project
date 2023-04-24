class ViewA {
    #intraLabel;
    constructor(con, root, data) {
        this.con = con;

        const div = root.append('div')
                        .style('position','fixed')
                        .style('top','0')
                        .style('left','0')
                        .style('width','50%')
                        .style('height','100%')

        const svg = div.append('svg')
                        .style('position','fixed')
                        .style('top','0')
                        .style('left','0')
                        .style('width','50%')
                        .style('height','100%');

        const rect = svg.append('rect')
                        .style('y','300')
                        .style('x','120')
                        .style('width','250')
                        .style('height','250')
                        .style('fill', '#B8860B')
                        .on('click', ()=>{
                            this.con.Message(`View A was clicked`);
                        });

        const label = svg.append('text')
                        .text('View A')
                        .style('fill', 'white')
                        .style('font-size', '50')
                        .attr('y','450')
                        .attr('x','170')
                        .on('click', ()=>{
                            this.con.Message(`View A was clicked`);
                        });

        this.#intraLabel = svg.append('text')
                        .text(this.name)
                        .style('fill', 'black')
                        .style('font-size', '20')
                        .attr('y','500')
                        .attr('x','170')
                        .on('click', ()=>{
                            this.con.Message(`View A was clicked`);
                        });

    }
    Hear(str){
        this.#intraLabel.text(str);
    }
}
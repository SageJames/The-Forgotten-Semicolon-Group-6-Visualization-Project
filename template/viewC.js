class ViewC {
    #intraLabel;
    constructor(con, root) {
        this.con = con;

        const div = root.append('div')
                        .style('position','fixed')
                        .style('bottom','0')
                        .style('right','0')
                        .style('width','50%')
                        .style('height','50%');
                        

        const svg = div.append('svg')
                        .style('position','fixed')
                        .style('bottom','0')
                        .style('right','0')
                        .style('width','50%')
                        .style('height','50%');
                        

        const rect = svg.append('rect')
                        .style('y','80')
                        .style('x','120')
                        .style('width','250')
                        .style('height','250')
                        .style('fill', 'pink')
                        .on('click', ()=>{
                            this.con.Message(`View C was clicked`);
                        });


        const label = svg.append('text')
                        .text('View C')
                        .style('fill', 'white')
                        .style('font-size', '50')
                        .attr('y','225')
                        .attr('x','170')
                        .on('click', ()=>{
                            this.con.Message(`View C was clicked`);
                        });

        this.#intraLabel = svg.append('text')
                        .text(this.name)
                        .style('fill', 'black')
                        .style('font-size', '20')
                        .attr('y','260')
                        .attr('x','170')
                        .on('click', ()=>{
                            this.con.Message(`View C was clicked`);
                        });

    }
    Hear(str){
        this.#intraLabel.text(str);
    }
}
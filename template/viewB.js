class ViewB {
    #intraLabel;
    constructor(con, root) {
        this.con = con;

        const div = root.append('div')
                        .style('position','fixed')
                        .style('top','0')
                        .style('right','0')
                        .style('width','50%')
                        .style('height','50%');
                        
                        
        const svg = div.append('svg')
                        .style('position','fixed')
                        .style('top','0')
                        .style('right','0')
                        .style('width','50%')
                        .style('height','50%');
                        

        const rect = svg.append('rect')
                        .style('y','70')
                        .style('x','120')
                        .style('width','250')
                        .style('height','250')
                        .style('fill', '#6495ED')
                        .on('click', ()=>{
                            this.con.Message(`View B was clicked`);
                        });

        const label = svg.append('text')
                        .text('View B')
                        .style('fill', 'white')
                        .style('font-size', '50')
                        .attr('y','215')
                        .attr('x','170')
                        .on('click', ()=>{
                            this.con.Message(`View B was clicked`);
                        });
        
        this.#intraLabel = svg.append('text')
                        .text(this.name)
                        .style('fill', 'black')
                        .style('font-size', '20')
                        .attr('y','260')
                        .attr('x','170')
                        .on('click', ()=>{
                            this.con.Message(`View B was clicked`);
                        });
    }
    Hear(str){
        this.#intraLabel.text(str);
    }
}
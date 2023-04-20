new (class Control {
    #viewA;
    #viewB;
    #viewC;

    constructor() {
        // Add new div to body
        const root = d3.select('body').append('div')
                        .style('position','fixed')
                        .style('top','0')
                        .style('left','0')
                        .style('width', '100%')
                        .style('height', '100%');

        this.#viewA = new ViewA(this, root);
        this.#viewB = new ViewB(this, root);
        this.#viewC = new ViewC(this, root);
    }

    Test(str) {
        console.log(str);
    }

    //Let other views know that a view has been clicked
    Message(str){
        this.#viewA.Hear(str)
        this.#viewB.Hear(str)
        this.#viewC.Hear(str)
    }
})()
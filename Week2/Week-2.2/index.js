class Rectangle{
    constructor (width, height , color){
        this.width = width,
        this.height = height , 
        this.color = color;
    }
    area(){
        const area = this.width * this.height;
        return area;
    }
    paint(){    
        console.log("Painting with Color " + this.color);  
    }
}

//create an object = const
// to create a class to give it values we use = class

const rect = new Rectangle(2,4, "black");
const area = rect.area();   
rect.paint();  
console.log(area);
const rect2 = new Rectangle(10,40, "blue");
const area1 = rect2.area();
rect2.paint();  
console.log(area1);


//old syntax - no class name is attached to it ,  only a simple key value pair.
let rect1 = {
    width1: 20,
    height1: 40,
    area: function(){
        return rect1.width1 * rect1.height1;
    }
}

// Rectangle naam ka class bana rahe ho - jismein width, height, aur color ke properties hain
class Rectangle{
    // Constructor jo object banate waqt call hota hai - teeno parameters leta hai
    constructor (width, height , color){
        // Width ko store karti hai
        this.width = width,
        // Height ko store karti hai
        this.height = height , 
        // Color ko store karti hai
        this.color = color;
    }
    // Area nikalne ka method - width aur height ko multiply karta hai
    area(){
        // Width * Height = Area (area nikaal rahe ho)
        const area = this.width * this.height;
        // Area return kar rahe ho
        return area;
    }
    // Paint method - jo color print karti hai
    paint(){    
        // Console mein color print ho rahe ho
        console.log("Painting with Color " + this.color);  
    }
}

// Rectangle ke through object bante hain - naye rectangle ko instantiate kar rahe ho
const rect = new Rectangle(2,4, "black");
// rect ke area method ko call kar rahe ho
const area = rect.area();   
// rect ko paint karti ho - black color se
rect.paint();  
// Area print karti ho
console.log(area);
// Doosra rectangle banate ho - size 10x40 blue color ka
const rect2 = new Rectangle(10,40, "blue");
// rect2 ka area nikaal rahe ho
const area1 = rect2.area();
// rect2 ko paint karti ho
rect2.paint();  
// Area print karti ho
console.log(area1);


// Purana tarika - jab classes nahi the - simple object use karte the
let rect1 = {
    // Width property
    width1: 20,
    // Height property
    height1: 40,
    // Area nikalne ka function
    area: function(){
        // Width aur height ko multiply karta hai
        return rect1.width1 * rect1.height1;
    }
}

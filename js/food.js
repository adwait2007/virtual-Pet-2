class Food{
    constructor(foodStock=20,lastFed=20){
        this.image=loadImage("images/Milk.png");
        this.foodStock=foodStock;
        this.lastFed=lastFed;
    }
    getFoodStock(){
          this.foodStock=database.ref('foodStock');
            this.foodStock.on('value',function(data){
                this.foodStock=data.val();
            });
    }
    updateFoodStock(){
       database.ref('/').update({
           FoodStock:this.foodStock
       });
    } 
    deductFood(){
        this.foodStock=this.foodStock-1
       }
    display(){
    var x=380,y=180;
         
         if(this.foodStock!=0){
              for(var i=0;i<this.foodStock;i++){
                  if(i%10===0){
                     x=380;
                     y=y+50;
                  }
                  image(this.image,x,y,50,50);
                  x=x+30;
              }
         }
    }
}
class GameObject
{
    constructor()
    {
     this.x=50;
     this.y=1000;
     this.angle = 0;
     this.w=50;
     this.h=50;
     this.vx=5;
     this.vy=0;
     this.color = `hotpink`
    }

    //Draws a rectangle 
    render()
    {
        ctx.save();
            ctx.fillStyle = this.color
            ctx.translate(this.x, this.y)
            ctx.rotate(this.angle*Math.PI/180)
            ctx.fillRect(-this.w/2, -this.h/2, this.w, this.h)
        ctx.restore();
    }

    //Moves an object by adding it's velocity to it's position on each axis
    move()
    {
        this.x = this.x + this.vx
        this.y = this.y + this.vy
    }

    top(){return {x: this.x ,y:this.y - this.h/2}}

    bottom(){return {x: this.x,y:this.y + this.h/2}}

    left(){return {x:this.x - this.w/2,y:this.y}}

    leftbottom(){return {x:this.x - this.w/2 + 6,y:this.y + this.h/2}}

    right(){return {x:this.x + this.w/2, y:this.y}}

    rightbottom(){return {x:this.x + this.w/2 - 6,y:this.y + this.h/2}}


    overlaps(_obj)
    {
        if(
           this.top().y < _obj.bottom().y && 
           this.bottom().y > _obj.top().y &&
           this.leftbottom().y > _obj.top().y &&
           this.left().x < _obj.right().x &&
           this.rightbottom().y > _obj.top().y &&
           this.right().x > _obj.left().x
        )
        {
            return true
        }
        return false;
    }

    hitTestPoint(_point){
        //console.log("Test")
        if(
            this.top().y <= _point.y && 
            this.bottom().y > _point.y && 
            this.leftbottom().y > _point.y && 
            this.left().x < _point.x &&
            this.rightbottom().y > _point.y && 
            this.right().x > _point.x
        )
        {
            return true
        }
        return false;
    }

}
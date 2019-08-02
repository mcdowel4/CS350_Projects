var functions = [circle, square, triangle];

function getShape(xCord, yCord)
{
    var shape = 0; //Math.floor(Math.random()*3);

    if(shape==0)
    {
        circle(xCord, yCord);
    }
    else if(shape == 1)
    {
        square(xCord, yCord);
    }
    else if(shape == 2)
    {
        triangle(xCord, yCord);
    }
}

function circle(xCord, yCord)
{
    var b = document.getElementById("board");
    var context = b.getContext("2d");

    context.beginPath();
    context.arc(xCord,yCord,Math.floor(Math.random()*50), 0, Math.PI,true);
    context.fillStyle = black;
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle=black;
    context.stroke();
}

class Coordinate
{
    constructor(xCord, yCord)
    {
        this.xCord=xCord;
        this.yCord=yCord;
    }

    getXCord()
    {
        return this.xCord;
    }

    getYCord()
    {
        return this.yCord;
    }

    static getNumberOfPoints()
    {
        return Coordinate.count;
    }
}

function getClick(e)
{
    var coordinate;

    if(Coordinate.getNumberOfPoints < 5)
    {
        coordinate = new Coordinate(e.clientX, e.ClientY);

        var b = document.getElementById("board");
        var context = b.getContext("2d");
        var rect = canvas.getBoundingClientRect();

        intervals[intervals.length] = setIntervale(function()
        {
            getShape(coordinate.getXCord() - rect.left, coordinate.getYCord() - rect.top);
        }, 200);

        document.getElementById("coord").innerHTML = coordinate.value();
    }
    else
    {
        
    }
}
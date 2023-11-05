export class Point {
    x: number
    y: number


  constructor(x: number, y: number) {
    this.x=x
    this.y=y
  }

  distance(p:Point) {
    return Math.sqrt(Math.pow(p.x - this.x, 2) + Math.pow(p.y - this.y, 2));
  }
}
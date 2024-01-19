export class Shape {

  getRect(x, y, w, h, color) {
    return {
      type: 'Rect',
      x, y, w, h, color
    }
  }
}
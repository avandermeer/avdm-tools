const $ = require('jquery');


module.exports = function(){

  this.movable;
  this.followClass; //check al the elements with this class for the activeclass
  this.activeClass; //move to the active class
  this.direction; //bottom, top, left, right

  this.init = function(movableId, followClass, activeClass, direction){
    this.movable = $(movableId);
    this.followClass = followClass;
    this.activeClass = activeClass;
    this.direction = direction;

    //prepare style of movable
    this.movable.css({
      position: 'absolute',
    })
  }

  /**
   * The update function
   */
  this.update = function(){
    console.log($(this.followClass))
    let self = this;
    $(this.followClass).each(function(){
      console.log(this);
      console.log($(this).hasClass(self.activeClass.substring(1)));
      if($(this).hasClass(self.activeClass.substring(1))){
        console.log("ha!!!")

        if(self.direction=='bottom'){
          self.moveToBottom($(this));
        }
        if(self.direction=='top'){
          self.moveToTop($(this));
        }
        if(self.direction=='left'){
          self.moveToLeft($(this));
        }
        if(self.direction=='right'){
          self.moveToRight($(this));
        }

      }
    });
  }

  /**
   * move to Bottom
   * @param moveToElement
   */
  this.moveToBottom = function(moveToElement){
    console.log("to bottom", moveToElement)
    let xPos = this.calcX(moveToElement);
    let yPos = moveToElement.height() + moveToElement.offset().top;
    console.log("ypos", yPos)

    this.movable.css({
      left: xPos,
      top: yPos
    })

  }

  /**
   * move to Top
   * @param moveToElement
   */
  this.moveToTop = function(moveToElement){
    let xPos = this.calcX(moveToElement);
    let yPos = moveToElement.offset().top - this.movable.height();

    this.movable.css({
      left: xPos,
      top: yPos
    })
  }



  /**
   * move to Left
   * @param moveToElement
   */
  this.moveToLeft = function(moveToElement){
    let xPos = moveToElement.offset().left - this.movable.width();
    let yPos = this.calcY(moveToElement)

    this.movable.css({
      left: xPos,
      top: yPos
    })

  }

  /**
   * move to Right
   * @param moveToElement
   */
  this.moveToRight = function(moveToElement){
    let xPos = moveToElement.offset().left + moveToElement.width();
    let yPos = this.calcY(moveToElement)

    this.movable.css({
      left: xPos,
      top: yPos
    })

  }


  /**
   *
   * @param moveToElement
   * @returns {number}
   */
  this.calcX = function(moveToElement){
    //calculate center of element
    const centerRootX = moveToElement.width()/2 + moveToElement.offset().left;

    //calculate center of moveable
    const centerMovableX = this.movable.width()/2;
    const movableX = centerRootX - centerMovableX;

    return movableX;
  }


  /**
   *
   * @param moveToElement
   * @returns {number}
   */
  this.calcY = function(moveToElement){
    //calculate center of element
    const centerRootY = moveToElement.height()/2 + moveToElement.offset().top;

    //calculate center of moveable
    const centerMovableY = this.movable.height()/2;
    const movableY = centerRootY - centerMovableY;

    return movableY;

  }



}
const $ = require('jquery');


module.exports = function() {

  this.movable;
  this.followClass; //check al the elements with this class for the activeclass
  this.activeClass; //move to the active class
  this.direction; //bottom, top, left, right
  this.started = false;

  this.interval;

  this.init = function(movableId, followClass, activeClass, direction) {
    this.movable = $(movableId);
    this.followClass = followClass;
    this.activeClass = activeClass;
    this.direction = direction;

    //prepare style of movable
    this.movable.css({
      position: 'absolute',
      opacity: '0',
    });
  };

  /**
   * START
   */
  this.start = function() {

    // start if not started yet
    if (!this.started) {
      this.started = true;

      this.movable.css({
        opacity: '1',
      });
      this.interval = window.setInterval(() => {
        this.watchOffsetOfParent();
      }, 100);

      // add watchers
      $(window).resize(() => this.update());
      $(document).scroll(() => this.update());


    }


  };

  this.stop = function(){
    clearInterval(this.interval);
    console.log("stop");
  }

  /**
   * The update function
   */
  this.update = function() {


    let self = this;
    $(this.followClass).each(function() {
      if ($(this).hasClass(self.activeClass.substring(1))) {

        if (self.direction == 'bottom') {
          self.moveToBottom($(this));
        }
        if (self.direction == 'top') {
          self.moveToTop($(this));
        }
        if (self.direction == 'left') {
          self.moveToLeft($(this));
        }
        if (self.direction == 'right') {
          self.moveToRight($(this));
        }

      }
    });

    //first update, then start
    this.start();

  };

  /**
   * move to Bottom
   * @param moveToElement
   */
  this.moveToBottom = function(moveToElement) {
    let xPos = this.calcX(moveToElement);
    let yPos = moveToElement.height() + moveToElement.offset().top;

    this.movable.css({
      left: xPos,
      top: yPos,
    });

  };

  /**
   * move to Top
   * @param moveToElement
   */
  this.moveToTop = function(moveToElement) {
    let xPos = this.calcX(moveToElement);
    let yPos = moveToElement.offset().top - this.movable.height();

    this.movable.css({
      left: xPos,
      top: yPos,
    });
  };


  /**
   * move to Left
   * @param moveToElement
   */
  this.moveToLeft = function(moveToElement) {
    let xPos = moveToElement.offset().left - this.movable.width();
    let yPos = this.calcY(moveToElement);

    this.movable.css({
      left: xPos,
      top: yPos,
    });

  };

  /**
   * move to Right
   * @param moveToElement
   */
  this.moveToRight = function(moveToElement) {
    let xPos = moveToElement.offset().left + moveToElement.width();
    let yPos = this.calcY(moveToElement);

    this.movable.css({
      left: xPos,
      top: yPos,
    });

  };


  /**
   *
   * @param moveToElement
   * @returns {number}
   */
  this.calcX = function(moveToElement) {
    //calculate center of element
    const centerRootX = moveToElement.width() / 2 + moveToElement.offset().left;

    //calculate center of moveable
    const centerMovableX = this.movable.width() / 2;
    const movableX = centerRootX - centerMovableX;

    return movableX;
  };


  /**
   *
   * @param moveToElement
   * @returns {number}
   */
  this.calcY = function(moveToElement) {
    //calculate center of element
    const centerRootY = moveToElement.height() / 2 + moveToElement.offset().top;

    //calculate center of moveable
    const centerMovableY = this.movable.height() / 2;
    const movableY = centerRootY - centerMovableY;

    return movableY;

  };


  this.previousOffset = 0;
  this.watchOffsetOfParent = function() {
//    console.log('anim');

//    console.log(this.followClass, $(this.followClass));

    const newOffset = $(this.followClass + ':lt(1)').offset().top + $(this.followClass + ':lt(1)').offset().left;
    if (this.previousOffset != newOffset) {
      this.update();
      this.previousOffset = newOffset;
    }


  };


};
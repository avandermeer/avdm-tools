const $ = require('jquery');


module.exports = function(){

		this.stickToTop = [];
		this.stickCounter = 0;

		this.init = function(target){
				$(target).attr("data-stick-index", this.stickCounter);
				this.stickCounter++;
				this.stickToTop.push($(target));
				$(target).after($(target).clone().addClass('to-stick'));

				//fire at init
				this.updateSticks();
		}


		this.initByClass = function(className){
			let self = this;
			$('.'+className).each(function() {
				$(this).attr("data-stick-index", self.stickCounter);
				self.stickCounter++;
				self.stickToTop.push($(this));
				$(this).after($(this).clone().addClass('to-stick'));
			});

			//fire at init
			this.updateSticks();
		}


		this.updateSticks = function() {
			var top = window.pageYOffset;
			this.stickToTop.forEach((element)=> {
				var distance = top - element.offset().top;
				var stickElement = $('.to-stick[data-stick-index=' + element.attr("data-stick-index") + ']');

				var mode = element.attr("data-stick-until") ? element.attr("data-stick-until") : "simple";
				var endOffset = 0;

				//END OF ELEMENT
				if(mode == "endOfElement") {
					endOffset = element.height();
				}

				//PARENTHEIGHT
				if(mode == "parentHeight") {
					endOffset = element.parent().height();
				}

				//NEXTSIBBLINGHEIGHT
				if(mode == "nextSibblingHeight") {
					endOffset = element.next().next().height(); //twice, because of cloned element
				}

				if(mode == "simple" || endOffset == 0 ) { //if mode is not specified, or mode = simple
					endOffset = 9999999999999999999999;
				}

				if(distance > 0 && distance < endOffset) {
					element.addClass("sticked-hide");
					stickElement.addClass("sticked");
				}
				else {
					element.removeClass("sticked-hide");
					stickElement.removeClass("sticked");
				}
			});

		}

		/**
		 * CONSTRUCT
		 */
			
		//set events
		$(document).scroll(()=> this.updateSticks() );

		$(window).resize(()=> this.updateSticks());



}
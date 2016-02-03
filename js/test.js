$(document).ready(function() {
		// .modal-backdrop classes
	$(".modal-transparent").on('show.bs.modal', function () {
	  setTimeout( function() {
	    $(".modal-backdrop").addClass("modal-backdrop-transparent");
	  }, 0);
	});
	$(".modal-transparent").on('hidden.bs.modal', function () {
	  $(".modal-backdrop").addClass("modal-backdrop-transparent");
	});
  $.ajax({
          type: 'GET',
          url: '../data/facebookOutput.txt',
          dataType:'json',
          success: function(data) {
						// console.log(data);
						var pinuserObjects = parseFacebookJSON(data);
						// console.log(pinuserObjects);
						for (var i = 0; i < pinuserObjects.length; i++) {
							createArticle(pinuserObjects[i]);
						}
						loadPinPlugin();
          },
          error: function(err) {
              console.log("error"+err);
          }
  });

 	var parseFacebookJSON = function(data) {
		var pinuserObjects = [];
		for(var i = 0; i < data.length; i++) {
			var user= {};
			for (var j = 0; j < data[i].posts.length; j++) {
				var post = data[i].posts[j];
				if (post.pictureURL && post.caption) {
					user.imgsrc = post.pictureURL;
					user.url = post.postURL;
					user.title = post.caption;
					user.description = post.description;
					user.likeCount = post.likesCount;
					pinuserObjects.push(user);
					break;
				}
			}
		}
		return pinuserObjects;
	};

	var parsePinJSON = function(data) {
		var pinuserObjects = [];
		for(var i = 0; i < data.length; i++) {
			var user = {};
			user.imgsrc = data[i].imgSrc;
			user.url = data[i].pinURL;
			user.title = data[i].title;
			user.description = data[i].description;
			user.likeCount = data[i].likeCount;
			pinuserObjects.push(user);
		}
		// console.log(pinuserObjects);
		return pinuserObjects;
	};

	// create <article> element on the fly
	var createArticle = function(pin) {
		var article = $("<article></article>").addClass("white-panel");
		var img = $("<img>").attr("src", pin.imgsrc).appendTo(article);
		var title = $("<h1><a></a>title</h1>").text(pin.title).appendTo(article);
		var description = $("<P>placeholder</p>").text(pin.description).appendTo(article);
		var likeDiv = $("<div></div>");
		var likeIcon = $("<span></span>");
		likeIcon.addClass("glyphicon glyphicon-heart pull-left");
		var likeBadge = $("<span></span>").text(pin.likeCount);
		likeBadge.addClass("badge");
		var likeButton = $("<button>More</button>")
										.attr("data-toggle", "modal")
										.attr("data-target", "#modal-transparent")
										.attr("data-pinurl", pin.url);
		likeButton.addClass("btn btn-primary btn-sm pull-right");
		likeDiv.append(likeIcon);
		likeDiv.append(likeBadge);
		likeDiv.append(likeButton);
		article.append(likeDiv);
		$("#demo").append(article);

		$('#modal-transparent').on('show.bs.modal', function (event) {
			var button = $(event.relatedTarget);
			var url = button.data('pinurl');
			var modal = $(this);
			console.log(url);
		  $(modal.find('a')).attr("href", url);
		});
	};

	var loadDataToCards = function(pinData) {
		var pins = pinData;
		var articles = $("#demo").children("article");
		for (var i = 0; i < pins.length; i++) {
			var article = $(articles[i]);
			var pin = pins[i];
			article.find("img").attr("src", pin.imgsrc);
			article.find("a").attr("href", pin.pinURL);
			article.find("h1").text(pin.title);
			article.find("p").text(pin.description);
			article.find(".badge").text(pin.likeCount);
		}
	};

	var loadPinPlugin = function() {
		$('#demo').pinterest_grid({
			no_columns: 4,
			padding_x: 10,
			padding_y: 10,
			margin_bottom: 50,
			single_column_breakpoint: 700
		});
	};

});

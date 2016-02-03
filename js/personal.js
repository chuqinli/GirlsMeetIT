$(document).ready(function() {
    $("#submit").on("click",function(){
        i = gerElementById(""); 
        window.location.href = "personal.html";
        $.ajax({
            type: 'GET',
            url: '../data/facebookOutput.txt',
            dataType:'json',
            success: function(data){
                console.log(data);
                console.log(data[0].userName);
                for (var i = 0; i < data.length; i++) {
                    var user = {
                        posts: []
                    };
                    user.userName = data[i].userName;
                    user.latitude = data[i].latitude;
                    user.longtitude = data[i].longitude;
                    user.about = data[i].about;
                    user.coverpicURL = data[i].coverPicURL;
                    for(var j = 0; j<4;j++){
                        user.posts[j] = data[i].posts[j].message;
                }
                    userObjects.push(user);

                }
                for( var n = 0; n < user.posts.length; n++){
                    
                }
                $('#photo').attr("src",userObjects[i].coverpicURL);
                $('.detail p').text((userObjects[i]).about);
                $('.post .leftpost').text((userObjects[i]).about)
                console.log("success get: ", userObjects[0].coverpicURL);
            },
            error: function(err)
            {
                console.log("error"+err);
            }    
        });

    });
    
});
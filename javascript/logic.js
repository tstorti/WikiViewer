  $(document).ready(function() {
      var title;
      var link;
      $("#getArticles").on("click", function(){  
         //set search criteria in url for API call
         var search = $("#userInput").val();
         var url ='https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&origin=*&continue=&titles='+ search + '&srsearch='+search;
         var snippet=null;
         //reset results section before new search
         $("#resultBlock").html("");
         $("#noResults").html("");
         //API call
         $.getJSON(url, function(json){
            //message for no results
            if(json.error){
               $("#noResults").attr("style", "visibility:visible");
               $("#noResults").html(json.error.info);
            }
            else{
            //fill any result blocks with based on search results
               $("#resultBlock").attr("style","visibility:visible");
               for (var i=0;i<json.query.search.length;i++){
                  snippet=json.query.search[i].snippet+"...";
                  title=json.query.search[i].title;
                  title=title.split(' ').join('_');
                  link="https://en.wikipedia.org/wiki/"+title;
                  $("#resultBlock").append("<div class=\"resultBlock\"><a class=\"title\" href="+link+">"+title+"</a><p>"+snippet+"</p></div>");
               } 
            }
            }); 
         });
         
      $("#getRandom").on("click", function(){  
         //set API url for random article
         var url ='https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=&list=random&meta=&continue=&titles=Main+Page';
         //reset results section before new search
         $("#resultBlock").html("");
         $("#noResults").html("");
         $("#resultBlock").attr("style","visibility:visible")
         //API call for random wikipedia article
         $.getJSON(url, function(json){
               title=json.query.random[0].title;
               title=title.split(' ').join('_');
               link="https://en.wikipedia.org/wiki/"+title;
               $("#resultBlock").append("<div class=\"resultBlock\"><a class=\"title\" href="+link+">"+title+"</a></div>");
         });

      
      });
   });


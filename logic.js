  $(document).ready(function() {
      $("#getArticles").on("click", function(){  
         //set search criteria for API call
         var search = $("#userInput").val();
         var url ='https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&origin=*&continue=&titles='+ search + '&srsearch='+search;
         //API call for 10 related wikipedia articles
         $("#randomLink").attr("style","visiblility:hidden");
         $("#randomLink").html("");

         $.getJSON(url, function(json){
            for (var i=0;i<9;i++){
               var linkID="#link"+i;
               var snippetID="#snippet"+i;
               $(linkID).html(json.query.search[i].title);
               $(linkID).attr("href","https://en.wikipedia.org/wiki/"+json.query.search[i].title);
               $(linkID).attr("style","visiblility:visible");
               $(snippetID).html(json.query.search[i].snippet+" ...");
            }        
         });
      });
      $("#getRandom").on("click", function(){  
         //hide links to any previously conducted article search
         for (var i=0;i<9;i++){
               var linkID="#link"+i;
               var snippetID="#snippet"+i;
               $(linkID).html("");
               $(linkID).attr("href","*");
               $(linkID).attr("style","visiblility:hidden");
               $(snippetID).html("");
            } 
         var url2 ='https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=&list=random&meta=&continue=&titles=Main+Page';
         console.log(url2);
         //API call for random wikipedia article
         $.getJSON(url2, function(json){
               $("#randomLink").html(json.query.random[0].title);
               $("#randomLink").attr("href","https://en.wikipedia.org/wiki/"+json.query.random[0].title);
               $("#randomLink").attr("style","visiblility:visible");        
         });
      });
   });
   

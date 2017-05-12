var title =null;
var link= null;
var snippet=null;
var searchCriteria=null;
var url=null;

$(document).ready(function() {

    //execute functions if the Get Articles Button is pressed
    $("#getArticles").on("click", function(){  
        //set search criteria in url for API call
        setSearch();
        //reset results section before new search
        reset();
        //API call and show results
        search(url, searchCriteria);
    });

    //execute functions if the Get Random Article Button is pressed
    $("#getRandom").on("click", function(){  
        //set API url for random article
        setRandomURL();
        //reset results section before new search
        reset();
        //API call for random wikipedia article and show result
        random(url);
        
    });
});

//function performs API call for random article and sets a result block with the link and title of the article
function random(url){  
    //API call for random wikipedia article
    $.getJSON(url, function(json){
        title=json.query.random[0].title;
        //need to change blank spaces in title to underscore so link will work properly for multi-word articles
        title=title.split(' ').join('_');
        link="https://en.wikipedia.org/wiki/"+title;
        //set result block with results of API call
        $("#resultBlock").append("<div class=\"resultBlock\"><a class=\"title\" href="+link+">"+title+"</a></div>");
    });
}
//reset results section before new search
function reset(){
   $("#resultBlock").html("");
   $("#noResults").html("");
}

//perform API call and determine if error message or results should be displayed.
function search(url,searchCriteria){
    
    $.getJSON(url, function(json){
        //message for no results
        if(json.error){
            //if error with API query notify user with error info provided by API
            $("#noResults").attr("style", "visibility:visible");
            $("#noResults").html(json.error.info);
        }
        //if results are found
        else{
            //fill any result blocks with based on search results
            showSearchResults(json);
            } 
        });
}

//set search url for Random Article API call
function setRandomURL(){
   url ='https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=&list=random&meta=&continue=&titles=Main+Page';
}

//set search criteria in url for API call
function setSearch(){
   searchCriteria = $("#userInput").val();
   url ='https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&origin=*&continue=&titles='+ searchCriteria + '&srsearch='+searchCriteria;
}

//iterate through the search results provided by API and output results
function showSearchResults(json){
    for (var i=0;i<json.query.search.length;i++){
        //set article description
        snippet=json.query.search[i].snippet+"...";
        //set article title
        title=json.query.search[i].title;
        //need to change blank spaces in title to underscore so link will work properly for multi-word articles
        title=title.split(' ').join('_');
        link="https://en.wikipedia.org/wiki/"+title;
        $("#resultBlock").append("<div class=\"resultBlock\"><a class=\"title\" href="+link+">"+title+"</a><p>"+snippet+"</p></div>");
    } 
}

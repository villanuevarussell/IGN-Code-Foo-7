
//**Events**
//events will only be able to trigger after page loads
$(document).ready(function(){ 
    //if this id is clicked then it will fade out and add 10 more to list of videos
    $(".seeMoreVideos").on('click',function(){
        $(this).fadeOut('slow');
        videoRequest();
    }); 
    //if this id is clicked then it will fade out and add 10 more to list of articles
    $(".seeMoreArticles").on('click',function(){
        $(this).fadeOut('slow');
        articleRequest();
    }); 
   
   //if you click anywhere on the webpage that isn't one of the clickable items
   //then it hides all thumbnail and button
    $(document).click(function(){   
        $(this).find(".text").show();
        $(this).find(".videoName").show();
        $(this).find(".subline").show();
        
        $(".videoThumbnail").hide();
        $(".articleThumbnail").hide();
        $(".button").hide();      
    });
    
    //if this id is clicked then it hides the currently showing video thumbnail 
    //and button link and then shows the thumbnail for the video box clicked 
    $(document).on('click','.videoBoxes',function(event){
        //resets to default position before applying event
        defaultPosition();
        //events that occur after id video boxes is clicked
        $(this).find(".text").hide();
        $(this).find(".videoName").hide();
        $(this).find(".subline").hide();       
        $(this).find(".videoThumbnail").toggle();
        $(this).find(".button").toggle();
        event.stopPropagation();//
    }); 
    
    //if this id is clicked then it hides the currently showing article thumbnail 
    //and button link and then shows the thumbnail for the video box clicked
    $(document).on('click','.articleBoxes',function(event)
    {      
        //resets to defaultPosition
        defaultPosition();
        
        //events that occur after id video boxes is clicked
        $(this).find(".text").hide();
        $(this).find(".articleName").hide();
        $(this).find(".subline").hide();       
        $(this).find(".articleThumbnail").toggle();
        $(this).find(".button").toggle();
        event.stopPropagation();//       

    });    
});

//**Main**

//variables to keep track of the number of videos or articles on the page
var countVideos = 0;
var countArticles = 0;


//This loads the first ten Videos and Articles onto pages with the IDs 'videos' and 'articles'
videoRequest();
articleRequest();





//**Function Definitions**

//function that resets the tags to how it is when page originally loads
function defaultPosition()
{
    $(".videoThumbnail").hide();
    $(".articleThumbnail").hide();
    $(".button").hide(); 
    $(".text").show();
    $(".articleName").show();
    $(".videoName").show();
    $(".subline").show();  

}



//requests videos and writes onto page
function videoRequest()
{
  var videoRequest = new XMLHttpRequest();
  videoRequest.open('GET','Videos.json');
  videoRequest.onload = function()
  {
    var ourData = JSON.parse(videoRequest.responseText);
    
    //writes the videos onto the page
    renderVideoHTML(ourData);
  };

  videoRequest.send();
}

function articleRequest()
{
  var articleRequest = new XMLHttpRequest();
  articleRequest.open('GET','Articles.json');
  articleRequest.onload = function(){
    var articleData = JSON.parse(articleRequest.responseText);
    renderArticleHTML(articleData);
  };
  articleRequest.send();
}


//prints videos onto HTML wit headline and subheadline and time
function renderVideoHTML(data)
{
  var htmlString = "";
  var img;
  var url;
  var durationMinutes = 0;
  var durationSeconds = 0;

  for(var i = 0;(i % 10) !=0 || i == 0;i++)
  {
    durationMinutes = Math.floor(data.data[i].metadata.duration / 60);
    durationSeconds = data.data[i].metadata.duration % 60;
  
    if((countVideos+1) < 10 )
    {
    htmlString = "<div class='videoBoxes'><p class = 'text' style ='float:left'>0"+(countVideos+1)+"</p>";
    }
    else
    {
    htmlString = "<div class='videoBoxes'><p class = 'text' style ='float:left'>"+(countVideos+1)+"</p>";
    }

    htmlString += "<p class='videoName' style='padding-left:75px'>"+
                  data.data[countVideos].metadata.name+
                  "</p><p><p class='subline' style = 'display: inline-block;padding-left:75px;width:1000px'>"+
                  data.data[countVideos].metadata.description+ "</span></p><p class = 'subline' style = 'display: inline-block;opacity:.75;font-weight:bold'>"+
                  durationMinutes+":";
          
          
    if(durationSeconds<10)
    {
        img = data.data[countVideos].thumbnails[2].url;
        url = data.data[countVideos].metadata.url;
        htmlString+= "0"+ durationSeconds+ "</span></p></p><p class = 'videoThumbnail' style='position:relative'><img src="+img+"><div class  = 'button'><a style='font-size:20px;font-weight: bolder;color:white' href="+url+">GO TO IGN</a></div></p></div>";
    }
    else
    {
        img = data.data[countVideos].thumbnails[2].url;
        url = data.data[countVideos].metadata.url;        
        htmlString+= durationSeconds+ "</span></p></p><p class = 'videoThumbnail'><img src="+img+"><div class = 'button'><a style='font-size:20px;font-weight: bolder;color:white' href="+url+">GO TO IGN</a></div></p></div>";
    }
    

    videos.insertAdjacentHTML('beforeend',htmlString);
    $(".videoThumbnail").hide();  
    $(".button").hide();
    countVideos++;
  }
  
}

//Prints Articles ont HTML with headline and subheadline
function renderArticleHTML(data)
{
  var img;
  var url;
  var htmlString = "";
  for(var i = 0;(i % 10) !=0 || i == 0;i++)
  {
    img = data.data[countArticles].thumbnails[2].url;
    if((countArticles+1) < 10 )
    {
    htmlString = "<div class='articleBoxes'><p class='text' style =float:left>0"+(countArticles+1)+"</p>";
    }
    else
    {
    htmlString = "<div class='articleBoxes'><p class='text' style ='float:left'>"+(countArticles+1)+"</p>";
    }
    
    url = "http://www.ign.com/articles/"+data.data[countArticles].metadata.slug;
    
    htmlString += "<p class = 'articleName' style='padding-left:75px'>"+data.data[countArticles].metadata.headline+
                  "</p><p class = 'subline' style='padding-left:75px;margin:0px'>"+data.data[countArticles].metadata.subHeadline
                  +"</p><p class='articleThumbnail' style='position:relative'><img src= "+img+"><div class  = 'button'><a style='font-size:20px;font-weight: bolder;color:white' href="
                  +url+">GO TO IGN</a></div></p></div>";
                          

    articles.insertAdjacentHTML('beforeend',htmlString); 
        
    $('.articleThumbnail').hide();
    $(".button").hide();
    countArticles++;
  }
}



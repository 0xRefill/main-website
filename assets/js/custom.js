var acc = document.getElementsByClassName("accordion");
if(acc) {
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }
}

$(document).ready(function() {
  if($(".rotator")){
    $(".rotator").flexisel({
        visibleItems: 4,
        animationSpeed: 500,
        //autoPlay: true,
        autoPlaySpeed: 3000,
        pauseOnHover: true,
        enableResponsiveBreakpoints: true,
        responsiveBreakpoints: {
            portrait: {
                changePoint:480,
                visibleItems: 1
            },
            landscape: {
                changePoint:640,
                visibleItems: 2
            },
            tablet: {
                changePoint:768,
                visibleItems: 3
            }
        }
    });
    }


    $.ajax({
        url: "https://api.vlad.finance/?query=vlad_supply",
        success: function(vlad_circulating_supply){
            $('#vlad-circulating-supply').text(vlad_circulating_supply + ' VLAD')
        }
    });


    $.ajax({
        url: "https://api.vlad.finance/?query=vlad_burned",
        success: function(vlad_burned){
            $('#vlad-burned').text(vlad_burned + ' VLAD')
        }
    });

    // $.ajax({
    //     url: "https://api.vlad.finance/?query=life_supply",
    //     success: function(life_total_supply){
    //         $('#life-total-supply').text(life_total_supply + ' LIFE')
    //     }
    // });


    $.ajax({
        url: "https://api.vlad.finance/?query=life_circulating",
        success: function(life_circulating_supply){
            $('#life-circulating-supply').text(life_circulating_supply + ' LIFE')
        }
    });

    $.ajax({
        url: "https://api.vlad.finance/?query=life_burned",
        success: function(life_burned){
            $('#life-burned').text(life_burned + ' LIFE')
        }
    });
});

$(function () {
var mediumPromise = new Promise(function (resolve) {
var $content = $('#medium');
var data = {
   rss: 'https://vlad-finance.medium.com/feed'
};
$.get('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40vlad-finance', data, function (response) {
   if (response.status == 'ok') {

       var output = '';
       var k = 0;
       $.each(response.items, function (k, item) {
           output += `<div class="col-sm-12 col-md-4 item"> <div class="announce-block">`;
           var tagIndex = item.description.indexOf('<img'); // Find where the img tag starts
           var srcIndex = item.description.substring(tagIndex).indexOf('src=') + tagIndex; // Find where the src attribute starts
           var srcStart = srcIndex + 5; // Find where the actual image URL starts; 5 for the length of 'src="'
           var srcEnd = item.description.substring(srcStart).indexOf('"') + srcStart; // Find where the URL ends
           var src = item.description.substring(srcStart, srcEnd); // Extract just the URL
           output += `<div style="height:150px;line-height:150px; overflow:hidden;"><img src="${src}" alt="Cover image" width="300px" /></div>`;
           output += `<div class="announce-block-content">`;
           output += `<h5 style="color: red;">${item.pubDate}</h5>`;
           output += `<h4>${item.title}</h4>`;
           var yourString = item.description.replace(/<img[^>]*>/g,""); //replace with your string.
           yourString = yourString.replace('h4', 'p');
           yourString = yourString.replace('h3', 'p');
           var maxLength = 450; // maximum number of characters to extract
           //trim the string to the maximum length
           var trimmedString = yourString.substr(0, maxLength);
           //re-trim if we are in the middle of a word
           trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
           output += `<p>${trimmedString}...</p>`;
           output += '</div>';
           output += `<div class="btnread-more"><a href="${item.link}" target="_blank">Read More</a></div>`;
           output+='</div></div>';
           k++;
           return k < 9;
       });
       resolve($content.html(output));
   }
});
});

mediumPromise.then(function()
{
   //Pagination

   pageSize = 3;

   var pageCount = $(".item").length / pageSize;

   for (var i = 0; i < pageCount; i++) {
       $("#pagein").append(`<li class="page-item"><a class="page-link" href="#medium">${(i + 1)}</a></li> `);
   }
   $("#pagein li:nth-child(1)").addClass("active");
   showPage = function (page) {
       $(".item").hide();
       $(".item").each(function (n) {
           if (n >= pageSize * (page - 1) && n < pageSize * page)
               $(this).show();
       });
   }

   showPage(1);

   $("#pagein li").click(function () {
       $("#pagein li").removeClass("active");
       $(this).addClass("active");
       showPage(parseInt($(this).text()))
   });
});
});

function CopyToClipboard(containerid, copiedid) {
    if (window.getSelection) {
        if (window.getSelection().empty) { // Chrome
            window.getSelection().empty();
        } else if (window.getSelection().removeAllRanges) { // Firefox
            window.getSelection().removeAllRanges();
        }
    } else if (document.selection) { // IE?
        document.selection.empty();
    }

    if (document.selection) {
        var range = document.body.createTextRange();
        range.moveToElementText(document.getElementById(containerid));
        range.select().createTextRange();
        document.execCommand("copy");
    } else if (window.getSelection) {
        var range = document.createRange();
        range.selectNode(document.getElementById(containerid));
        window.getSelection().addRange(range);
        document.execCommand("copy");
    }
    document.getElementById(copiedid).innerHTML = "<img src='./assets/images/copied-label.svg' alt='Copied' />";

    setTimeout(function(){
        document.getElementById(copiedid).innerHTML = '<i class="far fa-copy ms-2">';
    }, 1500);
    return false;
}

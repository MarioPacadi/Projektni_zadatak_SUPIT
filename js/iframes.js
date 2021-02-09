//Kontakti
$(function(){
    $('#openIframe').click(function(){ 
        if(!$('#iframe').length) {
                $('.backdrop').css({display: "block"});
                $('#iframeHolder').css({display: "block"});
                $('#iframeHolder').html('<iframe id="contactframe" class="embed-responsive-item animate__animated  animate__fadeInUp" src="/html/Kontakt.html" scrolling="no"></iframe>' ); 
        }
    });

    //Navbar close
    $('.navbar-nav a').click( function(){
        $('.navbar-collapse').collapse('hide');
    });
  
});

//Resize contact frame
function resizeIframe(obj) {
    obj.style.height = obj.contentWindow.document.documentElement.scrollHeight + 'px';
    obj.style.width = obj.contentWindow.document.documentElement.scrollHeight + 'px';
  }

//Odustani
function closeIframe() {
    var iframe = document.getElementById('contactframe');
    iframe.classList.add('animate__animated', 'animate__fadeOutDown');
    
    iframe.addEventListener('animationend', () => {
        iframe.parentNode.removeChild(iframe);
        $('#iframeHolder').css({display: "none"});
        $('.backdrop').css({display: "none"});
      });
    
}

//OnSubmit
function closeIframeTimer(time){
    setTimeout("closeIframe()", time);
   }

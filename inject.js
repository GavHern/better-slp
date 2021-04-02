$( document ).ready(function() {
  // http://www.summitlearning.org/my/assessment_takes/
  if(document.getElementsByClassName('better-slp-sidenav-link').length==0){
    $('.app-page-menu-body .app-nav-left').append(jQuery.parseHTML('<li role="presentation" class="better-slp-sidenav-link"><a action="push"><i icon="grade" class="material-icons material-icons-default app-nav-left-link-icon">grade</i>BetterSLP</a></li>'));

    let darkMode = localStorage.getItem('darkMode');
    document.documentElement.style.setProperty('--theme-hue-rotate', `${localStorage.getItem('themeHue')}deg`);

    function enableDarkMode(input){
      if(input){
        let link = document.createElement("link");

        link.type = "text/css";
        link.rel = "stylesheet";
        link.classList.add('better-slp-dark-inject')
        link.href = chrome.runtime.getURL('dark-mode-inject.css');

        document.head.appendChild(link);
      } else {
        $('.better-slp-dark-inject').remove();
      }
    }

    if(darkMode==1){
      enableDarkMode(true);
    }

    /*
    document.querySelector('.page-menu .notifications-nub .avatar-profile').style.background="url(https://lh3.googleusercontent.com/a-/AOh14Gh-QAvUW0w06ZJTdCfEDpHAvllmERKDnCzF5d_B2A=s88-c-k-c0x00ffffff-no-rj-mo)";
    document.querySelector('.page-menu .notifications-nub .avatar-profile').style.backgroundSize="cover";
    document.querySelector('.page-menu .notifications-nub .avatar-profile div').style.display="none";
    */

    // Focus area pages
    if(window.location.href.includes('summitlearning.org/my/focusareas/')){
      let showClosePrompt=false;
      document.getElementsByClassName('app-page-title-group')[0].innerHTML='<div class="app-page-title-group" style="display: flex; justify-content:space-between"><span><h1 class="app-title">'+document.getElementsByClassName('app-title')[0].innerHTML+'</h1></span><span><a tabindex="0" role="button" id="note-editor-trigger"><i class="material-icons left" style="transform:translateX(-3px)">edit</i> Take Notes</a></span></div>'
      $('#note-editor-trigger').click(()=>{
        document.body.innerHTML += "<div id='summernote-modal' class='summernote-modal'><div class='summernote-modal-content'><iframe src='"+chrome.runtime.getURL('notes/editor/index.html')+"' style='height:100%;width:100%'frameBorder='0'></iframe>"
        document.getElementById("summernote-modal").style.display = "flex";
        $('#container-root,.goal-drawer').addClass('note-open-body-blur');
        showClosePrompt=true;
      });

      let focusAreaPassed = document.querySelectorAll('.claro-student-focusarea .panel-body .focusarea-content .megaphone.alert-success .megaphone-container .megaphone-body .megaphone-title .focusarea-mastery-container').length==1;
      
      let ratingSubmitHTML = (focusAreaPassed ? '<a style="margin-top:4px" id="bslp-difficulty-subit">Submit a rating.</a>' : '<label style="margin-top:4px">Pass this assessment to submit a rating.</label>');

      window.onmousedown = function(event) {
        if (event.target == document.getElementById("summernote-modal")) {
          showClosePrompt=false;
          location.reload();
        }
      }
      
      $('.focusarea-attempts .panel-body div:not(.focusarea-section):last-child>div:last-child').append('<div class="focusarea-section"><h4 class="app-tertiaryheading">Difficulty</h4><div class="focusarea-header-content-wrap focusarea-header-content-wrap-html" style="margin-top:-4px"><span style="font-size:13pt"><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star_half</i><i class="material-icons">star_border</i></span><br>' + ratingSubmitHTML + '</div></div>')

      window.onbeforeunload = function (e) {
        if(showClosePrompt){
          e = e || window.event;
          if (e) {
            e.returnValue = 'Sure?';
          }
          return 'Sure?';
        }
      };


    }

    // This year page
    if(window.location.href.includes('summitlearning.org/my/year')){
      document.getElementsByClassName('zoom-btn')[0].innerHTML='<i class="material-icons">zoom_out</i>';
      document.getElementsByClassName('zoom-btn')[1].innerHTML='<i class="material-icons">zoom_in</i>';
      document.getElementsByClassName('zoom-btn')[0].classList.add('zoom-button-fix');
      document.getElementsByClassName('zoom-btn')[1].classList.add('zoom-button-fix');

      let faData = {
        "projects": [document.querySelectorAll('.courserow .row .courserow-projects ul .project-item .project.success').length, document.querySelectorAll('.courserow .row .courserow-projects ul .project-item').length],
        "playlists": [document.querySelectorAll('.courserow .power div ul .focusarea-list-item a.success,.courserow .additional div ul .focusarea-list-item a.success,.courserow .challenge div ul .focusarea-list-item a.success').length, document.querySelectorAll('.courserow .power div ul .focusarea-list-item,.courserow .additional div ul .focusarea-list-item,.courserow .challenge div ul .focusarea-list-item').length],
        "power": [document.querySelectorAll('.courserow .power div ul .focusarea-list-item a.success').length, document.querySelectorAll('.courserow .power div ul .focusarea-list-item').length],
        "additional": [document.querySelectorAll('.courserow .additional div ul .focusarea-list-item a.success').length, document.querySelectorAll('.courserow .additional div ul .focusarea-list-item').length],
        "challenge": [document.querySelectorAll('.courserow .challenge div ul .focusarea-list-item a.success').length, document.querySelectorAll('.courserow .challenge div ul .focusarea-list-item').length]
      }

      console.log(faData);

      function findPercent(input){
        if(input[1]==0){
          return 100;
        } else {
          return Math.floor(input[0]/input[1]*100);
        }
      }
      
      let focusAreaDataHTML='<div class="no-padding focus-area-stats claro-content-wrapper-panel drop-shadow panel panel-default"><div class="fa-data-title">Completion Progress</div><div><div class="equidistant"><div><div class="pie-chart-gav pie-'+findPercent(faData.projects)+'-percent"><div>'+faData.projects[0]+'/'+faData.projects[1]+'</div></div><p>Projects</p></div><div><div class="pie-chart-gav pie-'+findPercent(faData.playlists)+'-percent"><div>'+faData.playlists[0]+'/'+faData.playlists[1]+'</div></div><p>Focus Areas</p></div><div><div class="pie-chart-gav pie-'+findPercent(faData.power)+'-percent"><div>'+faData.power[0]+'/'+faData.power[1]+'</div></div><p>Power</p></div><div><div class="pie-chart-gav pie-'+findPercent(faData.additional)+'-percent"><div>'+faData.additional[0]+'/'+faData.additional[1]+'</div></div><p>Additional</p></div>'+((faData.challenge[1]>0) ? '<div><div class="pie-chart-gav pie-'+findPercent(faData.challenge)+'-percent"><div>'+faData.challenge[0]+'/'+faData.challenge[1]+'</div></div><p>Challenge</p></div>':'')+'</div></div></div>';

      let focusAreaData = document.createElement('div');
      focusAreaData.innerHTML=focusAreaDataHTML;
      $('.app-page .app-body').append(focusAreaData);
    }

    // This week Page
    if(window.location.href.includes('summitlearning.org/my/week')){
      /*
      $('.add-goal-button-container').append('<div class="add-reminder-container"><button type="button" class="sdl-add-goal-button token btn btn-default">Add Reminder</button></div>');
      $('.add-goal-button-container').click((e)=>{
        $(e.target).find('.add-reminder-container').remove();
      });*/
    }

    // Adds pills to the edit avatar modal. TODO: Try to prepend the HTML string.
    
    /*
    $('a[href="#edit-avatar"]').click(()=>{
      setTimeout(()=>{
          let pillDiv = document.createElement('div');
          pillDiv.innerHTML='<ul class="nav nav-pills nav-justified avatar-editor-pills-container"><li class="nav-item active"><a id="avatar-builder-pill" class="nav-link active">Avatar Builder</a></li><li class="nav-item"><a id="avatar-upload-pill" class="nav-link">Upload Image</a></li></ul>';
          $('.avatar-modal .modal-dialog .modal-content .modal-body').prepend(pillDiv);

          let uploadImageContainer = document.createElement('div');
          uploadImageContainer.classList.add('avatar-upload');
          uploadImageContainer.classList.add('display-none');
          uploadImageContainer.innerHTML='<div><label for="custom-avatar-file-upload" id="custom-avatar-file-upload-button" class="btn btn-success btn-lg"><i class="material-icons left">file_upload</i> Upload Image</label><input id="custom-avatar-file-upload" accept=".png,.jpg,.jpeg,.webp,.tiff" type="file"/></div>';
          $('.avatar-modal .modal-dialog .modal-content .modal-body').append(uploadImageContainer);
      },50);
    });
    
    $('#avatar-builder-pill').click(()=>{
      $('#avatar-builder-pill').parentElement.classList.add('active');
      $('#avatar-upload-pill').parentElement.classList.remove('active');
      $('.avatar-modal .modal-dialog .modal-content .modal-body .avatar-picker').classList.remove('display-none');
      $('.avatar-modal .modal-dialog .modal-content .modal-body .avatar-upload').classList.add('display-none');
    });

    $('#avatar-upload-pill').click(()=>{
      $('#avatar-upload-pill').parentElement.classList.add('active');
      $('#avatar-builder-pill').parentElement.classList.remove('active');
      $('.avatar-modal .modal-dialog .modal-content .modal-body .avatar-picker').classList.add('display-none');
      $('.avatar-modal .modal-dialog .modal-content .modal-body .avatar-upload').classList.remove('display-none');
    });
    */
  } 
  

});

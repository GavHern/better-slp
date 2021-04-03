window.addEventListener('load', () => {
  const noteTaker = document.getElementById('summernote');
  if(noteTaker == null) return;

  $(noteTaker).summernote({
    minHeight: 300,
    maxHeight: null,
    focus: true,
    lineHeights: ['0.3', '0.6','1.0', '1.5', '2.0'],
    dialogsInBody: true,
    tabDisable: true,
    toolbar: [
      ['main', ['style']],
      ['style', ['bold', 'italic', 'underline', 'strikethrough', 'clear']],
      ['font', ['fontname', 'fontsize']],
      ['edit', ['color']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['misc', ['height']],
      ['insert', ['link', 'picture', 'table', 'video', 'hr']],
      ['history', ['undo', 'redo']],
      ['help', ['help']]
    ],
    disableResizeEditor: true
  });

  $(noteTaker).summernote('fontName', 'Arial');
  $(noteTaker).summernote('fullscreen.toggle');
})

if(true){
  document.head.innerHTML += `<link href="../../lib/bootstrap/dark.css" rel="stylesheet">`
}


function saveDoc(id, data){
  chrome.storage.local.set({[id]: data});
}
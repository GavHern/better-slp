const url = new URL(window.location.href);

window.addEventListener('load', () => {
  const noteTaker = document.getElementById('summernote');
  if(noteTaker == null) return;

  const noteTakerOptions: object = {
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
      ['insert', ['link', 'picture', 'table', 'hr']],
      ['history', ['undo', 'redo']],
      ['help', ['help']]
    ],
  }

  $(noteTaker).summernote(noteTakerOptions);

  $(noteTaker).summernote('fontName', 'Arial');
  $(noteTaker).summernote('fullscreen.toggle');

  const id = url.searchParams.get("id");
  chrome.storage.local.get('note-doc-'+id, data => {
    let rawTextData = Object.values(data)[0];
    
    $('#summernote').summernote('code', rawTextData);
  });
})

if(url.searchParams.get("dark")){
  document.head.innerHTML += `<link href="../../lib/bootstrap/dark.css" rel="stylesheet">`
}


function saveDoc(callback: () => void){
  const id = url.searchParams.get("id");
  const data = $('#summernote').summernote('code');

  chrome.storage.local.set({['note-doc-'+id]: data}, callback);
}

window.addEventListener('message', e => {
  if(e.data == "save") saveDoc(() => {
    window.top.postMessage('save-successful', '*')
  })
}) 
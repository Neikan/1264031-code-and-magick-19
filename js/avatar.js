// Файл avatar.js
'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = window.dialog.avatarUpload.querySelector('.upload input[type=file]');
  var avatarPreview = window.dialog.avatarUpload.querySelector('.setup-user-pic');

  avatarChooser.setAttribute('accept', 'image/png, image/jpeg, image/gif');

  avatarChooser.addEventListener('change', function () {
    var file = avatarChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();

(function (CONFIG) {
  'use strict';

  var upload = document.getElementById('upload');
  var uploadPreview = document.getElementById('uploadPreview');
  var step2Panel = document.getElementById('step2');
  var outputView = document.getElementById('outputView');
  var widthInput = document.getElementById('widthInput');
  var heightInput = document.getElementById('heightInput');
  var imageRenderingInput = document.getElementById('imageRenderingInput');
  var ctx = outputView.getContext('2d');

  uploadPreview.src = 'assets/preview.png';
  history.pushState('', document.title, location.pathname + location.search);

  upload.onchange = function () {
    step1.call(this);
  };

  widthInput.oninput = heightInput.oninput = function () {
    redraw();
  };

  imageRenderingInput.onchange = function () {
    outputView.style.imageRendering = '';
    JSON.parse(this.value).forEach(function (cur) {
      outputView.style.imageRendering = cur;
    });
  };

  var redraw = function () {
    var previewWidth = uploadPreview.width;
    var previewHeight = uploadPreview.height;
    var widthValue = parseInt(widthInput.value);
    var heightValue = parseInt(heightInput.value);
    var repeat = {
      horizontal: Math.ceil(widthValue / previewWidth),
      vertical: Math.ceil(heightValue / previewHeight)
    };
    outputView.width = widthValue;
    outputView.height = heightValue;
    ctx.clearRect(0, 0, outputView.width, outputView.height);
    for (var y = 0; y < repeat.vertical; y++) {
      for (var x = 0; x < repeat.horizontal; x++) ctx.drawImage(uploadPreview, x * previewWidth, y * previewHeight);
    }
  };

  var step1 = function () {
    if (!this.files[0]) {
      console.log('no file selected, cancelling...');
      return;
    }
    uploadPreview.src = URL.createObjectURL(this.files[0]);
    step2();
  };

  var step2 = function () {
    step2Panel.style.display = 'block';
    uploadPreview.onload = function () {
      location.hash = 'step2';
      widthInput.value = uploadPreview.width;
      heightInput.value = uploadPreview.height;
      widthInput.min = uploadPreview.width;
      heightInput.min = uploadPreview.height;
      redraw();
    };
  };

})();

function ProgressBar(opts) {
    opts = opts || {};

    var self = {};

    var _progress = opts.progress || 0;

    var _elem = opts.elem || null;
    var _progressElem = opts.progressElem || null;

    self.generateHtml = function(opts) {
        var type = opts.type || 'success';
        _progressElem = $('<div/>', {'class': 'progress-bar progress-bar-' + type});
        _elem = $('<div/>', {'class': 'progress progress-striped', 'style': 'width:100%; padding:0; margin:0; background-color:#222'});
        _elem.append(_progressElem);
        return _elem;
    };

    self.setProgress = function (progress) {
        if (_progress !== progress) {
            _progress = progress;
            _progressElem.css({'width': 100 * _progress + '%'});
        }
    };

    return self;
}

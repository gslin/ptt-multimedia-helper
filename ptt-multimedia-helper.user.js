// ==UserScript==
// @name                Ptt Multimedia Helper
// @namespace           http://blog.gslin.org/plugins/ptt-multimedia-helper
// @version             2011.0118.1
// @description         Expand Ptt Multimedia URL
// @include             http://www.ptt.cc/bbs/*
// ==/UserScript==

(function(){
    // Google Chrome cannot parse @include fully-correctly.
    if (!document.location.href.match(/\/bbs\/.*\//)) {
	return;
    }

    // Find #finds & real content.
    var c;
    try {
	var finds = document.getElementById('finds');
	if (!finds) {
	    return;
	}

	// First sibling is Text object, so find next one.
	c = finds.nextSibling.nextSibling;
	if (!c) {
	    return;
	}
    } catch (e) {
	return;
    }

    var d = c.innerHTML;

    // Images (gif/jpg/png)
    d = d.replace(/(https?:\/\/[-0-9a-z._]*\/[-0-9a-z_\/]*\.(gif|jpg|png))/ig, '<a href="$1" target="_blank">$1</a>\n<img alt="Image: $1" src="$1" style="max-width: 900px"><br>');

    // YouTube
    d = d.replace(/(http:\/\/www.youtube\.com\/watch\?v=([-0-9a-z_]*))/ig, '<a href="$1" target="_blank">$1</a>\n<embed src="http://www.youtube.com/v/$2" type="application/x-shockwave-flash" width="600" height="450"></embed>');

    // Nico: buggy because it's script-based, just add link right now.
    //d = d.replace(/(http:\/\/www\.nicovideo\.jp\/watch\/([a-z][a-z][0-9]*))/, '<a href="$1" target="_blank">$1</a>\n<script src="http://ext.nicovideo.jp/thumb_watch/$2" type="text/javascript"></script>');
    d = d.replace(/(http:\/\/www\.nicovideo\.jp\/watch\/([a-z][a-z][0-9]*))/, '<a href="$1" target="_blank">$1</a>');

    c.innerHTML = d;
})();

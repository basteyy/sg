/*
 * sG (smallGallery) free, smart and fast standalone JS-Lightbox
 *
 * @license Public Domain
 * @author Sebastian Eiweleit <sebastian@34n.de>
 * @version 3.0.1
 * @copyright (c) 2013, Sebastian Eiweleit
 */

var sg = function() {

    /* Die aktuelle Gruppe von Bildern */
    var curGroup;

    /* Speichert die Anzahl der in der Gruppe befindlichen Bilder */
    var curGroupLength;

    /* Das aktuelle Bild innerhalb der Gruppe */
    var curImg;

    /* Der schwarze Hintergrund Layer */
    var BGLayer = document.getElementById('sgBg');

    /* Der Layer für das das Bild */
    var Layer = document.getElementById('sgLayer');

    /* Der Layer, der das Bild nachher beinhaltet (<div><img></div>) */
    var Img = document.getElementById('sgImg');

    /* Der Layer der die beiden Navigationselemente (weiter/zurück) umgibt */
    var Controls = document.getElementById('sgNav');

    /* Der Layer der "Schließen" und "Vergrößern" beinhaltet */
    var Actions = document.getElementById('sgAct');

    /* Nach preload beinhaltet diese Variable das Array der beiden Buttons zum vergrößern/schließen */
    var ActionsButtons;

    /* Mit diesem triggern wir, ob das Close ausgeführt wird oder nicht (IE) */
    var doClose = true;

    /* Triggern ob preload gestartet worden ist */
    var doPreload = true;

    /* Config */
    var Config = {max_width_all: 'auto', max_height_all: 'auto', keep_ratio: true, smart_control: true};

    /* Anzeiges des Loads-Gifs überspringen */
    var doSkipLoad = false;

    return {
        init: function() {
            sg.doLog('sg.init start');

            var links = document.getElementsByTagName('a'), i = links.length;
            sg.doLog('sg.init: ' + i + ' Links vorhanden');

            while (i--) {
                var data = this.getData(links[i], 'sg'), lClass = links[i].className;
                if (data) {
                    links[i].onclick = sg.show;
                    links[i].className = lClass + ' ' + data;
                }
            }

            Layer.onclick = sg.close;
        },
        show: function() {
            sg.doLog('sg.show');

            /* Preload ausführen? */
            if (doPreload) {
                sg.doLog('sg.show: Rufe sg.repload auf');
                sg.preLoad({});
            }

            /* Gruppe erzeugen */
            curGroup = document.getElementsByClassName(sg.getData(this, 'sg'));
            curGroupLength = curGroup.length;

            var i = curGroupLength;

            if (i > 1) {
                /* Mindestens zwei Bilder */

                /* Falls innerhalb einer Gruppe ein Bild mehrfach verlinkt worden ist,
                 * fügen wir dem "angeklickten" Bild (besser gesagt Link) eine spezielle
                 * Data-Tag hinzu, an der wir gleich genau identifizieren können, an welcher
                 * Stelle im Dokument (und somit dem Array) das Bild steht.
                 */
                sg.setData(this, 'sgopener', 'true');

                while (i--) {
                    if (sg.getData(curGroup[i], 'sgopener')) {
                        curImg = i;
                    }
                }

                sg.removeData(this, 'sgopener');
                Controls.style.display = 'block';

            } else {
                /* Nur ein Bild */
                Controls.style.display = 'none';
            }

            BGLayer.style.display = Layer.style.display = 'block';
            sg.doLog('sg.show: Rufe sg.load auf');
            sg.load(this.href);

            return false;
        },
        /*
         * Diese Methode läd einmal das loading-gif und verarbeitet eventuelle User-Einstellungen
         * die über sg.preLoad({...}) übergeben worden sind.
         * Sollte der Nutzer keine eigenen Einstellungen ausführen, so wird preLoad beim ersten
         * Klick auf ein Bild ausgeführt
         */
        preLoad: function(c) {
            sg.doLog('sg.preLoad start');
            /* Das Load-Gif global setzen */
            Config.LoadImg = (c.LoadImg ? c.LoadImg : 'http://cdn.34n.de/sg/load.gif');
            
            if (c.max_width_all) {
                Config.max_width_all = c.max_width_all;
            }
            if (c.max_height_all) {
                Config.max_height_all = c.max_height_all;
            }
            if (undefined !== c.ratio) {
                Config.keep_ratio = c.ratio === true ? true : false;
            }
            if (undefined !== c.smart_control) {
                Config.smart_control = c.smart_control === true ? true : false;
            }

            /* Erzeugen des IMG-Tags */
            var lImg = document.createElement('img');
            lImg.src = Config.LoadImg;
            lImg.onclick = function() {
                doClose = false;
            };
            Img.appendChild(lImg);

            /* Laden des Load-Gifs */
            var LoadImg = new Image();

            LoadImg.onload = function() {
                Config.LoadImgWidth = this.width;
                Config.LoadImgHeight = this.height;
                if (!doSkipLoad) {
                    sg.showLoad();
                }
            };
            LoadImg.src = Config.LoadImg;

            /* Pfeiltasten triggern */
            if (window.document.addEventListener) {
                window.document.addEventListener('keydown', sg.keyEvent, false);
            } else {
                window.document.attachEvent('onkeydown', sg.keyEvent);
            }

            /* Zuordnen der Buttons vergrößern und schließen */
            ActionsButtons = Actions.getElementsByTagName('a');

            doPreload = false;

            return true;
        },
        /*
         * Zeigt das Loading-Gif an
         */
        showLoad: function() {
            sg.doLog('sg.showload start');

            Img.style.width = Img.lastElementChild.style.width = Config.LoadImgWidth + 'px';
            Img.style.height = Img.lastElementChild.style.height = Config.LoadImgHeight + 'px';
            Img.lastElementChild.src = Config.LoadImg;

            /* Vertikal ausrichten */
            Img.style.marginTop = (Math.floor(sg.getHeight() / 2) - (Config.LoadImgHeight / 2)) + 'px';

            /* Anzeigen des Fensters */
            Img.style.display = 'block';

            /* Zoom/Close ausblenden */
            Actions.style.display = 'none';

            /* Und Position anpassen */
            if (Config.smart_control === true) {

                /* Close */
                ActionsButtons[0].style.top = ActionsButtons[0].style.right = ActionsButtons[1].style.bottom = ActionsButtons[1].style.left = '6px';

                /* Gilt für beide Werte */
                ActionsButtons[0].style.width = ActionsButtons[1].style.width = '5%';
                ActionsButtons[0].style.minWidth = ActionsButtons[1].style.minWidth = '64px';
            }

            return true;
        },
        go: function(val) {
            sg.doLog('sg.go start');
            doClose = false;
            if (sg.showLoad()) {

                curImg = curImg + val;
                if (curGroupLength === curImg) {
                    curImg = 0;
                } else if (curImg < 0) {
                    curImg = -1 + curGroupLength;
                }
                sg.load(curGroup[curImg]);
            }
            return false;
        },
        load: function(src) {
            sg.doLog('sg.load start');
            var NewImg = new Image();

            NewImg.onload = function() {
                sg.doLog('sg.load Bild wurde erfolgreich geladen');

                /* Verhindern dass jetzt noch das Load-Gif geladen wird */
                doSkipLoad = true;

                var width = this.width, height = this.height;

                /* @var Number gH Die gegenwärtig verfügbare Höhe */
                var gH = sg.getHeight();

                /* @var Number gH Die gegenwärtig verfügbare Breite */
                var gW = sg.getWidth();

                /* @var Number maxWidth Dynamische maximale Breite */
                var maxWidth = Math.floor(gW * 0.6);

                /* @var Number maxWidth Dynamische maximale Höhe */
                var maxHeight = Math.floor(gH * 0.8);

                if (Config.max_height_all !== 'auto' && Config.max_width_all !== 'auto' && Config.keep_ratio === true) {
                    /* Maximale Breite und Höhe vorgegeben, Seitenverhältnis soll beachtet werden */

                    if (Config.max_width_all < Config.max_height_all) {
                        maxHeight = Math.floor(maxHeight / (maxWidth / Config.max_width_all));
                        maxWidth = Config.max_width_all;
                    } else {
                        maxWidth = Math.floor(maxWidth / (maxHeight / Config.max_height_all));
                        maxHeight = Config.max_height_all;
                    }
                } else {
                    if (Config.max_width_all !== 'auto' && maxWidth > Config.max_width_all) {
                        maxWidth = Config.max_width_all;
                    }
                    if (Config.max_height_all !== 'auto' && maxHeight > Config.max_height_all) {
                        maxHeight = Config.max_height_all;
                    }
                }

                if (width > maxWidth || height > maxHeight) {
                    if (width > maxWidth) {
                        if (Config.keep_ratio === true) {
                            height = Math.floor(height / (width / maxWidth));
                        }
                        width = maxWidth;
                    }
                    if (height > maxHeight) {
                        if (Config.keep_ratio === true) {
                            width = Math.floor(width / (height / maxHeight));
                        }
                        height = maxHeight;
                    }
                }

                /* Bild nun einfügen */
                Img.lastElementChild.src = ActionsButtons[1].href = this.src;

                /* Fenster vertikal ausrichten */
                var MarginTop = (Math.floor(gH / 2) - Math.floor(height / 2)) + 'px';
                Img.style.marginTop = MarginTop;

                /* Falls es eine Gruppe ist, werdendie Navigations-Buttons angezeigt */
                if (curGroup.length > 1) {
                    Controls.style.display = 'block';
                }

                /* Höhe und Breite des Bildes setzen */
                Img.lastElementChild.style.width = Img.style.width = width + 'px';
                Img.lastElementChild.style.height = Img.style.height = height + 'px';

                /* Position der Operations-Buttons */
                if (Config.smart_control === true && (height <= 300 || width <= 300)) {
                    ActionsButtons[0].style.width = ActionsButtons[1].style.width = width + 12 + 'px';
                    ActionsButtons[1].style.bottom = ActionsButtons[0].style.top = '-64px';
                    ActionsButtons[1].style.left = ActionsButtons[0].style.right = '0';
                }
                /* Anzeigen von Close/Zoom */
                Actions.style.display = 'block';
                /* Anzeigen des Fensters */
                Img.style.display = 'block';
            };
            NewImg.src = src;
        },
        close: function() {
            sg.doLog('sg.close start');
            if (doClose) {
                /* Layer verstecken */
                BGLayer.style.display = Layer.style.display = 'none';

                /* Reset zum load-Gif */
                sg.showLoad();
            }
            doClose = true;
        },
        keyEvent: function(evnt) {
            sg.doLog('sg.keyEvent start');
            ev = (evnt) ? evnt : event;
            if (27 === ev.keyCode) {
                sg.close();
                return true;
            }
            if (curGroup.length > 1) {
                if (37 === ev.keyCode) {
                    sg.go(-1);
                } else if (39 === ev.keyCode) {
                    sg.go(1);
                }
            }
            return true;
        },
        /*
         * Gibt die verfügbare Breite zurück
         */
        getWidth: function() {
            return Math.max(document.documentElement['clientWidth'], document.body['offsetWidth'], document.documentElement['offsetWidth']);
        },
        /*
         * Gibt die verfügbare Höhe zurück
         */
        getHeight: function() {
            return Math.min(document.documentElement['clientHeight'], document.body['offsetHeight'], document.documentElement['offsetHeight']);
        },
        /*
         * Liest aus dem Element elm den Data-Tag data aus und gibt den Wert zurück
         */
        getData: function(elm, data) {
            if (elm.dataset) {
                return elm.dataset[data];
            } else {
                return elm.getAttribute('data-' + data);
            }
        },
        /*
         * Setzt ein neues Data-Attribute
         */
        setData: function(elm, data, value) {
            if (elm.dataset) {
                elm.dataset[data] = value;
            } else {
                elm.setAttribute('data-' + data, value);
            }
        },
        /*
         * Entferne ein Data-Attribute
         */
        removeData: function(elm, data) {
            if (elm.dataset) {
                delete elm.dataset[data];
            } else {
                elm.removeAttribute('data-' + data);
            }
        },
        doLog: function(msg) {
            console.log(msg);
        }
    };
}();
sg.init();
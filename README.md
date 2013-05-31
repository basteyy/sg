#sg
sg ist eine kleine Lightbox. Sie ist kostenlos, schnell und standalone. Da ich sie unter Public Domain gestellt habe, kannst du alles mit ihr machen. Viel Spaß!

##Einrichten
###1. Schritt
Binde die CSS-Datei in dein HTML-Dokument ein (du kannst auch gerne den Code in deine eigene CSS-Datei packen oder direkt im Head des Dokuments platzieren):
```html
<link rel="stylesheet" href="http://cdn.34n.de/sg/sg.min.css" type="text/css" media="screen">
```

###2. Schritt
Gebe allen Links den data-sg-Tag:
```html
<a href="mein_bild.jpg" data-sg="gruppe1">Mein Bild 1</a>
<a href="mein_bild2.jpg" data-sg="gruppe1">Mein Bild 2</a>

<a href="example.jpg" data-sg="2"><img src="example.thumb.jpg"></a>
```

###3. Schritt
Binde nun den HTML-Code und das Script ein:
```html
<!-- HTML-Code -->
<div id="sgBg"></div><div id="sgLayer"><div id="sgNav"><a href="#" onclick="sg.go(-1); return false;" title="Zum vorherigen Bild" class="prev"></a><a href="#" onclick="sg.go(1); return false;" title="Zum nächsten Bild" class="next"></a></div><div id="sgImg"><div id="sgAct"><a href="#" onclick="sg.close(); return false;" title="Bild schließen" class="close"></a><a href="#" title="Bild öffnen" target="_blank" class="zoom"></a></div></div></div>

<!-- Das Script -->
<script src="http://cdn.34n.de/sg/sg.min.js" charset="utf-8"></script>
```

###4. Schritt
Fertig. Teste nun die Seite, ob es klappt.

##Beispiel
Eine Demo findest du im Internet unter http://cdn.34n.de/sg/example.html

##API
Über die Methode ```sg.preLoad({..});``` kannst du gewisse Dinge anpassen. Hier eine Auflistung:

- __max_width_all__ _Number {default: void}_ Eine maximale Breite für alle Bilder
- __max_height_all__ _Number {default: void}_ Eine maximale Höhe für alle Bilder
- __ratio__ _Boolean {default: true}_ Wenn die Breite oder Höhe des Bildes größer ist als erlaubt, wird dafür gesorgt, dass das Seitenverhältnis weiterhin stimmt und es zu keinen Verzerrungen kommt
- __smart_control__ _Boolean {default: true}_ Wenn aktiviert, wandern die Kontrollelemente für das schließen und vergrößern des Bildes, bei einer zu kleinen Lightbox über bzw. unter das Bild

###sG API nutzen
```html
<script>sg.preLoad({max_width_all: 200, max_height_all: 500, ratio: true});</script>
```

##sG F.A.Q.

###Wie benutzte ich die Gruppenfunktion?
Der Wert des data-sg-Attributes bestimmt, in welcher Gruppe sich ein Element befindet. Du musst also lediglich jenen Bildern den gleichen Wert zuordnen, die in der gleichen Gruppe sein sollen. Und schon passt es. (Siehe example.html)

###Warum soll ich den HTML-Code selber in das Dokument einfügen?
Weil es schneller ist. Die Alternative wäre es, über Javascript ein neues Element zu erzeugen und auf dieses die entsprechenden Funktionen zu triggern. Auch wenn der Unterschied kaum spürbar wäre, gibt das direkte einfügen in den Quellcode neben Vorteilen bei der Geschwindigkeit auch eine einfachere Möglichkeit die Lightbox anzupassen.

###Kann ich auch Text und andere Elemente als Auslöser nutzen?
Das Script reagiert auf Links (<a href...) mit dem Data-sg-Tag (<a href="" data-sg=".."). Somit ist der Inhalt (was vom Link-Tag umschlossen wird) frei gestaltbar.

```html
<a href="http://example.com/myImage.png" data-sg="1">Ich bin Text</a>
```

###Wir kann ich das Script anpassen?
Alle Farben und Grafiken werden via CSS festgelegt. Also einfach die sg.min.css anpassen.

###Wie darf ich das Script nutzen?
Es gibt keine Einschränkungen. Das Script steht unter Public Domain (Gemeinfei) und darf von dir zu jedem Zweck genutzt werden.

###Wie sollte ich das Script einbinden?
Das Script soll schnell sein. Und es ist es auch nur, wenn du es richtig einbindest. Packe einfach alles an das Ende des Dokuments (siehe diese example.html). Dadurch wird alles erst ausgeführt, wenn das HTML-Dokument schon geladen worden ist. Das Script __darf nicht in den Header__.

###Ich will aber die Datei im Header und ich WILL dass es funktioniert!!
Dann musst du am Ende der Datei (wenn alle Bilder im HTML-Dokument eingefügt worden sind), folgenden Code ausführen:
```html
<script>sg.init();</script>
```

##License
PUBLIC DOMAIN - Do what ever you want
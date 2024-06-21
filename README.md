# sg (Englisch)

sg is a small lightbox. It is free, fast, and standalone. Since I have placed it in the public domain, you can do anything with it. Have fun!

## Setup 

### Step 1 

Include the CSS file in your HTML document (feel free to put the code in your own CSS file or place it directly in the head of the document):


```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/basteyy/sg/sg.min.css" type="text/css" media="screen">
```

### Step 2 

Add the data-sg attribute to all links:


```html
<a href="my_image.jpg" data-sg="group1">My Image 1</a>
<a href="my_image2.jpg" data-sg="group1">My Image 2</a>

<a href="example.jpg" data-sg="2"><img src="example.thumb.jpg"></a>
```

### Step 3 

Now include the HTML code and the script:


```html
<!-- HTML Code -->
<div id="sgBg"></div><div id="sgLayer"><div id="sgNav"><a href="#" onclick="sg.go(-1); return false;" title="Previous Image" class="prev"></a><a href="#" onclick="sg.go(1); return false;" title="Next Image" class="next"></a></div><div id="sgImg"><div id="sgAct"><a href="#" onclick="sg.close(); return false;" title="Close Image" class="close"></a><a href="#" title="Open Image" target="_blank" class="zoom"></a></div></div></div>

<!-- The Script -->
<script src="https://cdn.jsdelivr.net/gh/basteyy/sg/sg.min.js" charset="utf-8"></script>
```

### Step 4 

Done. Now test the page to see if it works.

## Example 
You can find a demo online at [http://cdn.34n.de/sg/example.html](http://cdn.34n.de/sg/example.html) 
## API 
Using the `sg.preLoad({..});` method, you can customize certain things. Here is a list: 
- **max_width_all**  *Number {default: void}* A maximum width for all images
 
- **max_height_all**  *Number {default: void}* A maximum height for all images
 
- **ratio**  *Boolean {default: true}* If the width or height of the image exceeds the allowed size, the aspect ratio will be maintained to avoid distortion
 
- **smart_control**  *Boolean {default: true}* When enabled, the control elements for closing and enlarging the image will move above or below the image if the lightbox is too small

### Using the sG API 


```html
<script>sg.preLoad({max_width_all: 200, max_height_all: 500, ratio: true});</script>
```

## sG F.A.Q. 

### How do I use the group function? 

The value of the data-sg attribute determines which group an element belongs to. Simply assign the same value to the images that should be in the same group. And that's it. (See example.html)

### Why should I insert the HTML code myself into the document? 

Because it is faster. The alternative would be to create a new element via JavaScript and trigger the corresponding functions on it. Even though the difference might be negligible, directly inserting it into the source code not only provides speed advantages but also an easier way to customize the lightbox.

### Can I also use text and other elements as triggers? 

The script reacts to links (<a href...) with the data-sg tag (<a href="" data-sg=".."). Therefore, the content (what is enclosed by the link tag) is freely designable.


```html
<a href="http://example.com/myImage.png" data-sg="1">I am text</a>
```

### How can I customize the script? 

All colors and graphics are defined via CSS. So simply adjust the sg.min.css.

### How may I use the script? 

There are no restrictions. The script is in the public domain and may be used by you for any purpose.

### How should I embed the script? 
The script should be fast. And it is only fast if you embed it correctly. Just place everything at the end of the document (see this example.html). This way, everything will be executed only after the HTML document has already been loaded. The script **must not be placed in the header** .
### But I want to place the file in the header and I WANT it to work!! 

Then you need to execute the following code at the end of the file (after all images have been inserted into the HTML document):


```html
<script>sg.init();</script>
```

# sg (Deutsch)
sg ist eine kleine Lightbox. Sie ist kostenlos, schnell und standalone. Da ich sie unter Public Domain gestellt habe, kannst du alles mit ihr machen. Viel Spaß!

## Einrichten
### 1. Schritt
Binde die CSS-Datei in dein HTML-Dokument ein (du kannst auch gerne den Code in deine eigene CSS-Datei packen oder direkt im Head des Dokuments platzieren):
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/basteyy/sg/sg.min.css" type="text/css" media="screen">
```

### 2. Schritt
Gebe allen Links den data-sg-Tag:
```html
<a href="mein_bild.jpg" data-sg="gruppe1">Mein Bild 1</a>
<a href="mein_bild2.jpg" data-sg="gruppe1">Mein Bild 2</a>

<a href="example.jpg" data-sg="2"><img src="example.thumb.jpg"></a>
```

### 3. Schritt
Binde nun den HTML-Code und das Script ein:
```html
<!-- HTML-Code -->
<div id="sgBg"></div><div id="sgLayer"><div id="sgNav"><a href="#" onclick="sg.go(-1); return false;" title="Zum vorherigen Bild" class="prev"></a><a href="#" onclick="sg.go(1); return false;" title="Zum nächsten Bild" class="next"></a></div><div id="sgImg"><div id="sgAct"><a href="#" onclick="sg.close(); return false;" title="Bild schließen" class="close"></a><a href="#" title="Bild öffnen" target="_blank" class="zoom"></a></div></div></div>

<!-- Das Script -->
<script src="https://cdn.jsdelivr.net/gh/basteyy/sg/sg.min.js" charset="utf-8"></script>
```

### 4. Schritt
Fertig. Teste nun die Seite, ob es klappt.

## Beispiel
Eine Demo findest du im Internet unter http://cdn.34n.de/sg/example.html

## API
Über die Methode ```sg.preLoad({..});``` kannst du gewisse Dinge anpassen. Hier eine Auflistung:

- __max_width_all__ _Number {default: void}_ Eine maximale Breite für alle Bilder
- __max_height_all__ _Number {default: void}_ Eine maximale Höhe für alle Bilder
- __ratio__ _Boolean {default: true}_ Wenn die Breite oder Höhe des Bildes größer ist als erlaubt, wird dafür gesorgt, dass das Seitenverhältnis weiterhin stimmt und es zu keinen Verzerrungen kommt
- __smart_control__ _Boolean {default: true}_ Wenn aktiviert, wandern die Kontrollelemente für das schließen und vergrößern des Bildes, bei einer zu kleinen Lightbox über bzw. unter das Bild

### sG API nutzen
```html
<script>sg.preLoad({max_width_all: 200, max_height_all: 500, ratio: true});</script>
```

## sG F.A.Q.

## #Wie benutzte ich die Gruppenfunktion?
Der Wert des data-sg-Attributes bestimmt, in welcher Gruppe sich ein Element befindet. Du musst also lediglich jenen Bildern den gleichen Wert zuordnen, die in der gleichen Gruppe sein sollen. Und schon passt es. (Siehe example.html)

### Warum soll ich den HTML-Code selber in das Dokument einfügen?
Weil es schneller ist. Die Alternative wäre es, über Javascript ein neues Element zu erzeugen und auf dieses die entsprechenden Funktionen zu triggern. Auch wenn der Unterschied kaum spürbar wäre, gibt das direkte einfügen in den Quellcode neben Vorteilen bei der Geschwindigkeit auch eine einfachere Möglichkeit die Lightbox anzupassen.

### Kann ich auch Text und andere Elemente als Auslöser nutzen?
Das Script reagiert auf Links (<a href...) mit dem Data-sg-Tag (<a href="" data-sg=".."). Somit ist der Inhalt (was vom Link-Tag umschlossen wird) frei gestaltbar.

```html
<a href="http://example.com/myImage.png" data-sg="1">Ich bin Text</a>
```

### Wir kann ich das Script anpassen?
Alle Farben und Grafiken werden via CSS festgelegt. Also einfach die sg.min.css anpassen.

### Wie darf ich das Script nutzen?
Es gibt keine Einschränkungen. Das Script steht unter Public Domain (Gemeinfei) und darf von dir zu jedem Zweck genutzt werden.

### Wie sollte ich das Script einbinden?
Das Script soll schnell sein. Und es ist es auch nur, wenn du es richtig einbindest. Packe einfach alles an das Ende des Dokuments (siehe diese example.html). Dadurch wird alles erst ausgeführt, wenn das HTML-Dokument schon geladen worden ist. Das Script __darf nicht in den Header__.

### Ich will aber die Datei im Header und ich WILL dass es funktioniert!!
Dann musst du am Ende der Datei (wenn alle Bilder im HTML-Dokument eingefügt worden sind), folgenden Code ausführen:
```html
<script>sg.init();</script>
```

# License

MIT License

Copyright (c) 2013 - 2023 basteyy <sebastian@xzit.online>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

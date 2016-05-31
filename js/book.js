
var imgPath = "./img/";
var bimgNameArray = [], tnArray = [];
var burlArray = [];
var choose = document.getElementById("choose"),
    input = document.getElementById("fileURL"),
    output = document.getElementById("fileOutput"),
    bcimg = document.getElementById("book_cover_img"),
    pc = document.getElementById("page_count");
var files, 
    pgInd = 0,
    minDeg = -0,
    pgCnt = -1,
    dirpath = "file:///Users/jerryliu/Documents/WebFrontendProject/bookViewer/img/";


function onLoad(){
    //debugger
    //input.value = dirpath;
    //window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
    //window.requestFileSystem(window.TEMPORARY, 1024*1024, onInitFs, errorHandler);
    
    cover.addEventListener("click",book_click);
    pages.addEventListener("click",book_click);
    back.addEventListener("click",book_click);
    
    //bimgNameArray = ["cover.jpg", "1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "back.jpg"];
    cover.children[0].children[0].src = imgPath + "cover.jpg";
    
    //debugger
    /*for (var i = 0, len = pp.length; i < len; i++) {
        arg = "rotateY(" + (minDeg-((pp.length-i)*ashft)) + "deg);";
        pl[i].style["transform"] = arg;
        //console.log(i + ": " + arg);
    }*/
    cover.style["transform"] = "rotateY(" + (minDeg-2-(pp.length<<1)-2) + "deg);";
    back.style["transform"] = "rotateY(" + (minDeg) + "deg);";
    
    //debugger
    showBookViewer();

};


(function(){
    var file, 
        extension;
        //input2 = document.getElementById("dirPath"), 
        // fp = document.getElementById("folder_path"),
                
        input.addEventListener("change", function(e) {
        debugger
        files = e.target.files;              
        //output.innerHTML = "";
        
        getImgArray(files);
        
        showBookViewer();
    }, false);
})();

function getImgArray(files) {
    //debugger;
    var cind = -1, bind = -1, cname = "", bname = "", cnt = -1, padding;
    for (var i = 0, len = files.length; i < len; i++) {
        filename = files[i].name;
        fA = filename.split(".");
        if ( (fA[0] == "") || (fA[1] == "") ) {
            continue;
        }
        cnt++;
        if ( (fA[0].indexOf("cover") != -1) ) {
            //cind = i;
            cname = filename;
            filename = "00000.jpg";
            //burlArray[pind] = window.URL.createObjectURL(file);
            //extension = filename.split(".").pop();
            //output.innerHTML += "<li class='type-" + extension + "'>" + filename + "</li>";          
        } else if ( (fA[0].indexOf("back") != -1) ) {
                //bind = i;
                bname = filename;
                filename = "99999.jpg";
        } else {
            filename = fA[0];
            while (filename.length < 5) { // do padding
                filename = "0" + filename;
           }
           filename += (fA[1]!=null)?("."+fA[1]):"";
        }
        tnArray[cnt] = filename;        
    }
    tnArray.sort();
    
    for (i = 0; i<tnArray.length; i++) {
        fN = tnArray[i];
        while (fN[0]=="0") {
            fN = fN.substring(1,fN.length);
        }
        tnArray[i]=fN;
    }
    tnArray[0] = cname;
    tnArray[tnArray.length-1] = bname;
    
    bimgNameArray = tnArray;
    
    //var url1 = window.URL.createObjectURL(files[0]);               
    bcimg.src = imgPath + bimgNameArray[0];
    //fp.innerHTML = "img/"; //url1.substring(0,url1.lastIndexOf("/"));
    pgCnt = bimgNameArray.length;
    pc.innerHTML = pgCnt + " images.";
    //debugger
    output.style["visibility"] = "visible";

    //debugger;
}

function showBookViewer() {
    var bV = document.getElementById("bookViewer");
    bV.style["top"] = (window.screen.availHeight/3 - bV.scrollHeight/3) + "px"; //choose.scrollHeight + output.scrollHeight + 350;
    bV.style["left"] = (window.screen.availWidth/2) + "px";  
    bV.style["visibility"] = "visible";
    
}

var cp = [document.getElementById("c0"), document.getElementById("c1")],
    cl = [document.getElementById("cl0"), document.getElementById("cl1")];
var pp = [document.getElementById("p0"), document.getElementById("p1"),
            document.getElementById("p2"), document.getElementById("p3"),
            document.getElementById("p4"), document.getElementById("p5"),
            document.getElementById("p6"), document.getElementById("p7")];
    pl = [document.getElementById("pl0"), document.getElementById("pl1"),
            document.getElementById("pl2"), document.getElementById("pl3"),
            document.getElementById("pl4"), document.getElementById("pl5"),
            document.getElementById("pl6"), document.getElementById("pl7")];
var bp = [document.getElementById("b0"), document.getElementById("b1")],
    bl = [document.getElementById("bl0"), document.getElementById("bl1")];
var allpl = cl.concat(pl).concat(bl);
var cover = document.getElementById("cover"),
    pages = document.getElementById("pages"),
    back = document.getElementById("back");
var pshft = 2, zindv = 0, ashft = 0.5;
var td_normal = 1, td_short = 0.001;
var mf = 1;   //A good value to display like turning a page.
var spineC = document.getElementById("spine").getBoundingClientRect();
var bvC = document.getElementById("bookViewer").getBoundingClientRect();
function book_click(event) {    
    // debugger
    var x = event.clientX;     // Get the horizontal coordinate
    var y = event.clientY;     // Get the vertical coordinate
    var isOnLeft, isOnRight;
    
    spineC = document.getElementById("spine").getBoundingClientRect();
    
    isTrue = (y > (spineC.top)) && (y < (spineC.top+bvC.height));
    isOnLeft =  ( isTrue && (x > (spineC.left-bvC.width)) && (x < (spineC.left)) );
    isOnRight = ( isTrue && (x > (spineC.left)) && (x < (spineC.left+bvC.width)) );
    
    pgInd =  (pgInd < 0) ? 0 : pgInd;
    pgInd =  (pgInd >= pgCnt) ? (pgCnt-1) : pgInd;

    if ( isOnLeft ) {
        if (pgInd != (pgCnt-1)) {            
            pgInd -= ( ((pgInd%2)==0)?1:0 );   
        }
        pshft = - Math.abs(pshft);
    }
    if ( isOnRight ) {
        if (pgInd != 0) {
            pgInd += (pgInd % 2);    
        }
        pshft = Math.abs(pshft);
    }
    document.getElementById("pgInd").innerHTML = "pgInd: " + pgInd +", sl,t: (" + Math.floor(spineC.left) + "," + Math.floor(spineC.top) + "), x,y: (" + x + "," + y + ")";

    /*if ( (pgInd == 0) && (this.className == "hardcover_front") ) {
        pshft = Math.abs(pshft);
    }
    if ( (pgInd == (pgCnt-1)) && (this.className == "page") ) {
        pshft = -Math.abs(pshft);
        return;        
    }
    if ( (pgInd == 0) && (this.className == "page") ) {
        pgInd = pgCnt-1;    //A trick to show imgs reversely from the last one.
        pshft = -Math.abs(pshft);
        return; // Trick for clicking the last img of back: click event will trigger again? Don't know why.
    }*/
    // Todo: handle if the click is on left or right page.
    // if (click on left), then modify pgInd.
    // Ensure from the image index in bimgNameArray, or from the position of the book area.
    
    //handlevisibility(pgInd);
    
    var rDeg0 = -1, rDeg1 = -1, rDeg2 = -1, rDeg3 = -1, 
        tranZv1 = -8, tranZv2 = 8, tZv = -1, tZv2 = -1,
        n2slot = null, n2slot = null;        
    zindv++;
    if (pgInd <= 1) {    //click cover or its back page
        switch (pgInd) {
            case 0:
               if (cp[1].src = "#") {
                    cp[1].src = imgPath + bimgNameArray[pgInd+1];
                }
                if (pp[0].src = "#") {
                    pp[0].src = imgPath + bimgNameArray[pgInd+2];
                    rDeg2 = minDeg - (pp.length*ashft);
                }
                rDeg1 = (-180 - minDeg);
                tZv = 0;
                tZv2 = tranZv2;
                pl[0].style["-webkit-transform"] = "rotateY(" + rDeg2 + "deg) translateZ(" + tranZv2 + "px)"; 
                break;
            case 1:
                rDeg1 = minDeg - ((1+pp.length)*ashft);
                tZv = tranZv2;
                tZv2 = 0;
                
                tv = pl[0].style["-webkit-transform"];
                tv = tv.substring(0, tv.indexOf("translateZ")+11) + tZv2 + "px)";
                pl[0].style["-webkit-transform"] = tv;
                
                /*pgInd = -2;
                pshft = 2;  // Trick for auto-traversal.*/
                break; 
            default:
                alert("Imp pgInd: " + pgInd);
        }
        cover.style["transition-duration"] = td_normal + "s";
        cover.style["-webkit-transform"] = "rotateY(" + rDeg1 + "deg) translateZ(" + tZv + "px)";
        //e.style["-moz-transform"] = "rotateY(" + rDeg + "deg) translateZ(0)";
        //e.style["transform"] = "rotateY(" + rDeg + "deg) translateZ(0)";
        cover.style["z-index"] = zindv;
        
        pl[0].style["z-index"] = zindv; 

        back.style["-webkit-transform"] = "rotateY(" + minDeg + "deg)";// translateZ(" + tranZv2 + "px)";
        back.style["z-index"] = -1;
    } else if (pgInd >= (pgCnt-2)) {    //click last page or back
        var tpgCnt = pgCnt, tV = 0;
        if ((tpgCnt % 2)==1) {   // total cnt should be even. some page missing. A trick to handle this.
            tpgCnt += 1;
            tV = 1;
        }
        switch (pgInd) {
            case (tpgCnt-2):
               if (bp[1].src = "#") {
                    bp[1].src = imgPath + bimgNameArray[ (tV==1)?pgInd:(pgInd+1) ];
                }
                rDeg1 = ( -180 - minDeg + ((1+pp.length)*ashft) );
                tZv = tranZv1;
                tZv2 = 0;

                bsInd = (pgInd-2) % pp.length;
                prev = (bsInd==0)?(pl.length-1):(bsInd-1);
                
                pages.removeEventListener("click",book_click);

                /*pgInd = 17;
                pshft = -2; // Trick for auto-traversal.*/
                break;
            case (tpgCnt-1):
                rDeg1 = minDeg;
                tZv = 0;
                tZv2 = tranZv1;

                bsInd = (pgInd-2) % pp.length;                
                prev = (bsInd<=1)?(pl.length-(2-bsInd)):(bsInd-2);
                
                //$("#pages").off("click", book_click);
                $("#pages").off("click");
                pages.addEventListener("click" , book_click);

                break; 
            default:
                alert("Imp pgInd: " + pgInd);
        }
        //e.style["-moz-transform"] = "rotateY(" + rDeg + "deg) translateZ(0)";
        //e.style["transform"] = "rotateY(" + rDeg + "deg) translateZ(0)";
        back.style["-webkit-transform"] = "rotateY(" + rDeg1 + "deg) translateZ(" + tZv + "px)";
        back.style["transition-duration"] = td_normal + "s";
        back.style["z-index"] = zindv;

        tv = pl[prev].style["-webkit-transform"];
        tv = tv.substring(0, tv.indexOf("translateZ")+11) + tZv2 + "px)";
        pl[prev].style["-webkit-transform"] = tv;
    } else {
        // pgInd: 0  1      2   3   4   5   6   7   8   9       (pgCnt-1)   pgCnt  
        //        C0 C1     P0  P1  P2  P3  P4  P5              B0          B1
        // if (pgInd > 5) && (pgInd < (pgCnt-3)), don't turn page.

        var bsInd = (pgInd-2) % pp.length, bsInd1 = -1, bsInd2 = -1, tZv1 = -1, tZv2 = -2;
        var cs = (pgInd % 2), next1, next2, prev1=null,bsInd3=-1;
        switch (cs) {
            case 0: //even, check the following 2 pages to load correct images.
                next1 = imgPath + bimgNameArray[pgInd+1];
                next2 = imgPath + bimgNameArray[pgInd+2];
                bsInd1 = bsInd+1;   // the inde for next page
                if ((pgInd+2) >= (pgCnt-2)) {   // handle the case for showing the back pages
                    n2slot = back;
                    bp[0].src = next2;
                    rDeg3 = ( minDeg );    // Always turn to the same degree.
                } else {
                    bsInd2 = (bsInd+2) % pp.length;
                    bsInd3 = (bsInd+3) % pp.length;
                    rDeg2 = minDeg - ( ((pgInd+2)>=(2+(pp.length>>1)))?(pp.length>>1)*ashft:(pgInd+1)*ashft ); 
                    rDeg3 = rDeg2 + 1;
                } 
                if ( pgInd < (2+(pp.length>>1)) ) {  // the degree for bsInd (current page) and next page, get the page before bsInd
                    rDeg0 = ( -180 - minDeg + ((1+bsInd)*ashft));   
                    rDeg1 = rDeg0 + ashft;
                } else {
                    rDeg1 = ( -180 - minDeg + ((pp.length>>1)*ashft)); // pp.length 中間左頁
                    rDeg0 = rDeg1 - ashft;
                }
                if (pgInd <= 2) {
                    prev1 = cover;
                } else {
                    prev1 = (bsInd==0)?pl[pl.length-1]:pl[bsInd-1];
                }
                tZv1 = tranZv1; 
                tZv2 = tranZv2;
                break;
            case 1: //odd, check the previous 2 pages to load correct imgs.
                next1 = imgPath + bimgNameArray[pgInd-1];
                next2 = imgPath + bimgNameArray[pgInd-2];
                bsInd1 = bsInd-1;
                if ((pgInd-2)<=1) {
                    n2slot = cover;
                    cp[1].src = next2;
                    rDeg3 = ( -180 - minDeg ); // Always turn to the same degree.                    
                } else {
                    bsInd2 = (bsInd<2)?(pp.length-(2-bsInd)):(bsInd-2);
                    bsInd3 = (bsInd<3)?(pp.length-(3-bsInd)):(bsInd-3);
                    rDeg2 = -180 - minDeg + ( ((pgInd+2)>=(2+(pp.length>>1)))?(pp.length>>1)*ashft:(pgInd-3)*ashft );
                    rDeg3 = rDeg2 - 1; 
                }
                if (pgInd <= 3 ) {    
                    rDeg0 = ( minDeg - (((pp.length>>1)+1)*ashft));
                    rDeg1 = rDeg0 - ashft;
                } else {
                    rDeg1 = ( minDeg - ((pp.length>>1)*ashft) ); // pp.length 中間右頁
                    rDeg0 = rDeg1 + ashft;                    
                }
                if (pgInd >= (pgCnt-3)) {
                    prev1 = back;
                } else {
                    prev1 = ((bsInd+1)==pl.length)?pl[0]:pl[bsInd+1];
                }
                tZv1 = tranZv2; 
                tZv2 = tranZv1;
                break;
            default:
                alert("Err pgInd: " + pgInd);
        } 

        pp[bsInd1].src = next1;
        if (n2slot == null) {
            pp[bsInd2].src = next2;
            n2slot = pl[bsInd2];
        }
        if (rDeg2 != -1) {  // exchange an older one with next next one.
            n2slot.style["transition-duration"] = td_short + "s";
            n2slot.style["transform"] = "rotateY(" + rDeg2 + "deg) translateZ(" + tZv2 + "px)";
            n2slot.style["z-index"] = zindv;
        } else {    // back or cover case
            n2slot.style["transition-duration"] = (td_normal*mf) + "s";               
            n2slot.style["transform"] = "rotateY(" + rDeg3 + "deg) translateZ(" + tZv2 + "px)";            
            n2slot.style["z-index"] = zindv;
        }
        pl[bsInd].style["transition-duration"] = td_normal + "s";
        pl[bsInd].style["transform"] = "rotateY(" + rDeg0 + "deg) translateZ(0)";

        pl[bsInd1].style["transition-duration"] = (td_normal*mf) + "s";
        pl[bsInd1].style["transform"] = "rotateY(" + rDeg1 + "deg) translateZ(" + tZv1 + "px)";
        pl[bsInd1].style["z-index"] = zindv;

        if (prev1 != null) {
            tv = prev1.style["transform"];
            tv = tv.substring(0, tv.indexOf("translateZ")+11) + "0)"; 
            prev1.style["transform"] = tv;
        }
        
        if (bsInd3 != -1) {
            //pl[bsInd3].style.visibility = "hidden";
            pl[bsInd3].style["transition-duration"] = "0.0001s";
            pl[bsInd3].style["transform"] = "rotateY(" + ((rDeg2==-1)?rDeg3:rDeg2) + "deg) translateZ(0px)";
            //pl[bsInd3].style.visibility = "visible";          
        }
        //debugger;
    }
    pgInd = (pgInd+pshft);
    document.getElementById("pgInd").innerHTML += ", after: " + pgInd;
}

function handlevisibility(pgInd) {
    var m2 = ((pgInd%2)==0);
    var i, lb=(m2)?1:2, rb=(m2)?2:1;
    for ( i = 0; i< allpl.length; i++ ) {
        if ( (i>=(pgInd-lb)) && (i<=(pgInd+rb)) ) {
            allpl[i].style.visibility = "visible";
        } else {
            allpl[i].style.visibility = "hidden";
        }
    }    
}

function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; // FileList object.

    getImgArray(files);
    showBookViewer();

    // files is a FileList of File objects. List some properties.
    /*var output = [];
    for (var i = 0, f; f = files[i]; i++) {
        output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                    f.size, ' bytes, last modified: ',
                    f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                    '</li>');
    }
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';*/
}

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

// Setup the dnd listeners.
var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);
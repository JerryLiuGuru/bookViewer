
// UI Logic========================================================================================
var imgPath = "./img/";
var biA = [], tnArray = [], iLA = [];
var isImgArrayLoaded = false, i0loadedti = null;
var debugMode = false;
var sX = -1, sY = -1;
var sA = [];

function handleResize(img) {
    /*
        A3: 297 x 420mm => 0.707143 ( w/h : aspect ratio)
        A4: 210 x 297mm => 0.70707
        B4: 250 x 353mm => 0.708215
        B5: 176 x 250mm => 0.704
    */
    var i, w = img.width, h = img.height, sw = window.screen.availWidth, sh = window.screen.availHeight;
    var wratio = (2 * w) / sw, hratio = h / sh, tw = null, th = null;

    if (wratio > bsRatio) {     // 因為 width 要用 2*w 估算，先以 width 評估起
        tw = (bsRatio * sw) >> 1;
        th = (tw / w) * h;
    } else {
        th = (h / sh);
    }
    if (th > (sh * 5 / 6)) {  // height 還是太高超過 screen height, 要改以 height 估算
        th = bsRatio * sh;
        tw = (th / h) * w;
    }
    if (tw == null) {
        if (th > (tw << 1)) {
            th = (bsRatio * sh);
            tw = w * (th / h);
        } else {
            tw = (bsRatio * sw) >> 1;
            th = h * (tw / w);
        }
    }
    rw = Math.round(tw * scaleUpRatio);
    rh = Math.round(th * scaleUpRatio);
    //bV.style.width = rw + "px";
    //bV.style.height = rh + "px";
    rw2 = Math.round(tw);
    rh2 = Math.round(th);
    tbdrw = (brderWid * 2);
    tbdrw2 = (brderWid * 2);
    for (i = 0; i < allpl.length; i++) {
        if (allpl[i] != null) {
            if ((i <= 1) || (i >= (allpl.length - 2))) {
                allpl[i].width = window.screen.availWidth; //rw-tbdrw;    //NOTICE: Can't use .style.width = "xxx" + "px";
                allpl[i].height = window.screen.availHeight; //rh-tbdrw;   //Since it will remain the original size of inner image.                                
            } else {
                //allpl[i].style="top: " + ((rh-rh2)/2) + "; left: " + ((rw-rw2)/2) 
                allpl[i].width = window.screen.availWidth; //rw-tbdrw2;    //NOTICE: Can't use .style.width = "xxx" + "px";
                allpl[i].height = window.screen.availHeight; //rh-tbdrw2;   //Since it will remain the original size of inner image.                
            }
        }
    }
    //return [rw-tbdrw, rh-tbdrw, rw-tbdrw2, rh-tbdrw2];
    return [rw2, rh2, rw2, rh2];
}

function showBookViewer() {
    dZ = document.getElementById("dz_table");
    dZ.style["z-index"] = 2;

    if (debugMode) {    // for debug;
        sY = Math.floor(window.screen.availHeight / 2 - sA[1] / 2.1); //choose.offsetHeight + output.offsetHeight + 350;
        sX = Math.floor(window.screen.availWidth / 2 - sA[0] / 1.5);
    } else {
        sY = Math.floor(window.screen.availHeight / 2 - sA[1] / 2.1); //choose.offsetHeight + output.offsetHeight + 350;
        sX = Math.floor(window.screen.availWidth / 2);
    }
}

function onLoad() {
    //debugger
    //input.value = dirpath;
    //window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
    //window.requestFileSystem(window.TEMPORARY, 1024*1024, onInitFs, errorHandler);
    $("canvas").off("onmousedown");
    $("canvas").off("onmousemove");
    $("canvas").off("onmouseup");
    $("img").off("onload");
    
    i0.src = imgPath + "cover.jpg";

    i0.onload = function () {
        sA = handleResize(i0);
        showBookViewer();

        shaCfg.spw = 50; //Math.floor(sA[0] * shaCfg.widPer);
        shaCfg.rect = [[sX, sY, shaCfg.spw, sA[1]],
            [sX - shaCfg.spw, sY, shaCfg.spw, sA[1]]];
        shaCfg.grd = [[sX, sY, sX + shaCfg.spw, sY],
            [sX - shaCfg.spw, sY, sX, sY]];

        canPos.c_b = [sX, sY, sA[0], sA[1]];
        canPos.pgs = [sX + (sA[0] - sA[2]) / 2, sY + (sA[1] - sA[3]) / 2, sA[2], sA[3]];

        var ctx2 = allpl[0].getContext('2d');
        //ctx2.drawImage(c0, sX-shaCfg.spw, sY, sA[0]+shaCfg.spw, sA[1]);
        ctx2.drawImage(i0, sX, sY, sA[0], sA[1]);
        //alert(sA[0] + "," + sA[1]);
    }

    i0loadedti = setInterval(addOnLoad, 500);
    
    bC.onmousemove = nC.onmousemove = nnC.onmousemove = mm;
    bC.onmousedown = nC.onmousedown = nnC.onmousedown = md;
    bC.onmouseup = nC.onmouseup = nnC.onmouseup = mu;
    //bC.onmouseover = nC.onmouseover = nnC.onmouseover = mo;

    iLA = new Array(allpi.length);
    for (i=0; i<allpi.length; i++) {
      iLA[i] = -1;
    }

    if (0) {
        c1.src = imgPath + "1.jpg";
        c1.onload = function () {
            var ctx2 = nC.getContext('2d');
            ctx2.drawImage(c1, sX, sY, sA[0], sA[1]);

            p0.src = imgPath + "2.jpg";
            p0.onload = function () {
                var ctx2 = pl0.getContext('2d');
                ctx2.drawImage(p0, sX, sY, sA[0], sA[1]);
            }
        }

    }
};

function addOnLoad() {
    if (isImgArrayLoaded) {
        //Add OnLoad event handler for each image
        if (allpi[1].onload == null) {
            i0.onload = null;

            for (var i = 0; i < allpi.length; i++) {
                allpi[i].src = imgPath + biA[i];
                allpi[i].addEventListener("load", 
                    function dc(ele) {
                        var ctx;
                        var ti = ele.target;
                        var id = ti.id;
                        var inum = parseInt(id[1]);
                        if (imInd == -1) { // for initial
                            if (inum < allpl.length) {
                                ctx = allpl[inum].getContext("2d");
                                ctx.drawImage(ti, sX, sY, sA[0], sA[1]);    
                            }    
                            lcnt++;
                            if (lcnt == allpi.length) {
                            imInd = 0;
                            niInd = 1;
                            nniInd = 2;
                            }
                        } else {
                            if (niInd == -1) {
                            return;
                            }
                            if (inum == niInd) {
                                ctx = nC.getContext("2d");
                            } else if (inum == nniInd) {
                                ctx = nnC.getContext("2d");
                            } else {
                                console.log("???@78:"+inum+",niI="+niInd+",nniI="+nniInd);
                            }
                            if (iLA[inum] == 0) {
                                ctx.drawImage(allpi[inum], sX-sA[0], sY, sA[0], sA[1]); 
                                console.log("isLoadLpg:"+inum+","+((inum==niInd)?"niI":"nniI"));
                            } else if (iLA[inum] == 1) {
                                ctx.drawImage(allpi[inum], sX, sY, sA[0], sA[1]);
                                console.log("isLoadRpg:"+inum+","+((inum==niInd)?"niI":"nniI"));
                            }
                            iLA[inum] = -1;
                        }
                    }                    
                );                
            }
        }
        clearTimeout(i0loadedti);
    }
}

/*(function(){
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
*/

function getImgArray(files) {
    //debugger;
    var cind = -1, bind = -1, cname = "", bname = "", cnt = -1, padding;
    for (var i = 0, len = files.length; i < len; i++) {
        filename = files[i].name;
        fA = filename.split(".");
        if ((fA[0] == "") || (fA[1] == "")) {
            continue;
        }
        cnt++;
        if ((fA[0].indexOf("cover") != -1)) {
            //cind = i;
            cname = filename;
            filename = "00000.jpg";
            //burlArray[pind] = window.URL.createObjectURL(file);
            //extension = filename.split(".").pop();
            //output.innerHTML += "<li class='type-" + extension + "'>" + filename + "</li>";          
        } else if ((fA[0].indexOf("back") != -1)) {
            //bind = i;
            bname = filename;
            filename = "99999.jpg";
        } else {
            filename = fA[0];
            while (filename.length < 5) { // do padding
                filename = "0" + filename;
            }
            filename += (fA[1] != null) ? ("." + fA[1]) : "";
        }
        tnArray[cnt] = filename;
    }
    tnArray.sort();

    for (i = 0; i < tnArray.length; i++) {
        fN = tnArray[i];
        while (fN[0] == "0") {
            if ((debugMode && (tnArray.length < 20)) && (fN.substring(0, fN.indexOf(".")).length == 2)) {
                break;
            }
            fN = fN.substring(1, fN.length);
        }
        tnArray[i] = fN;
    }
    tnArray[0] = cname;
    tnArray[tnArray.length - 1] = bname;

    biA = tnArray;

    imCnt = biA.length;
    bcimg.src = imgPath + biA[0];
    pgc.innerHTML = imCnt + " images.";
    output.style["visibility"] = "visible";
    
    isImgArrayLoaded = true;
    //debugger;
    //var url1 = window.URL.createObjectURL(files[0]);               
    //fp.innerHTML = "img/"; //url1.substring(0,url1.lastIndexOf("/"));    
}

function update_imInd(x, y) {
    document.getElementById("imInd").innerHTML = "imInd: " + imInd + ", x,y: (" + x + "," + y + ")";
    console.log("Line727: imInd=" + imInd);
}

function chk_LoR_page_adj_pgInd(x, y, id) {
    var pnum = parseInt(id[id.length - 1]);
    var isTrue = ((y >= sY) && (y <= (sY + sA[1])));
    var isOnL = (x >= (sX - sA[0])) && (x <= sX) && isTrue;
    var isOnR = (x >= sX) && (x <= (sX + sA[0])) && isTrue;

    if ((mouseState == "0") && (imInd > 0) && (imInd < (imCnt - 1))) {   //update when mousedown
        if (isOnL) {
            imInd -= (((imInd % 2) == 0) ? 1 : 0);
            //pshft = - Math.abs(pshft);
        } else if (isOnR) {
            imInd += (imInd % 2);
            //pshft = Math.abs(pshft);
        }
    }
    return [isOnL, isOnR];
}

function chg_2_ori_size(pg) {
    tv = pg.style["transform"];
    tv = tv.substring(0, tv.indexOf("translateZ") + 11) + "0px)";
    pP.style["transform"] = tv;
}

function doCanvasMouseMove(event) {
    var x = event.clientX;
    var y = event.clientY;

    console.log("@(" + x + "," + y + ")");

}

function handlevisibility(pgInd) {
    var m2 = ((pgInd % 2) == 0);
    var i, lb = (m2) ? 1 : 2, rb = (m2) ? 2 : 1;
    for (i = 0; i < allpl.length; i++) {
        if ((i >= (pgInd - lb)) && (i <= (pgInd + rb))) {
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

// Book Logic=======================================================================================
var choose = document.getElementById("choose"),
    input = document.getElementById("fileURL"),
    output = document.getElementById("fileOutput"),
    bcimg = document.getElementById("book_cover_img"),
    pgc = document.getElementById("page_count");
var files,
    dirpath = "file:///Users/jerryliu/Documents/WebFrontendProject/bookViewer/img/";
var i0 = document.getElementById("i0"), i5 = document.getElementById("i5");
var allpi = [i0, document.getElementById("i1"),
    document.getElementById("i2"), document.getElementById("i3"),
    document.getElementById("i4"), i5];
var allpl = [document.getElementById("bC"), document.getElementById("nC"),
    document.getElementById("nnC")];
var imInd = -1, niInd = -1, nniInd = -1;
var canPos = {
    c_b: [-1, -1, -1, -1],
    pgs: [-1, -1, -1, -1]
};
var shaCfg = {
    widPer: 0.05,   //shadow width for inner part of a page
    spw: -1,        //real shadow with after bookViewer width is decided.
    rect: [[-1, -1, -1, -1], [-1, -1, -1, -1]],
    //Pg_cs: [ ["#888", "#fff"], ["#fff","#888"] ],   // right and left
    Pg_cs: [["0", "255"], ["255", "0"]],   // right and left
    grd: [[-1, -1, -1, -1], [-1, -1, -1, -1]]
};
var tPbrdercolor = "#34495e", bgcolor = "#ecf0f1";;
var pbOnTopX, pbOnBotX, pbOnLefY, pbOnRigY;
var isValid, l1, l2, l3, degb;
var bsRatio = (4 / 5), scaleUpRatio = 1.05, brderWid = 5;  // Book to Screen ratio
var showItvl = 10, minToShow = 10;
var lcnt=0;
//var isLoadLpg, isLoadRpg; //20160616: Obsolete.
var mouseState = null;
var imCnt = 0;
var shkRatio = 1 / 2;
var doSP = null;
var isOnLpg_d, isOnRpg_d, isOnLpg_u, isOnRpg_u;
var dX, dY;
var lastImg = i5; 
var tAsC = 10;

function doShowPageByInterval(curX, curY, tarX, tarY, timeItvl, shrinkDis, midX, midY) {
    // Animation Line: Y - dP[1] = (cy-dP[1])/(cx-dP[0]) * (X - dp[0]);
    // Do 4 steps to be on the dP. Every step take half way.
    //var sS = [ [-1,-1], [-1,-1], [-1,-1] ];

    //console.log("Set page to ("+curX+","+curY+")");
    //console.log("mousemove200");
    doSP(curX, curY);
    if (midX != null) {
        if ( (curX == midX) && (curY == midY) ) {
            setTimeout(doShowPageByInterval, timeItvl, midX, midY, tarX, tarY, timeItvl, shrinkDis);
        } else if ((Math.abs(curX - midX) <= minToShow) || (Math.abs(curY - midY) <= minToShow)) {
            setTimeout(doShowPageByInterval, timeItvl, midX, midY, tarX, tarY, timeItvl, shrinkDis, midX, midY);   
        } else {
            curX = (curX + ((midX - curX) * shrinkDis));
            curY = (curY + ((midY - curY) * shrinkDis));
            setTimeout(doShowPageByInterval, timeItvl, curX, curY, tarX, tarY, timeItvl, shrinkDis, midX, midY);
        }        
    } else if ((Math.abs(curX - tarX) > minToShow) || (Math.abs(curY - tarY) > minToShow)) {
        curX = (curX + ((tarX - curX) * shrinkDis));
        curY = (curY + ((tarY - curY) * shrinkDis));
        //sS[i] = [tX, tY];
        setTimeout(doShowPageByInterval, timeItvl, curX, curY, tarX, tarY, timeItvl, shrinkDis);
    } else {
        curX = tarX;
        curY = tarY;
        doSP(curX, curY);

        //load next 2 imgs and prev 2 imgs to nC and nnC
        if ( isOnLpg_d && ((mouseState=="02")||((mouseState=="012")&&(isOnRpg_u))) ) {
            imInd -= 2;
            if (imInd >= 2) {
              niInd = ( (imInd-2) % allpi.length);
              allpi[niInd].src = imgPath + biA[imInd-2];
              iLA[niInd] = 0; //isLoadLpg
              //isLoadLpg = true; isLoadRpg = false;  // Actuall isLoadLpg & isLoadRpg are mutually exclusive.
            } else if (imInd == 0) {
              niInd = 1;
              allpi[niInd].src = imgPath + biA[1];
              //isLoadRpg = true; isLoadLpg = false;  // Use them both just to indicate clear logic.
              iLA[niInd] = 1; //isLoadRpg 
            }
            if (imInd >= 3) {
              nniInd = (niInd<1)?(allpi.length-1):(niInd-1); 
              allpi[nniInd].src = imgPath + biA[imInd-3];
              //isLoadLpg = true; isLoadRpg = false;
              iLA[nniInd] = 0; //isLoadLpg
            } else if (imInd == 0) {
              nniInd = 2;
              allpi[nniInd].src = imgPath + biA[2];
              //isLoadRpg = true; isLoadLpg = false;
              iLA[nniInd] = 1; //isLoadRpg
            }
            ctx = allpl[1].getContext('2d');
            ctx.drawImage(allpi[(imInd+1) % allpi.length], sX, sY, sA[0], sA[1]);
            ctx2 = allpl[2].getContext('2d');
            ctx2.drawImage(allpi[(imInd+2) % allpi.length], sX, sY, sA[0], sA[1]);
        } else if ( isOnRpg_d && ((mouseState=="02")||((mouseState=="012")&&(isOnLpg_u))) ) {
            imInd += 2;
            if (imInd <= (biA.length-3)) {
              nniInd = ( (imInd+2) % allpi.length);
              allpi[nniInd].src = imgPath + biA[imInd+2];
              iLA[nniInd] = 1; //isLoadRpg
            }
            if (imInd <= (biA.length-2)) {
              niInd = ( (imInd+1) % allpi.length);
              allpi[niInd].src = imgPath + biA[imInd+1];  
              iLA[niInd] = 1; //isLoadRpg
            }
            //isLoadRpg = true; isLoadLpg = false;
            ctx = allpl[1].getContext('2d');
            if ((imInd-2)>=0) {
              ctx.drawImage(allpi[(imInd-2) % allpi.length], sX-sA[0], sY, sA[0], sA[1]); 
            }
            ctx2 = allpl[2].getContext('2d');
            if ((imInd-3)>=0) {
              ctx2.drawImage(allpi[(imInd-3) % allpi.length], sX-sA[0], sY, sA[0], sA[1]);  
            }            
        }
        console.log("end of action: imIaft="+imInd+",mS="+mouseState+",OLd="+isOnLpg_d+",ORd="+isOnRpg_d+",OLu="+isOnLpg_u+",ORu="+isOnRpg_u);
        isOnLpg_d = isOnLpg_u = isOnRpg_d = isOnRpg_u = mouseState = null;
        update_imInd(tarX, tarY);
    }
}

function chk_LoR_page_adj_pgInd(x, y, id) {
    var isTrue = ((y >= sY) && (y <= (sY + sA[1])));
    var isOnL = (x >= (sX - sA[0])) && (x <= sX) && isTrue;
    var isOnR = (x >= sX) && (x <= (sX + sA[0])) && isTrue;

    if ((mouseState == "0") && (imInd > 0) && (imInd < (imCnt - 1))) {   //update when mousedown
        if (isOnL) {
            imInd -= (((imInd % 2) == 0) ? 1 : 0);
            //pshft = - Math.abs(pshft);
        } else if (isOnR) {
            imInd += (imInd % 2);
            //pshft = Math.abs(pshft);
        }
    }
    return [isOnL, isOnR];
}

function md(event) {
    var cE = event.target;

    if (!isImgArrayLoaded) {
        alert("Book images not loaded. Drag them into the dropzone.");
        return;
    }
    if (mouseState != null) {
      return;
    }
    var isLoadingSomeImg = false;
    for (var i=0; i<iLA.length; i++) {
      //console.log("chk "+i+":"+iLA[i]);
      if (iLA[i]>=0) {
        isLoadingSomeImg = true;
        break;  
      }
    }
    if (isLoadingSomeImg) {
      console.log("still loading "+i);
      return;
    }
    
    dX = event.clientX;
    dY = event.clientY;
    [isOnLpg_d, isOnRpg_d] = chk_LoR_page_adj_pgInd(dX, dY, cE.id);
    if ( ((imInd == imCnt) && isOnRpg_d) || ((imInd == 0) && isOnLpg_d) ) {
      isOnLpg_d = isOnRpg_d = null;
      return;
    }
    mouseState = "0"; 
    //isLoadRpg = isLoadLpg = null; 
    // 20160616: Can't do here b'cos they are used in img onLoad callback. Sometimes set null before onLoad.
    /* 20160616: Still don't work if quickly click on the left or right. Must use an array to indicate if 
                 there is a loading action for allpi's each image slot.*/
}

function mu(event) {
    var cE = event.target;
    var slideMode = false;

    if ( (mouseState != "0")&&(mouseState != "01") ) {
      return;
    }
    
    uX = event.clientX, uY = event.clientY;
  
    mouseState += "2";
    [isOnLpg_u, isOnRpg_u] = chk_LoR_page_adj_pgInd(uX, uY, cE.id);
    
    if (isOnLpg_d) {
        doSP = doPagePositionByMouseCorLpg;
        if ( (Math.abs(uX - dX) < tAsC) && (Math.abs(uY - dY) < tAsC) ) {
          setTimeout(doShowPageByInterval, showItvl, sX - sA[0], sY + sA[1], sX + sA[0], sY + sA[1], showItvl, shkRatio, sX-5, sY + (sA[1]*4/5));
          //setTimeout(doShowPageByInterval, showItvl, sX - sA[0], sY + sA[1], sX + sA[0], sY + sA[1], showItvl, shkRatio);
        } else {
          slideMode = true;
        }
    } else if (isOnRpg_d) {
        doSP = doPagePositionByMouseCorRpg;
        if ( (Math.abs(uX - dX) < tAsC) && (Math.abs(uY - dY) < tAsC) ) {
          setTimeout(doShowPageByInterval, showItvl, sX + sA[0], sY + sA[1], sX - sA[0], sY + sA[1], showItvl, shkRatio, sX-5, sY + (sA[1]*4/5));
          //setTimeout(doShowPageByInterval, showItvl, sX + sA[0], sY + sA[1], sX - sA[0], sY + sA[1], showItvl, shkRatio);
        } else {
          slideMode = true;
        }
    }
    if (slideMode) {
      slideFromA2B(isOnLpg_u, isOnRpg_u, uX, uY);
      /*var dP = null;
      if (isOnLpg_u) {
        dP = [sX - sA[0], sY + sA[1]];
      } else if (isOnRpg_u) {
        dP = [sX + sA[0], sY + sA[1]];
      } else {
        dP = (uX < sX) ? ([sX - sA[0], sY + sA[1]]) : ([sX + sA[0], sY + sA[1]]);
      }
      setTimeout(doShowPageByInterval, showItvl, uX, uY, dP[0], dP[1], showItvl, 1 / 2);*/          
    }
}

function slideFromA2B(isOLu, isORu, uX, uY) {
      var dP = null;
      if (isOLu) {
        dP = [sX - sA[0], sY + sA[1]];
      } else if (isORu) {
        dP = [sX + sA[0], sY + sA[1]];
      } else {
        dP = (uX < sX) ? ([sX - sA[0], sY + sA[1]]) : ([sX + sA[0], sY + sA[1]]);
      }
      setTimeout(doShowPageByInterval, showItvl, uX, uY, dP[0], dP[1], showItvl, 1 / 2);              
}

function mm(event) {
    var cE = event.target;
    var tx = event.clientX, ty = event.clientY;
    var rxR = (sX+sA[0]*3/4), lxR = (sX-sA[0]*3/4), yR = (sY+sA[1]*3/4);

    if (mouseState == "0") {
        if ( ( isOnLpg_d && ((dX > lxR) || (dY < yR)) ) ||
             ( isOnRpg_d && ((dX < rxR) || (dY < yR)) ) ) {
            mouseState = null;
            return;
        }
    }
    if ( (imInd != -1) && (imInd < imCnt) && (tx > rxR) && (ty > yR) ) {
        bC.style.cursor = "nw-resize";
    } else  if ( (imInd > 0) && (tx < lxR) && (ty > yR) ) {
        bC.style.cursor = "ne-resize";
    } else {
        if (mouseState != "01") {
            bC.style.cursor = "default";        
        }
    }
    
    if (mouseState == "0") {
      mouseState += "1";
    } else if (mouseState != "01") {
      return;
    }

    if (isOnLpg_d) {
        doSP = doPagePositionByMouseCorLpg;
        doSP(tx,ty);
    } else if (isOnRpg_d) {
        doSP = doPagePositionByMouseCorRpg;
        doSP(tx,ty);
    }
}

function mo(event) {
    var cE = event.target;
    var tx = event.clientX, ty = event.clientY;

    ctx2 = bC.getContext('2d');
    ctx2.beginPath();
    ctx2.moveTo(sX+sA[0], sY+sA[1]);
    ctx2.lineTo(sX+sA[0]*3/4, sY+sA[1]);
    ctx2.lineTo(sX+sA[0]*3/4, sY+sA[1]*3/4);
    ctx2.lineTo(sX+sA[0], sY+sA[1]*3/4);
    ctx2.closePath();
    ctx2.strokeStyle = "red";
    ctx2.stroke();
    ctx2.beginPath();
    ctx2.moveTo(sX-sA[0], sY+sA[1]);
    ctx2.lineTo(sX-sA[0]*3/4, sY+sA[1]);
    ctx2.lineTo(sX-sA[0]*3/4, sY+sA[1]*3/4);
    ctx2.lineTo(sX-sA[0], sY+sA[1]*3/4);
    ctx2.closePath();
    ctx2.strokeStyle = "red";
    ctx2.stroke();

    if ( (imInd != -1) && (imInd < imCnt) && (tx > (sX+sA[0]*3/4)) && (ty > (sY+sA[1]*3/4)) ) {
        mouseState = "4";
            bC.style.cursor = "nw-resize";
            isOnRpg_d = true;
            doSP = doPagePositionByMouseCorRpg;
            doSP(tx,ty); 
            console.log("nw-resize");           
    } else  if ( (imInd > 0) && (tx < (sX-sA[0]*3/4)) && (ty > (sY+sA[1]*3/4)) ) {
        mouseState = "4";
            bC.style.cursor = "ne-resize";
            isOnLpg_d = true;
            doSP = doPagePositionByMouseCorLpg;
            doSP(tx,ty);
            console.log("ne-resize");
    } else {
        bC.style.cursor = "default";
        if (mouseState == "4") {
            mouseState = "02";
            slideFromA2B(isOnLpg_d, isOnRpg_d, sX+sA[0]*4/5, sY+sA[1]*4/5);
            console.log("release");
            return;            
        }
    }
}

function oc(event) {
    var cE = event.target;
    var tx = event.clientX, ty = event.clientY;
    /*if ( (cE.id != "myCanvas") || (tx<sX) || (tx>(sX+sA[0])) || (ty<sY) || (ty>(sY+sA[1])) ) {
      return;
    }*/
    /*for (i=0; i<allpl.length; i++) {
      if (allpl[i].id == cE.id) {
        startC = bC = allpl[i];
        nC = allpl[(i+1)%allpl.length];
        nnC = allpl[(i+2)%allpl.length];
        pC = (i==0)?allpl[allpl.length-1]:allpl[i-1];
      }  
    }*/
    mouseState = "0";
    [isOnLpg_d, isOnRpg_d] = chk_LoR_page_adj_pgInd(tx, ty, cE.id);

    if (isOnLpg_d) {
        doSP = doPagePositionByMouseCorLpg;
        setTimeout(doShowPageByInterval, showItvl, sX - sA[0], sY + sA[1], sX + sA[0], sY + sA[1], showItvl, shkRatio, sX-5, sY + (sA[1]*4/5));
        //setTimeout(doShowPageByInterval, showItvl, sX - sA[0], sY + sA[1], sX + sA[0], sY + sA[1], showItvl, shkRatio);
    } else if (isOnRpg_d) {
        doSP = doPagePositionByMouseCorRpg;
        setTimeout(doShowPageByInterval, showItvl, sX + sA[0], sY + sA[1], sX - sA[0], sY + sA[1], showItvl, shkRatio, sX-5, sY + (sA[1]*4/5));
        //setTimeout(doShowPageByInterval, showItvl, sX + sA[0], sY + sA[1], sX - sA[0], sY + sA[1], showItvl, shkRatio);
    }
}

function doPagePositionByMouseCorRpg(ofsX, ofsY) {
    var cp = [ofsX, ofsY];    // current position in canvas
    var pe = [sX + sA[0], sY + sA[1]]; // page right-bottom endpoint
    var p1 = [sX, sY];
    var riInd = (imInd % allpi.length);
    var liInd = ((imInd-1)>=0)?((imInd-1) % allpi.length):null;

    ctx2 = bC.getContext('2d');

    var ce = [(cp[0] + pe[0]) / 2, (cp[1] + pe[1]) / 2];   // center of cp & pe
    var slope_cp = (cp[1] - pe[1]) / (cp[0] - pe[0]);   // slope of cp & pe   
    var slope_pb = - (1 / slope_cp); // perpendicular bisector 垂直平分線
    //==> pb equation: y - ce[1] = slope_pb * (x - ce[0])
    pbOnTopX = Math.floor(((sY - ce[1]) / slope_pb) + ce[0]);
    pbOnBotX = Math.floor(((pe[1] - ce[1]) / slope_pb) + ce[0]);
    pbOnLefY = Math.floor(slope_pb * (sX - ce[0]) + ce[1]);
    pbOnRigY = Math.floor(slope_pb * (pe[0] - ce[0]) + ce[1]);            
    var isValid = [ (pbOnTopX >= sX) && (pbOnTopX <= pe[0]),
                    (pbOnBotX >= sX) && (pbOnBotX <= pe[0]),
                    (pbOnLefY >= sY) && (pbOnLefY <= pe[1]),
                    (pbOnRigY >= sY) && (pbOnRigY <= pe[1]) ]        

    //console.log("valid: "+isValid[0]+","+isValid[1]+","+isValid[2]+","+isValid[3]);

    if ( (!isValid[0]) && isValid[1] && isValid[2] ) {
      if (ofsY>pe[1]) {
        return;
      }
    }
    if ( (!(isValid[0] || isValid[1] || isValid[2] || isValid[3])) ||
         (isValid[0] && isValid[3]) ) {
      if ( ((pe[0]-cp[0])>minToShow) || ((pe[1]-cp[1])>minToShow) ) {
        return;
      }
    }
    bC.width = bC.width;  // **Trick to clear canvas.
    if (((!isValid[1]) && isValid[2] && isValid[3])) { // (!bottom) and left and right: cursor to beyond right-side
      tdeg = Math.atan((pe[1] - cp[1]) / (cp[0] - sX)) / 2;
      ts = (Math.sin(tdeg) * sA[0]) << 1;
      degb = Math.PI / 2 - tdeg;
      ofsY = pe[1] - (ts * Math.sin(degb));
      ofsX = pe[0] - (ts * Math.cos(degb));
      console.log("mousemove315");
      doSP(ofsX, ofsY);
      return;
    }
    
    ctx2.drawImage(allpi[riInd], sX, sY, sA[0], sA[1]);
    if (liInd != null) {
      ctx2.drawImage(allpi[liInd], sX-sA[0], sY, sA[0], sA[1]);
    }
    if (imInd > 0) {
      ctx2.beginPath();
      ctx2.moveTo(sX-sA[0], pe[1]);
      ctx2.lineTo(sX, pe[1]);
      ctx2.lineTo(sX, sY);
      ctx2.lineTo(sX-sA[0], sY);
      ctx2.closePath();
      ctx2.strokeStyle = tPbrdercolor;
      ctx2.stroke();
      ctx2.beginPath();
      ctx2.moveTo(pe[0], pe[1]);
      ctx2.lineTo(sX, pe[1]);
      ctx2.lineTo(sX, sY);
      ctx2.lineTo(pe[0], sY);
      ctx2.closePath();
      ctx2.stroke();    
      doPaintShadow(ctx2, p1, [shaCfg.spw, sY], [shaCfg.spw, pe[1]], [sX, pe[1]]);
    }
                
    var dif, dif2, p2, p3, p4;
    var l4 = Math.sqrt(Math.pow(cp[0] - pe[0], 2) + Math.pow(cp[1] - pe[1], 2)) >> 1;
    if ( isValid[1] && isValid[3] ) {        
        l1 = Math.sqrt(Math.pow(pbOnBotX - cp[0], 2) + Math.pow(pe[1] - cp[1], 2));
        l2 = Math.sqrt(Math.pow(pe[0] - cp[0], 2) + Math.pow(pbOnRigY - cp[1], 2));
        ctx2.beginPath();
        if (imInd != (imCnt-2)) {
          ctx2.moveTo(pe[0], pe[1]);
          ctx2.lineTo(pe[0] - l1, pe[1]);
          ctx2.lineTo(pe[0], pe[1] - l2);
          ctx2.fillStyle = ctx2.createPattern(nnC, "no-repeat");
          ctx2.strokeStyle = tPbrdercolor;                    
        } else {
          ctx2.moveTo(pe[0]+1, pe[1]+1);
          ctx2.lineTo(pe[0] - l1, pe[1]);
          ctx2.lineTo(pe[0]+1, pe[1] - l2);
          ctx2.fillStyle = bgcolor;
          ctx2.strokeStyle = bgcolor;
        }
        ctx2.closePath();
        ctx2.fill();
        ctx2.stroke();
        
        degb = Math.atan((pe[0] - pbOnBotX) / (pe[1] - pbOnRigY)); //a value between -PI/2 and PI/2 radians.
        ctx2.translate(cp[0], cp[1]);
        ctx2.rotate(degb * 2); // 2b degree   => **: rotate 不能在 translate 之前做
        ctx2.translate(-sX, -pe[1]);       

        ctx2.beginPath();
        ctx2.moveTo(sX, pe[1] - l2);
        ctx2.lineTo(sX, pe[1]);
        ctx2.lineTo(sX + l1, pe[1]);
        dif2 = (pbOnRigY - sY);
        ctx2.closePath();
        ctx2.fillStyle = ctx2.createPattern(nC, "no-repeat");
        ctx2.fill();
        ctx2.strokeStyle = tPbrdercolor;
        ctx2.stroke();

        ctx2.translate(sX, sY + dif2);
//dOriPattern(ctx2, "red");        
        ctx2.rotate(-degb);
//dOriPattern(ctx2, "green");
        ctx2.translate(-sX, -sY);
//dOriPattern(ctx2, "blue");

        l3 = Math.sqrt(Math.pow(l2, 2) + Math.pow(l1, 2));
        p2 = [(l4 / 3), sY + (l4 / 3) / Math.tan(degb)];
        p3 = [p2[0], sY + l3 - (l4 / 3) * Math.tan(degb)];
    } else if ((isValid[0] && isValid[1])) {
        if (cp[1] >= pe[1]) {
            ctx2.beginPath();
            if (imInd != (imCnt-2)) {
                ctx2.moveTo(pe[0], pe[1]);
                ctx2.lineTo(pbOnBotX, pe[1]);
                ctx2.lineTo(pbOnTopX, sY);
                ctx2.lineTo(pe[0], sY);
                ctx2.fillStyle = ctx2.createPattern(nnC, "no-repeat");
                ctx2.strokeStyle = tPbrdercolor;
            } else {
                ctx2.moveTo(pe[0] + 1, pe[1] +1);
                ctx2.lineTo(pbOnBotX, pe[1] + 1);
                ctx2.lineTo(pbOnTopX, sY - 1);
                ctx2.lineTo(pe[0] + 1, sY - 1);
                ctx2.fillStyle = bgcolor;
                ctx2.strokeStyle = bgcolor;
            }
            ctx2.closePath();
            ctx2.fill();
            ctx2.stroke();

            ctx2.translate(cp[0], cp[1]);
            ts = Math.sqrt(Math.pow(pbOnBotX - pbOnTopX, 2) + Math.pow(sA[1], 2));
            dega = Math.asin(sA[1] / ts);
            degb = Math.PI - 2 * dega;
            ctx2.rotate(-degb);
            ctx2.translate(-sX, -pe[1]);
//dOriPattern(ctx2, "#ff0000");            
            ctx2.beginPath();
            ctx2.moveTo(sX, sY);
            ctx2.lineTo(sX, pe[1]);
            ctx2.lineTo(sX + (pe[0] - pbOnBotX), pe[1]);
            ctx2.lineTo(sX + (pe[0] - pbOnTopX), sY);                
            ctx2.closePath();
            ctx2.fillStyle = ctx2.createPattern(nC, "no-repeat");
            ctx2.fill();
            ctx2.strokeStyle = tPbrdercolor;
            ctx2.stroke();

            ctx2.translate(sX + (pe[0] - pbOnTopX), sY);
//dOriPattern(ctx2, "#00ff00");      
            ctx2.rotate(degb / 2); // 2b degree   => **: rotate 銝滩�賢銁 translate 銋见�滚��
//dOriPattern(ctx2, "#0000ff"); 
            ctx2.translate(-sX, -sY);
//dOriPattern(ctx2, "#ffff00");
            l3 = ts;
            l5 = (l4 < 100) ? l4 : ((l4 / 2) > 50) ? 50 : (l4 / 2);
            p2 = [l5, sY + l5 / Math.tan(dega)];
            p3 = [p2[0], sY + l3 + l5 / Math.tan(dega)];
        } else {
            l1 = Math.sqrt(Math.pow(pbOnBotX - cp[0], 2) + Math.pow(pe[1] - cp[1], 2));
            l2 = Math.sqrt(Math.pow(pe[0] - cp[0], 2) + Math.pow(pbOnRigY - cp[1], 2));
            if (l2 == Infinity) {
                console.log("mousemove410");
                doSP(ofsX, pe[1] + 2);
                return;
            }
            ctx2.beginPath();
            if (imInd != (imCnt-2)) {
                ctx2.moveTo(pe[0], pe[1]);
                ctx2.lineTo(pe[0] - l1, pe[1]);
                ctx2.lineTo(pbOnTopX, sY);
                ctx2.lineTo(pe[0], sY);
                ctx2.fillStyle = ctx2.createPattern(nnC, "no-repeat");
                ctx2.strokeStyle = tPbrdercolor;
            } else {
                ctx2.moveTo(pe[0]+1, pe[1]+1);
                ctx2.lineTo(pe[0]-l1,pe[1]+1);
                ctx2.lineTo(pbOnTopX-1, sY-1);
                ctx2.lineTo(pe[0]+1, sY-1);
                ctx2.fillStyle=bgcolor;
                ctx2.strokeStyle = bgcolor;
            }
            ctx2.closePath();
            ctx2.fill();
            ctx2.stroke();

            degb = Math.atan((pe[0] - pbOnBotX) / (pe[1] - pbOnRigY)); //a value between -PI/2 and PI/2 radians.
            ctx2.translate(cp[0], cp[1]);

            ctx2.rotate(degb * 2);
            ctx2.translate(-sX, -pe[1]);

            ctx2.beginPath();
            ctx2.moveTo(sX, sY);
            ctx2.lineTo(sX, pe[1]);
            ctx2.lineTo(sX + l1, pe[1]);
            dif = Math.abs(pbOnRigY - sY) * Math.tan(degb);
            ctx2.lineTo(sX + dif, sY);
            ctx2.lineTo(sX, sY);
            dif = dif / Math.sin(degb);
            dif2 = (pbOnRigY - sY);
            ctx2.closePath();
            ctx2.fillStyle = ctx2.createPattern(nC, "no-repeat");
            ctx2.fill();
            ctx2.strokeStyle = tPbrdercolor;
            ctx2.stroke();

            ctx2.translate(sX, sY + dif2);
            //dOriPattern(ctx2, "#ffff00");
            ctx2.rotate(-degb);
            ctx2.translate(-sX, -sY);

            //dOriPattern(ctx2, "#00ffff");
            ctx2.translate(0, dif);
            l3 = Math.sqrt(Math.pow(l2, 2) + Math.pow(l1, 2)) - dif;
            l5 = (l4 < 100) ? l4 : ((l4 / 2) > 50) ? 50 : (l4 / 2);
            p2 = [l5, sY - l5 * Math.tan(degb)];
            p3 = [p2[0], sY + l3 - l5 * Math.tan(degb)];
        }
    }
    p4 = [sX, sY + l3];
    if ( (imInd<(imCnt-2))||( (imInd==(imCnt-2))&&(ofsX>(sX-sA[0]/3)) ) ) {
        doPaintShadow(ctx2, p1, p2, p3, p4);    
    }
}

function doPagePositionByMouseCorLpg(ofsX, ofsY) {
    var cp = [ofsX, ofsY];    // current position in canvas
    var pe = [sX - sA[0], sY + sA[1]]; // page left-bottom endpoint
    var p1 = [sX, sY];
    var riInd = (imInd>=imCnt)?null:(imInd % allpi.length);
    var liInd = ((imInd-1)%allpi.length);

    ctx2 = bC.getContext('2d');

    var ce = [(cp[0] + pe[0]) / 2, (cp[1] + pe[1]) / 2];   // center of cp & pe
    var slope_cp = (cp[1] - pe[1]) / (cp[0] - pe[0]);   // slope of cp & pe   
    var slope_pb = - (1 / slope_cp); // perpendicular bisector 垂直平分線
    //==> pb equation: y - ce[1] = slope_pb * (x - ce[0])
    pbOnTopX = Math.floor(((sY - ce[1]) / slope_pb) + ce[0]);
    pbOnBotX = Math.floor(((pe[1] - ce[1]) / slope_pb) + ce[0]);
    pbOnLefY = Math.floor(slope_pb * (sX - ce[0]) + ce[1]);
    pbOnRigY = Math.floor(slope_pb * (pe[0] - ce[0]) + ce[1]);            
    var isValid = [ (pbOnTopX <= sX) && (pbOnTopX >= pe[0]),
                    (pbOnBotX <= sX) && (pbOnBotX >= pe[0]),
                    (pbOnLefY >= sY) && (pbOnLefY <= pe[1]),
                    (pbOnRigY >= sY) && (pbOnRigY <= pe[1]) ]        

    //console.log("valid: "+isValid[0]+","+isValid[1]+","+isValid[2]+","+isValid[3]);

    if ( (!isValid[0]) && isValid[1] && isValid[2] ) {
      if (ofsY>pe[1]) {
        return;
      }
    }
    if ( (!(isValid[0] || isValid[1] || isValid[2] || isValid[3])) ||
         (isValid[0] && isValid[3]) ) {
      if ( ((cp[0]-pe[0])>minToShow) || ((cp[1]-pe[1])>minToShow) ) {
        return;
      }
    }
    bC.width = bC.width;  // **Trick to clear canvas.
    if (((!isValid[1]) && isValid[2] && isValid[3])) { // (!bottom) and left and right: cursor to beyond right-side
      tdeg = Math.atan((pe[1] - cp[1]) / (sX - cp[0])) / 2;
      ts = (Math.sin(tdeg) * sA[0]) << 1;
      degb = Math.PI / 2 - tdeg;
      ofsY = pe[1] - (ts * Math.sin(degb));
      ofsX = (ts * Math.cos(degb)) + pe[0];
      console.log("mousemove315");
      doSP(ofsX, ofsY);
      return;
    }
    
    if (riInd != null) {
      ctx2.drawImage(allpi[riInd], sX, sY, sA[0], sA[1]);
    }  
    ctx2.drawImage(allpi[liInd], sX-sA[0], sY, sA[0], sA[1]);
    if (imInd < imCnt) {
      ctx2.beginPath();
      ctx2.moveTo(sX-sA[0], pe[1]);
      ctx2.lineTo(sX, pe[1]);
      ctx2.lineTo(sX, sY);
      ctx2.lineTo(sX-sA[0], sY);
      ctx2.closePath();
      ctx2.strokeStyle = tPbrdercolor;
      ctx2.stroke();
      ctx2.beginPath();
      ctx2.moveTo(sX+sA[0], pe[1]);
      ctx2.lineTo(sX, pe[1]);
      ctx2.lineTo(sX, sY);
      ctx2.lineTo(sX+sA[0], sY);
      ctx2.closePath();
      ctx2.stroke();    
      doPaintShadow(ctx2, p1, [shaCfg.spw, sY], [shaCfg.spw, pe[1]], [sX, pe[1]]);
    }
                
    var dif, dif2, p2, p3, p4;
    var l4 = Math.sqrt(Math.pow(cp[0] - pe[0], 2) + Math.pow(cp[1] - pe[1], 2)) >> 1;
    if ( isValid[1] && isValid[3] ) {        
        l1 = Math.sqrt(Math.pow(pbOnBotX - cp[0], 2) + Math.pow(pe[1] - cp[1], 2));
        l2 = Math.sqrt(Math.pow(pe[0] - cp[0], 2) + Math.pow(pbOnRigY - cp[1], 2));
        ctx2.beginPath();
        if (imInd != 2) {
          ctx2.moveTo(pe[0], pe[1]);
          ctx2.lineTo(pe[0] + l1, pe[1]);
          ctx2.lineTo(pe[0], pe[1] - l2);
          ctx2.fillStyle = ctx2.createPattern(nnC, "no-repeat");
          ctx2.strokeStyle = tPbrdercolor;                    
        } else {
          ctx2.moveTo(pe[0]-1, pe[1]+1);
          ctx2.lineTo(pe[0] + l1, pe[1]+1);
          ctx2.lineTo(pe[0]-1, pe[1]-l2);
          ctx2.fillStyle = bgcolor;
          ctx2.strokeStyle = bgcolor;
        }
        ctx2.closePath();
        ctx2.fill();
        ctx2.stroke();
        
        degb = Math.atan((pe[0] - pbOnBotX) / (pe[1] - pbOnRigY)); //a value between -PI/2 and PI/2 radians.
        ctx2.translate(cp[0], cp[1]);
        ctx2.rotate(degb * 2); 
        ctx2.translate(-sX, -pe[1]);

        ctx2.beginPath();
        ctx2.moveTo(sX, pe[1] - l2);
        ctx2.lineTo(sX, pe[1]);
        ctx2.lineTo(sX - l1, pe[1]);
        dif2 = (pbOnRigY - sY);
        ctx2.closePath();
        ctx2.fillStyle = ctx2.createPattern(nC, "no-repeat");
        ctx2.fill();
        ctx2.strokeStyle = tPbrdercolor;
        ctx2.stroke();

        ctx2.translate(sX, sY + dif2);
//dOriPattern2(ctx2, "red");        
        ctx2.rotate(-degb);
//dOriPattern2(ctx2, "green");
        ctx2.translate(-sX, -sY);
//dOriPattern2(ctx2, "blue");

        l3 = Math.sqrt(Math.pow(l2, 2) + Math.pow(l1, 2));
        p2 = [(l4 / 3), sY + (l4 / 3) / Math.tan(-degb)];
        p3 = [p2[0], sY + l3 - (l4 / 3) * Math.tan(-degb)];
    } else if ((isValid[0] && isValid[1])) {
        if (cp[1] >= pe[1]) {
            ctx2.beginPath();
            if (imInd != 2) {
                ctx2.moveTo(pe[0], pe[1]);
                ctx2.lineTo(pbOnBotX, pe[1]);
                ctx2.lineTo(pbOnTopX, sY);
                ctx2.lineTo(pe[0], sY);
                ctx2.fillStyle = ctx2.createPattern(nnC, "no-repeat");
                ctx2.strokeStyle = tPbrdercolor;
            } else {
                ctx2.moveTo(pe[0] - 1, pe[1] +1);
                ctx2.lineTo(pbOnBotX, pe[1] + 1);
                ctx2.lineTo(pbOnTopX, sY - 1);
                ctx2.lineTo(pe[0] - 1, sY - 1);
                ctx2.fillStyle = bgcolor;
                ctx2.strokeStyle = bgcolor;
            }
            ctx2.closePath();
            ctx2.fill();
            ctx2.stroke();

            ctx2.translate(cp[0], cp[1]);
            ts = Math.sqrt(Math.pow(pbOnBotX - pbOnTopX, 2) + Math.pow(sA[1], 2));
            dega = Math.asin(sA[1] / ts);
            degb = Math.PI - 2 * dega;
            ctx2.rotate(degb);
            ctx2.translate(-sX, -pe[1]);
//dOriPattern(ctx2, "#ff0000");            
            ctx2.beginPath();
            ctx2.moveTo(sX, sY);
            ctx2.lineTo(sX, pe[1]);
            ctx2.lineTo(sX - (pbOnBotX-pe[0]), pe[1]);
            ctx2.lineTo(sX - (pbOnTopX-pe[0]), sY);                
            ctx2.closePath();
            ctx2.fillStyle = ctx2.createPattern(nC, "no-repeat");
            ctx2.fill();
            ctx2.strokeStyle = tPbrdercolor;
            ctx2.stroke();

            ctx2.translate(sX - (pbOnTopX-pe[0]), sY);
//dOriPattern(ctx2, "#00ff00");    
            ctx2.rotate(-degb / 2); // 2b degree   => **: rotate 銝滩�賢銁 translate 銋见�滚��
//dOriPattern(ctx2, "#0000ff");            
            ctx2.translate(-sX, -sY);
//dOriPattern(ctx2, "#ffff00");
            l3 = ts;
            l5 = (l4 < 100) ? l4 : ((l4 / 2) > 50) ? 50 : (l4 / 2);
            p2 = [l5, sY + l5 / Math.tan(dega)];
            p3 = [p2[0], sY + l3 + l5 / Math.tan(dega)];
        } else {
            l1 = Math.sqrt(Math.pow(pbOnBotX - cp[0], 2) + Math.pow(pe[1] - cp[1], 2));
            l2 = Math.sqrt(Math.pow(pe[0] - cp[0], 2) + Math.pow(pbOnRigY - cp[1], 2));
            if (l2 == Infinity) {
                console.log("mousemove410");
                doSP(ofsX, pe[1] + 2);
                return;
            }
            ctx2.beginPath();
            if (imInd != 2) {
                ctx2.moveTo(pe[0], pe[1]);
                ctx2.lineTo(pe[0] + l1, pe[1]);
                ctx2.lineTo(pbOnTopX, sY);
                ctx2.lineTo(pe[0], sY);
                ctx2.fillStyle = ctx2.createPattern(nnC, "no-repeat");
                ctx2.strokeStyle = tPbrdercolor;
            } else {
                ctx2.moveTo(pe[0]-1, pe[1]+1);
                ctx2.lineTo(pe[0]+l1,pe[1]+1);
                ctx2.lineTo(pbOnTopX+1, sY-1);
                ctx2.lineTo(pe[0]-1, sY-1);
                ctx2.fillStyle=bgcolor;
                ctx2.strokeStyle = bgcolor;
            }
            ctx2.closePath();
            ctx2.fill();
            ctx2.stroke();

            degb = Math.atan((pe[0] - pbOnBotX) / (pe[1] - pbOnRigY)); //a value between -PI/2 and PI/2 radians.
            ctx2.translate(cp[0], cp[1]);

            ctx2.rotate(degb * 2);
            ctx2.translate(-sX, -pe[1]);

            ctx2.beginPath();
            ctx2.moveTo(sX, sY);
            ctx2.lineTo(sX, pe[1]);
            ctx2.lineTo(sX - l1, pe[1]);
            dif = Math.abs(pbOnRigY - sY) * Math.tan(degb);
            ctx2.lineTo(sX + dif, sY);
            ctx2.lineTo(sX, sY);
            dif = dif / Math.sin(degb);
            dif2 = (pbOnRigY - sY);
            ctx2.closePath();
            ctx2.fillStyle = ctx2.createPattern(nC, "no-repeat");
            ctx2.fill();
            ctx2.strokeStyle = tPbrdercolor;
            ctx2.stroke();

            ctx2.translate(sX, sY + dif2);
            //dOriPattern(ctx2, "#ffff00");
            ctx2.rotate(-degb);
            ctx2.translate(-sX, -sY);

            //dOriPattern(ctx2, "#00ffff");
            ctx2.translate(0, dif);
            l3 = Math.sqrt(Math.pow(l2, 2) + Math.pow(l1, 2)) - dif;
            l5 = (l4 < 100) ? l4 : ((l4 / 2) > 50) ? 50 : (l4 / 2);
            p2 = [l5, sY - l5 * Math.tan(-degb)];
            p3 = [p2[0], sY + l3 - l5 * Math.tan(-degb)];
        }
    }
    p4 = [sX, sY + l3];
    if ( (imInd>2)||( (imInd==2)&&(ofsX<(sX+sA[0]/3)) ) ) {
        doPaintShadow(ctx2, p1, p2, p3, p4);    
    }    
}

function doPaintShadow(ctx2, p1, p2, p3, p4) {
    if ((p2 == null) || (p3 == null)) {
        return; // Trick: Just return illegal positions.
    }
    var shdw = 55;
    var shdw2 = p2[0];
    for (var i = 0, j = -1, k = 1; i <= 1; i++ , j *= -1, k--) {
        ctx2.beginPath();
        /*      ctx2.moveTo(sX, sY);
              ctx2.lineTo(sX, sY+l3);
              ctx2.lineTo(sX+j*shdw2, sY+l3);
              ctx2.lineTo(sX+j*shdw2, sY);*/
        ctx2.moveTo(p1[0], p1[1]);
        ctx2.lineTo(sX + j * p2[0], p2[1]);
        ctx2.lineTo(sX + j * p3[0], p3[1]);
        ctx2.lineTo(p4[0], p4[1]);

        ctx2.closePath();
        var tlg = (i == 0) ? ctx2.createLinearGradient(sX - shdw2, sY, sX, sY) : ctx2.createLinearGradient(sX, sY, sX + shdw2, sY);
        te = shaCfg.Pg_cs[k];
        tlg.addColorStop(0, "rgba(" + te[0] + "," + te[0] + "," + te[0] + "," + ((i == 0) ? 0.01 : 0.4) + ")");
        tlg.addColorStop(((i == 0) ? 0.6 : 0.5), "rgba(" + te[i] + "," + te[i] + "," + te[i] + "," + ((i == 0) ? 0.1 : 0.1) + ")");
        tlg.addColorStop(1, "rgba(" + te[1] + "," + te[1] + "," + te[1] + "," + ((i == 0) ? 0.4 : 0.01) + ")");
        ctx2.fillStyle = tlg;
        ctx2.fill();
        //ctx2.strokeStyle = "#0000ff";
        //ctx2.stroke();
    }
}

function dOriPattern2(ctx2, tc) {
    ctx2.beginPath();
    ctx2.moveTo(sX, sY);
    ctx2.lineTo(sX, sY + sA[1]);
    ctx2.lineTo(sX - sA[0], sY + sA[1]);
    ctx2.lineTo(sX - sA[0], sY);
    ctx2.closePath();
    ctx2.strokeStyle = tc;
    ctx2.stroke();
}

function dOriPattern(ctx2, tc) {
    ctx2.beginPath();
    ctx2.moveTo(sX, sY);
    ctx2.lineTo(sX, sY + sA[1]);
    ctx2.lineTo(sX + sA[0], sY + sA[1]);
    ctx2.lineTo(sX + sA[0], sY);
    ctx2.closePath();
    ctx2.strokeStyle = tc;
    ctx2.stroke();
}


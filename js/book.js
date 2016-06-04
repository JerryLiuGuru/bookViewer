
var imgPath = "./img/";
var bimgNameArray = [], tnArray = [];
var burlArray = [];
var choose = document.getElementById("choose"),
    input = document.getElementById("fileURL"),
    output = document.getElementById("fileOutput"),
    bcimg = document.getElementById("book_cover_img"),
    pgc = document.getElementById("page_count");
var files, 
    dirpath = "file:///Users/jerryliu/Documents/WebFrontendProject/bookViewer/img/";

var bsRatio = (4/5), scaleUpRatio = 1.05, brderWid = 5;  // Book to Screen ratio
function handleResize(img) {
    /*
        A3: 297 x 420mm => 0.707143 ( w/h : aspect ratio)
        A4: 210 x 297mm => 0.70707
        B4: 250 x 353mm => 0.708215
        B5: 176 x 250mm => 0.704
    */
    var i, w = img.width, h = img.height, sw = window.screen.availWidth, sh = window.screen.availHeight;
    var wratio = (2*w)/sw, hratio = h/sh, tw=null, th=null;
    
    if (wratio > bsRatio) {     // 因為 width 要用 2*w 估算，先以 width 評估起
        tw = (bsRatio * sw)>>1;
        th = (tw / w) * h;
    } else {
        th = (h / sh);
    }
    if (th > (sh*5/6)) {  // height 還是太高超過 screen height, 要改以 height 估算
        th = bsRatio * sh;
        tw = (th / h) * w;
    }
    if (tw == null) {
        if (th > (tw<<1)) {
            th = (bsRatio * sh);
            tw = w * (th/h);    
        } else {
            tw = (bsRatio * sw)>>1;
            th = h * (tw/w);            
        }
    }
    rw = Math.round(tw * scaleUpRatio);
    rh = Math.round(th * scaleUpRatio);
    bV.style.width = rw + "px";
    bV.style.height = rh + "px";
    rw2 = Math.round(tw);
    rh2 = Math.round(th);
    tbdrw = (brderWid*2);
    tbdrw2 = (brderWid*2);
    for (i=0; i<allpl.length; i++) {
        if (allpl[i] != null) {
            if ( (i <= 1) || (i>=(allpl.length-2)) ) {
                allpl[i].width = rw-tbdrw;    //NOTICE: Can't use .style.width = "xxx" + "px";
                allpl[i].height = rh-tbdrw;   //Since it will remain the original size of inner image.                                
            } else {
                //allpl[i].style="top: " + ((rh-rh2)/2) + "; left: " + ((rw-rw2)/2) 
                allpl[i].width = rw-tbdrw2;    //NOTICE: Can't use .style.width = "xxx" + "px";
                allpl[i].height = rh-tbdrw2;   //Since it will remain the original size of inner image.                
            }   
        }
    }
    return [rw-tbdrw, rh-tbdrw, rw-tbdrw2, rh-tbdrw2];
}

var debugMode = true;
var bV = document.getElementById("bookViewer");
var bvC;
function showBookViewer() {
    if (debugMode) {    // for debug;
        bV.style.top = (window.screen.availHeight/2 - bV.offsetHeight/2) + "px"; //choose.offsetHeight + output.offsetHeight + 350;
        bV.style.left = (window.screen.availWidth/2 - bV.offsetWidth/2) + "px";  
    } else {
        bV.style.top = (window.screen.availHeight/2 - bV.offsetHeight/2) + "px"; //choose.offsetHeight + output.offsetHeight + 350;
        bV.style.left = (window.screen.availWidth/2) + "px";  
    } 
    bV.style["visibility"] = "visible";
    bvC = document.getElementById("bookViewer").getBoundingClientRect();
}

var sA = [];    // to store the size(width & height) of cover image for the other imgs.

var canPos = {
    c_b: [-1, -1, -1, -1],
    pgs: [-1, -1, -1, -1]
};
var shaCfg = {
    widPer: 0.04,   //shadow width for inner part of a page
    spw: -1,        //real shadow with after bookViewer width is decided.
    rect: [ [-1, -1, -1, -1], [-1, -1, -1, -1] ],
    Pg_cs: [ ["#888", "#fff"], ["#fff","#888"] ],   // right and left
    grd: [ [-1, -1, -1, -1], [-1, -1, -1, -1] ]
};
function onLoad(){
    //debugger
    //input.value = dirpath;
    //window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
    //window.requestFileSystem(window.TEMPORARY, 1024*1024, onInitFs, errorHandler);
    
    var tA, tP;
    for (var i=(allpg.length-1); i>=0; i--) {
        j = (i<<1);
        
        tA = $(allpg[i]); 
        tA.off("click");
        tA.on("click", book_click);
        tP = tA[0]; 
        if ( (i==0) || (i==(allpg.length-1)) ) {
            //tP.style["transform"] = "rotateY(" + minDeg + "deg) translateZ(8px)";
            tP.style["transform"] = "rotateY(" + minDeg + "deg)";// translateZ(0px)";
        } else {
            tP.style["transform"] = "rotateY(" + minDeg + "deg)";// translateZ(0px)";    
        }        
        tP.style["z-index"] = -j;
        
        allpp[j].style["display"] = "none";
        allpp[j+1].style["display"] = "none";
        allpl[j].style["z-index"] = -j+1;
        allpl[j+1].style["z-index"] = -j;
        //tP.style["display"] = "none";
    }
    //$(allpg[0])[0].style["display"] = "inherit";
    $(allpg[0])[0].style["z-index"] = zindv;

    //cover.style = "border: 2px solid #2c3e50";
    c0.src = imgPath + "cover.jpg";
    //c1.src = imgPath + "1.jpg";

    c0.onload = function() {
        sA = handleResize(c0);
        var ctx2 = cc[0].getContext('2d');
        ctx2.drawImage(c0, 0, 0, sA[0], sA[1]);
        
        showBookViewer();
        
        shaCfg.spw = Math.floor(sA[0]*shaCfg.widPer);
        shaCfg.rect = [ [0, brderWid, shaCfg.spw, sA[1]-brderWid],
                        [sA[0]-shaCfg.spw, brderWid, sA[0], sA[1]-brderWid] ];
        shaCfg.grd = [ [ 0, 5, shaCfg.spw, 5],
                        [ sA[0]-shaCfg.spw, 5, sA[0], 5] ];

        canPos.c_b = [0, 0, sA[0], sA[1]];
        canPos.pgs = [ (sA[0]-sA[2])/2, (sA[1]-sA[3])/2, sA[2], sA[3]];
        //alert(sA[0] + "," + sA[1]);
    }
    
    //alert(cl0.clientWidth + "," + cl0.clientHeight);
    //alert(cl0.style.width + "," + cl0.style.height);
    //alert(canvas.clientWidth + "," + canvas.clientHeight);
    
    //debugger
    /*for (var i = 0, len = allpp.length; i < len; i++) {
        //arg = "rotateY(" + (minDeg-((pp.length-i)*ashft)) + "deg);";
        //pl[i].style["transform"] = arg;
        //console.log(i + ": " + arg);
        allpp[i].style["display"] = "none";
    }*/
    //cover.style["transform"] = "rotateY(" + (minDeg-2-(pp.length<<1)-2) + "deg);";
    //back.style["transform"] = "rotateY(" + (minDeg) + "deg);";        
    
    //debugger
    //showBookViewer();

    //alert("ok");
};


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
            if ( (debugMode && (tnArray.length<20))  && (fN.substring(0,fN.indexOf(".")).length == 2) ) {
                break;
            }
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
    imCnt = bimgNameArray.length;
    pgc.innerHTML = imCnt + " images.";
    //debugger
    output.style["visibility"] = "visible";
    
    //debugger;
}

var ci = [document.getElementById("c0"), document.getElementById("c1")],
    cc = [document.getElementById("cl0"), document.getElementById("cl1")];
var pi = [document.getElementById("p0"), document.getElementById("p1"),
            document.getElementById("p2"), document.getElementById("p3"),
            document.getElementById("p4"), document.getElementById("p5"),
            document.getElementById("p6"), document.getElementById("p7")];
    pl = [document.getElementById("pl0"), document.getElementById("pl1"),
            document.getElementById("pl2"), document.getElementById("pl3"),
            document.getElementById("pl4"), document.getElementById("pl5"),
            document.getElementById("pl6"), document.getElementById("pl7")],
    pg = [document.getElementById("page1"), document.getElementById("page2"),
            document.getElementById("page3"), document.getElementById("page4")];
var bi = [document.getElementById("b0"), document.getElementById("b1")],
    bc = [document.getElementById("bl0"), document.getElementById("bl1")];
var cover = document.getElementById("cover"),
    back = document.getElementById("back");
var allpl = cc.concat(pl).concat(bc),
    allpp = ci.concat(pi).concat(bi),
    allpg = ["#cover", "#page1", "#page2", "#page3", "#page4", "#back"];
var pshft = 2, zindv = 1, ashft = 0;    // ashft: the diff of degrees bet. two pages on the same side.
var imInd = 0, minDeg = 0, maxDeg = -180;   // minDeg can't be > 0 since the image will be up side down and mirror.
var minDeg2 = minDeg-allpg.length*ashft, maxDeg2 = maxDeg+allpg.length*ashft;
var imCnt = -1, td_normal = 1, td_short = 0.001;
var mf = 1;   //A good value to display like turning a page.

function chk_LoR_page_adj_pgInd(x,y) {
    var spineC = document.getElementById("bookViewer").getBoundingClientRect();
    var isTrue = (y > (spineC.top)) && (y < (spineC.top+bvC.height)),
        isOnL =  ( isTrue && (x > (spineC.left-bvC.width)) && (x < (spineC.left)) ),
        isOnR = ( isTrue && (x > (spineC.left)) && (x < (spineC.left+bvC.width)) );

    if ( isOnL ) {
        if (imInd < (imCnt-1)) {            
            imInd -= ( ((imInd%2)==0)?1:0 );   
        }
        pshft = - Math.abs(pshft);
    } else if ( isOnR ) {
        if (imInd > 0) {
            imInd += (imInd % 2);    
        }
        pshft = Math.abs(pshft);
    }
    document.getElementById("pgInd").innerHTML = "pgInd: " + imInd +", sl,t: (" + Math.floor(spineC.left) + "," + Math.floor(spineC.top) + "), x,y: (" + x + "," + y + ")";
}

function chg_2_ori_size(pg) {
    tv = pg.style["transform"];
    tv = tv.substring(0, tv.indexOf("translateZ")+11) + "0px)";
    pP.style["transform"] = tv;
}

var tTime = [0.8, 0.8];
function book_click(event) {    
    // debugger
    imInd =  (imInd < 0) ? 0 : imInd;
    imInd =  (imInd >= imCnt) ? (imCnt-1) : imInd;
    
    chk_LoR_page_adj_pgInd(event.clientX, event.clientY);

    //Add OnLoad event handler for each image
    if ( allpp[1].onload == null) {
        $("#c0").off("load");

        for (var i = 0; i < allpp.length; i++) {
            allpp[i].src = imgPath + bimgNameArray[i];
            /*if ( (i<=0) || (i>=(allpp.length-1)) ) {
                sx = canPos.c_b[0];
                sy = canPos.c_b[1];
                ex = canPos.c_b[2];
                ey = canPos.c_b[3];
            } else {
                sx = canPos.pgs[0];
                sy = canPos.pgs[1];
                ex = canPos.pgs[2];
                ey = canPos.pgs[3];
            }*/
            allpp[i].onload = function(event) {
                sE = event.srcElement;
                pE = sE.parentElement;
                tId = sE.id;
                var ib_c = ( (tId[0] == "c") || (tId[0] == "b" ) ); 
                var cP = (ib_c)?canPos.c_b:canPos.pgs;
                var ctx2 = pE.getContext('2d');
                ctx2.drawImage(sE, cP[0], cP[1], cP[2], cP[3]);                
                imIndM2 = parseInt(tId[1]) % 2;
                te = shaCfg.grd[ imIndM2 ];
                tlg=ctx2.createLinearGradient(te[0], te[1], te[2], te[3]);
                te = shaCfg.Pg_cs[ imIndM2 ];
                tlg.addColorStop(0, te[0]);
                tlg.addColorStop(1, te[1]);

                var i0_last = ( (tId == "c0") || (tId == "b1" ) );
                if ( !i0_last ) {
                    ctx2.fillStyle=tlg;
                    te = shaCfg.rect[ imIndM2 ];
                    ctx2.fillRect(te[0], te[1], te[2], te[3]);                    
                }                
                //alert(sA[0] + "," + sA[1]);
                ts = sE.src;
                ts = ts.substring(ts.lastIndexOf("/")+1);
                console.log("img '" + sE.id + ":" + ts + "' start loaded.")
            };
        }
    }

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
    
    var rDegC = -1, rDegN = -1; 
        tranZv1 = -0, tranZv2 = 0, tZv = -1, tZv2 = -1,
        prvInd = -1, tranStyle = "", trZ = "";
    var pI = null, cI = null, nI = null, nnI = null;    // prevImg, currentImg, nextImg, nextnextImg.
    var pP = null, cP = null, nP = null;    // prevPage, curPage, nxtPage.
    var pC = null, cC = null, nC = null;    // prevCanvas, curCanvas, nxtCanvas        
    zindv++;
    var tt = "all " + (td_normal*tTime[imInd%2]) + "s ease";// z-index 0.0001s";
    if (imInd <= 1) {    //click cover or its back page
        switch (imInd) {
            case 0:
               if (ci[1].src[ci[1].src.length-1] == "#") {
                    ci[1].src = imgPath + bimgNameArray[imInd+1];
                }
                if (pi[0].src[pi[0].src.length-1] == "#") {
                    pi[0].src = imgPath + bimgNameArray[imInd+2];
                    rDegN = minDeg2;
                }
                //trZ = "translateZ(-8px)"
                rDegC = maxDeg; //(maxDeg - minDeg);
                tZv = 0;
                tZv2 = tranZv2;

                nP = $(allpg[1])[0];
                //nP.style["transition"] = tt;
                nP.style["z-index"] = zindv;
                nnC = allpl[0];
                nnC.style["transition-duration"] = "0.001s"; 
                nnC.style["z-index"] = zindv;
                break;
            case 1:
                //pP = $(allpg[1])[0];
                //trZ = "translateZ(8px)"
                rDegC = minDeg;
                tZv = tranZv2;
                //chg_2_ori_size(pP);
                
                /*pgInd = -2;
                pshft = 2;  // Trick for auto-traversal.*/
                break; 
            default:
                alert("Imp pgInd: " + imInd);
        }
        nC = cc[1-imInd];
        nC.style["transition"] = tt;
        nC.style["z-index"] = zindv;
        
        cover.style["transition-duration"] = td_normal + "s";
        cover.style["transform"] = "rotateY(" + rDegC + "deg) " + trZ;
        cover.style["z-index"] = zindv;
    } else if (imInd >= (imCnt-2)) {    //click last page or back
        var tpiCnt = imCnt, tV = 0;
        if ((tpiCnt % 2)==1) {   // total cnt should be even. some page missing. A trick to handle this.
            tpiCnt += 1;
            tV = 1;
        }
        switch (imInd) {
            case (tpiCnt-2):
                //if (bi[1].src[bi[1].src.length-1] == "#") {
                    bi[1].src = imgPath + bimgNameArray[ (tV==1)?imInd:(imInd+1) ];
                //}
                rDegC = maxDeg; //( maxDeg - minDeg + ((1+pp.length)*ashft) );
                tZv = tranZv1;
                tZv2 = 0;

                //pages.removeEventListener("click",book_click);
                /*pgInd = 17;
                pshft = -2; // Trick for auto-traversal.*/
                break;
            case (tpiCnt-1):
                rDegC = minDeg;
                tZv = 0;
                tZv2 = tranZv1;

                tInd = (imInd-4) % pl.length;
                nP = $(allpg[ 1 + (tInd>>1) ])[0];
                nP.style["z-index"] = zindv;
                nnC = pl[ tInd ];
                nnC.src = imgPath + bimgNameArray[ tpiCnt-3 ];
                nnC.style["transition-duration"] = "0.001s"; 
                nnC.style["z-index"] = zindv;
                //nP.style["transition"] = tt;

                //bsInd0 = ((imInd-2) % pi.length)>>1;                
                //prvInd = (bsInd<=1)?(pl.length-(2-bsInd)):(bsInd-2);
                
                //$("#pages").off("click", book_click);
                //$("#pages").off("click");
                //pages.addEventListener("click" , book_click);

                break; 
            default:
                alert("Imp pgInd: " + imInd);
        }
        tind = (imInd==(tpiCnt-1))?0:1;
        nC = bc[tind];
        nC.style["transition"] = tt;
        nC.style["z-index"] = zindv;
        
        back.style["transition-duration"] = td_normal + "s";
        back.style["transform"] = "rotateY(" + rDegC + "deg)";// translateZ(" + tZv + "px)";
        back.style["z-index"] = zindv;
        /*tv = pl[prvInd].style["transform"];
        tv = tv.substring(0, tv.indexOf("translateZ")+11) + tZv2 + "px)";
        pl[prvInd].style["transform"] = tv;*/
    } else {
        // pgInd: 0  1      2   3   4   5   6   7   8   9       (pgCnt-1)   pgCnt  
        //        C0 C1     P0  P1  P2  P3  P4  P5              B0          B1
        // if (pgInd > 5) && (pgInd < (pgCnt-3)), don't turn page.

        var bsInd0 = (imInd-2) % pi.length, bsInd1 = -1, bsInd2 = -1, bsInd3 = -1;
        var next1, next2, tZv1 = -1, tZv2 = -1;
        //ttc = "all " + (td_normal) + "s ease";
        switch (imInd % 2) {
            case 0: //even, check the following 2 pages to load correct images.
                for (i = imInd, j = bsInd0; i < (imInd+4); i+=2, j+=2) {
                    next1 = imgPath + bimgNameArray[i+1];
                    next2 = imgPath + bimgNameArray[i+2];
                    k = (j+1) % pi.length;   // the index for next page
                    pi[k].src = next1;
                    if ((i+2) >= (imCnt-2)) {   // handle the case for showing the back pages
                        if (i==imInd) {
                            nP = back;
                            nnC = bc[0];
                        }                        
                        if (bi[0].src.indexOf(next2) == -1) {
                            bi[0].src = next2;    
                        }
                        break; 
                    } else {
                        bsInd2 = (j+2) % pi.length;
                        if (pi[bsInd2].src.indexOf(next2) == -1) {
                            pi[bsInd2].src = next2; 
                        }                                                
                        if (i==imInd) {
                            nP = $(allpg[1+(bsInd2>>1)])[0];
                            nnC = pl[bsInd2];
                        } 
                    } 
                }
                bsInd1 = bsInd0 + 1;
                rDegC = maxDeg;
                rDegN = minDeg;
                tZv1 = tranZv1; 
                tZv2 = tranZv2;

                /*next1 = imgPath + bimgNameArray[imInd+1];
                next2 = imgPath + bimgNameArray[imInd+2];
                bsInd1 = bsInd0+1;   // the index for next page
                pi[bsInd1].src = next1;
                if ((imInd+2) >= (imCnt-2)) {   // handle the case for showing the back pages
                    nP = back;
                    bi[0].src = next2;
                    nnC = bc[0];
                } else {
                    bsInd2 = (bsInd0+2) % pi.length;
                    pi[bsInd2].src = next2;
                    nP = $(allpg[1+(bsInd2>>1)])[0];
                    nnC = pl[bsInd2]; 
                } 
                rDegC = maxDeg;
                rDegN = minDeg;
                tZv1 = tranZv1; 
                tZv2 = tranZv2;*/
                break;
            case 1: //odd, check the previous 2 pages to load correct imgs.
                for (i = imInd, j = bsInd0; i > (imInd-4); i-=2, j-=2) {
                    next1 = imgPath + bimgNameArray[i-1];
                    next2 = imgPath + bimgNameArray[i-2];
                    k = ((j-1)<0)?(pi.length-1):(j-1);
                    pi[k].src = next1;
                    
                    if ((i-2) <= 1) {   // handle the case for showing the back pages
                        if (i==imInd) {
                            nP = cover;
                            nnC = cc[1];
                        }                        
                        if (ci[1].src.indexOf(next2) == -1) {
                            ci[1].src = next2;    
                        }
                        break; 
                    } else {
                        bsInd2 = (j<2)?(pi.length-(2-j)):(j-2);
                        if (pi[bsInd2].src.indexOf(next2) == -1) {
                            pi[bsInd2].src = next2; 
                        }                                                
                        if (i==imInd) {
                            nP = $(allpg[1+(bsInd2>>1)])[0];
                            nnC = pl[bsInd2];
                        } 
                    } 
                }
                bsInd1 = bsInd0-1;
                rDegC = minDeg;
                rDegN = maxDeg;
                tZv1 = tranZv2; 
                tZv2 = tranZv1;

                /*next1 = imgPath + bimgNameArray[imInd-1];
                next2 = imgPath + bimgNameArray[imInd-2];
                bsInd1 = bsInd0-1;
                pi[bsInd1].src = next1;
                if ((imInd-2)<=1) {
                    nP = cover;
                    ci[1].src = next2;
                    nnC = cc[1];
                } else {
                    bsInd2 = (bsInd0<2)?(pi.length-(2-bsInd0)):(bsInd0-2);
                    pi[bsInd2].src = next2;
                    nP = $(allpg[1+(bsInd2>>1)])[0];
                    nnC = pl[bsInd2];
                }
                rDegC = minDeg;
                rDegN = maxDeg;
                tZv1 = tranZv2; 
                tZv2 = tranZv1;*/
                break;
            default:
                alert("Err pgInd: " + imInd);
        }
        nP.style["transition-duration"] = "0.001s"; 
        //nP.style["transition"] = "all 0.001s ease z-index 0.001s";
        nP.style["transform"] = "rotateY(" + rDegN + "deg)";
        nP.style["z-index"] = zindv;
        nnC.style["transition-duration"] = "0.001s"; 
        nnC.style["z-index"] = zindv;

        nC = pl[bsInd1];
        //nC.style["transition-duration"] = "0.001s";
        nC.style["transition"] = tt;
        nC.style["z-index"] = zindv;
        cP = $(allpg[1+(bsInd0>>1)])[0];
        cP.style["transition-duration"] = td_normal + "s";
        cP.style["transform"] = "rotateY(" + rDegC + "deg)";
        cP.style["z-index"] = zindv;
        //debugger;
    }
    imInd = (imInd+pshft);
    document.getElementById("pgInd").innerHTML += ", after: " + imInd;
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
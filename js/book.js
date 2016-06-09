
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
    /*dZ = document.getElementById("dZtable");
    dZ.style["z-index"] = 9999;
    
    bV.style.top = 0;
    bV.style.left = 0;
    bV.style.width = window.screen.availWidth + "px";
    bV.style.height = window.screen.availHeight + "px";
    bV.style["z-index"] = 1;
    for (var i=0; i<allpl.length; i++) {
        if (debugMode) {    // for debug;
            allpl[i].style.top = (window.screen.availHeight/2 - bV.offsetHeight/2.5) + "px"; //choose.offsetHeight + output.offsetHeight + 350;
            allpl[i].style.left = (window.screen.availWidth/2 - bV.offsetWidth/1.5) + "px";  
        } else {
            allpl[i].style.top = (window.screen.availHeight/2 - bV.offsetHeight/2.5) + "px"; //choose.offsetHeight + output.offsetHeight + 350;
            allpl[i].style.left = (window.screen.availWidth/2) + "px";  
        }
    }*/
    if (debugMode) {    // for debug;
            bV.style.top = (window.screen.availHeight/2 - bV.offsetHeight/2.5) + "px"; //choose.offsetHeight + output.offsetHeight + 350;
            bV.style.left = (window.screen.availWidth/2 - bV.offsetWidth/1.5) + "px";  
        } else {
            bV.style.top = (window.screen.availHeight/2 - bV.offsetHeight/2.5) + "px"; //choose.offsetHeight + output.offsetHeight + 350;
            bV.style.left = (window.screen.availWidth/2) + "px";  
    }
    bV.style["visibility"] = "visible";
    bvC = document.getElementById("bookViewer").getBoundingClientRect();
}

var startC = null, nC = null, nnC = null, pC = null;
var dX = -1, dY = -1; 
function page_mousedown(event) {
    //event.dataTransfer.setData("Text", event.target.id);
    isMouseUp = false;
    dX = event.clientX; 
    dY = event.clientY;
    var bC = event.target;
    var tId = bC.id;
    if ( (tId[0] == "c") || (tId[0] == "b") ) { // cover & back page don't turn.
        return;
    }
    startC = bC;
    var pnum = parseInt(tId[2]);
    if ((pnum%2)==0) {
        nC = pl[pnum+1];
        pC = (pnum==0)?cc[1]:pl[pnum-1];
        nnC = (pnum==(pl.length-2))?bc[0]:pl[pnum+2];
    } else {
        nC=pl[pnum-1];
        pC=(pnum==(pl.length-1))?bc[0]:pl[pnum+1];
        nnC = (pnum==1)?cc[1]:pl[pnum-2];
    }
}

var showItvl = 10, minToShow = 10;
function doShowPageByInterval(curX, curY, tarX, tarY) {
    // Animation Line: Y - dP[1] = (cy-dP[1])/(cx-dP[0]) * (X - dp[0]);
    // Do 4 steps to be on the dP. Every step take half way.
    //var sS = [ [-1,-1], [-1,-1], [-1,-1] ];
    var tX = curX; 
    var tY = curY;

    doPagePositionByMouseCor(startC, nC, nnC, tX, tY);
    if ( (Math.abs(tX-tarX)>minToShow) || (Math.abs(tY-tarY)>minToShow) ) {
        tX = (tX + ((tarX-tX) * 1/2));
        tY = (tY + ((tarY-tY) * 1/2));
        //sS[i] = [tX, tY];
        setTimeout(doShowPageByInterval, showItvl, tX, tY, tarX, tarY);      
    } else {
        startC = nC = nnC = null;
    }    
    //book_click(event);
    //doPagePositionByMouseCor(startC, nC, nnC, dP[0], dP[1]);    
}

var isMouseUp = false;
function page_mouseup(event) {
    event.preventDefault();
    // Do put the page on the destination: 
    // If the mouse is still on the starting page, return to the original position; 
    // If on the page the other side, turn the page.
    var uX = event.clientX, uY = event.clientY;
    var tId = event.target.id;
    var pnum = parseInt(tId[2]);
    if ( (startC == null) || (tId[0] == "c") || (tId[0] == "b") || ( (Math.abs(uX-dX)<5)&&(Math.abs(uY-dY)<5) ) ) { // cover & back page don't slide but just turn the page.
        book_click(event);
        return;
    }
    chk_LoR_page_adj_pgInd(event.clientX,event.clientY);
    var desPoint = null;
    if (isOnLpg) {
        dP = [0, pC.height];        
    } else if (isOnRpg) {
        dP = [pC.width, pC.height];
    }
    isMouseUp = true;
    setTimeout(doShowPageByInterval, showItvl, event.offsetX, event.offsetY, dP[0], dP[1]); 
}

function page_mousemove(event) { // Actuall, during dragging.
    if ( (isMouseUp) || (startC==null)) {
        return;
    }
    doPagePositionByMouseCor(startC, nC, nnC, event.offsetX, event.offsetY);
    //console.log(cE.id + "@(" + x + "," + y + ")");    
}

var tPbrdercolor = "#34495e";
function doPagePositionByMouseCor(cE, nC, nnC, ofsX, ofsY) {
    var bVTop = Math.floor(bV.style.top.substring(0,bV.style.top.length-2));
    var bVLeft = Math.floor(bV.style.left.substring(0,bV.style.left.length-2));
    var cEbrdy = [bVTop, bVTop+cE.height, bVLeft, bVLeft+cE.width];
    var cp = [ofsX, ofsY];    // current position in canvas
    var pe = [cE.width, cE.height];             // page right-bottom endpoint
    var ce = [ (cp[0]+pe[0])/2, (cp[1]+pe[1])/2];   // center of cp & pe
    var slope_cp = (cp[1] - pe[1]) / (cp[0] - pe[0]);   // slope of cp & pe   
    var slope_pb = - (1/slope_cp); // perpendicular bisector 垂直平分線
    //==> pb equation: y - ce[1] = slope_pb * (x - ce[0])
    var pbOnTopX = Math.floor( ( (0-ce[1])/slope_pb ) + ce[0] );
    var pbOnBotX = Math.floor( ( (pe[1]-ce[1])/slope_pb ) + ce[0] );
    var pbOnLefY = Math.floor( slope_pb * (0-ce[0]) + ce[1] );
    var pbOnRigY = Math.floor( slope_pb * (pe[0]-ce[0]) + ce[1] );
    var isValid = [ (pbOnTopX>=0)&&(pbOnTopX<=pe[0]), 
                    (pbOnBotX>=0)&&(pbOnBotX<=pe[0]),
                    (pbOnLefY>=0)&&(pbOnLefY<=pe[1]),
                    (pbOnRigY>=0)&&(pbOnRigY<=pe[1]) ];
    var pnum = parseInt(cE.id[2]);
    /*console.log(cE.id + "@(" + x + "," + y + ":" + cp[0] + "," + cp[1] + "):(T" + 
    pbOnTopX + ",B" + pbOnBotX + ",L" + pbOnLefY + ",R" + pbOnRigY + "),(" + 
    isValid[0] + "," + isValid[1] + "," + isValid[2] + "," + isValid[3] + ")");
    */

    if ( (isValid[1] && isValid[3]) || (isValid[0] && isValid[1]) ) { // Valid: Bottom & Right
        /*if ( (pbOnBotX > (cE.width-50)) || (pbOnRigY > (cE.height-50)) ) {
            return;
        }*/
        
        /*var ctx = cE.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(0, 0);    // (left,top)
        ctx.lineTo(0, cE.height);    // (left,bottom)
        ctx.lineTo(pbOnBotX, cE.height);
        ctx.lineTo(cp[0], cp[1]);
        ctx.lineTo(cE.width, pbOnRigY);
        ctx.lineTo(cE.width, 0);
        ctx.closePath();
        ctx.fillStyle = ctx.createPattern(c0, "no-repeat");
        //ctx.fill();
        //ctx.drawImage(c0, 0, 0);
        */
        
        ctx2 = cE.getContext('2d');
        cE.width = cE.width;  // **Trick to clear canvas.
        ctx2.drawImage(pi[pnum], 0, 0, pe[0], pe[1]);
        
        if ( (Math.abs(cp[0]-pe[0]) <= minToShow) && (Math.abs(cp[1]-pe[1]) <= minToShow) ) {
            return;
        }
        //var ll= Math.sqrt( Math.pow(pbOnBotX-cE.width,2) + Math.pow(pbOnRigY-cE.height,2) );
        // Sin(b) = (cE.width-pbOnBotX) / ll, or 
        // tan(b) = (cE.width-pbOnBotX)/(cE.height-pbOnRigY)

        var l1= Math.sqrt(Math.pow(pbOnBotX-cp[0],2) + Math.pow(pe[1]-cp[1],2));
        var l2= Math.sqrt(Math.pow(pe[0]-cp[0],2) + Math.pow(pbOnRigY-cp[1],2));

        ctx2.beginPath();
        ctx2.moveTo(pe[0], pe[1]);
        ctx2.lineTo(pe[0]-l1,pe[1]);
        ctx2.lineTo(pe[0],pe[1]-l2);
        ctx2.closePath();
        ctx2.fillStyle=ctx2.createPattern(nnC,"no-repeat");
        ctx2.fill();

        var degb = Math.atan( (pe[0]-pbOnBotX)/(pe[1]-pbOnRigY) ); //a value between -PI/2 and PI/2 radians.
        ctx2.translate(Math.floor(cp[0]), Math.floor(cp[1]));
        //var n, m;
        //radians=degrees*Math.PI/180, 2*degb(-PI/2~PI/2)=2*degb/90(-PI/180~PI/180)
        /*if ((degb*180/Math.PI) >= 45) { // 2b degree   => **: rotate 不能在 translate 之前做
            var b2_sub_ninty = degb*2-Math.PI/2;
            n = Math.sin(b2_sub_ninty)*cE.height;
            m = Math.cos(b2_sub_ninty)*cE.height;                  
        } else {
            m = Math.sin(degb)*cE.height;
            n = -Math.cos(degb)*cE.height;
        }*/ // 座標轉換後，就以新座標軸作用, 所以不用計算以上了
        ctx2.rotate(degb*2); // 2b degree   => **: rotate 不能在 translate 之前做
        ctx2.translate(0, -pe[1]);
        ctx2.beginPath();
        /*if (isValid[0] && isValid[1]) {
            ctx2.moveTo(0,0);
        } else {*/
            ctx2.moveTo(0,pe[1]-l2);   
        //}
        
        ctx2.lineTo(0, pe[1]);
        ctx2.lineTo(l1,pe[1]);
        ctx2.strokeStyle=tPbrdercolor;
        ctx2.stroke();
        ctx2.closePath();
        ctx2.fillStyle=ctx2.createPattern(nC,"no-repeat");
        ctx2.fill();
        //shadow left
        var shdw = 55;
        var degc = Math.atan( (l1)/(l2) ); //a value between -PI/2 and PI/2 radians.
        ctx2.translate(0, pe[1]-l2);
        ctx2.rotate(-degc);        
        var l3 = Math.sqrt( Math.pow(l2,2) + Math.pow(l1,2) );
        var more = shdw*2;
        
        for (var i = 0, j = -1, k = 1; i <= 1; i++, j *= -1, k--) {
            ctx2.beginPath();        
            ctx2.moveTo(0, -more);
            ctx2.lineTo(0, l3+more);
            ctx2.lineTo(j*shdw, l3+more);
            ctx2.lineTo(j*shdw, -more);
            ctx2.closePath();
            var tlg=(i == 0)?ctx2.createLinearGradient(-shdw, 0, 0, 0):ctx2.createLinearGradient(0, 0, shdw, 0);
            te = shaCfg.Pg_cs[ k ];
            tlg.addColorStop(0, "rgba("+te[0]+","+te[0]+","+te[0]+","+((i==0)?0.01:0.5)+")");
            tlg.addColorStop(0.5, "rgba("+te[i]+","+te[i]+","+te[i]+",0.05)");
            tlg.addColorStop(1, "rgba("+te[1]+","+te[1]+","+te[1]+","+((i==1)?0.01:0.5)+")");
            ctx2.fillStyle=tlg;
            ctx2.fill();
        }
        /*
        ctx2.beginPath();
        ctx2.moveTo(0, -more);
        ctx2.lineTo(0, l3+more);
        ctx2.lineTo(-shdw, l3+more);
        ctx2.lineTo(-shdw, -more);
        ctx2.closePath();
        var tlg=ctx2.createLinearGradient(-shdw, 0, 0, 0);
        te = shaCfg.Pg_cs[ 1 ];
        tlg.addColorStop(0, "rgba("+te[0]+","+te[0]+","+te[0]+",0.01)");
        tlg.addColorStop(0.5, "rgba("+te[0]+","+te[0]+","+te[0]+",0.05)");
        tlg.addColorStop(1, "rgba("+te[1]+","+te[1]+","+te[1]+",0.5)");
        ctx2.fillStyle=tlg;
        ctx2.fill();
        
        //shadow right
        ctx2.beginPath();
        ctx2.moveTo(0, -more);
        ctx2.lineTo(0, l3+more);
        ctx2.lineTo(shdw, l3+more);
        ctx2.lineTo(shdw, -more);
        ctx2.closePath();
        tlg=ctx2.createLinearGradient(0, 0, shdw, 0);
        te = shaCfg.Pg_cs[ 0 ];
        tlg.addColorStop(0, "rgba("+te[0]+","+te[0]+","+te[0]+",0.5)");
        tlg.addColorStop(0.5, "rgba("+te[1]+","+te[1]+","+te[1]+",0.05)");
        tlg.addColorStop(1, "rgba("+te[1]+","+te[1]+","+te[1]+",0.01)");
        ctx2.fillStyle=tlg;
        ctx2.fill();
        */
        /*console.log(cE.id + "@(" + x + "," + y + ":" + cp[0] + "," + cp[1] + 
            "),trans(" + Math.floor(m) + "," + Math.floor(n) + "),degb=" + 
            Math.round(degb*180/Math.PI) + ",2b-90=" + b2_sub_ninty);*/
    }    
}

var sA = [];    // to store the size(width & height) of cover image for the other imgs.
var canPos = {
    c_b: [-1, -1, -1, -1],
    pgs: [-1, -1, -1, -1]
};
var shaCfg = {
    widPer: 0.05,   //shadow width for inner part of a page
    spw: -1,        //real shadow with after bookViewer width is decided.
    rect: [ [-1, -1, -1, -1], [-1, -1, -1, -1] ],
    //Pg_cs: [ ["#888", "#fff"], ["#fff","#888"] ],   // right and left
    Pg_cs: [ ["0", "255"], ["255","0"] ],   // right and left
    grd: [ [-1, -1, -1, -1], [-1, -1, -1, -1] ]
};
var isImgArrayLoaded = false, c0loadedti = null;
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
        //tA.on("click", book_click);   // control by mousedown & mouseup functions.
        tP = tA[0]; 
        if ( (i==0) || (i==(allpg.length-1)) ) {
            //tP.style["transform"] = "rotateY(" + minDeg + "deg) translateZ(8px)";
            tP.style["transform"] = "rotateY(" + minDeg + "deg)";// translateZ(0px)";
        } else {
            tP.style["transform"] = "rotateY(" + minDeg + "deg)";// translateZ(0px)";
            /*$(allpl[j]).off("onmousemove");
            $(allpl[j+1]).off("onmousemove");
            $(allpl[j]).on("onmousemove", page_mousemove);
            $(allpl[j+1]).on("onmousemove", page_mousemove);*/
        }        
        tP.style["z-index"] = -j;
        
        for (k = 0; k <= 1; k++) {
            allpp[j+k].style["display"] = "none";
            allpl[j+k].style["z-index"] = -j+(1-k);
        }
        //tP.style["display"] = "none";
    }
    //$(allpg[0])[0].style["display"] = "inherit";
    $(allpg[0])[0].style["z-index"] = zindv;

    $("canvas").off("mousedown");
    $("canvas").on("mousedown", page_mousedown);
    $("canvas").off("mouseup");
    $("canvas").on("mouseup", page_mouseup);
    $("canvas").off("mousemove");
    $("canvas").on("mousemove", page_mousemove);
    
    //cover.style = "border: 2px solid #2c3e50";
    c0.src = imgPath + "cover.jpg";
    //c1.src = imgPath + "1.jpg";

    c0.onload = function() {
        sA = handleResize(c0);
        var ctx2 = cc[0].getContext('2d');
        ctx2.drawImage(c0, 0, 0, sA[0], sA[1]);
        
        showBookViewer();
        
        shaCfg.spw = Math.floor(sA[0]*shaCfg.widPer);
        /*shaCfg.rect = [ [0, brderWid, shaCfg.spw, sA[1]-brderWid],
                        [sA[0]-shaCfg.spw, brderWid, sA[0], sA[1]-brderWid] ];
        shaCfg.grd = [ [ 0, brderWid, shaCfg.spw, brderWid],
                        [ sA[0]-shaCfg.spw, brderWid, sA[0], brderWid] ];
                        */
        shaCfg.rect = [ [0, 0, shaCfg.spw, sA[1]-0],
                        [sA[0]-shaCfg.spw, 0, sA[0], sA[1]-0] ];
        shaCfg.grd = [ [ 0, 0, shaCfg.spw, 0],
                        [ sA[0]-shaCfg.spw, 0, sA[0], 0] ];

        canPos.c_b = [0, 0, sA[0], sA[1]];
        canPos.pgs = [ (sA[0]-sA[2])/2, (sA[1]-sA[3])/2, sA[2], sA[3]];
        //alert(sA[0] + "," + sA[1]);
        
        //c1.src = imgPath + "1.jpg";
        //allpl[i].onmousemove = function(event) {
    }    

    c0loadedti = setInterval(addOnLoad, 500);
    
    /*
    c1.onload = function() {
        var ctx2 = cc[1].getContext('2d');
        ctx2.drawImage(c1, 0, 0, sA[0], sA[1]);
        
        p0.src = imgPath + "2.jpg";
        p0.onload = function() {
            var ctx2 = pl0.getContext('2d');
            ctx2.drawImage(p0, 0, 0, sA[0], sA[1]);            
        }
    } 
    */   
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

function addOnLoad() {
    if (!isImgArrayLoaded) {
        return;
    } else {
        clearTimeout(c0loadedti);
    }
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

                var i0_last = ( (tId == "c0") || (tId == "b1" ) );
                if ( !i0_last ) {
                    imIndM2 = parseInt(tId[1]) % 2;
                    te = shaCfg.grd[ imIndM2 ];
                    tlg=ctx2.createLinearGradient(te[0], te[1], te[2], te[3]);
                    te = shaCfg.Pg_cs[ imIndM2 ];
                    tlg.addColorStop(0, "rgba("+te[0]+","+te[0]+","+te[0]+","+((imIndM2==0)?0.5:0.01)+")");
                    tlg.addColorStop(1, "rgba("+te[1]+","+te[1]+","+te[1]+","+((imIndM2==0)?0.01:0.35)+")");

                    ctx2.fillStyle=tlg;
                    te = shaCfg.rect[ imIndM2 ];
                    ctx2.fillRect(te[0], te[1], te[2], te[3]);                    
                }                
                //alert(sA[0] + "," + sA[1]);
                ts = sE.src;
                ts = ts.substring(ts.lastIndexOf("/")+1);
                //console.log("img '" + sE.id + ":" + ts + "' start loaded.")
            };
        }
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
    
    isImgArrayLoaded = true;
    //debugger;
}

var pshft = 2, zindv = 1, ashft = 0;    // ashft: the diff of degrees bet. two pages on the same side.
var imInd = 0, minDeg = 0, maxDeg = -180;   // minDeg can't be > 0 since the image will be up side down and mirror.
var minDeg2 = minDeg-allpg.length*ashft, maxDeg2 = maxDeg+allpg.length*ashft;
var imCnt = -1, td_normal = 1, td_short = 0.001;
var mf = 1;   //A good value to display like turning a page.
var isOnLpg = null, isOnRpg = null;
function chk_LoR_page_adj_pgInd(x,y) {
    var spineC = document.getElementById("bookViewer").getBoundingClientRect();
    var isTrue = (y > (spineC.top)) && (y < (spineC.top+bvC.height));
    
    isOnLpg =  ( isTrue && (x > (spineC.left-bvC.width)) && (x < (spineC.left)) );
    isOnRpg = ( isTrue && (x > (spineC.left)) && (x < (spineC.left+bvC.width)) );

    if ( isOnLpg ) {
        if (imInd < (imCnt-1)) {            
            imInd -= ( ((imInd%2)==0)?1:0 );   
        }
        pshft = - Math.abs(pshft);
    } else if ( isOnRpg ) {
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

function doCanvasMouseMove(event) {
    var x = event.clientX;
    var y = event.clientY;
    
    console.log("@(" + x + "," + y + ")");
    
}


var tTime = [0.8, 0.8];
function book_click(event) {    
    // debugger
    if (c1.src.indexOf("#") != -1) {
        alert("Book images are not loaded!");
        return;
    }
    
    imInd =  (imInd < 0) ? 0 : imInd;
    imInd =  (imInd >= imCnt) ? (imCnt-1) : imInd;
    
    chk_LoR_page_adj_pgInd(event.clientX, event.clientY);


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
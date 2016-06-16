
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

var bsRatio = (4 / 5), scaleUpRatio = 1.05, brderWid = 5;  // Book to Screen ratio
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

var debugMode = true;
var sX = -1, sY = -1;
function showBookViewer() {
    var bV = document.getElementById("bookViewer");
    var bvC;

    dZ = document.getElementById("dz_table");
    dZ.style["z-index"] = 9999;

    bV.style["z-index"] = 1;
    //for (var i=0; i<allpl.length; i++) {
    if (debugMode) {    // for debug;
        sY = Math.floor(window.screen.availHeight / 2 - sA[1] / 2.1); //choose.offsetHeight + output.offsetHeight + 350;
        sX = Math.floor(window.screen.availWidth / 2 - sA[0] / 1.5);
    } else {
        sY = Math.floor(window.screen.availHeight / 2 - sA[1] / 2.5); //choose.offsetHeight + output.offsetHeight + 350;
        sX = Math.floor(window.screen.availWidth / 2);
    }
    //}
    /*
    if (debugMode) {    // for debug;
        bV.style.top = (window.screen.availHeight/2 - bV.offsetHeight/2.5) + "px"; //choose.offsetHeight + output.offsetHeight + 350;
        bV.style.left = (window.screen.availWidth/2 - bV.offsetWidth/1.5) + "px";  
    } else {
        bV.style.top = (window.screen.availHeight/2 - bV.offsetHeight/2.5) + "px"; //choose.offsetHeight + output.offsetHeight + 350;
        bV.style.left = (window.screen.availWidth/2) + "px";  
    }*/
    bV.style["visibility"] = "visible";
    bvC = document.getElementById("bookViewer").getBoundingClientRect();
}

var startC = null, sC = null, nC = null, nnC = null, pC = null;
var dX = -1, dY = -1;
var isOnLpg_d = null, isOnRpg_d = null;
function page_mousedown(event) {
    console.log("mousedown in");
    //event.dataTransfer.setData("Text", event.target.id);
    if (c1.src.indexOf("#") != -1) {
        alert("Book images are not loaded!");
        startC = null;
        return;
    }
    if (mouseState != null) {
        return;
    }
    mouseState = "0";

    dX = event.clientX;
    dY = event.clientY;
    var bC = event.target;
    var tId = bC.id;
    var isOn = chk_LoR_page_adj_pgInd(dX, dY, tId);

    if (((!isOn[0]) && (!isOn[1])) || ((imInd == 0) && (isOn[0])) || ((imInd == (imCnt - 1)) && (isOn[1]))) {
        mouseState = null;
        return;
    }
    isOnLpg_d = isOn[0], isOnRpg_d = isOn[1];

    var shft;
    if ((imInd % 2) == 0) {
        if (imInd == 0) {
            pC = null;
            sC = cc[0];
            nC = cc[1];
            nnC = pl[0];
        } else if (imInd == (imCnt - 2)) {
            tind = (imInd - 1) % pl.length;
            pC = pl[tind];
            sC = bc[0];
            nC = bc[1];
            nnC = null;
        } else {
            tind = ((imInd - 2) % pl.length);
            pC = pl[tind - 1];
            sC = pl[tind];
            nC = pl[tind + 1];
            nnC = pl[(tind + 2) % pl.length];
        }
        shft = 1;
    } else {
        if (imInd == (imCnt - 1)) {
            pC = null;
            sC = bc[1];
            nC = bc[0];
            tind = (imInd - 2) % pl.length;
            nnC = pl[tind];
        } else if (imInd == 1) {
            pC = pl[0];
            sC = cc[1];
            nC = cc[0];
            nnC = null;
        } else {
            tind = ((imInd - 2) % pl.length);
            pC = pl[tind + 1];
            sC = pl[tind];
            nC = pl[tind - 1];
            nnC = pl[(tind - 2) % pl.length];
        }
        shft = -1;
    }
    fp = imgPath.substring(1, 150) + bimgNameArray[imInd + shft];
    if (nC.children[0].src.indexOf(fp) == -1) {
        nC.children[0].src = "." + fp;
    }
    if (nnC != null) {
        fp = imgPath.substring(1, 150) + bimgNameArray[imInd + 2 * shft];
        if (nnC.children[0].src.indexOf(fp) == -1) {
            nnC.children[0].src = "." + fp;
        }
    }
    console.log("mousedown: pC,bC,nC,nnC=" + ((pC == null) ? "null" : pC.id) + "," + sC.id + "," + nC.id + "," + ((nnC == null) ? "null" : nnC.id));
}

var showItvl = 10, minToShow = 10;
function doShowPageByInterval(curX, curY, tarX, tarY, timeItvl, shrinkDis, midX, midY) {
    // Animation Line: Y - dP[1] = (cy-dP[1])/(cx-dP[0]) * (X - dp[0]);
    // Do 4 steps to be on the dP. Every step take half way.
    //var sS = [ [-1,-1], [-1,-1], [-1,-1] ];

    //console.log("Set page to ("+curX+","+curY+")");
    console.log("mousemove200");
    doPagePositionByMouseCor(startC, nC, nnC, curX, curY);
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
            if (turn2Right) {
                doPagePositionByMouseCor(startC, nC, nnC, curX, curY);
                turn2Right = false;
            } else if (turn2Left) {
                doPagePositionByMouseCor(startC, nC, nnC, curX, curY);
                turn2Left = false;
            } else {
                doPagePositionByMouseCor(startC, nC, nnC, curX, curY);
            }
        startC = nC = nnC = null;
        mouseState = null;
        console.log("end of action.");
    }
}

var mouseState = null;  // 0/1/2: down/move/up
var shkRatio = 1 / 2;
var turn2Right, turn2Left;

function page_mouseup(event) {
    console.log("mouseup in");
    event.preventDefault();
    if ((c1.src.indexOf("#") != -1) || ((mouseState != "0") && (mouseState != "01")) ||
        ((!isOnLpg_d) && (!isOnRpg_d) && (mouseState == "0"))) {
        return;
    }
    mouseState += "2";

    // Do put the page on the destination: 
    // If the mouse is still on the starting page, return to the original position; 
    // If on the page the other side, turn the page.
    var uX = event.clientX, uY = event.clientY;
    startC = sC;
    var tId = startC.id;
    var isOn = chk_LoR_page_adj_pgInd(uX, uY, tId);

    var pnum = parseInt(tId[2]);
    if ((startC == null) || (tId[0] == "c") || (tId[0] == "b") || ((Math.abs(uX - dX) < 5) && (Math.abs(uY - dY) < 5))) { // cover & back page don't slide but just turn the page.
        //book_click(event);
        if (mouseState == "02") {
            //if ((tId[0] != "c") && (tId[0] != "b")) {
            if ( (imInd != 0) && (imInd != (imCnt-1)) ) {
                startC.width = startC.width;
            }
            zindv++;
            startC.style["z-index"] = zindv;
        }

        if (isOnLpg_d) {
            imInd = (imInd <= 2) ? 0 : (imInd - 2);
            //setTimeout(doShowPageByInterval, showItvl, sX - sA[0], sY + sA[1], sX + sA[0], sY + sA[1], showItvl, shkRatio, sX-5, sY + (sA[1]*4/5));
            setTimeout(doShowPageByInterval, showItvl, sX - sA[0], sY + sA[1], sX + sA[0], sY + sA[1], showItvl, shkRatio);
        } else if (isOnRpg_d) {
            imInd = (imInd >= (imCnt - 3)) ? (imCnt - 1) : (imInd + 2);
            //setTimeout(doShowPageByInterval, showItvl, sX + sA[0], sY + sA[1], sX - sA[0], sY + sA[1], showItvl, shkRatio, sX-5, sY + (sA[1]*4/5));
            setTimeout(doShowPageByInterval, showItvl, sX + sA[0], sY + sA[1], sX - sA[0], sY + sA[1], showItvl, shkRatio);
        }
    } else {
        var dP = null;
        if (isOn[0]) {
            dP = [sX - sA[0], sY + sA[1]];
            if (isOnRpg_d) {
                imInd = (imInd >= (imCnt - 3)) ? (imCnt - 1) : (imInd + 2);
            }
        } else if (isOn[1]) {
            dP = [sX + sA[0], sY + sA[1]];
            if (isOnLpg_d) {
                imInd = (imInd <= 2) ? 0 : (imInd - 2);
            }
        } else {    //drop not on book area, return to original page
            if (isOnLpg_d) {
                if (uX > sX) {
                    dP = [sX + sA[0], sY + sA[1]];
                    imInd = (imInd <= 2) ? 0 : (imInd - 2);
                } else {
                    dP = [sX - sA[0], sY + sA[1]];    
                }                
            } else if (isOnRpg_d) {
                if (uX < sX) {
                    dP = [sX - sA[0], sY + sA[1]];
                    imInd = (imInd >= (imCnt - 3)) ? (imCnt - 1) : (imInd + 2);
                } else {
                    dP = [sX + sA[0], sY + sA[1]];   
                }
            } else {
                console.log("???@288")
                return;
            }
        }
        //if (mouseState == "012") {
        setTimeout(doShowPageByInterval, showItvl, event.offsetX, event.offsetY, dP[0], dP[1], showItvl, 1 / 2);
        //}
    }
    update_imInd(uX, uY);
    console.log("mouseup out");
}

function page_mousemove(event) { // Actuall, during dragging.
    if (((mouseState != "0") && (mouseState != "01")) || (sC == null) || (sC.id[0] == "c") || (sC.id[0] == "b")) {
        return;
    }
    if (mouseState == "0") {
        mouseState = "01";
    }
    startC = sC;
    var tId = startC.id;

    chk_LoR_page_adj_pgInd(event.clientX, event.clientY, tId);

    zindv++;
    startC.style["z-index"] = zindv;
    //startC = cl0; nC = cl1; nnC = pl0;    // For test
    console.log("mousemove273");
    doPagePositionByMouseCor(startC, nC, nnC, event.offsetX, event.offsetY);
    //console.log(cE.id + "@(" + x + "," + y + ")");    
}

var tPbrdercolor = "#34495e", bgcolor = "#ecf0f1";;
var Pg_cs = [["0", "255"], ["255", "0"]];   // right and left
var pbOnTopX, pbOnBotX, pbOnLefY, pbOnRigY;
var isValid, l1, l2, l3, degb;

function doPagePositionByMouseCor(cE, nC, nnC, ofsX, ofsY) {
    var cp = [ofsX, ofsY];    // current position in canvas
    var pe; // page right-bottom or left-bottom endpoint
    var p1 = [sX, sY];
    var trickValid = null;
    var tId = cE.id;
    
    if (isOnRpg_d) {
        pe = [sX + sA[0], sY + sA[1]]; // page right-bottom endpoint
    } else if (isOnLpg_d) {
        pe = [sX - sA[0], sY + sA[1]]; // page left-bottom endpoint
    } else {
        console.log("???@346"); return;
    }

    ctx2 = cE.getContext('2d');
    if ((cp[0] == pe[0]) && (cp[1] == pe[1])) { // start at left/right page, drop on right, handle last step.
        cE.width = cE.width;  // **Trick to clear canvas.

        if (isOnRpg_d) {
            ctx2.drawImage(cE.children[0], sX, sY, sA[0], sA[1]);
            if ( tId!="bl0" ) {
                doPaintShadow(ctx2, p1, [shaCfg.spw, sY], [shaCfg.spw, pe[1]], [sX, pe[1]]);
            }
        } else {
            ctx2.drawImage(cE.children[0], pe[0], sY, sA[0], sA[1]);
            if ( tId!="cl1" ) {
                doPaintShadow(ctx2, p1, [-shaCfg.spw, sY], [-shaCfg.spw, pe[1]], [sX, pe[1]]);
            }
        }
        console.log("Last step of sliding back: t2r.")
        return;
    } else if ((cp[0] == (sX - sA[0])) && (cp[1] == pe[1])) {   // start at left/right page, drop on left, handle last step.
        if (isOnRpg_d) {
            trickValid = [true, true, false, false];
        } else if (isOnLpg_d) {
            cE.width = cE.width;  // **Trick to clear canvas.
            ctx2.drawImage(cE.children[0], sX - sA[0], sY, sA[0], sA[1]);
            if ( tId!="cl1" ) {
                doPaintShadow(ctx2, p1, [-shaCfg.spw, sY], [-shaCfg.spw, pe[1]], [sX, pe[1]]);
            }
            console.log("Last step of sliding back: t2l.")
            return;
        }
    }

    var ce = [(cp[0] + pe[0]) / 2, (cp[1] + pe[1]) / 2];   // center of cp & pe
    var slope_cp = (cp[1] - pe[1]) / (cp[0] - pe[0]);   // slope of cp & pe   
    var slope_pb = - (1 / slope_cp); // perpendicular bisector 垂直平分線
    //==> pb equation: y - ce[1] = slope_pb * (x - ce[0])
    pbOnTopX = Math.floor(((sY - ce[1]) / slope_pb) + ce[0]);
    pbOnBotX = Math.floor(((pe[1] - ce[1]) / slope_pb) + ce[0]);
    pbOnLefY = Math.floor(slope_pb * (sX - ce[0]) + ce[1]);
    pbOnRigY = Math.floor(slope_pb * (pe[0] - ce[0]) + ce[1]);            
    var isValid = [false,false,false,false];
    if (isOnRpg_d) {
        isValid[0] = (pbOnTopX >= sX) && (pbOnTopX <= pe[0]);
        isValid[1] = (pbOnBotX >= sX) && (pbOnBotX <= pe[0]);
    } else {    // isOnLpg_d
        isValid[0] = (pbOnTopX <= sX) && (pbOnTopX >= pe[0]);
        isValid[1] = (pbOnBotX <= sX) && (pbOnBotX >= pe[0]);
    }
    isValid[2] = (pbOnLefY >= sY) && (pbOnLefY <= pe[1]);
    isValid[3] = (pbOnRigY >= sY) && (pbOnRigY <= pe[1]);        

    if (trickValid != null) {
        isValid = trickValid;
    }
    //console.log("valid: "+isValid[0]+","+isValid[1]+","+isValid[2]+","+isValid[3]);

    /*if ((((!isValid[0]) && isValid[1] && isValid[2])) ||
        (!(isValid[0] || isValid[1] || isValid[2] || isValid[3])) ||
        (isValid[0] && isValid[3])) { 
        return;
    }*/
    if (((!isValid[1]) && isValid[2] && isValid[3])) { // (!bottom) and left and right: cursor to beyond right-side
        // todo1
        ctx2.moveTo(ofsX, ofsY);
        ctx2.lineTo(sX, pe[1]);
        tdeg = Math.atan((pe[1] - cp[1]) / (cp[0] - sX)) / 2;
        ts = (Math.sin(tdeg) * sA[0]) << 1;
        degb = Math.PI / 2 - tdeg;
        ofsY = pe[1] - (ts * Math.sin(degb));
        ofsX = pe[0] - (ts * Math.cos(degb));
        console.log("mousemove315");
        doPagePositionByMouseCor(startC, nC, nnC, ofsX, ofsY);
        return;
    }
    console.log("bC=" + cE.id + ",nC=" + nC.id + ",nnC=" + ((nnC == null) ? "null" : nnC.id));
    var dif, dif2, p2, p3, p4;
    var l4 = Math.sqrt(Math.pow(cp[0] - pe[0], 2) + Math.pow(cp[1] - pe[1], 2)) >> 1;
    if ( isValid[1] && isValid[3] ) {
        var sigv = 1, sv=0;
        cE.width = cE.width;  // **Trick to clear canvas.
        
        if (isOnRpg_d) {
            ctx2.drawImage(cE.children[0], sX, sY, sA[0], sA[1]);
            if ( tId!="bl0" ) {
                doPaintShadow(ctx2, p1, [shaCfg.spw, sY], [shaCfg.spw, pe[1]], [sX, pe[1]]);
            }
            sv = sX;            
        } else {
            sigv=-1;
            //ctx2.drawImage(cE.children[0], pe[0], sY, sA[0], sA[1]);
            if ( tId!="cl1" ) {
                //doPaintShadow(ctx2, p1, [-shaCfg.spw, sY], [-shaCfg.spw, pe[1]], [sX, pe[1]]);
            }
            sv = pe[0];
        }

        l1 = Math.sqrt(Math.pow(pbOnBotX - cp[0], 2) + Math.pow(pe[1] - cp[1], 2));
        l2 = Math.sqrt(Math.pow(pe[0] - cp[0], 2) + Math.pow(pbOnRigY - cp[1], 2));
        ctx2.beginPath();
        if (nnC != null) {
            ctx2.moveTo(pe[0], pe[1]);
            ctx2.lineTo(pe[0] - sigv*l1, pe[1]);
            ctx2.lineTo(pe[0], pe[1] - l2);
            ctx2.fillStyle = ctx2.createPattern(nnC, "no-repeat");
            ctx2.strokeStyle = tPbrdercolor;
        } else {
            ctx2.moveTo(pe[0]+sigv*2, pe[1]+sigv*2);
            ctx2.lineTo(pe[0]-sigv*l1,pe[1]+sigv*2);
            ctx2.lineTo(pe[0]+sigv*2,pe[1]-sigv*l2);
            ctx2.fillStyle=bgcolor;
            ctx2.strokeStyle = bgcolor;
        }
        ctx2.closePath();
        ctx2.fill();
        ctx2.stroke();

        degb = Math.atan((pe[0] - pbOnBotX) / (pe[1] - pbOnRigY)); //a value between -PI/2 and PI/2 radians.
        ctx2.translate(Math.floor(cp[0]), Math.floor(cp[1]));
        ctx2.rotate(degb * 2); // 2b degree   => **: rotate 不能在 translate 之前做
        if (isOnRpg_d) {
            ctx2.translate(-sX, -pe[1]);
        } else {
            ctx2.translate(-pe[0], -pe[1]);
        }
        ctx2.beginPath();
        ctx2.moveTo(sv, pe[1] - l2);
        ctx2.lineTo(sv, pe[1]);
        ctx2.lineTo(sv + sigv*l1, pe[1]);
        dif2 = (pbOnRigY - sY);
        ctx2.closePath();
        ctx2.fillStyle = ctx2.createPattern(nC, "no-repeat");
        ctx2.fill();
        ctx2.strokeStyle = tPbrdercolor;
        ctx2.stroke();

        if (isOnRpg_d) {
                ctx2.translate(sX, sY + dif2);
                ctx2.rotate(-degb);
                ctx2.translate(-sX, -sY);
        } else {
                ctx2.translate(pe[0], sY + dif2);
                dOriPattern2(ctx2, "blue");
                ctx2.rotate(-degb);
                ctx2.translate(-sX, -sY);
                dOriPattern(ctx2, "#00ffff");    
        }
        l3 = Math.sqrt(Math.pow(l2, 2) + Math.pow(l1, 2));
        p2 = [(l4 / 3), sY + (l4 / 3) / Math.tan(degb)];
        p3 = [p2[0], sY + l3 - (l4 / 3) * Math.tan(degb)];
    } else if ((isValid[0] && isValid[1])) {
        var sigv = 1, sv=0;
        cE.width = cE.width;  // **Trick to clear canvas.
        
        if (isOnRpg_d) {
            ctx2.drawImage(cE.children[0], sX, sY, sA[0], sA[1]);
            if ( tId!="bl0" ) {
                doPaintShadow(ctx2, p1, [shaCfg.spw, sY], [shaCfg.spw, pe[1]], [sX, pe[1]]);
            }
        } else {
            ctx2.drawImage(cE.children[0], pe[0], sY, sA[0], sA[1]);
            if ( tId!="cl1" ) {
                doPaintShadow(ctx2, p1, [-shaCfg.spw, sY], [-shaCfg.spw, pe[1]], [sX, pe[1]]);
            }
            sigv = -1;
        }
        
        if (cp[1] >= pe[1]) {
            ctx2.beginPath();
            if (nnC != null) {
                ctx2.moveTo(pe[0], pe[1]);
                ctx2.lineTo(pbOnBotX, pe[1]);
                ctx2.lineTo(pbOnTopX, sY);
                ctx2.lineTo(pe[0], sY);
                ctx2.fillStyle = ctx2.createPattern(nnC, "no-repeat");
                ctx2.strokeStyle = tPbrdercolor;
            } else {
                ctx2.moveTo(pe[0] + sigv*2, pe[1] + sigv*2);
                ctx2.lineTo(pbOnBotX, pe[1] + sigv*2);
                ctx2.lineTo(pbOnTopX, sY - sigv*2);
                ctx2.lineTo(pe[0] + sigv*2, sY - sigv*2);
                ctx2.fillStyle = bgcolor;
                ctx2.strokeStyle = bgcolor;
            }
            ctx2.closePath();
            ctx2.fill();
            ctx2.stroke();

            ctx2.translate(Math.floor(cp[0]), Math.floor(cp[1]));
            ts = Math.sqrt(Math.pow(pbOnBotX - pbOnTopX, 2) + Math.pow(sA[1], 2));
            dega = Math.asin(sA[1] / ts);
            degb = Math.PI - 2 * dega;
            ctx2.rotate(-degb);
            if (isOnRpg_d) {
                ctx2.translate(-sX, -pe[1]);
            } else {
                ctx2.translate(-pe[0], -pe[1]);
            }
            ctx2.beginPath();
            ctx2.moveTo(sX, sY);
            ctx2.lineTo(sX, pe[1]);
            if (isOnRpg_d) {
                ctx2.lineTo(sX + (pe[0] - pbOnBotX), pe[1]);
                ctx2.lineTo(sX + (pe[0] - pbOnTopX), sY);                
            } else {
                ctx2.lineTo(sX - (pbOnBotX-pe[0]), pe[1]);
                ctx2.lineTo(sX - (pbOnTopX-pe[0]), sY);
            }
            ctx2.closePath();
            ctx2.fillStyle = ctx2.createPattern(nC, "no-repeat");
            ctx2.fill();
            ctx2.strokeStyle = tPbrdercolor;
            ctx2.stroke();

            if (isOnRpg_d) {
                ctx2.translate(sX + (pe[0] - pbOnTopX), sY);    
            } else {
                ctx2.translate(sX - (pbOnTopX-pe[0]), sY);
            }
            ctx2.rotate(degb / 2); // 2b degree   => **: rotate 銝滩�賢銁 translate 銋见�滚��
            if (isOnRpg_d) {
                ctx2.translate(-sX, -sY);
            } else {
                ctx2.translate(-pe[0], -sY);
            }

            l3 = ts;
            l5 = (l4 < 100) ? l4 : ((l4 / 2) > 50) ? 50 : (l4 / 2);
            p2 = [l5, sY + l5 / Math.tan(dega)];
            p3 = [p2[0], sY + l3 + l5 / Math.tan(dega)];
        } else {
            l1 = Math.sqrt(Math.pow(pbOnBotX - cp[0], 2) + Math.pow(pe[1] - cp[1], 2));
            l2 = Math.sqrt(Math.pow(pe[0] - cp[0], 2) + Math.pow(pbOnRigY - cp[1], 2));
            if (l2 == Infinity) {
                console.log("mousemove410");
                doPagePositionByMouseCor(startC, nC, nnC, ofsX, pe[1] + 2);
                return;
            }
            ctx2.beginPath();
            if (nnC != null) {
                ctx2.moveTo(pe[0], pe[1]);
                ctx2.lineTo(pe[0] - sigv*l1, pe[1]);
                ctx2.lineTo(pbOnTopX, sY);
                ctx2.lineTo(pe[0], sY);
                ctx2.fillStyle = ctx2.createPattern(nnC, "no-repeat");
                ctx2.strokeStyle = tPbrdercolor;
            } else {
                ctx2.moveTo(pe[0]+sigv*2, pe[1]+sigv*2);
                ctx2.lineTo(pe[0]-sigv*l1,pe[1]+sigv*2);
                ctx2.lineTo(pbOnTopX-sigv*2, sY-2);
                ctx2.lineTo(pe[0]+sigv*2, sY-2);
                ctx2.fillStyle=bgcolor;
                ctx2.strokeStyle = bgcolor;
            }
            ctx2.closePath();
            ctx2.fill();
            ctx2.stroke();

            degb = Math.atan((pe[0] - pbOnBotX) / (pe[1] - pbOnRigY)); //a value between -PI/2 and PI/2 radians.
            ctx2.translate(Math.floor(cp[0]), Math.floor(cp[1]));

            ctx2.rotate(degb * 2);
            if (isOnRpg_d) {
                ctx2.translate(-sX, -pe[1]);
            } else {
                ctx2.translate(-pe[0], -pe[1]);
            }
            ctx2.beginPath();
            ctx2.moveTo(sX, sY);
            ctx2.lineTo(sX, pe[1]);
            ctx2.lineTo(sX + sigv*l1, pe[1]);
            dif = Math.abs(pbOnRigY - sY) * Math.tan(degb);
            ctx2.lineTo(sX + sigv*dif, sY);
            ctx2.lineTo(sX, sY);
            dif = dif / Math.sin(degb);
            dif2 = (pbOnRigY - sY);
            ctx2.closePath();
            ctx2.fillStyle = ctx2.createPattern(nC, "no-repeat");
            ctx2.fill();
            ctx2.strokeStyle = tPbrdercolor;
            ctx2.stroke();

            ctx2.translate(sX, sY + dif2);
            dOriPattern(ctx2, "#ffff00");
            ctx2.rotate(-degb);
            if (isOnRpg_d) {
                ctx2.translate(-sX, -sY);
            } else {
                ctx2.translate(-pe[0], -sY);
            }

            dOriPattern(ctx2, "#00ffff");
            ctx2.translate(0, dif);
            l3 = Math.sqrt(Math.pow(l2, 2) + Math.pow(l1, 2)) - dif;
            l5 = (l4 < 100) ? l4 : ((l4 / 2) > 50) ? 50 : (l4 / 2);
            p2 = [l5, sY - l5 * Math.tan(degb)];
            p3 = [p2[0], sY + l3 - l5 * Math.tan(degb)];
        }
    }
    p4 = [sX, sY + l3];
    if ( (tId!="bl0") && (tId!="cl1") ) {
        doPaintShadow(ctx2, p1, p2, p3, p4);
        //console.log("doPaintShadow@627:" + imInd);
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
        te = Pg_cs[k];
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

var sA = [];    // to store the size(width & height) of cover image for the other imgs.
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
var isImgArrayLoaded = false, c0loadedti = null;
function onLoad() {
    //debugger
    //input.value = dirpath;
    //window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
    //window.requestFileSystem(window.TEMPORARY, 1024*1024, onInitFs, errorHandler);

    var tA, tP;
    for (var i = (allpg.length - 1); i >= 0; i--) {
        j = (i << 1);

        tA = $(allpg[i]);
        tA.off("click");
        //tA.on("click", book_click);   // control by mousedown & mouseup functions.
        tP = tA[0];
        if ((i == 0) || (i == (allpg.length - 1))) {
            //tP.style["transform"] = "rotateY(" + minDeg + "deg) translateZ(8px)";
            //tP.style["transform"] = "rotateY(" + minDeg + "deg)";// translateZ(0px)";
        } else {
            //tP.style["transform"] = "rotateY(" + minDeg + "deg)";// translateZ(0px)";
            /*$(allpl[j]).off("onmousemove");
            $(allpl[j+1]).off("onmousemove");
            $(allpl[j]).on("onmousemove", page_mousemove);
            $(allpl[j+1]).on("onmousemove", page_mousemove);*/
        }
        //tP.style["z-index"] = -j;

        for (k = 0; k <= 1; k++) {
            allpp[j + k].style["display"] = "none";
            allpl[j + k].style["z-index"] = -j + (1 - k);
        }
        //tP.style["display"] = "none";
    }
    //$(allpg[0])[0].style["display"] = "inherit";
    //$(allpg[0])[0].style["z-index"] = zindv;

    $("canvas").off("mousedown");
    $("canvas").on("mousedown", page_mousedown);
    $("canvas").off("mouseup");
    $("canvas").on("mouseup", page_mouseup);
    $("canvas").off("mousemove");
    $("canvas").on("mousemove", page_mousemove);

    //cover.style = "border: 2px solid #2c3e50";
    c0.src = imgPath + "cover.jpg";

    c0.onload = function () {
        sA = handleResize(c0);
        var ctx2 = cc[0].getContext('2d');
        showBookViewer();

        shaCfg.spw = Math.floor(sA[0] * shaCfg.widPer);
        shaCfg.rect = [[sX, sY, shaCfg.spw, sA[1]],
            [sX - shaCfg.spw, sY, shaCfg.spw, sA[1]]];
        shaCfg.grd = [[sX, sY, sX + shaCfg.spw, sY],
            [sX - shaCfg.spw, sY, sX, sY]];

        canPos.c_b = [sX, sY, sA[0], sA[1]];
        canPos.pgs = [sX + (sA[0] - sA[2]) / 2, sY + (sA[1] - sA[3]) / 2, sA[2], sA[3]];

        //ctx2.drawImage(c0, sX-shaCfg.spw, sY, sA[0]+shaCfg.spw, sA[1]);
        ctx2.drawImage(c0, sX, sY, sA[0], sA[1]);
        //alert(sA[0] + "," + sA[1]);
    }

    c0loadedti = setInterval(addOnLoad, 500);

    if (0) {
        c1.src = imgPath + "1.jpg";
        c1.onload = function () {
            var ctx2 = cl1.getContext('2d');
            ctx2.drawImage(c1, sX, sY, sA[0], sA[1]);

            p0.src = imgPath + "2.jpg";
            p0.onload = function () {
                var ctx2 = pl0.getContext('2d');
                ctx2.drawImage(p0, sX, sY, sA[0], sA[1]);
            }
        }

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

function addOnLoad() {
    if (isImgArrayLoaded) {
        //Add OnLoad event handler for each image
        if (allpp[1].onload == null) {
            $("#c0").off("load");

            for (var i = 0; i < allpp.length; i++) {
                allpp[i].src = imgPath + bimgNameArray[i];

                allpp[i].onload = function (event) {
                    sE = event.srcElement;
                    pE = sE.parentElement;
                    tId = sE.id;
                    var ib_c = ((tId[0] == "c") || (tId[0] == "b"));
                    var cP = (ib_c) ? canPos.c_b : canPos.pgs;
                    var ctx2 = pE.getContext('2d');
                    var i0_last = ((tId == "c0") || (tId == "b1"));
                    if (i0_last) {
                        //ctx2.drawImage(sE, cP[0]-shaCfg.spw, cP[1], cP[2]+shaCfg.spw, cP[3]);
                        ctx2.drawImage(sE, cP[0], cP[1], cP[2], cP[3]);
                    } else {
                        ctx2.drawImage(sE, cP[0], cP[1], cP[2], cP[3]);
                        /*imIndM2 = parseInt(tId[1]) % 2;
                        te = shaCfg.grd[ imIndM2 ];
                        tlg=ctx2.createLinearGradient(te[0], te[1], te[2], te[3]);
                        te = shaCfg.Pg_cs[ imIndM2 ];
                        tlg.addColorStop(0, "rgba("+te[0]+","+te[0]+","+te[0]+","+((imIndM2==0)?0.5:0.01)+")");
                        tlg.addColorStop(1, "rgba("+te[1]+","+te[1]+","+te[1]+","+((imIndM2==0)?0.01:0.35)+")");

                        ctx2.fillStyle=tlg;
                        te = shaCfg.rect[ imIndM2 ];
                        ctx2.fillRect(te[0], te[1], te[2], te[3]);*/
                    }
                    //alert(sA[0] + "," + sA[1]);
                    ts = sE.src;
                    ts = ts.substring(ts.lastIndexOf("/") + 1);
                    console.log("img '" + sE.id + ":" + ts + "' @(" + cP[0] + "," + cP[1] + "," + cP[2] + "," + cP[3] + ")");
                };
            }
        }
        clearTimeout(c0loadedti);
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

function update_imInd(x, y) {
    //document.getElementById("pgInd").innerHTML = "pgInd: " + imInd +", sl,t: (" + Math.floor(cl0.left) + "," + Math.floor(cl0.top) + "), x,y: (" + x + "," + y + ")";
    document.getElementById("imInd").innerHTML = "imInd: " + imInd + ", x,y: (" + x + "," + y + ")";
    console.log("Line727: imInd=" + imInd);
}

var pshft = 2, zindv = 1, ashft = 0;    // ashft: the diff of degrees bet. two pages on the same side.
var imInd = 0, minDeg = 0, maxDeg = -180;   // minDeg can't be > 0 since the image will be up side down and mirror.
var minDeg2 = minDeg - allpg.length * ashft, maxDeg2 = maxDeg + allpg.length * ashft;
var imCnt = -1, td_normal = 1, td_short = 0.001;
var mf = 1;   //A good value to display like turning a page.
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
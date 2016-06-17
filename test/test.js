var cl0, cl1, cl2, c0, c1, c2, c3, c4, c5, c6;
var bC, nC, nnC;
var sX = 400, sY = 50, sA = [400, 500], sw, sh;
var imInd = -1, niInd = -1, nniInd = -1, allpl = null, allpi = null, biA = null, iLA = null;

var shaCfg = {
    widPer: 0.1,   //shadow width for inner part of a page
    spw: -1,        //real shadow with after bookViewer width is decided.
    rect: [[-1, -1, -1, -1], [-1, -1, -1, -1]],
    //Pg_cs: [ ["#888", "#fff"], ["#fff","#888"] ],   // right and left
    Pg_cs: [["0", "255"], ["255", "0"]],   // right and left
    grd: [[-1, -1, -1, -1], [-1, -1, -1, -1]]
};

window.onload = function() {
    sw = window.screen.availWidth;
    sh = window.screen.availHeight;
    bC = cl0 = document.getElementById("bC");
    nC = cl1 = document.getElementById("nC");
    nnC = cl2 = document.getElementById("nnC");
    cl0.width = cl1.width = cl2.width = sw;
    cl0.height = cl1.height = cl2.height = sh;
    c0 = document.getElementById("i0");
    c1 = document.getElementById("i1");
    c2 = document.getElementById("i2");
    c3 = document.getElementById("i3");
    c4 = document.getElementById("i4");
    c5 = document.getElementById("i5");
    cl0.onmousemove = cl1.onmousemove = cl2.onmousemove = mm;
    cl0.onmousedown = cl1.onmousedown = cl2.onmousedown = md;
    cl0.onmouseup = cl1.onmouseup = cl2.onmouseup = mu;
    //cl0.onclick = cl1.onclick = cl2.onclick = oc;
    var iNa = ["cover.jpg", "1.jpg", "2.jpg", "3.jpg", "4.jpg", "back.jpg"];
    
    shaCfg.spw = Math.floor(sA[0] * shaCfg.widPer);
    shaCfg.rect = [[sX, sY, shaCfg.spw, sA[1]],
        [sX - shaCfg.spw, sY, shaCfg.spw, sA[1]]];
    shaCfg.grd = [[sX, sY, sX + shaCfg.spw, sY],
        [sX - shaCfg.spw, sY, sX, sY]];
    //canPos.c_b = [sX, sY, sA[0], sA[1]];
    //canPos.pgs = [sX + (sA[0] - sA[2]) / 2, sY + (sA[1] - sA[3]) / 2, sA[2], sA[3]];

    allpl = [cl0, cl1, cl2];
    allpi = [c0, c1, c2, c3, c4, c5];
    imCnt = allpi.length;
    
    biA = new Array(imCnt);
    iLA = new Array(imCnt);
    for (i=0; i<allpi.length; i++) {
      allpi[i].src = iNa[i];
      biA[i] = iNa[i];
      iLA[i] = -1;
    }
}

var lcnt=0;
//var isLoadLpg, isLoadRpg; //20160616: Obsolete.
function dc(ele) {
  var ctx;
  var id = ele.id;
  if (imInd == -1) { // for initial
    lcnt++;
    if (id=="i0") {
      ctx = cl0.getContext("2d");
      ctx.drawImage(c0, sX, sY, sA[0], sA[1]);
    } else if (id=="i1") {
      ctx = cl1.getContext("2d");
      ctx.drawImage(c1, sX, sY, sA[0], sA[1]);
    } else if (id=="i2") {
      ctx = cl2.getContext("2d");
      ctx.drawImage(c2, sX, sY, sA[0], sA[1]);
    }     
    if (lcnt == imCnt) {
      imInd = 0;
      niInd = 1;
      nniInd = 2;
    }
  } else {
    if (niInd == -1) {
      return;
    }
    var inum = parseInt(id[1]);
    if (inum == niInd) {
        ctx = cl1.getContext("2d");
    } else if (inum == nniInd) {
        ctx = cl2.getContext("2d");
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

var showItvl = 10, minToShow = 10;
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
              allpi[niInd].src = biA[imInd-2];
              iLA[niInd] = 0; //isLoadLpg
              //isLoadLpg = true; isLoadRpg = false;  // Actuall isLoadLpg & isLoadRpg are mutually exclusive.
            } else if (imInd == 0) {
              niInd = 1;
              allpi[niInd].src = biA[1];
              //isLoadRpg = true; isLoadLpg = false;  // Use them both just to indicate clear logic.
              iLA[niInd] = 1; //isLoadRpg 
            }
            if (imInd >= 3) {
              nniInd = (niInd<1)?(allpi.length-1):(niInd-1); 
              allpi[nniInd].src = biA[imInd-3];
              //isLoadLpg = true; isLoadRpg = false;
              iLA[nniInd] = 0; //isLoadLpg
            } else if (imInd == 0) {
              nniInd = 2;
              allpi[nniInd].src = biA[2];
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
              allpi[nniInd].src = biA[imInd+2];
              iLA[nniInd] = 1; //isLoadRpg
            }
            if (imInd <= (biA.length-2)) {
              niInd = ( (imInd+1) % allpi.length);
              allpi[niInd].src = biA[imInd+1];  
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
        isOnLpg_d = isOnLpg_u = isOnRpg_d = isOnRpg_u = mouseState = null;
        console.log("end of action.");
    }
}

var mouseState = null;
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

var imCnt = 0;
var shkRatio = 1 / 2;
var doSP = null;
var isOnLpg_d, isOnRpg_d, isOnLpg_u, isOnRpg_u;
var  dX, dY;

function md(event) {
    var cE = event.target;

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
        if ( (Math.abs(uX - dX) < 5) && (Math.abs(uY - dY) < 5) ) {
          setTimeout(doShowPageByInterval, showItvl, sX - sA[0], sY + sA[1], sX + sA[0], sY + sA[1], showItvl, shkRatio, sX-5, sY + (sA[1]*4/5));
          //setTimeout(doShowPageByInterval, showItvl, sX - sA[0], sY + sA[1], sX + sA[0], sY + sA[1], showItvl, shkRatio);
        } else {
          slideMode = true;
        }
    } else if (isOnRpg_d) {
        doSP = doPagePositionByMouseCorRpg;
        if ( (Math.abs(uX - dX) < 5) && (Math.abs(uY - dY) < 5) ) {
          setTimeout(doShowPageByInterval, showItvl, sX + sA[0], sY + sA[1], sX - sA[0], sY + sA[1], showItvl, shkRatio, sX-5, sY + (sA[1]*4/5));
          //setTimeout(doShowPageByInterval, showItvl, sX + sA[0], sY + sA[1], sX - sA[0], sY + sA[1], showItvl, shkRatio);
        } else {
          slideMode = true;
        }
    }
    if (slideMode) {
      var dP = null;
      if (isOnLpg_u) {
        dP = [sX - sA[0], sY + sA[1]];
      } else if (isOnRpg_u) {
        dP = [sX + sA[0], sY + sA[1]];
      } else {
        dP = (uX < sX) ? ([sX - sA[0], sY + sA[1]]) : ([sX + sA[0], sY + sA[1]]);
      }
      setTimeout(doShowPageByInterval, showItvl, uX, uY, dP[0], dP[1], showItvl, 1 / 2);          
    }
}

function mm(event) {
    var cE = event.target;
    var tx = event.clientX, ty = event.clientY;

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

var tPbrdercolor = "#34495e", bgcolor = "#ecf0f1";;
var Pg_cs = [["0", "255"], ["255", "0"]];   // right and left
var pbOnTopX, pbOnBotX, pbOnLefY, pbOnRigY;
var isValid, l1, l2, l3, degb;

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
      // todo1
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
            ctx2.rotate(degb / 2); // 2b degree   => **: rotate 銝滩�賢銁 translate 銋见�滚��
            ctx2.translate(-sX, -sY);

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
    doPaintShadow(ctx2, p1, p2, p3, p4);
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
      if ( ((pe[0]-cp[0])>minToShow) || ((pe[1]-cp[1])>minToShow) ) {
        return;
      }
    }
    bC.width = bC.width;  // **Trick to clear canvas.
    if (((!isValid[1]) && isValid[2] && isValid[3])) { // (!bottom) and left and right: cursor to beyond right-side
      // todo1
      tdeg = Math.atan((pe[1] - cp[1]) / (cp[0] - sX)) / 2;
      ts = (Math.sin(tdeg) * sA[0]) << 1;
      degb = Math.PI / 2 - tdeg;
      ofsY = pe[1] - (ts * Math.sin(degb));
      ofsX = pe[0] - (ts * Math.cos(degb));
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
        ctx2.rotate(degb * 2); // 2b degree   => **: rotate 不能在 translate 之前做
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
        p2 = [(l4 / 3), sY + (l4 / 3) / Math.tan(degb)];
        p3 = [p2[0], sY + l3 - (l4 / 3) * Math.tan(degb)];
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
            ctx2.rotate(-degb);
            ctx2.translate(-sX, -pe[1]);
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
            ctx2.rotate(degb / 2); // 2b degree   => **: rotate 銝滩�賢銁 translate 銋见�滚��
            dOriPattern2(ctx2, "#0000ff");
            ctx2.translate(-sX, -sY);
            dOriPattern2(ctx2, "#00ffff");

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
            //dOriPattern2(ctx2, "#ffff00");
            ctx2.rotate(-degb);
            dOriPattern2(ctx2, "#0000ff");
            ctx2.translate(-sX, -sY);

            dOriPattern2(ctx2, "#00ffff");
            ctx2.translate(0, dif);
            l3 = Math.sqrt(Math.pow(l2, 2) + Math.pow(l1, 2)) - dif;
            l5 = (l4 < 100) ? l4 : ((l4 / 2) > 50) ? 50 : (l4 / 2);
            p2 = [l5, sY - l5 * Math.tan(degb)];
            p3 = [p2[0], sY + l3 - l5 * Math.tan(degb)];
        }
    }
    p4 = [sX, sY + l3];
    doPaintShadow(ctx2, p1, p2, p3, p4);
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


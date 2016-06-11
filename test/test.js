var cl0, cl1, cl2, c0, c1, c2;
var sX = 200, sY = 50, sA = [400, 500], sw, sh;
window.onload = function() {
    sw = window.screen.availWidth, sh = window.screen.availHeight;
    cl0 = document.getElementById("myCanvas");
    cl1 = document.getElementById("nature1");
    cl2 = document.getElementById("nature2");
    cl0.width = cl1.width = cl2.width = sw;
    cl0.height = cl1.height = cl2.height = sh;
    c0 = document.getElementById("scream");
    c1 = document.getElementById("n1");
    c2 = document.getElementById("n2");
    cl0.onmousemove = mm;
    c0.src="img_the_scream.jpg";
    c1.src="nature1.jpg";
    c2.src="nature2.jpg";
}

function dc(ele) {
  var ctx;
  var id = ele.id;
  if (id=="scream") {
    ctx = cl0.getContext("2d");
    ctx.drawImage(c0, sX, sY, sA[0], sA[1]);
  } else if (id=="n1") {
    ctx = cl1.getContext("2d");
    ctx.drawImage(c1, sX, sY, sA[0], sA[1]);
  } else {
    ctx = cl2.getContext("2d");
    ctx.drawImage(c2, sX, sY, sA[0], sA[1]);
  } 
}

function mm(event) {
   var cE = event.target;
   var tx = event.clientX, ty = event.clientY;
   /*if ( (cE.id != "myCanvas") || (tx<sX) || (tx>(sX+sA[0])) || (ty<sY) || (ty>(sY+sA[1])) ) {
     return;
   }*/

  var ofsX = event.clientX, ofsY = event.clientY;
  doPagePositionByMouseCor(cl0, cl1, cl2, ofsX, ofsY);
}

var tPbrdercolor = "#34495e";
var Pg_cs = [ ["0", "255"], ["255","0"] ];   // right and left
var pbOnTopX, pbOnBotX, pbOnLefY, pbOnRigY;
var isValid, l1, l2, l3, degb;
function doPagePositionByMouseCor(startC, nC, nnC, tX, tY) {
   var cE = startC;
   var ofsX = tX, ofsY = tY;
   var cp = [ofsX, ofsY];    // current position in canvas
    var pe = [sX+sA[0], sY+sA[1]];             // page right-bottom endpoint
    var ce = [ (cp[0]+pe[0])/2, (cp[1]+pe[1])/2];   // center of cp & pe
    var slope_cp = (cp[1] - pe[1]) / (cp[0] - pe[0]);   // slope of cp & pe   
    var slope_pb = - (1/slope_cp); // perpendicular bisector 垂直平分線
    //==> pb equation: y - ce[1] = slope_pb * (x - ce[0])
    pbOnTopX = Math.floor( ( (sY-ce[1])/slope_pb ) + ce[0] );
    pbOnBotX = Math.floor( ( (pe[1]-ce[1])/slope_pb ) + ce[0] );
    pbOnLefY = Math.floor( slope_pb * (sX-ce[0]) + ce[1] );
    pbOnRigY = Math.floor( slope_pb * (pe[0]-ce[0]) + ce[1] );
    isValid = [ (pbOnTopX>=sX)&&(pbOnTopX<=pe[0]), 
                    (pbOnBotX>=sX)&&(pbOnBotX<=pe[0]),
                    (pbOnLefY>=sY)&&(pbOnLefY<=pe[1]),
                    (pbOnRigY>=sY)&&(pbOnRigY<=pe[1]) ];
        
    //console.log("valid: "+isValid[0]+","+isValid[1]+","+isValid[2]+","+isValid[3]);
    
    ctx2 = cE.getContext('2d');
    if ( ( ((!isValid[0]) && isValid[1] && isValid[2]) ) || 
         ( !(isValid[0]||isValid[1]||isValid[2]||isValid[3]) ) || 
         (isValid[0] && isValid[3]) ) { // (!bottom) and left and right
      return;
    }
    if ( ((!isValid[1]) && isValid[2] && isValid[3]) ) { // (!bottom) and left and right
        ctx2.moveTo(ofsX, ofsY);
        ctx2.lineTo(sX, sY+sA[1]);
        tdeg = Math.atan((sY+sA[1]-cp[1])/(cp[0]-sX))/2;
        ts = (Math.sin(tdeg)*sA[0])<<1;
        degb = Math.PI/2-tdeg;
        ofsY = sY + sA[1] - (ts*Math.sin(degb));
        ofsX = sX + sA[0] - (ts*Math.cos(degb));
        doPagePositionByMouseCor(startC, nC, nnC, ofsX, ofsY);
        return;
    }
 
    var dif, dif2, p0, p1, p2, p3;
    var l4 = Math.sqrt( Math.pow(cp[0]-pe[0],2) + Math.pow(cp[1]-pe[1],2) )>>1;
    if ( (isValid[1] && isValid[3]) ) {
        cE.width = cE.width;  // **Trick to clear canvas.
        //ctx2.drawImage(pi[pnum], sX, sY, sA[0], sA[1]);
        ctx2.drawImage(c0, sX, sY, sA[0], sA[1]);
         
        l1= Math.sqrt(Math.pow(pbOnBotX-cp[0],2) + Math.pow(pe[1]-cp[1],2));
        l2= Math.sqrt(Math.pow(pe[0]-cp[0],2) + Math.pow(pbOnRigY-cp[1],2));      
        ctx2.beginPath();
        ctx2.moveTo(pe[0], pe[1]);
        ctx2.lineTo(pe[0]-l1,pe[1]);
        ctx2.lineTo(pe[0],pe[1]-l2);
        ctx2.closePath();
        ctx2.fillStyle=ctx2.createPattern(nnC,"no-repeat");
        ctx2.fill();
        //ctx2.strokeStyle = "red";
        //ctx2.stroke();
        
        degb = Math.atan( (pe[0]-pbOnBotX)/(pe[1]-pbOnRigY) ); //a value between -PI/2 and PI/2 radians.
        ctx2.translate(Math.floor(cp[0]), Math.floor(cp[1]));
        
        ctx2.rotate(degb*2); // 2b degree   => **: rotate 不能在 translate 之前做
        ctx2.translate(-sX, -pe[1]);
        ctx2.beginPath();
        ctx2.moveTo(sX,pe[1]-l2);   
        ctx2.lineTo(sX, pe[1]);
        ctx2.lineTo(sX+l1,pe[1]);
        dif2 = (pbOnRigY-sY);
        ctx2.closePath();
        ctx2.fillStyle=ctx2.createPattern(nC,"no-repeat");
        ctx2.fill();
        ctx2.strokeStyle=tPbrdercolor;
        ctx2.stroke();
        
        ctx2.translate(sX, sY + dif2);
        //dOriPattern(ctx2, "#ffff00");
        ctx2.rotate(-degb); 
        ctx2.translate(-sX, -sY);
        //dOriPattern(ctx2, "#00ffff");
        l3 = Math.sqrt( Math.pow(l2,2) + Math.pow(l1,2) );
        p2 = [(l4/3), sY+(l4/3)/Math.tan(degb)];
        p3 = [p2[0], sY+l3-(l4/3)*Math.tan(degb)];
    } else if ( (isValid[0] && isValid[1]) ) {
        cE.width = cE.width;  // **Trick to clear canvas.
        //ctx2.drawImage(pi[pnum], sX, sY, sA[0], sA[1]);
        ctx2.drawImage(c0, sX, sY, sA[0], sA[1]);
         
        if (cp[1]> (sY+sA[1])) {
          ctx2.beginPath();
          ctx2.moveTo(pe[0], pe[1]);
          ctx2.lineTo(pbOnBotX,pe[1]);
          ctx2.lineTo(pbOnTopX,sY);
          ctx2.lineTo(pe[0],sY);
          ctx2.closePath();
          ctx2.fillStyle=ctx2.createPattern(nnC,"no-repeat");
          ctx2.fill();    
          
          ctx2.translate(Math.floor(cp[0]), Math.floor(cp[1]));
          ts = Math.sqrt( Math.pow(pbOnBotX-pbOnTopX,2) + Math.pow(sA[1],2) );
          dega = Math.asin( sA[1]/ts );
          degb = Math.PI - 2*dega;
          ctx2.rotate(-degb);
          ctx2.translate(-sX, -pe[1]);
          ctx2.beginPath();
          ctx2.moveTo(sX,sY);
          ctx2.lineTo(sX,pe[1]);
          ctx2.lineTo(sX+(pe[0]-pbOnBotX),pe[1]);
          ctx2.lineTo(sX+(pe[0]-pbOnTopX),sY);
          ctx2.closePath();
          ctx2.fillStyle=ctx2.createPattern(nC,"no-repeat");
          ctx2.fill();
          ctx2.strokeStyle=tPbrdercolor;
          ctx2.stroke();

          ctx2.translate(sX+(pe[0]-pbOnTopX), sY);          
          ctx2.rotate(degb/2); // 2b degree   => **: rotate 銝滩�賢銁 translate 銋见�滚��
          ctx2.translate(-sX, -sY);
                          
          l3 = ts;
          l5 = (l4<100)? l4:((l4/2)>50)?50:(l4/2);
          p2 = [l5, sY+l5/Math.tan(dega)];
          p3 = [p2[0], sY+l3+l5/Math.tan(dega)];
        } else {
          l1= Math.sqrt(Math.pow(pbOnBotX-cp[0],2) + Math.pow(pe[1]-cp[1],2));
          l2= Math.sqrt(Math.pow(pe[0]-cp[0],2) + Math.pow(pbOnRigY-cp[1],2));
          if (l2 == Infinity) {
            doPagePositionByMouseCor(startC, nC, nnC, ofsX, pe[1]+2);
            return;
          }
          ctx2.beginPath();
          ctx2.moveTo(pe[0], pe[1]);
          ctx2.lineTo(pe[0]-l1,pe[1]);
          ctx2.lineTo(pe[0],pe[1]-l2);
          ctx2.closePath();
          ctx2.fillStyle=ctx2.createPattern(nnC,"no-repeat");
          ctx2.fill();
          
          degb = Math.atan( (pe[0]-pbOnBotX)/(pe[1]-pbOnRigY) ); //a value between -PI/2 and PI/2 radians.
          ctx2.translate(Math.floor(cp[0]), Math.floor(cp[1]));
          
          ctx2.rotate(degb*2); // 2b degree   => **: rotate 不能在 translate 之前做
          ctx2.translate(-sX, -pe[1]);
          ctx2.beginPath();
          ctx2.moveTo(sX,sY);
          ctx2.lineTo(sX, pe[1]);
          ctx2.lineTo(sX+l1,pe[1]);
          dif = Math.abs(pbOnRigY-sY)*Math.tan(degb);
          ctx2.lineTo(sX+dif,sY);
          ctx2.lineTo(sX,sY);            
          dif = dif/Math.sin(degb);
          dif2 = (pbOnRigY-sY);
          ctx2.closePath();
          ctx2.fillStyle=ctx2.createPattern(nC,"no-repeat");
          ctx2.fill();
          ctx2.strokeStyle=tPbrdercolor;
          ctx2.stroke();         
          
          ctx2.translate(sX, sY + dif2);
          //dOriPattern(ctx2, "#ffff00");
          ctx2.rotate(-degb); 
          ctx2.translate(-sX, -sY);
          //dOriPattern(ctx2, "#00ffff");
          ctx2.translate(0, dif);
          l3 = Math.sqrt( Math.pow(l2,2) + Math.pow(l1,2) ) - dif; 
          l5 = (l4<100)? l4:((l4/2)>50)?50:(l4/2);
          p2 = [l5, sY-l5*Math.tan(degb)];
          p3 = [p2[0], sY+l3-l5*Math.tan(degb)];       
        }        
    }
    p1 = [sX, sY]; 
    p4 = [sX, sY+l3];
    
    //shadow left
    var shdw = 55;
    var shdw2 = p2[0];
    for (var i = 0, j = -1, k = 1; i <= 1; i++, j *= -1, k--) {
      ctx2.beginPath();        
/*      ctx2.moveTo(sX, sY);
      ctx2.lineTo(sX, sY+l3);
      ctx2.lineTo(sX+j*shdw2, sY+l3);
      ctx2.lineTo(sX+j*shdw2, sY);*/
      ctx2.moveTo(p1[0], p1[1]);
      ctx2.lineTo(sX+j*p2[0], p2[1]);
      ctx2.lineTo(sX+j*p3[0], p3[1]);
      ctx2.lineTo(p4[0], p4[1]);

      ctx2.closePath();
      var tlg=(i == 0)?ctx2.createLinearGradient(sX-shdw2, sY, sX, sY):ctx2.createLinearGradient(sX, sY, sX+shdw2, sY);
      te = Pg_cs[ k ];
      tlg.addColorStop(0, "rgba("+te[0]+","+te[0]+","+te[0]+","+((i==0)?0.01:0.4)+")");
      tlg.addColorStop(((i==0)?0.6:0.5), "rgba("+te[i]+","+te[i]+","+te[i]+","+((i==0)?0.1:0.1)+")");
      tlg.addColorStop(1, "rgba("+te[1]+","+te[1]+","+te[1]+","+((i==0)?0.4:0.01)+")");
      ctx2.fillStyle=tlg;
      ctx2.fill();
      //ctx2.strokeStyle = "#0000ff";
      //ctx2.stroke();
    }

}

function dOriPattern(ctx2, tc) {
    ctx2.beginPath();
    ctx2.moveTo(sX,sY);
    ctx2.lineTo(sX,sY+sA[1]);
    ctx2.lineTo(sX+sA[0],sY+sA[1]);
    ctx2.lineTo(sX+sA[0],sY);
    ctx2.closePath();
    ctx2.strokeStyle=tc;
    ctx2.stroke();  
}


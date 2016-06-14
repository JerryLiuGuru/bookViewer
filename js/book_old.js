var tTime = [0.8, 0.8];
function book_click(event) {    
    // debugger
    if (c1.src.indexOf("#") != -1) {
        alert("Book images are not loaded!");
        return;
    }
    
    imInd =  (imInd < 0) ? 0 : imInd;
    imInd =  (imInd >= imCnt) ? (imCnt-1) : imInd;
    
    chk_LoR_page_adj_pgInd(event.clientX, event.clientY, event.target.id);


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
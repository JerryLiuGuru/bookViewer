
// UI Logic========================================================================================
var imgPath = "./img/";
var layoutIndex = 0;
var biA = [], tnArray = [], iLA = [];
var isImgArrayLoaded = false, i0loadedti = null;
var debugMode = false;
var sX = -1, sY = -1;
var sA = [];
var zoomShft = 10;

function handleResize(img) {
    /*
        A3: 297 x 420mm => 0.707143 ( w/h : aspect ratio)
        A4: 210 x 297mm => 0.70707
        B4: 250 x 353mm => 0.708215
        B5: 176 x 250mm => 0.704
    */
    //var i, w = img.width, h = img.height, sw = window.screen.availWidth, sh = window.screen.availHeight;
    var i, w = img.width, h = img.height, sw = window.innerWidth, sh = window.innerHeight;
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
                allpl[i].width = sw; //rw-tbdrw;    //NOTICE: Can't use .style.width = "xxx" + "px";
                allpl[i].height = sh; //rh-tbdrw;   //Since it will remain the original size of inner image.                                
            } else {
                //allpl[i].style="top: " + ((rh-rh2)/2) + "; left: " + ((rw-rw2)/2) 
                allpl[i].width = sw; //rw-tbdrw2;    //NOTICE: Can't use .style.width = "xxx" + "px";
                allpl[i].height = sh; //rh-tbdrw2;   //Since it will remain the original size of inner image.                
            }
        }
    }
    //return [rw-tbdrw, rh-tbdrw, rw-tbdrw2, rh-tbdrw2];
    return [rw2, rh2, rw2, rh2];
}

var layoutDB = [
    {   
        dz_pos: [20,15],    // position for drop zone
        //path: "./img/book(切圖)-assets 2/",   // path for imgs
        path: "./img/網頁(典藏)1280_800-切圖/",   // path for imgs
        bgImg: "背景.jpg",    // bg img
        bgimg_s: [1280,800],       
        //dzbgImg: "icon_file橢圓.png", // drop zone bg img
        dzbgImg: "file_橢圓.png", // drop zone bg img
        dzbi_s: [52,52],    // drop zone bg img size        
        dzimg_s: [31,30],   // drop zone center img size
        cImgName: "logo_Gununets.png",  // center img to show logo.
        cImg_s: [266,81],    // center img size
        stbgImg: "浮動視窗.png",    // bg img for the area to show tags.
        stbgImg_s: [1111,588],
        clzTagDivImg: "icon_close.png",
        clzTagDivImg_s: [19,19],
        tagDelImg: "icon_delete.png",
        tagDelImg_s: [20,26],
        ImgName: [ "icon_arrow_open.png", "icon_arrow_close.png", "icon_windows.png", "icon_tag.png", "icon_zoom in.png", 
                    "icon_-.png", "icon_menu.png", "icon_tag_L.png", "icon_tag_R.png"],
        Img_s: [ [12,28], [15,28], [24,22], [23,26], [25,24], 
                 [25,25], [25,25], [28,37], [28,37] ],
        Img_t: [ "Open Right Menu", "Close Menu", "Full Screen", "My Favorites", "Zoom In", 
                    "Zoom Out", "Other Functions", "Add Left Page to My Favorites", "Add Right Page to My Favorites" ],
        iconTop: 20,    // top value of 1st icon
        iconYshft: 20,  // y shft value for icons
        rMenuBgcolor: "#6a3906",    // right menu bg color
        tagXshft: 3,
        tagYshft: 3,
    },
    {
        dz_pos: [20,15],    // position for drop zone
        path: "./img/book(切圖)-assets 2/",   // path for imgs 
        bgImg: "底圖.jpg",    // bg img
        bgimg_s: [1280,800],       
        dzbgImg: "icon_file橢圓.png", // drop zone bg img
        dzbi_s: [52,52],    // drop zone bg img size        
        dzimg_s: [31,30],   // drop zone center img size
        cImgName: "logo_Gurunets.png",  // center img to show logo.
        cImg_s: [437,125],    // center img size
        stbgImg: "浮動視窗.jpg",    // bg img for the area to show tags.
        stbgImg_s: [1121,598],
        clzTagDivImg: "icon_close.png",
        clzTagDivImg_s: [19,19],
        tagDelImg: "icon_delete.png",
        tagDelImg_s: [26,32],        
        ImgName: [ "icon_arrow_open.png", "icon_arrow_close.png", "icon_windows.png", "icon_tag.png", "icon_zoom-in.png", 
                    "icon_zoom-out.png", "icon_menu.png", "icon_tag_L.png", "icon_tag_R.png"],
        Img_s: [ [12,28], [15,28], [24,22], [23,26], [25,24], 
                 [25,25], [25,25], [28,37], [28,37] ],
        Img_t: [ "Open Right Menu", "Close Menu", "Full Screen", "My Favorites", "Zoom In", 
                    "Zoom Out", "Other Functions", "Add Left Page to My Favorites", "Add Right Page to My Favorites" ],
        iconTop: 20,    // top value of 1st icon
        iconYshft: 20,  // y shft value for icons
        rMenuBgcolor: "#6a3906",    // right menu bg color
        tagXshft: 3,
        tagYshft: 3,
    },
    {
        dz_pos: [20,15],    // position for drop zone
        path: "./img/網頁(簡約綠)-1280_800切圖/",   // path for imgs 
        bgImg: "white",    // bg img: 
        bgimg_s: [1280,800],       
        dzbgImg: "file_橢圓.png", // drop zone bg img
        dzbi_s: [52,52],    // drop zone bg img size        
        dzimg_s: [31,30],   // drop zone center img size
        cImgName: "logo_green.jpg",  // center img to show logo.
        cImg_s: [259,73],    // center img size
        stbgImg: "浮動視窗.png",    // bg img for the area to show tags.
        stbgImg_s: [1121,598],
        clzTagDivImg: "icon_close.png",
        clzTagDivImg_s: [19,19],
        tagDelImg: "icon_delete.png",
        tagDelImg_s: [26,32],                  
        ImgName: [ "icon_arrow_open.png", "icon_arrow_close.png", "icon_windows.png", "icon_tag.png", "icon_zoom in.png", 
                    "icon_-.png", "icon_menu.png", "icon_tag_L.png", "icon_tag_R.png"],
        Img_s: [ [12,28], [15,28], [24,22], [23,26], [25,24], 
                 [25,25], [25,25], [28,37], [28,37] ],
        Img_t: [ "Open Right Menu", "Close Menu", "Full Screen", "My Favorites", "Zoom In", 
                    "Zoom Out", "Other Functions", "Add Left Page to My Favorites", "Add Right Page to My Favorites" ],
        iconTop: 20,    // top value of 1st icon
        iconYshft: 20,  // y shft value for icons
        rMenuBgcolor: "#b7db3a",    // right menu bg color
        tagXshft: 3,
        tagYshft: 3,
    },
    {
        dz_pos: [20,15],    // position for drop zone
        path: "./img/其他樣板背景/",   // path for imgs 
        bgImg: "科技黑/背景黑.jpg",    // bg img: 
        bgimg_s: [1280,800],       
        dzbgImg: "科技黑/icon_file橢圓_科技黑用.png", // drop zone bg img
        dzbi_s: [52,52],    // drop zone bg img size        
        dzimg_s: [31,30],   // drop zone center img size
        cImgName: "科技黑/logo-科技黑.png",  // center img to show logo.
        cImg_s: [454,144],    // center img size
        stbgImg: "浮動視窗.png",    // bg img for the area to show tags.
        stbgImg_s: [1121,598],
        clzTagDivImg: "icon_close.png",
        clzTagDivImg_s: [19,19],
        tagDelImg: "icon_delete.png",
        tagDelImg_s: [26,32],                  
        ImgName: [ "icon_arrow_open.png", "icon_arrow_close.png", "icon_windows.png", "icon_tag.png", "icon_zoom in.png", 
                    "icon_-.png", "icon_menu.png", "icon_tag_L.png", "icon_tag_R.png"],
        Img_s: [ [12,28], [15,28], [24,22], [23,26], [25,24], 
                 [25,25], [25,25], [28,37], [28,37] ],
        Img_t: [ "Open Right Menu", "Close Menu", "Full Screen", "My Favorites", "Zoom In", 
                    "Zoom Out", "Other Functions", "Add Left Page to My Favorites", "Add Right Page to My Favorites" ],
        iconTop: 20,    // top value of 1st icon
        iconYshft: 20,  // y shft value for icons
        rMenuBgcolor: "#55c1ea",    // right menu bg color
        tagXshft: 3,
        tagYshft: 3,
    },
    {
        dz_pos: [20,15],    // position for drop zone
        path: "./img/其他樣板背景/",   // path for imgs 
        bgImg: "童話紫/背景_紫.jpg",    // bg img: 
        bgimg_s: [1280,800],       
        dzbgImg: "童話紫/file_橢圓.png", // drop zone bg img
        dzbi_s: [52,52],    // drop zone bg img size        
        dzimg_s: [31,30],   // drop zone center img size
        cImgName: "童話紫/logo_紫.png",  // center img to show logo.
        cImg_s: [454,144],    // center img size
        stbgImg: "浮動視窗.png",    // bg img for the area to show tags.
        stbgImg_s: [1121,598],
        clzTagDivImg: "icon_close.png",
        clzTagDivImg_s: [19,19],
        tagDelImg: "icon_delete.png",
        tagDelImg_s: [26,32],                  
        ImgName: [ "icon_arrow_open.png", "icon_arrow_close.png", "icon_windows.png", "icon_tag.png", "icon_zoom in.png", 
                    "icon_-.png", "icon_menu.png", "icon_tag_L.png", "icon_tag_R.png"],
        Img_s: [ [12,28], [15,28], [24,22], [23,26], [25,24], 
                 [25,25], [25,25], [28,37], [28,37] ],
        Img_t: [ "Open Right Menu", "Close Menu", "Full Screen", "My Favorites", "Zoom In", 
                    "Zoom Out", "Other Functions", "Add Left Page to My Favorites", "Add Right Page to My Favorites" ],
        iconTop: 20,    // top value of 1st icon
        iconYshft: 20,  // y shft value for icons
        rMenuBgcolor: "#662986",    // right menu bg color
        tagXshft: 3,
        tagYshft: 3,
    },
    {
        dz_pos: [20,15],    // position for drop zone
        path: "./img/其他樣板背景/",   // path for imgs 
        bgImg: "天空藍/背景_天空藍.jpg",    // bg img: 
        bgimg_s: [1280,800],       
        dzbgImg: "天空藍/file_橢圓.png", // drop zone bg img
        dzbi_s: [52,52],    // drop zone bg img size        
        dzimg_s: [31,30],   // drop zone center img size
        cImgName: "天空藍/logo_天空藍.png",  // center img to show logo.
        cImg_s: [454,144],    // center img size
        stbgImg: "浮動視窗.png",    // bg img for the area to show tags.
        stbgImg_s: [1121,598],
        clzTagDivImg: "icon_close.png",
        clzTagDivImg_s: [19,19],
        tagDelImg: "icon_delete.png",
        tagDelImg_s: [26,32],                  
        ImgName: [ "icon_arrow_open.png", "icon_arrow_close.png", "icon_windows.png", "icon_tag.png", "icon_zoom in.png", 
                    "icon_-.png", "icon_menu.png", "icon_tag_L.png", "icon_tag_R.png"],
        Img_s: [ [12,28], [15,28], [24,22], [23,26], [25,24], 
                 [25,25], [25,25], [28,37], [28,37] ],
        Img_t: [ "Open Right Menu", "Close Menu", "Full Screen", "My Favorites", "Zoom In", 
                    "Zoom Out", "Other Functions", "Add Left Page to My Favorites", "Add Right Page to My Favorites" ],
        iconTop: 20,    // top value of 1st icon
        iconYshft: 20,  // y shft value for icons
        rMenuBgcolor: "#3052f1",    // right menu bg color
        tagXshft: 3,
        tagYshft: 3,
    },
    {
        dz_pos: [20,15],    // position for drop zone
        path: "./img/其他樣板背景/",   // path for imgs 
        bgImg: "變形蟲/背景_變形蟲.jpg",    // bg img: 
        bgimg_s: [1280,800],       
        dzbgImg: "變形蟲/file_橢圓.png", // drop zone bg img
        dzbi_s: [52,52],    // drop zone bg img size        
        dzimg_s: [31,30],   // drop zone center img size
        cImgName: "變形蟲/logo_變形蟲.png",  // center img to show logo.
        cImg_s: [454,144],    // center img size
        stbgImg: "浮動視窗.png",    // bg img for the area to show tags.
        stbgImg_s: [1121,598],
        clzTagDivImg: "icon_close.png",
        clzTagDivImg_s: [19,19],
        tagDelImg: "icon_delete.png",
        tagDelImg_s: [26,32],                  
        ImgName: [ "icon_arrow_open.png", "icon_arrow_close.png", "icon_windows.png", "icon_tag.png", "icon_zoom in.png", 
                    "icon_-.png", "icon_menu.png", "icon_tag_L.png", "icon_tag_R.png"],
        Img_s: [ [12,28], [15,28], [24,22], [23,26], [25,24], 
                 [25,25], [25,25], [28,37], [28,37] ],
        Img_t: [ "Open Right Menu", "Close Menu", "Full Screen", "My Favorites", "Zoom In", 
                    "Zoom Out", "Other Functions", "Add Left Page to My Favorites", "Add Right Page to My Favorites" ],
        iconTop: 20,    // top value of 1st icon
        iconYshft: 20,  // y shft value for icons
        rMenuBgcolor: "#6a3e38",    // right menu bg color
        tagXshft: 3,
        tagYshft: 3,
    }
];
var sublayoutDB = [
    {
        path: "./img/book(切圖)-assets 2/menu-for介面切換用/",
        ImgName: [ "icon_exchange.png", "icon_print.png", "icon_share.png", "icon_arrow_close.png" ],
        Img_s: [ [28,25], [28,31], [28,21], [23,44] ],
        Img_t: [ "Change Theme", "Print a Page", "Share with Your Friends", "Close Menu" ],
        clzThemeDivImg: "icon_close.png",
        clzThemeDivImg_s: [28,28],
        chThemeBgImg: "浮動視窗-介面切換.jpg",
        chThemeBgImg_s: [428,598],
        chThemeChImg: "icon_check.png",
        chThemeChImg_s: [23,23],
        chThemeSeImg: "icon_check-ok.png",    //change theme close icon
        chThemeSeImg_s: [23,23],
        themeTop: 10,
        themeYshft: 3,    
    }
];

var rrmenu = document.getElementById("rrightMenu");
var ctImg = document.getElementById("changetheme_Img");
var prImg = document.getElementById("print_Img");
var shImg = document.getElementById("share_Img");
var csmImg = document.getElementById("closesubmenu_Img");
var allsubicons = [ctImg, prImg, shImg, csmImg];   //Must correspond to ImgName
function doSubLayout() {
    var imset0 = layoutDB[layoutIndex];
    var imset1 = sublayoutDB[layoutIndex];
    var impath = imset1.path;
    
    rrmenu.style.backgroundColor = imset0.rMenuBgcolor;
    rrmenu.style.width = rmenu.style.width;
    rrmenu.style.height = rmenu.style.height;
    rrmenu.style.left = rmenu.style.left;

    for (i=0; i<allsubicons.length; i++) {
        var te = allsubicons[i];
        if (i==(allsubicons.length-1)) {
            te.src = imset0.path + imset0.ImgName[1];
        } else {
            te.src = impath + imset1.ImgName[i];
            te.width = imset1.Img_s[i][0];
            te.height = imset1.Img_s[i][1];
        }        
        te.title = imset1.Img_t[i];
        te.alt = imset1.Img_t[i];
    }

    var chkAllIconsLoaded2 = function() {
        console.log("Enter doSubLayout");
        var flag = true;
        for (i = 0; i < allsubicons.length; i++) {
            if (allsubicons[i].width == 0) {
                flag = false;
                break;
            }
        }
        if (flag) {
            setPosition2();
            rmenu.style.display = "none";
            rrmenu.style.display = "block";
        } else {
            cimgts2 = setTimeout(chkAllIconsLoaded2, 100);        
        }
    }   
    cimgts2 = setTimeout(chkAllIconsLoaded2, 100);    
}
var ctdiv = document.getElementById("changeTheme");
function createInnerHTMLofShowTheme() {
    var imset1 = sublayoutDB[layoutIndex];
    var impath = imset1.path;
    var ctw = (imset1.chThemeBgImg_s[0]), cth = (imset1.chThemeBgImg_s[1]);
    ctdiv.style.backgroundImage = "url('"+impath + imset1.chThemeBgImg +"')";
    ctdiv.style.backgroundSize = ctw+"px "+cth+"px";
    ctdiv.style.width = ctw+"px";
    ctdiv.style.height = cth+"px";
    var rml = rmenu.style.left;
    ctdiv.style.left = (parseInt(rml.substring(0,rml.length-2)) - ctw - 50)+"px";
    ctdiv.style.top = ((window.innerHeight - cth)/2)+"px";
    
    var ctDivImg = document.getElementById("closeThemeDivImg");
    ctDivImg.src = impath + imset1.clzThemeDivImg;
    ctDivImg.style.left = "12px";
    ctDivImg.style.top = "10px";
    var ctindiv = document.getElementById("cTInnerDiv"), ctiw = (ctw-40), ctih = (cth-20);
    ctindiv.style.width = ctiw+"px";
    ctindiv.style.height = ctih+"px";
    ctindiv.style.left = "15px";
    ctindiv.style.top = "10px";

    var ihtml = "", topv = 0, leftv = 0, yshft = imset1.themeYshft, tDB, tDB2;
    var th = Math.floor(ctih/3), tw = 0;
    for (i=0; i<layoutDB.length; i++) {
        tDB = layoutDB[i];
        tDB2 = sublayoutDB[i];
        whf = tDB.bgimg_s[0]/tDB.bgimg_s[1]; 
        tw = Math.floor(th*whf);
        leftv = Math.floor((ctiw-tw)/2);
        ihtml += "<div class='theme' id='theme"+i+"' style=\"position:absolute; width:"+tw+"px; height:"+th+"px; "+
                 "top:"+topv+"px; left:"+leftv+"px;";
        if (tDB.bgImg.indexOf(".")!=-1) {
            ihtml += "\">  <img id='theme"+i+"_img1' src='"+tDB.path+tDB.bgImg+"' style='position:absolute; top:0px; left:0px; z-index: 11;' width='"+(tw-2)+"px' height='"+(th-2)+"px' >";        
        } else {
            ihtml += " background-color: "+tDB.bgImg+";\">";
        }
        ssize=(th/tDB.bgimg_s[1]);
        ciw = tDB.cImg_s[0]*ssize;
        cih = tDB.cImg_s[1]*ssize;
        ihtml += "  <img id='theme"+i+"_img3' src='"+tDB.path+tDB.cImgName+"' style='position:absolute; top:"+
                    ((th-cih)/2)+"px; left:"+((tw-ciw)/2)+"px; width:"+ciw+"px; height:"+cih+"px; z-index: 12;'>";
        var iw = tDB2.chThemeSeImg_s[0], ih = tDB2.chThemeSeImg_s[1];
        if (i==layoutIndex) {
            ihtml += "  <img id='theme"+i+"_img2' src='"+tDB2.path+tDB2.chThemeSeImg+"' style='position:absolute; top:"+
                    (th-ih-5)+"px; left:"+(tw-iw-5)+"px; width:"+iw+"px; height:"+ih+"px; z-index: 12;'>";
        } else {
            ihtml += "  <img id='theme"+i+"_img2' src='"+tDB2.path+tDB2.chThemeChImg+"' style='position:absolute; top:"+
                    (th-ih-5)+"px; left:"+(tw-iw-5)+"px; width:"+iw+"px; height:"+ih+"px; z-index: 12;' onclick='changeTheme(this,"+i+");'>";
        }
        ihtml += "</div>"; 
        topv += (th+yshft);
    }
    ctindiv.innerHTML = ihtml;
}
function changeTheme(imgele, theme_index) {
    layoutIndex = theme_index;
    createInnerHTMLofShowTheme();
    onResize(false);
}
function setPosition2() {
    var sw = window.innerWidth, sh = window.innerHeight;
    var imset0 = layoutDB[layoutIndex];
    var imset = sublayoutDB[layoutIndex];
    for (i = 0; i < allsubicons.length; i++) {
        var se = allsubicons[i], ti, ts, th;
        ts = rrmenu.style.width;
        tw = parseInt(ts.substring(0,ts.length-2));
        se.style.position = "absolute";
        if (se.className=="ctImg") {
            se.style.top = (imset0.iconTop)+"px";
            se.style.left = ((tw-se.width)/2)+"px"; 
        } else if (se.className=="csmImg") {
            se.style.top = (sh-se.height-10)+"px";
            se.style.left = "5px";
        } else {
            ti = allsubicons[i-1];
            ts = ti.style.top;
            th = parseInt(ts.substring(0,ts.length-2))+ti.height;
            se.style.top = Math.ceil(th+imset0.iconYshft)+"px";
            if (se.className=="prImg") {
                se.style.left = ((tw-se.width)/2)+"px";
            } else if (se.className=="shImg") {
                se.style.left = ((tw-se.width)/2-2)+"px";
            }        
        }
    }
}
function showThemes() {
    if (ctdiv.style.display != "none") {
        ctdiv.style.display = "none";
    } else {
        var imset = sublayoutDB[layoutIndex];
        createInnerHTMLofShowTheme();
        ctdiv.style.display = "block";
    }
}
function printImg() {
    window.print();
    //alert("Print a Page or two Pages at the same time.");
}
function shareWithFriends() {
    alert("[Customized Function] Share with Friends.");
}
function closeSubMenu() {
    rmenu.style.display = "block";
    rrmenu.style.display = "none";    
}

var body = document.getElementById("body");
var bIpath = null;
var dz = document.getElementById("drop_zone");
var cImg = document.getElementById("center_img");
var rmenu = document.getElementById("rightMenu");
var fsImg = document.getElementById("fullscreen_Img");
var mfImg = document.getElementById("myfavorite_Img");
var ziImg = document.getElementById("zoomin_Img"); 
var zoImg = document.getElementById("zoomout_Img");
var otImg = document.getElementById("others_Img");
var cmImg = document.getElementById("closemenu_Img");
var omImg = document.getElementById("openmenu_Img");
var ltImg = document.getElementById("lefttag_Img");
var rtImg = document.getElementById("righttag_Img");
var allicons = [omImg, cmImg, fsImg, mfImg, ziImg, zoImg, otImg, ltImg, rtImg];   //Must correspond to ImgName
var cimgts, cimgts2, isSafe2zoom;
function doLayout(sw,sh) {
    var imset = layoutDB[layoutIndex];
    var impath = imset.path;        
    bIpath = impath + imset.bgImg;
    //body.background = "url('"+bIpath+"');";
    body.background = bIpath;
    /*var tsw=sw, tsh=sh;
    if ( (sw < imset.bgimg_s[0])||(sh < imset.bgimg_s[1]) ) {
        var wf = (sw/imset.bgimg_s[0]), hf = (sh/imset.bgimg_s[1]);
        if (wf < hf) {  // 以 w 為主，因為 width 更小
            tsw = sw;
            tsh = wf*imset.bgimg_s[1];
        } else {
            tsh = sh;
            tsw = hf*imset.bgimg_s[0];
        }
    }
    tsw = 100; tsh = 62.5;*/
    //body.backgroundSize = tsw+"px "+tsh+"px";
    //body.backgroundSize = "1280px 800px";
    //console.log("body.backgroundSize: "+tsw+","+tsh);
    
    dz.style.backgroundImage = "url('"+ impath + imset.dzbgImg +"')";
    dz.style.backgroundSize = imset.dzbi_s[0]+"px "+imset.dzbi_s[1]+"px";
    dz.style.width = imset.dzbi_s[0]+"px";
    dz.style.height = imset.dzbi_s[1]+"px";
    dz.style.left = imset.dz_pos[0]+"px";
    dz.style.top = imset.dz_pos[1]+"px";

    var dzImg = document.getElementById("dzImg");
    dzImg.src = impath + "icon_file.png";
    dzImg.width = imset.dzimg_s[0];
    dzImg.height = imset.dzimg_s[1];
    dzImg.onload = function(e) {
        dzImg = e.srcElement;
        var dz = dzImg.parentElement;
        dzImg.style.top = ((parseInt(dz.style.height.substring(0,2)) - dzImg.height)/2)+"px";
        dzImg.style.left = (parseInt(dz.style.height.substring(0,2))/2 - dzImg.height/1.5)+"px";
    };
    dz.alt = dz.title = dzImg.alt = dzImg.title = "Drag & Drop Image Files Here";

    cImg.src = impath + imset.cImgName;
    cImg.onload = function(e) {
        cImg = e.srcElement;
        cImg.style.left = ((sw-cImg.width)/2)+"px";
        cImg.style.top = ((sh-cImg.height)/2)+"px";
        //console.log("cImg.style.left="+cImg.style.left);
    }
    var mw = (parseInt(imset.Img_s[imset.Img_s.length-1][0])+5);
    
    rmenu.style.backgroundColor = imset.rMenuBgcolor;
    rmenu.style.width = (mw+"px");
    rmenu.style.height = (sh+"px");
    rmenu.style.left = (sw-mw)+"px";

    for (i=0; i<allicons.length; i++) {
        var te = allicons[i];
        te.src = impath + imset.ImgName[i];
        te.width = imset.Img_s[i][0];
        te.height = imset.Img_s[i][1];
        te.title = imset.Img_t[i];
        te.alt = imset.Img_t[i];
    }

    var chkAllIconsLoaded = function() {
        console.log("Enter doLayout");
        var flag = true;
        for (i = 0; i < allicons.length; i++) {
            if (allicons[i].width == 0) {
                flag = false;
                break;
            }
        }
        if (flag) {
            console.log("chkAllIconsLoaded: "+cimgts);
            setPosition(sw,sh);
            isSafe2zoom = true;
        } else {
            setTimeout(chkAllIconsLoaded, 100);
        }
    }
    isSafe2zoom = false;   
    cimgts = setTimeout(chkAllIconsLoaded, 100);
}
var mfdiv = document.getElementById("myFavos");
function createInnerHTMLofShowTags() {
    var imset1 = layoutDB[layoutIndex];
    var impath = imset1.path;
    var ctw = (imset1.stbgImg_s[0]), cth = (imset1.stbgImg_s[1]);
    mfdiv.style.backgroundImage = "url('"+ impath + imset1.stbgImg +"')";
    mfdiv.style.backgroundSize = ctw+"px "+cth+"px";
    mfdiv.style.width = ctw+"px";
    mfdiv.style.height = cth+"px";
    mfdiv.style.left = ((window.innerWidth - ctw)/2)+"px";
    mfdiv.style.top = ((window.innerHeight - cth)/2)+"px";
    
    var mfdivImg = document.getElementById("closemFDivImg");
    mfdivImg.src = impath + imset1.clzTagDivImg;
    mfdivImg.style.left = "12px";
    mfdivImg.style.top = "10px";
    var mfindiv = document.getElementById("mFInnerDiv"), ctiw = (ctw-200), ctih = (cth-30);
    var xshft = imset1.tagXshft, yshft = imset1.tagYshft;
    mfindiv.style.width = ctiw+"px";
    mfindiv.style.height = ctih+"px";
    mfindiv.style.left = ((ctw-ctiw)/2)+"px";
    mfindiv.style.top = ((cth-ctih)/2)+"px";

    var ihtml = "", topv = 0, leftv = 0;
    var th = Math.floor(ctih/2-2), tw = Math.floor(sA[0]*(th/sA[1]));
	var tdw = imset1.tagDelImg_s[0], tdh = imset1.tagDelImg_s[1];

    for (i=0; i<myFavArray.length; i++) {
        ihtml += "<div class='tag' id='tag"+i+"' style=\"position:absolute; width:"+tw+"px; height:"+th+"px; "+
                 "top:"+topv+"px; left:"+leftv+"px;\">";
        ihtml += "  <img id='tag"+i+"_img1' src='"+imgPath+biA[myFavArray[i]]+"' style='position:absolute; top:0px; left:0px; z-index: 11;'"+ 
                 "width='"+(tw-2)+"px' height='"+(th-2)+"px' >";
        ihtml += "  <img id='tag"+i+"_img2' src='"+impath+imset1.tagDelImg+"' style='position:absolute; top:"+(th-tdh-5)+"px; left:"+(tw-tdw-5)+
                 "px; z-index: 11;' width='"+(tdw)+"px' height='"+(tdh)+"px' onclick='delTag(this);'>";
        ihtml += "</div>"; 
        leftv += (tw+xshft);
        if (leftv > (ctiw-tw)) {
            leftv = 0;
            topv += (th + yshft);
        }
    }
    mfindiv.innerHTML = ihtml;
}

function delTag(sE) {
    var id = sE.id, tind = parseInt(id.substring(3,10));
    myFavArray.splice(tind, 1);    //index, howmany, item1, item2, ..... => index & howmany: delete howmany items from index; itemX: items to add.
    createInnerHTMLofShowTags();
}

var myFavArray = [];
function doTag(isLeft) {
    var tagimInd = imInd;
    if (isLeft) {
        if (tagimInd > 0) {
            tagimInd--;
        } else {
            return;
        }
    }
    var bingo=false;
    for (i=0; i<myFavArray.length; i++) {
        if (myFavArray[i]==tagimInd) {
            bingo=true;
            alert("This page was already added before.")
            break;
        }
    }
    if (!bingo) {
        myFavArray[myFavArray.length] = tagimInd;
        myFavArray.sort(function(a, b){return a-b});
        alert("Add this page successfully.")
    }
}

function openMenu() {
    omImg.style.display = "none";
    rmenu.style.display = "block";
    //alert("openMenu:"+rmenu.style.display);
}

function closeMenu() {
    rmenu.style.display = "none";
    omImg.style.display = "block";    
}

var isFullScreenMode = false, ziCnt=0;
function fullScreen() {
    console.log("Enter fullscreen()");
    
    if (document.fullscreenEnabled || 
        document.webkitFullscreenEnabled || 
        document.mozFullScreenEnabled ||
        document.msFullscreenEnabled) 
    {
        $("body").off("onResize");

        var id2fullscreen = "html", i = document.getElementById(id2fullscreen);
        if (document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement)
        {
            // exit full-screen
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            isFullScreenMode = false;
        } else {
            // go full-screen
            if (i.requestFullscreen) {
                i.requestFullscreen();
            } else if (i.webkitRequestFullscreen) {
                i.webkitRequestFullscreen();
            } else if (i.mozRequestFullScreen) {
                i.mozRequestFullScreen();
            } else if (i.msRequestFullscreen) {
                i.msRequestFullscreen();
            }
            isFullScreenMode = true;
        }
        //chk_zoomToMax();  // Do in onResize()
    }
}
function chk_zoomToMax(){
    if (isFullScreenMode) {
        if (!isSafe2zoom) {
            setTimeout(chk_zoomToMax, 100);
        } else {
            if ( ((sX+sA[0])<=(window.innerWidth-50))&&((sY+sA[1])<=(window.innerHeight-20)) ) {
                bC.style.display = "none";
                console.log((sX+sA[0])+","+window.innerWidth+","+(sY+sA[1])+","+window.innerHeight);
                doZoom(true);
                ziCnt++;
                setTimeout(chk_zoomToMax, 100);
            } else {
                doZoom(true, true);
                bC.style.display = "block";
                //setTimeout(function(){ body.addEventListener("resize",onResize(true));}, 3000);
            }
        }
    } else {
        /*if (!isSafe2zoom) {
            setTimeout(chk_zoomToMax, 100);
        } else {
            if ( ziCnt>0 ) {
                console.log((sX+sA[0])+","+window.innerWidth+","+(sY+sA[1])+","+window.innerHeight);
                doZoom(false);
                ziCnt--;
                setTimeout(chk_zoomToMax, 100);
            } else {
                //setTimeout(function(){ body.addEventListener("resize",onResize(true));}, 3000);
            }
        }*/
    }
}
function myFavorites() {
    var allitems = "";
    for (i=0; i<myFavArray.length; i++) {
        allitems += myFavArray[i] + ",";
    }
    console.log(allitems);
    if (myFavArray.length==0) {
        console.log("No Page in My Favoriates Yet.");
        //return;
    }
    if (mfdiv.style.display != "none") {
        mfdiv.style.display = "none";
    } else {
        createInnerHTMLofShowTags();
        mfdiv.style.display = "block";
    }
    
}
function othersMenu() {
    doSubLayout();
}
function doZoom(isIn, showAtLastCall) {
    sw = window.innerWidth, sh = window.innerHeight;
    var factor = sA[1]/sA[0], yShft = (zoomShft*factor);

    if (isIn) {
        sA[0] += zoomShft;
        sA[1] += yShft;
    } else {
        if ((sA[0]<(sw/6))||(sA[1]<(sh/6))) {
            return;
        }
        sA[0] -= zoomShft;
        sA[1] -= (zoomShft*factor);
    }
    if (showAtLastCall) {
        setRighPageOri(sw,sh);
        onResize(false);
    }
}

function setPosition(sw,sh) {
    var imset = layoutDB[layoutIndex];
    for (i = 0; i < allicons.length; i++) {
        var se = allicons[i], ti, ts, th;
        ts = rmenu.style.width;
        tw = parseInt(ts.substring(0,ts.length-2))
        se.style.position = "absolute";
        if (se.className=="fsImg") {
            se.style.top = (imset.iconTop)+"px";
        } else if (se.className=="cmImg") {
            se.style.top = (sh-se.height-10)+"px";
            se.style.left = "5px";
            continue;
        } else if (se.className=="omImg") {
            se.style.top = (sh-se.height-10)+"px";
            se.style.left = (sw-se.width-5)+"px";
            continue;
        } else if ( (se.className=="ltImg")||(se.className=="rtImg") ) {
            var tl = dz.style.top;
            se.style.top = (parseInt(tl.substring(0,tl.length-2))+10)+"px";
            tl = dz.style.left;
            var dzw = dz.style.width, dzwi = parseInt(dzw.substring(0,dzw.length-2));
            if (se.className=="ltImg") {
                se.style.left = parseInt(tl.substring(0,tl.length-2))+dzwi+10+"px";
            } else {
                se.style.left = sw-(parseInt(tl.substring(0,tl.length-2))+dzwi+se.width+10)+"px";
            }
            se.disabled = true;          
            continue;
        } else {
            ti = allicons[i-1];
            ts = ti.style.top;
            th = parseInt(ts.substring(0,ts.length-2))+ti.height;
            se.style.top = Math.ceil(th+imset.iconYshft)+"px";        
        }
        se.style.left = ((tw-se.width)/2)+"px"; //se's parent is already set absolute; so not Math.ceil(sw-(th+se.width)/2)+"px";
        //console.log(se.style.left+","+se.style.top);
        //se.style.left = 500+"px";
    }
}

function setRighPageOri(sw,sh) {
    if (debugMode) {    // for debug;
        sY = Math.floor(sh / 2 - sA[1] / 2.1); 
        sX = Math.floor(sw / 2 - sA[0] / 1.5);
    } else {
        sY = Math.floor(sh / 2 - sA[1] / 2); 
        sX = Math.floor(sw / 2);
    }
}

function showBookViewer() {
    var sw = window.innerWidth, sh = window.innerHeight;

    //dZ = document.getElementById("dz_table");
    //dZ.style["z-index"] = -99;

    setRighPageOri(sw,sh);  //must be before doLayout since sY will be used in doLayout.
    doLayout(sw,sh);
    
    console.log("(sw,sh)="+sw+","+sh+",(sX,sY)="+sX+","+sY);
}

function onResize(hResize) {
        if (hResize) {
            oLfunc();
        } else {
            oLfuncNohandleResize();
        }
        
        if (imInd >= 0) {
            allpl[0].width = allpl[0].width; 
            var ctx2 = allpl[0].getContext('2d');
            var pe = [sX+sA[0],sY+sA[1]];
            var p1 = [sX, sY];
            ctx2.drawImage(allpi[imInd%allpi.length], sX, sY, sA[0], sA[1]);
            if (imInd>0) {
                ctx2.drawImage(allpi[(imInd-1)%allpi.length], sX-sA[0], sY, sA[0], sA[1]);
            }
            if ( (imInd > 0) && (imInd < (imCnt-1)) ) {
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
            if ( (imInd+1) < imCnt) {
                var ctx2 = allpl[1].getContext('2d');
                ctx2.drawImage(allpi[(imInd+1)%allpi.length], sX, sY, sA[0], sA[1]);
            }        
            if ( (imInd+2) < imCnt) {
                var ctx2 = allpl[2].getContext('2d');
                ctx2.drawImage(allpi[(imInd+2)%allpi.length], sX, sY, sA[0], sA[1]);
            }        
        }
        handleRpgN2();

        chkMenuDisplay();

        if (hResize && isFullScreenMode) {  // for closing the print window in print function of rrmenu.
            chk_zoomToMax();
        }
}

function chkMenuDisplay() {
    var tDB = layoutDB[layoutIndex];
    var tDB2 = sublayoutDB[layoutIndex];
    var impath1 = tDB.path;
    var impath2 = tDB2.path;

    if (rmenu.style.display != "none") {
        rmenu.style.backgroundColor = tDB.rMenuBgcolor;
    }
    if (rrmenu.style.display != "none") {
        rrmenu.style.backgroundColor = tDB.rMenuBgcolor;
    }
    if (ctdiv.style.display != "none") {
        ctdiv.style.backgroundImage = "url('"+ impath2 + tDB2.chThemeBgImg +"')";
    }
    if (mfdiv.style.display != "none") {
        mfdiv.style.backgroundImage = "url('"+ impath2 + tDB2.stbgImg +"')";
    }

}

function Maximize() 
{
    window.innerWidth = screen.width;
    window.innerHeight = screen.height;
    window.screenX = 0;
    window.screenY = 0;
    alwaysLowered = false;
}

function oLfuncNohandleResize() {
        showBookViewer();

        shaCfg.spw = 50; //Math.floor(sA[0] * shaCfg.widPer);
        shaCfg.rect = [[sX, sY, shaCfg.spw, sA[1]],
            [sX - shaCfg.spw, sY, shaCfg.spw, sA[1]]];
        shaCfg.grd = [[sX, sY, sX + shaCfg.spw, sY],
            [sX - shaCfg.spw, sY, sX, sY]];

        canPos.c_b = [sX, sY, sA[0], sA[1]];
        canPos.pgs = [sX + (sA[0] - sA[2]) / 2, sY + (sA[1] - sA[3]) / 2, sA[2], sA[3]];
}

function oLfunc() {
        sA = handleResize(i0);
        oLfuncNohandleResize();
}

var dropZone;
var demoMode = false;
function onLoad() {
    //Maximize();
    //debugger
    //input.value = dirpath;
    //window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
    //window.requestFileSystem(window.TEMPORARY, 1024*1024, onInitFs, errorHandler);
    $("canvas").off("onmousedown");
    $("canvas").off("onmousemove");
    $("canvas").off("onmouseup");
    $("img").off("onload");
    
    if (demoMode) {
    	i0.src = imgPath + "cover.jpg";

    } else {    
        // Setup the dnd listeners.
        dropZone = document.getElementById('drop_zone');
        dropZone.addEventListener('dragover', handleDragOver, false);
        dropZone.addEventListener('drop', handleFileSelect, false); 
    }
    i0.onload = function () {
        oLfunc();

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

    if (demoMode) {
    	getImgArray2();
        cImg.style.display = "none";
        ltImg.style.display = "block";
        rtImg.style.display = "block";
        myFavArray = [0,1,2,3,5,7,9,11,12,13,15,17,19];
    } else {
    	doLayout(window.innerWidth,window.innerHeight);
    }
    for (i=0; i<layoutDB.length; i++) {
        if (i >= sublayoutDB.length) {
            sublayoutDB[i] = sublayoutDB[i-1];
        }
    }
};

function getImgArray2() {
    /*var tnArray = ["cover.jpg", "1.jpg", "2.jpg", "3.jpg", "4.jpg", "back"];*/
    var tnArray = ["cover.jpg", "1.jpg", "2.jpg", "3.jpg", "4.jpg", "5", "6", "7", "8", "9", "10",
        "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", 
        "26", "27", "28", "29", "30", "back"];
    //debugger;

    biA = tnArray;

    imCnt = biA.length;
    //bcimg.src = imgPath + biA[0];
    //pgc.innerHTML = imCnt + " images.";
    //output.style["visibility"] = "visible";
    
    isImgArrayLoaded = true;
    //debugger;
    //var url1 = window.URL.createObjectURL(files[0]);               
    //fp.innerHTML = "img/"; //url1.substring(0,url1.lastIndexOf("/"));    
}

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
        clearInterval(i0loadedti);
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
    //bcimg.src = imgPath + biA[0];
    //pgc.innerHTML = imCnt + " images.";
    //output.style["visibility"] = "visible";
    
    isImgArrayLoaded = true;
    //debugger;
    //var url1 = window.URL.createObjectURL(files[0]);               
    //fp.innerHTML = "img/"; //url1.substring(0,url1.lastIndexOf("/"));    
}

function update_imInd(x, y) {
    /*document.getElementById("imInd").innerHTML = "imInd: " + imInd + ", x,y: (" + x + "," + y + ")";
    console.log("Line727: imInd=" + imInd);*/
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
    i0.src = imgPath + "cover.jpg";
    
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; // FileList object.

    getImgArray(files);
    showBookViewer();

    ltImg.style.display = "block";
    rtImg.style.display = "block";
    cImg.style.display = "none";

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

function handleRpgN2() {
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
            
            handleRpgN2();       
        }
        console.log("end of action: imIaft="+imInd+",mS="+mouseState+",OLd="+isOnLpg_d+",ORd="+isOnRpg_d+",OLu="+isOnLpg_u+",ORu="+isOnRpg_u);
        isOnLpg_d = isOnLpg_u = isOnRpg_d = isOnRpg_u = mouseState = null;
        //update_imInd(tarX, tarY);
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
    var tX = event.clientX;
    var tY = event.clientY;

    if (!isImgArrayLoaded) {
        alert("Book images not loaded. Drag them into the dropzone.");
        return;
    }
    if (mouseState != null) {
      return;
    }
    if ( (tX < (sX-sA[0])) || (tX > (sX+sA[0])) || (tY < sY) || (tY > (sY+sA[1])) ) { 
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
    
    dX = tX;
    dY = tY;
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
    var tX = event.clientX, tY = event.clientY;
    
    if ( (mouseState != "0")&&(mouseState != "01") ) {          
      return;
    }
    
    uX = tX, uY = tY;
  
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
        if (uX < sX) {
            dP = [sX - sA[0], sY + sA[1]];
            isOnLpg_u = true;    
        } else {
            dP = [sX + sA[0], sY + sA[1]];
            isOnRpg_u = true;
        }
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
    if ( (imInd != -1) && (imInd < imCnt) && (tx > rxR) && (tx < (sX+sA[0])) && (ty > yR) && (ty < (sY+sA[1])) ) {
        bC.style.cursor = "nw-resize";
    } else  if ( (imInd > 0) && (tx < lxR) && (tx > (sX-sA[0])) && (ty > yR) && (ty < (sY+sA[1]))  ) {
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
    if (!( (isValid[0]&&isValid[1]) || (isValid[1]&&isValid[3]) || (!(isValid[0]||isValid[1]||isValid[2]||isValid[3])) )) {    //prevent sudden disappear
        return;
    }
    bC.width = bC.width;  // **Trick to clear canvas.
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
          ctx2.closePath();
          ctx2.fill();
          ctx2.stroke();
        } else {
            if (bIpath != null) {
                clearGraduallyRpg(ctx2, 0, l1, l2);
            } else {
                ctx2.moveTo(pe[0]+1, pe[1]+1);
                ctx2.lineTo(pe[0] - l1, pe[1]);
                ctx2.lineTo(pe[0]+1, pe[1] - l2);
                ctx2.fillStyle = bgcolor;
                ctx2.strokeStyle = bgcolor;
                ctx2.closePath();
                ctx2.fill();
                ctx2.stroke();                
            }
        }
        
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
                ctx2.closePath();
                ctx2.fill();
                ctx2.stroke();
            } else {
                if (bIpath != null) {
                    clearGraduallyRpg(ctx2, 1, (pe[0]-pbOnTopX), (pe[0]-pbOnBotX));
                } else {
                    ctx2.moveTo(pe[0] + 1, pe[1] +1);
                    ctx2.lineTo(pbOnBotX, pe[1] + 1);
                    ctx2.lineTo(pbOnTopX, sY - 1);
                    ctx2.lineTo(pe[0] + 1, sY - 1);
                    ctx2.fillStyle = bgcolor;
                    ctx2.strokeStyle = bgcolor;
                    ctx2.closePath();
                    ctx2.fill();
                    ctx2.stroke();
                }
            }

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
                ctx2.closePath();
                ctx2.fill();
                ctx2.stroke();
            } else {
                if (bIpath != null) {
                    clearGraduallyRpg(ctx2, 1, (pe[0]-pbOnTopX), (pe[0]-pbOnBotX));
                } else {                
                    ctx2.moveTo(pe[0]+1, pe[1]+1);
                    ctx2.lineTo(pe[0]-l1,pe[1]+1);
                    ctx2.lineTo(pbOnTopX-1, sY-1);
                    ctx2.lineTo(pe[0]+1, sY-1);
                    ctx2.fillStyle=bgcolor;
                    ctx2.strokeStyle = bgcolor;
                    ctx2.closePath();
                    ctx2.fill();
                    ctx2.stroke();
                }
            }

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
    if ( (imInd<(imCnt-2))||( (imInd==(imCnt-2))&&(ofsX>(sX-sA[0])) ) ) {
        doPaintShadow(ctx2, p1, p2, p3, p4);    
    }
}

function clearGraduallyRpg(ctx, sce, l1, l2) {
    if (sce == 0) {
        var tv = Math.tan(Math.atan(l2/l1));
        var stepx = l1/20, cnt = 0, stepx2=1;        
        var stepy = tv*stepx, stepy2 = tv*stepx2;
        if (stepx < 1) {
            stepx = 1;
        }
        tstepx = stepx2; tstepy = stepy2;
        for (i=sX+sA[0]+tstepx,j=sY+sA[1]-l2-1; i>=(sX+sA[0]-l1-stepx);) {
            i-=tstepx;

            ctx.clearRect(i,j,tstepx,l2+stepy);

            /*ctx.moveTo(i,j);
            ctx.lineTo(i,j+l2+stepy);
            ctx.lineTo(i+tstepx,j+l2+stepy);
            ctx.lineTo(i+tstepx,j);
            ctx.closePath;            
            ctx.strokeStyle = "red";
            ctx.stroke();*/

            j+=tstepy;
            if (cnt <= 10) {
                if (cnt == 9) {
                    tstepx = stepx;
                    tstepy = stepy;
                }
            } else {
                if (i<(sX+sA[0]-l1+(2*tstepx))) {
                    tstepx = stepx2;
                    tstepy = stepy2;
                }                
            }
            cnt++;    
        }
    } else if (sce == 1) {
        var sp=l1, ep=l2;
        if (l1 >= l2) {
            sp = l2;
            ep = l1;
        }
        ctx.clearRect(sX+sA[0]+1-sp,sY-1,sp+2,sA[1]+2);
        if (ep != sp) {
            var stepx = (ep-sp)/40;
            var stepy = Math.tan(Math.atan(sA[1]/(ep-sp)))*stepx;
            if (l1 >= l2) {
                for (i=sp,j=0; i<=(ep+stepx); i+=stepx,j+=stepy) {
                    ctx.clearRect(sX+sA[0]-i,sY-1,stepx,sA[1]-j+stepy);
                }
            } else {
                for (i=sp-1,j=0; i<=(ep+stepx); j+=stepy) {
                    i+=stepx;
                    ctx.clearRect(sX+sA[0]-i,sY+j,stepx,sA[1]-j+stepy);
                }
            }
        }
    }
}

function clearGraduallyLpg(ctx, sce, l1, l2) {
    if (sce == 0) {
        var tv = Math.tan(Math.atan(l2/l1));
        var stepx = l1/20, cnt = 0, stepx2=1;        
        var stepy = tv*stepx, stepy2 = tv*stepx2;
        if (stepx < 1) {
            stepx = 1;
        }
        tstepx = stepx2; tstepy = stepy2;
        for (i=-1,j=sY+sA[1]-l2-1; i<=(l1+stepx);) {
            ctx.clearRect(sX-sA[0]+i,j,tstepx,l2+stepy);
            i+=tstepx;
            j+=tstepy;            
            if (cnt <= 10) {
                if (cnt == 9) {
                    tstepx = stepx;
                    tstepy = stepy;
                }
            } else {
                if (i>(l1-(2*tstepx))) {
                    tstepx = stepx2;
                    tstepy = stepy2;
                }                
            }
            cnt++;            
        }
    } else if (sce == 1) {
        var sp=l1, ep=l2;
        if (l1 >= l2) {
            sp = l2;
            ep = l1;
        }
        ctx.clearRect(sX-sA[0]-1,sY-1,sp+2,sA[1]+2);
        if (ep != sp) {
            var stepx = (ep-sp)/40;
            var stepy = Math.tan(Math.atan(sA[1]/(ep-sp)))*stepx;
            if (l1 >= l2) {
                for (i=sp,j=0; i<=(ep+stepx); i+=stepx,j+=stepy) {
                    ctx.clearRect(sX-sA[0]+i,sY-1,stepx,sA[1]-j+stepy);
                }
            } else {
                for (i=sp,j=-1; i<=(ep+stepx); i+=stepx,j+=stepy) {
                    ctx.clearRect(sX-sA[0]+i,sY+j,stepx,sA[1]-j+stepy);
                }
            }
        }
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
    if (!( (isValid[0]&&isValid[1]) || (isValid[1]&&isValid[3]) || (!(isValid[0]||isValid[1]||isValid[2]||isValid[3])) )) {    //prevent sudden disappear
        return;
    }
    
    bC.width = bC.width;  // **Trick to clear canvas.
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
          ctx2.closePath();
          ctx2.fill();
          ctx2.stroke();                    
        } else {
            if (bIpath != null) {
                clearGraduallyLpg(ctx2, 0, l1, l2);
            } else {
                ctx2.moveTo(pe[0]-1, pe[1]+1);
                ctx2.lineTo(pe[0] + l1, pe[1]+1);
                ctx2.lineTo(pe[0]-1, pe[1]-l2);
                ctx2.fillStyle = bgcolor;
                ctx2.strokeStyle = bgcolor;
                ctx2.closePath();
                ctx2.fill();
                ctx2.stroke();                
            }
        }
        
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
                ctx2.closePath();
                ctx2.fill();
                ctx2.stroke();                
            } else {
                if (bIpath != null) {
                    clearGraduallyLpg(ctx2, 1, pbOnTopX-pe[0], pbOnBotX-pe[0]);
                } else {
                    ctx2.moveTo(pe[0] - 1, pe[1] +1);
                    ctx2.lineTo(pbOnBotX, pe[1] + 1);
                    ctx2.lineTo(pbOnTopX, sY - 1);
                    ctx2.lineTo(pe[0] - 1, sY - 1);
                    ctx2.fillStyle = bgcolor;
                    ctx2.strokeStyle = bgcolor;
                    ctx2.closePath();
                    ctx2.fill();
                    ctx2.stroke();                    
                }
            }

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
                ctx2.closePath();
                ctx2.fill();
                ctx2.stroke();                
            } else {
                if (bIpath != null) {
                    clearGraduallyLpg(ctx2, 1, pbOnTopX-pe[0], pbOnBotX-pe[0]);
                } else {
                    ctx2.moveTo(pe[0]-1, pe[1]+1);
                    ctx2.lineTo(pe[0]+l1,pe[1]+1);
                    ctx2.lineTo(pbOnTopX+1, sY-1);
                    ctx2.lineTo(pe[0]-1, sY-1);
                    ctx2.fillStyle=bgcolor;
                    ctx2.strokeStyle = bgcolor;
                    ctx2.closePath();
                    ctx2.fill();
                    ctx2.stroke();                    
                }
            }

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
    if ( (imInd>2)||( (imInd==2)&&(ofsX<(sX+sA[0])) ) ) {
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


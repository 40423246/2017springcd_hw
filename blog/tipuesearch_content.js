var tipuesearch = {"pages":[{"url":"./pages/about/","text":"2017Spring 機械設計工程系協同產品設計實習 課程倉儲: http://github.com/mdecourse/2017springcd 課程投影片: http://mdecourse.github.io/2017springcd 課程網誌: http://mdecourse.github.io/2017springcd/blog","tags":"misc","title":"About"},{"url":"./2017Spring-cd-W17.html","text":"各組員網誌上的 2D 繪圖, 並將程式碼顯示在繪圖網誌文章中","tags":"Course","title":"2017/06/14 W17"},{"url":"./2017Spring-cd-W16.html","text":"","tags":"Course","title":"2017/06/07 W16"},{"url":"./2017Spring-cd-W15.html","text":"從單一 2D 正齒輪繪圖到齒輪組嚙合 利用漸開線原理, 以 Brython 繪製單一正齒輪廓: window.onload=function(){ // 設定 data/py 為共用程式路徑 brython({debug:1, pythonpath:['./../data/py']}); } from browser import document as doc import math # deg 為角度轉為徑度的轉換因子 deg = math.pi/180. # 定義 Spur 類別 class Spur(object): def __init__(self, ctx): self.ctx = ctx def create_line(self, x1, y1, x2, y2, width=3, fill=\"red\"): self.ctx.beginPath() self.ctx.lineWidth = width self.ctx.moveTo(x1, y1) self.ctx.lineTo(x2, y2) self.ctx.strokeStyle = fill self.ctx.stroke() # # 定義一個繪正齒輪的繪圖函式 # midx 為齒輪圓心 x 座標 # midy 為齒輪圓心 y 座標 # rp 為節圓半徑, n 為齒數 # pa 為壓力角 (deg) # rot 為旋轉角 (deg) # 已經針對 n 大於等於 52 齒時的繪圖錯誤修正, 因為 base circle 與齒根圓大小必須進行判斷 def Gear(self, midx, midy, rp, n=20, pa=20, color=\"black\"): # 定義節圓直徑 rp rp = 250 # 齒輪漸開線分成 15 線段繪製 imax = 15 # 在輸入的畫布上繪製直線, 由圓心到節圓 y 軸頂點畫一直線 self.create_line(midx, midy, midx, midy-rp) # 畫出 rp 圓, 畫圓函式尚未定義 #create_oval(midx-rp, midy-rp, midx+rp, midy+rp, width=2) # a 為模數 (代表公制中齒的大小), 模數為節圓直徑(稱為節徑)除以齒數 # 模數也就是齒冠大小 a=2*rp/n # d 為齒根大小, 為模數的 1.157 或 1.25倍, 這裡採 1.25 倍 d=2.5*rp/n # ra 為齒輪的外圍半徑 ra=rp+a # 畫出 ra 圓, 畫圓函式尚未定義 #create_oval(midx-ra, midy-ra, midx+ra, midy+ra, width=1) # rb 則為齒輪的基圓半徑 # 基圓為漸開線長齒之基準圓 rb=rp*math.cos(pa*deg) # 畫出 rb 圓 (基圓), 畫圓函式尚未定義 #create_oval(midx-rb, midy-rb, midx+rb, midy+rb, width=1) # rd 為齒根圓半徑 rd=rp-d # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd # 畫出 rd 圓 (齒根圓), 畫圓函式尚未定義 #create_oval(midx-rd, midy-rd, midx+rd, midy+rd, width=1) # dr 則為基圓到齒頂圓半徑分成 imax 段後的每段半徑增量大小 # 將圓弧分成 imax 段來繪製漸開線 # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: dr = (ra-rd)/imax else: dr=(ra-rb)/imax # tan(pa*deg)-pa*deg 為漸開線函數 sigma=math.pi/(2*n)+math.tan(pa*deg)-pa*deg for j in range(n): ang=-2.*j*math.pi/n+sigma ang2=2.*j*math.pi/n+sigma lxd=midx+rd*math.sin(ang2-2.*math.pi/n) lyd=midy-rd*math.cos(ang2-2.*math.pi/n) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(alpha-ang) ypt=r*math.cos(alpha-ang) xd=rd*math.sin(-ang) yd=rd*math.cos(-ang) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由左側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): lfx=midx+xpt lfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # the line from last end of dedendum point to the recent # end of dedendum point # lxd 為齒根圓上的左側 x 座標, lyd 則為 y 座標 # 下列為齒根圓上用來近似圓弧的直線 self.create_line((lxd),(lyd),(midx+xd),(midy-yd),fill=color) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(ang2-alpha) ypt=r*math.cos(ang2-alpha) xd=rd*math.sin(ang2) yd=rd*math.cos(ang2) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由右側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): rfx=midx+xpt rfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # lfx 為齒頂圓上的左側 x 座標, lfy 則為 y 座標 # 下列為齒頂圓上用來近似圓弧的直線 self.create_line(lfx,lfy,rfx,rfy,fill=color) canvas = doc['onegear'] ctx = canvas.getContext(\"2d\") x = (canvas.width)/2 y = (canvas.height)/2 r = 0.8*(canvas.height/2) # 齒數 n = 36 # 壓力角 pa = 20 Spur(ctx).Gear(x, y, r, n, pa, \"black\") ctx.beginPath() ctx.fillStyle = \" #2894FF\" ctx.font = \"35px ScriptS\" ctx.fillText(\"40423246 \",330,330) ctx.stroke() from browser import document as doc import math # deg 為角度轉為徑度的轉換因子 deg = math.pi/180. # 定義 Spur 類別 class Spur(object): def __init__(self, ctx): self.ctx = ctx def create_line(self, x1, y1, x2, y2, width=3, fill=\"red\"): self.ctx.beginPath() self.ctx.lineWidth = width self.ctx.moveTo(x1, y1) self.ctx.lineTo(x2, y2) self.ctx.strokeStyle = fill self.ctx.stroke() # # 定義一個繪正齒輪的繪圖函式 # midx 為齒輪圓心 x 座標 # midy 為齒輪圓心 y 座標 # rp 為節圓半徑, n 為齒數 # pa 為壓力角 (deg) # rot 為旋轉角 (deg) # 已經針對 n 大於等於 52 齒時的繪圖錯誤修正, 因為 base circle 與齒根圓大小必須進行判斷 def Gear(self, midx, midy, rp, n=20, pa=20, color=\"black\"): rp = 250 # 齒輪漸開線分成 15 線段繪製 imax = 15 # 在輸入的畫布上繪製直線, 由圓心到節圓 y 軸頂點畫一直線 self.create_line(midx, midy, midx, midy-rp) # 畫出 rp 圓, 畫圓函式尚未定義 #create_oval(midx-rp, midy-rp, midx+rp, midy+rp, width=2) # a 為模數 (代表公制中齒的大小), 模數為節圓直徑(稱為節徑)除以齒數 # 模數也就是齒冠大小 a=2*rp/n # d 為齒根大小, 為模數的 1.157 或 1.25倍, 這裡採 1.25 倍 d=2.5*rp/n # ra 為齒輪的外圍半徑 ra=rp+a # 畫出 ra 圓, 畫圓函式尚未定義 #create_oval(midx-ra, midy-ra, midx+ra, midy+ra, width=1) # rb 則為齒輪的基圓半徑 # 基圓為漸開線長齒之基準圓 rb=rp*math.cos(pa*deg) # 畫出 rb 圓 (基圓), 畫圓函式尚未定義 #create_oval(midx-rb, midy-rb, midx+rb, midy+rb, width=1) # rd 為齒根圓半徑 rd=rp-d # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd # 畫出 rd 圓 (齒根圓), 畫圓函式尚未定義 #create_oval(midx-rd, midy-rd, midx+rd, midy+rd, width=1) # dr 則為基圓到齒頂圓半徑分成 imax 段後的每段半徑增量大小 # 將圓弧分成 imax 段來繪製漸開線 # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: dr = (ra-rd)/imax else: dr=(ra-rb)/imax # tan(pa*deg)-pa*deg 為漸開線函數 sigma=math.pi/(2*n)+math.tan(pa*deg)-pa*deg for j in range(n): ang=-2.*j*math.pi/n+sigma ang2=2.*j*math.pi/n+sigma lxd=midx+rd*math.sin(ang2-2.*math.pi/n) lyd=midy-rd*math.cos(ang2-2.*math.pi/n) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(alpha-ang) ypt=r*math.cos(alpha-ang) xd=rd*math.sin(-ang) yd=rd*math.cos(-ang) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由左側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): lfx=midx+xpt lfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # the line from last end of dedendum point to the recent # end of dedendum point # lxd 為齒根圓上的左側 x 座標, lyd 則為 y 座標 # 下列為齒根圓上用來近似圓弧的直線 self.create_line((lxd),(lyd),(midx+xd),(midy-yd),fill=color) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(ang2-alpha) ypt=r*math.cos(ang2-alpha) xd=rd*math.sin(ang2) yd=rd*math.cos(ang2) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由右側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): rfx=midx+xpt rfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # lfx 為齒頂圓上的左側 x 座標, lfy 則為 y 座標 # 下列為齒頂圓上用來近似圓弧的直線 self.create_line(lfx,lfy,rfx,rfy,fill=color) canvas = doc['onegear2'] ctx = canvas.getContext(\"2d\") x = (canvas.width)/2 y = (canvas.height)/2 r = 0.8*(canvas.height/2) # 齒數 n = 36 # 壓力角 pa = 20 Spur(ctx).Gear(x, y, r, n, pa, \"rad\") ctx.beginPath() ctx.fillStyle = \" #2894FF\" ctx.font = \"35px ScriptS\" ctx.fillText(\"40423246 \",330,340) ctx.stroke()","tags":"Course","title":"2017/05/31 W15"},{"url":"./2017Spring-cd-W9.html","text":"2017Spring 協同產品設計實習課程 第九週期中考 四連桿機構協同 Trace Point 查驗 window.onload=function(){ brython(1); } from browser import document as doc from browser import html import math # 準備繪圖畫布 canvas = doc[\"fourbar_40423226\"] ctx = canvas.getContext(\"2d\") fourbar_data = open(\"./../data/midterm5.csv\").read() fourbar_list = fourbar_data.splitlines() # 以下可以利用 ctx 物件進行畫圖 # 先畫一條直線 ctx.beginPath() # 設定線的寬度為 1 個單位 ctx.lineWidth = 1 # 利用 transform 將 y 座標反轉, 且 offset canvas.height # (X scale, X skew, Y skew, Y scale, X offset, Y offset) # 配合圖形位置進行座標轉換 ctx.transform(1, 0, 0, -1, canvas.width/2+250, canvas.height/2+100) # 畫出 x 與 y 座標線 # 各座標值放大 3 倍 ratio = 3 ctx.moveTo(0, 0) ctx.lineTo(-30*ratio, 0) start_point = fourbar_list[0].split(\",\") ctx.moveTo(float(start_point[0])*ratio, float(start_point[1])*ratio) count = 0 for data in fourbar_list[1:]: point = data.split(\",\") #count = count + 1 #container1 <= str(count) + \":\" + point[0] + \",\" + point[1] #container1 <= html.BR() ctx.lineTo(float(point[0])*ratio, float(point[1])*ratio) # 設定顏色為藍色, 也可以使用 \"rgb(0, 0, 255)\" 字串設定顏色值 ctx.strokeStyle = \"blue\" # 實際執行畫線 ctx.stroke() ctx.closePath() midterm7 from 40423246 on Vimeo . 協同產品設計課程W9-mission3-動畫 期中行走機構 from 40423246 on Vimeo .","tags":"Course","title":"2017/04/19 W9"},{"url":"./2017Spring-cd-W8.html","text":"2017Spring 協同產品設計實習課程 第八週上課內容 小組互評 個人自評","tags":"Course","title":"2017/04/12 W8"},{"url":"./2017Spring-cd-W7.html","text":"2017Spring 協同產品設計實習課程 第七週上課內容 一.Fossil 程式碼 Fossil SCM from 40423246 on Vimeo . 二.八連桿機構 8link 運動模擬 from 40423246 on Vimeo .","tags":"Course","title":"2017/04/05 W7"},{"url":"./2017Spring-cd-W6.html","text":"2017Spring 協同產品設計實習課程 第六週上課內容 Fourbar運動模擬 1.各零件尺寸 V-rep 模擬四連桿機構 from 40423246 on Vimeo . 1.link01 2.link30 3.link50 4.link60 4.link8*10 二.在 V-rep 模擬 Fourbar V-rep 三.解決倉儲推送出現問題 解決辦法： 刪掉裡面所有的東西 原因：是Github更新造成版本錯誤，只要刪掉衝突的東西就能正常上傳。 四.心得： 這次發現無法推到Github，有點嚇到，以為我把它弄爆了，去查了一下知道怎麼解決，感覺還不錯，下次如過有問題，希望也能這樣順利解決。","tags":"Course","title":"2017/03/29 W6"},{"url":"./2017Spring-cd-W5.html","text":"2017Spring 協同產品設計實習課程 第五週上課內容 一.Fossil SCM 與 Stunnel 啟動整合 一. 更改 Start.bat 設定 REM tiny2017 主要針對初學 Python3 與 C 學員所建立 REM 近端使用 fossil 管理資料版本, 並且定時轉為 git 格式後上傳到 github @echo off REM 設定 y 硬碟代號與 data 目錄對應 set Disk=y subst %Disk%: \"data\" REM 設定 leo 相關對應 Home 位置 set HomePath=%Disk%:\\home set HomeDrive=%Disk%:\\home set Home=%Disk%:\\home REM 將系統 Python 程式的 io 設為 utf-8 set PYTHONIOENCODING=\"utf-8\" REM 將後續的指令執行, 以 %Disk% 為主 %Disk%: REM 設定 PYTHONPATH set PYTHONPATH=%Disk%:\\python-3.5.3-embed-amd64 REM 設定 Leo 所用的編輯器 set LEO_EDITOR=%Disk%:\\wscite\\SciTE.exe REM for fossil https 連線設定 set HTTPS=on REM 指令搜尋路徑設定 set path1=%PATH%;%Disk%:;%Disk%:\\python-3.5.3-embed-amd64;%Disk%:\\git\\bin;%Disk%:\\stunnel\\bin;%Disk%:\\sqlite-tools;%Disk%:\\python-3.5.3-embed-amd64\\Scripts;%Disk%:\\portablegit\\bin; set path2=c:\\Windows\\Microsoft.NET\\Framework\\v3.5;%Disk%:\\python-3.5.3-embed-amd64\\Lib\\site-packages; set path3=\"C:\\Program Files (x86)\\Google\\Chrome\\Application\" path=%path%;%path1%;%path2%;%path3% start /MIN %Disk%:\\wscite\\SciTE.exe start /MIN cmd.exe start /MIN cmd.exe start /MIN cmd.exe REM 啟動 Leo 編輯器 REM %Disk%:\\Miniconda3\\python.exe %Disk%:\\apps\\launchLeo.py REM 啟動 stunnel start /MIN fossil.exe server -P 127.0.0.1:8080 %Disk%:\\tmp\\fossil_repo\\2017springcd_bg1.fpssil REM 取得電腦 IP, 然後設定 %Disk%:/stunnel/config/stunnel.conf for /f \"delims=[] tokens=2\" %%a in ('ping -4 -n 1 %ComputerName% &#94;| findstr [') do set NetworkIP=%%a REM echo Network IP: %NetworkIP% REM Saved in %Disk%:\\stunnel\\config\\stunnel.conf @echo off REM 建立 stunnel.conf @echo [https] > %Disk%:\\stunnel\\config\\stunnel.conf REM 附加資料 @echo accept = %NetworkIP%:443 >> %Disk%:\\stunnel\\config\\stunnel.conf @echo connect = 127.0.0.1:8080 >> %Disk%:\\stunnel\\config\\stunnel.conf @echo TIMEOUTclose = 0 >> %Disk%:\\stunnel\\config\\stunnel.conf @echo cert = %Disk%:\\stunnel\\config\\localhost.crt >> %Disk%:\\stunnel\\config\\stunnel.conf @echo key = %Disk%:\\stunnel\\config\\localhost.key >> %Disk%:\\stunnel\\config\\stunnel.conf REM 啟動 stunnel start /MIN stunnel.exe REM 以 chrome 連線到 https://%NetworkIP%:443 chrome https://%NetworkIP% https://mde2a2.kmol.info/cdbg1 Exit 二.solvespace將單連桿轉入v-rep進行馬達運動模擬 solvespace組立轉入v-rep from 40423246 on Vimeo . 三.心得 這次上課學到如何將畫好的機構，使用V-rep來做運動模擬，在對於新產品開發有很大的幫助。","tags":"Course","title":"2017/03/22 W5"},{"url":"./2017Spring-cd-W14.html","text":"2017Spring 協同產品設計實習課程 第四週上課內容 一、Fossil SCM倉儲 每組要在https://mde2a2.kmol.info 主機上建倉儲: https://mde2a2.kmol.info/cdbg5 二、單連桿機構 solvespace繪製 單聯桿機構 繪製 單聯桿機構組合 solvespace組立轉入v-rep 影片 Onshape繪製 單連桿機構 onshape組立轉入v-rep 影片 單聯桿轉入V-rep加入馬達 影片 三.心得 這次上課老師教我們用一個主機倉儲，只要有一台主機是保持在網路連線，我們就可以直接從這台主機上下載檔案，這對於Github未來有可能收費或消失的替代方案。","tags":"Course","title":"2017/03/15 W4"},{"url":"./2017Spring-cd-W3.html","text":"2017Spring 協同產品設計實習課程 第三週上課內容 HyperWorks 14.0 Student Edition Student Edition: 下載位址Download Now! 一.近端Fossil 1. 更改Start.bat設定 REM tiny2017 主要針對初學 Python3 與 C 學員所建立 REM 近端使用 fossil 管理資料版本, 並且定時轉為 git 格式後上傳到 github @echo off REM 設定 y 硬碟代號與 data 目錄對應 set Disk=y subst %Disk%: \"data\" REM 設定 leo 相關對應 Home 位置 set HomePath=%Disk%:\\home set HomeDrive=%Disk%:\\home set Home=%Disk%:\\home REM 將系統 Python 程式的 io 設為 utf-8 set PYTHONIOENCODING=\"utf-8\" REM 將後續的指令執行, 以 %Disk% 為主 %Disk%: REM 設定 PYTHONPATH set PYTHONPATH=%Disk%:\\python-3.5.3-embed-amd64 REM 設定 Leo 所用的編輯器 set LEO_EDITOR=%Disk%:\\wscite\\SciTE.exe REM for fossil https 連線設定 set HTTPS=on REM 指令搜尋路徑設定 set path1=%PATH%;%Disk%:;%Disk%:\\python-3.5.3-embed-amd64;%Disk%:\\git\\bin;%Disk%:\\stunnel\\bin;%Disk%:\\sqlite-tools;%Disk%:\\python-3.5.3-embed-amd64\\Scripts;%Disk%:\\portablegit\\bin; set path2=c:\\Windows\\Microsoft.NET\\Framework\\v3.5;%Disk%:\\python-3.5.3-embed-amd64\\Lib\\site-packages; path=%path%;%path1%;%path2% start /MIN %Disk%:\\wscite\\SciTE.exe start /MIN cmd.exe start /MIN cmd.exe start /MIN cmd.exe REM 啟動 Leo 編輯器 REM %Disk%:\\Miniconda3\\python.exe %Disk%:\\apps\\launchLeo.py REM 啟動 stunnel start /MIN fossil.exe server -P 127.0.0.1:8080 %Disk%:\\tmp\\fossil_repo\\2017springcd_hw.fpssil REM 取得電腦 IP, 然後設定 %Disk%:/stunnel/config/stunnel.conf for /f \"delims=[] tokens=2\" %%a in ('ping -4 -n 1 %ComputerName% &#94;| findstr [') do set NetworkIP=%%a REM echo Network IP: %NetworkIP% REM Saved in %Disk%:\\stunnel\\config\\stunnel.conf @echo off REM 建立 stunnel.conf @echo [https] > %Disk%:\\stunnel\\config\\stunnel.conf REM 附加資料 @echo accept = %NetworkIP%:443 >> %Disk%:\\stunnel\\config\\stunnel.conf @echo connect = 127.0.0.1:8080 >> %Disk%:\\stunnel\\config\\stunnel.conf @echo TIMEOUTclose = 0 >> %Disk%:\\stunnel\\config\\stunnel.conf @echo cert = %Disk%:\\stunnel\\config\\localhost.crt >> %Disk%:\\stunnel\\config\\stunnel.conf @echo key = %Disk%:\\stunnel\\config\\localhost.key >> %Disk%:\\stunnel\\config\\stunnel.conf REM 啟動 stunnel start /MIN stunnel.exe Exit 2. 在tmp裏的fossil_repo目錄執行指令 fossil init 2017springcd_hw.fpssil 3. 查詢IP ipconfig /all 4. 確認是否有用Proxy, 若有則需要將自己的IP設為例外 5. 使用瀏覽器輸入網址 https:// 電腦IPv4的IP 二.四連桿機構 solvespace link30製圖影片 軌跡圖 四連桿組合 onshape Link30 Link50 Link60 四連桿組合 三.第三周心得 今天是對fossil有更深得的了解，這周也畫了一些零件，下周就會用這些零件來模擬運動。","tags":"Course","title":"2017/03/08 W3"},{"url":"./2017Spring-cd-W2.html","text":"2017Spring 協同產品設計實習課程 第二週上課內容 一.利用python找出缺課人員 到班級倉儲data下載W2資料夾裡的cd_w2.py座位表的人w2b_registered.txt，再來利用程式碼列印分組名單；座位表。 分組座位程式碼 import os 讀取w2b_cadlab.txt的檔案將其儲存為adata，並設定encoding為utf-8 adata = open(\"w2b_cadlab.txt\", encoding=\"utf-8\").read() 讀取w2b_registered.txt的檔案將其儲存為rdata，並一行一行隔開，並設定encoding為utf-8 rdata = open(\"w2b_registered.txt\", encoding=\"utf-8\").read().splitlines() 列印出adata，以便檢查結果 print(adata) 利用splitlines將adata一行一行隔開並其儲存為alist alist = adata.splitlines() 列印出alist[2]，以便檢查結果 print(alist[2]) 將變數n儲存為0 n = 0 將列從0開始算起 row = 0 將final_list儲存為一個空的數列 final_list = [] 將w2_list儲存為一個空的數列 w2_list = [] 執行一個for迴圈從第二列開始 for stud_num in alist[2:]: #每執行完一次迴圈列數+1 row = row + 1 #執行完迴圈後用\\將其隔開並儲存為blist blist = stud_num.split(\"\\t\") #列印出blist，以便檢查結果 #print(blist) #將行從0開始算起 column = 0 #執行一個for迴圈去取得blist裡的數列 for i in range(len(blist)): #每執行完一次迴圈行數+1 column = column + 1 #假如blist數列裡不是空白 if blist[i] != \"\": #列印出blist[i]，以便檢查結果 #print(blist[i]) #將組序有用_隔開的儲存為clist clist = blist[i].split(\" \") #將組序+ +學號+ +列+行的資料儲存為stud_data stud_data = clist[0]+\" \"+clist[1]+\" \"+str(row)+\" \"+str(column) #將stud_data結果附加在final_list的資料裡 final_list.append(stud_data) #將clist[1]結果附加在w2_list的資料裡 w2_list.append(clist[1]) #每執行完一次迴圈n+1 n = n +1 根據數列前導字串排序, 目的在建立分組數列 group_list = sorted(final_list) 列印出分組名單 print(\"分組名單:\") 執行一個for迴圈去取得group_list裡的數列 for i in range(len(group_list)): #列印出 group_list[i]的資料 print(group_list[i]) 列印出座位列表 print(\"座位列表:\") 執行一個for迴圈去取得final_list裡的數列 for i in range(len(final_list)): #列印出 final_list[i]的資料 print(final_list[i]) 執行一個for迴圈去取得rdata裡的數列 for i in range(len(rdata)): #假如有在rdata裡但沒有在w2_list裡，目的在找出缺席學生 if rdata[i] not in w2_list: #列印出 rdata[i]的資料，缺席學生 print(\"缺席學生:\", rdata[i]) 列印出學生總數n個 print(\"學生總數:\", n) print(os.environ) 二.solvespace組立四連桿 1.元件加上軸心 Untitled from 40423246 on Vimeo . 2.四連桿機構組合 Untitled from 40423246 on Vimeo . 第二週心得 這禮拜是有用程式進行分組，但是我在使用程式碼的時候，不知道出現什麼狀況，一直當機，至後會使用組員的影片來介紹程式碼的使用","tags":"Course","title":"2017/03/01 W2"},{"url":"./2017spring-cd-W1.html","text":"2017Spring 協同產品設計實習課程 第一週上課內容 一. 可至 2017 Spring 協同產品設計實習 觀看這學期的課程大綱，老師介紹了Blender 3dstudio maya的相關性，簡略說明c語言與python的優劣與使用時機。 二. 了解如何使用stunnel ，並且嘗試以anonymous（無名氏/遊客）的身份進入https://192.168.1.24/2017springvcp_hw/index。 在按下start之後，會出現錯誤的圖案 (1) ，這是因為stunnel資料夾裡的config/styunnel.conf裡的ip與電腦的ip不同(styunnel.conf裡的分號代表註解)，可至cmd打ipconfig/all的指令，找到電腦的ip位置並將其複製、貼到styunnel.conf裡 (2) ，(443為https的Port號不須修改)，如果有設置proxy就必須要到設定proxy的地方按進階，將電腦ip設為額外ip，這樣就可至google打網址，並且嘗試以anonymous（無名氏/遊客）的身份進入https://192.168.1.24/2017springvcp_hw/index。 2017-03-07_15-01-23 from 40423246 on Vimeo . 三. 利用python程式碼控制Vrep裡的單連桿作動。 可至 課程倉儲 的data裡下載fourbar_eightbar_solvespace_vrep.7z以及onelink_vrep_remoteapi_pos_vel.7z兩個檔案，解壓縮後會有三個檔案，分別是單連桿、四連桿及八連桿，可試著在solvespace及Vrep裡開啟。 在Vrep裡開啟one_link_robot_remoteAPI.ttt的檔案(ttt是Vrep檔案的副檔名)，在SciTE裡開啟one_link_robot_remoteAPI_joint_target_vel.py的檔案，按下Tool裡的Go即可開始控制單連桿，按Enter會旋轉，按P會暫停。 第一週心得 在新學期學到新的使用網頁的方式，之後的課程，希望能跟上進度。","tags":"Course","title":"2017/02/22 W1"}]};
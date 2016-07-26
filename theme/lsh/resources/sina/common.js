
var isIe=(window.ActiveXObject)?true:false;
var pageLinkUrl="";
var ajaxUrl="";
function g(nodeId)
{
   return document.getElementById(nodeId);
}
function setInnerHtml(objName,dcontent)
{
   if(g(objName)!=null)
   {g(objName).innerHTML=dcontent;}
}
function getPos(obj){
	this.Left=0;
	this.Top=0;
	this.Height=obj.offsetHeight;
	this.Width=obj.offsetWidth;
	var tempObj=obj;
	while (tempObj.tagName.toLowerCase()!="body" && tempObj.tagName.toLowerCase()!="html"){
		this.Left+=tempObj.offsetLeft;
		this.Top+=tempObj.offsetTop;
		tempObj=tempObj.offsetParent;
	}
}
function getNullPos()
{
   return {Left:0,Top:0}
}
function getMousePos(ev)
{
	if(ev.pageX || ev.pageY)
	{
		return {Left:ev.pageX, Top:ev.pageY};
	}
	return {
		Left:ev.clientX + document.documentElement.scrollLeft,Top:ev.clientY + document.documentElement.scrollTop
		}; 
}
function clearWaitInfo()
{
   var newd=g("waitInfo");
   if(newd!=null)
   {
      newd.parentNode.removeChild(newd);
   }
}
function setGrowHidden(obj,intAlphaStep,intTimeStep)
{
    
    try{
        if(obj==null){return;}
        if(isIe) 
        { 
            try{
            obj.filters.alpha.opacity-=intAlphaStep; 
            if (obj.filters.alpha.opacity>0) { 
            setTimeout(function(){setGrowHidden(obj,intAlphaStep,intTimeStep);},intTimeStep); 
            } 
            else {closeWindow();}
            }catch(e){closeWindow();}
        } 
        else 
        { 
            var curOpacity=obj.style.opacity;
            curOpacity-=intAlphaStep/100; 
            if (curOpacity>0) { 
            obj.style.opacity =curOpacity; 
            setTimeout(function(){setGrowHidden(obj,intAlphaStep,intTimeStep);},intTimeStep); 
            } 
            else {closeWindow();} 
        }
    }catch(e){}
}
function showMessageBox(content,pos,wWidth)
{
   closeWindow();
   var bWidth=parseInt(document.documentElement.scrollWidth);
    var bHeight=parseInt(document.documentElement.scrollHeight);
	var mesW=document.createElement("div");
	mesW.id="mesWindow";
	mesW.innerHTML=content;
	if(bWidth-pos.Left<wWidth)
	{
	   styleStr="left:"+(pos.Left-wWidth)+"px;";
	}
	else
	{
	   styleStr="left:"+(pos.Left)+"px;";
	}
	styleStr+="top:"+pos.Top+"px;position:absolute;width:"+wWidth+"px;";
	mesW.style.cssText=styleStr;
	document.body.appendChild(mesW);
		
}
function closeWindow()
{
    if(g('mesWindow')!=null)
    {  
       g('mesWindow').parentNode.removeChild(g('mesWindow'));
    }
}
//页面定位
function setScroll(objId)
{
   if(g(objId))
   {
      
      var objPos=new getPos(g(objId));
      scroll(0,objPos.Top);
   }
}

//原头部的一些方法挪过来的 START
function SG_hover(e1,e2){
	var i = $(e1);
	var j = $(e2);
	i.hover(function(){
		i.find("a:first").addClass('hover');
		j.show();
	},function(){
		i.find("a:first").removeClass('hover');
		j.hide();
	})
}

function recordNewsHotPv(a,b){
	try{
		new Image().src = "http://click.sina.com.cn/adfrontc?s="+a+"&c="+b+"&w=10&h=10&p=1&url=http://news.sina.com.cn/iframe/485/2008/1127/11.html";
	}catch(ex){
	}
	return true;
}

function clear_search()
{
	if($("#search").attr("value")=="")
	{
		$("#search").attr("value","输入查询商品名称......");
	}
}

function search_key()
{
	if(Trim($("#search").attr("value")) =="")
	{
		alert("关键字不能为空!");
		return false;
	}
	search_str = encodeURI($("#search").attr("value")).replace(/&/g,'%26').replace(/\+/g,'%2B').replace(/\s/g,'%20').replace(/#/g,'%23').replace('(','left_sign').replace(')','right_sign').replace('/','the_xg');
	window.location.href= base_url+"/category/index/0/0/"+search_str; 
}

function search_click()
{
	if($("#search").attr("value")!=""  )
	{
		$("#search").attr("value","");
	}
}

function get_shop_count()
{
	url_link = base_url+"shopping_cart/get_shopping_count";
	$.ajax({
		  url: url_link,
		  type: 'GET',
		  dataType: 'html',
		  success: function(data){ 
			  $(".hd_gw a span").html(data);
		  }
		});
}
//原头部的一些方法挪过来的 END

//ajax通用方法
function createXmlHttp(){
  var ajaxObj=null;
  if(window.ActiveXObject)
  {
     ajaxObj=new ActiveXObject("Microsoft.XMLHTTP");
  }else{
    if(window.XMLHttpRequest){
    ajaxObj=new XMLHttpRequest();
    }
  }
  return ajaxObj;
}
function setAjax_getRes(requst,resObjId)
{
   setAjax("GET",requst,null,false,null,resObjId,null);
}
function setAjax_runCode(requst,runCode)
{
   setAjax("GET",requst,null,false,null,null,runCode);
}
function setAjax_runCodeAndBtn(requst,curBtn,runCode)
{
   setAjax("GET",requst,null,false,curBtn,null,runCode);
}
function setAjax_getResAndRunCode(requst,resObjId,runCode)
{
   setAjax("GET",requst,null,false,null,resObjId,runCode);
}
function setAjax(postType,requst,postXml,isXml,curBtn,resObjId,runCode)
{   
    setAjaxBase(postType,requst,postXml,isXml,curBtn,resObjId,runCode,null);
}
function setAjaxBase(postType,requst,postXml,isXml,curBtn,resObjId,runCode,onOverRunCode)
{   
    
    if(curBtn!=null){curBtn.disabled=true;}
    var xmlHttp=createXmlHttp();
    xmlHttp.onreadystatechange=function(){backAjaxValue(xmlHttp,curBtn,resObjId,runCode,onOverRunCode)};
    if(postType=="GET"){
		xmlHttp.open(postType,pageLinkUrl+ajaxUrl+'?roid='+Math.random()+'&'+requst);
		xmlHttp.send(null);
    }else
    {
        xmlHttp.open(postType,pageLinkUrl+ajaxUrl+'?roid='+Math.random()+'&'+requst,true);
       if(!isXml){xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");}
       xmlHttp.send(postXml);
    }
}
function backAjaxValue(xmlHttp,curBtn,resObjId,runCode,onOverRunCode)
{
 
   if(xmlHttp.readyState==4)
   {
        clearWaitInfo();
		if(curBtn!=null){curBtn.disabled=false;}
		
		if(onOverRunCode!=null)eval(onOverRunCode);
		
		if(xmlHttp.status==200)
		{
		    var backValue=xmlHttp.responseText;
		    if(!checkErrorFromBackValue(backValue))
		    {
		       return;
		    }
		    if(resObjId!=null && g(resObjId)!=null)
		    {
		        g(resObjId).innerHTML=xmlHttp.responseText;
		    }
		    if(runCode!=null)
		    {
		    var backValue=xmlHttp.responseText;
		    eval(runCode);}
		    
		}
	}
}
function checkErrorFromBackValue(bakValue)
{
   if(bakValue!=null)
   {
      if(bakValue.indexOf('error_')==0)
      {
         if(bakValue.length>6)
         {bakValue=bakValue.substr(6);}
         else{bakValue='程序发生了未知错误，请再次尝试！';}
         alert(bakValue);
         return false;
      }
       return true;
   }
   return true;
}

function getFormXmlBySign(sign)
{
  var xmlDoc="";
    var eList=document.getElementsByTagName("input");
    for(var i=0;i<eList.length;i++)
    {                  
		if(isDataControl(eList[i].id,sign))
		{
		    var columnName=getDataColumnName(eList[i].id,sign);
		    if(eList[i].type=="checkbox" || eList[i].type=="radio")
		    {
		       if(eList[i].checked)
			   {
			      xmlDoc+="<"+columnName+">1</"+columnName+">";
			   }else
			   {  xmlDoc+="<"+columnName+">0</"+columnName+">";}
		    }else
		    {
				
				xmlDoc+="<"+columnName+"><![CDATA["+eList[i].value+"]]></"+columnName+">";		    
				columnName=null;
			}
		}
    }
    eList=document.getElementsByTagName("select");
    for(var i=0;i<eList.length;i++)
    {                  
		if(isDataControl(eList[i].id,sign))
		{
		    var columnName=getDataColumnName(eList[i].id,sign);
			xmlDoc+="<"+columnName+"><![CDATA["+eList[i].value+"]]></"+columnName+">";		    
			columnName=null;
		}			
    }
    eList=document.getElementsByTagName("textarea");
    for(var i=0;i<eList.length;i++)
    {                  
		if(isDataControl(eList[i].id,sign))
		{
		    var columnName=getDataColumnName(eList[i].id,sign);
			xmlDoc+="<"+columnName+"><![CDATA["+eList[i].value+"]]></"+columnName+">";		    
			columnName=null;
		}
    }
	return xmlDoc;   
}

function getFormXml()
{   
    return getFormXmlBySign('t_');
}

function isDataControl(controlId,sign){if(controlId.substring(0,sign.length)==sign){return true;}else{return false;}}

function getDataColumnName(controlId,sign){return controlId.substr(sign.length);} 

//非法字符过滤
function is_forbid(temp_str)
{
    temp_str=trimTxt(temp_str);
	temp_str = temp_str.replace('*',"@");
	temp_str = temp_str.replace('--',"@");
	temp_str = temp_str.replace('/',"@");
	temp_str = temp_str.replace('+',"@");
	temp_str = temp_str.replace('\'',"@");
	temp_str = temp_str.replace('\\',"@");
	temp_str = temp_str.replace('$',"@");
	temp_str = temp_str.replace('^',"@");
	temp_str = temp_str.replace('.',"@");
	//temp_str = temp_str.replace('(',"@");
	//temp_str = temp_str.replace(')',"@");
	//temp_str = temp_str.replace(',',"@");
	temp_str = temp_str.replace(';',"@");
	temp_str = temp_str.replace('<',"@");
	temp_str = temp_str.replace('>',"@");
	//temp_str = temp_str.replace('?',"@");
	temp_str = temp_str.replace('"',"@");
	temp_str = temp_str.replace('{',"@");
	temp_str = temp_str.replace('}',"@");
	temp_str = temp_str.replace('　',"");
	//temp_str = temp_str.replace('[',"@");
	//temp_str = temp_str.replace(']',"@");
	var forbid_str=new String('@,%,~,&');
	var forbid_array=new Array();
	forbid_array=forbid_str.split(',');
	for(i=0;i<forbid_array.length;i++)
	{
		if(temp_str.search(new RegExp(forbid_array[i])) != -1)
		return false;
	}
	return true;
}
function checknumber(String) 
{ 
    if(trimTxt(String)=="")
    {
       return false;
    }
    var Letters = "1234567890"; 
    var i; 
    var c; 
    for( i = 0; i < String.length; i ++ ) 
    { 
        c = String.charAt( i ); 
        if (Letters.indexOf( c ) ==-1) 
        { 
           return false; 
        } 
    } 
    return true; 
} 
function trimTxt(txt)
{
   return txt.replace(/(^\s*)|(\s*$)|(^　*)|(　*$)/g, "");
}
//检查是否为空
function isEmpty(inputId)
{
   if(trimTxt(g(inputId).value)==''){return true}
   return false;
}
//设置是否可显示
function setDisplay(nodeId,state)
{
   if(g(nodeId)!=null){g(nodeId).style.display=state;}
}
//删除元素
function removeNode(nodeId)
{
   if(g(nodeId)!=null){g(nodeId).parentNode.removeChild(g(nodeId));}
}

//显示提示信息
function showAlert(info,obj,infoSign)
{
   if(g(infoSign)!=null){return;}
   var newd=document.createElement("span");
   newd.id=infoSign;
   newd.className='alertInfo';
   newd.innerHTML=info;
   obj.appendChild(newd);
}
//删除提示信息
function removeAlert(infoSign)
{
   if(g(infoSign)==null){return;}
   g(infoSign).parentNode.removeChild(g(infoSign));
}
//显示等待信息
function showWaitInfo(info,obj)
{
   try{
   if(obj==null)return;
   clearWaitInfo();
   var newd=document.createElement("span");
   newd.className='waitInfo';
   newd.id='waitInfo';
   newd.innerHTML=info;
   obj.parentNode.appendChild(newd);
   }catch(e){}
}
function showWaitInfoOnInner(info,obj)
{
   try{
   if(obj==null)return;
   clearWaitInfo();
   var newd=document.createElement("span");
   newd.className='waitInfo';
   newd.id='waitInfo';
   newd.innerHTML=info;
   obj.innerHTML='';
   obj.appendChild(newd);
   }catch(e){}
}
function clearWaitInfo()
{
   try{
   if(g('waitInfo')!=null){g('waitInfo').parentNode.removeChild(g('waitInfo'));}
   }catch(e){}
}
//检查短日期格式
function checkDateFormat(str) 
{ 
  var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/); 
  if(r==null)return false; 
   var d= new Date(r[1], r[3]-1, r[4]); 
   return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]); 
} 
function checkDoubleFormat(str)
{
  var myReg=/^[\-\+]?([0-9]\d*|0|[1-9]\d{0,2}(,\d{3})*)(\.\d+)?$/;
  return myReg.test(str);
}
//设置radio的默认值
function setRadioDefaultItem(radioName,valueId)
{
   var rList=document.getElementsByName(radioName);
   if(rList.length==0){return;}
   for(var i=0;i<rList.length;i++)
   {
      if(rList[i].checked)
      {
      　　if(g(valueId)!=null)g(valueId).value=rList[i].value;
          return;
      }
   }
   rList[0].click();
   if(g(valueId)!=null)g(valueId).value=rList[0].value;
}

function TimeSpan(secs)
{
   this.hour=Math.floor(secs/3600);
   this.minute=Math.floor((secs-3600*this.hour)/60);
   this.second=(secs-3600*this.hour-60*this.minute)%60;
}

function ToLogin()
{
    document.location="http://passport.360buy.com/login.aspx?ReturnUrl="+escape(location.href);
}

//图片加载出错时替换成默认图片,同时也解决了ie6的over stack问题
function errorload(o,src,mw,mh){
    var w=mw||100,h=mh||100;
    var img=new Image();
    img.src=src;
    img.width=w;
    img.height=h;
    o.parentNode.replaceChild(img, o)
}

//此处为独立函数
function LTrim(str)
{
    var i;
    for(i=0;i<str.length;i++)
    {
        if(str.charAt(i)!=" "&&str.charAt(i)!=" " &&str.charAt(i)!="　")break;
    }
    str=str.substring(i,str.length);
    return str;
}
function RTrim(str)
{
    var i;
    for(i=str.length-1;i>=0;i--)
    {
        if(str.charAt(i)!=" "&&str.charAt(i)!=" "&&str.charAt(i)!="　")break;
    }
    str=str.substring(0,i+1);
    return str;
}
function Trim(str)
{
    return LTrim(RTrim(str));
}

function len(s) { 
	var l = 0; 
	var a = s.split(""); 
	for (var i=0;i<a.length;i++) { 
		if (a[i].charCodeAt(0)<299) { 
			l++; 
		} else { 
			l+=2; 
		} 
	} 
	return l; 
}

//检查长度，超长截取，只允许数字
function cut_Word(len,evt){
	   if(evt==null)
	   evt = window.event;
	   var src = evt.srcElement? evt.srcElement : evt.target;
	   var str=Trim(src.value);
	   var temp_str = "";
	   myLen=0;
	   i=0;
	   for(;(i<str.length)&&(myLen<=len);i++){
		   if (! isNaN(str[i])) 
			   {
			   	temp_str = temp_str +str[i];
			   }
	    if(str.charCodeAt(i)>0&&str.charCodeAt(i)<128)
	     myLen++;
	     else
	     myLen+=2;
	   }
	   src.value= temp_str;
	   if(myLen>len){
	    src.value=temp_str.substring(0,i-1);
	   }
	}

//检查长度，超长截取
function cut_Word2(len2,evt2){
	   if(evt2==null)
	   evt2 = window.event;
	   var src2 = evt2.srcElement? evt2.srcElement : evt2.target;
	   var str2=LTrim(src2.value);
	   		str2 = str2.replace(/(^[\s\u3000]*)/g, "");
	   		src2.value= str2;
	   		
	   myLen=0;
	   i=0;
	   for(;(i<str2.length)&&(myLen<=len2);i++){
	    if(str2.charCodeAt(i)>0&&str2.charCodeAt(i)<128)
	     myLen++;
	     else
	     myLen+=2;
	   }
	   if(myLen>len){
	    src2.value=str2.value.substring(0,i-1);
	   }
	}

function jump_page(url, per_page,obj)
{
	obj = $(obj); 
	//page = $("#page").val();
	page_str = obj.parent().find(":input").next().val();
	temp_str = obj.parent().html();
	max_page = temp_str.substr( temp_str.indexOf("共")+1,  temp_str.indexOf("页")-1 );

    if (!(/(^[1-9]\d*$)/.test(page_str))) 
    { 
       alert('输入的不是正整数'); 
      return false;
    }
    
	if( parseInt(page_str) > parseInt(max_page) || parseInt(page_str) < 1)
	{
		alert("输入页不能大于最大页,不能小于1");
		return false;
	}
	
	//console.log(obj.parent().find(":input").next().val()   );	
	obj_page = per_page * (page_str-1);
	if(obj_page != 0)
		{
		 	window.location = url+obj_page;
		}else
		{
			window.location = url;
		}
}



function var_dump(data, addwhitespace, safety, level)
{
    var rtrn = '';
    var dt, it, spaces = '';

    if (!level) {
        level = 1;
    }

    for (var i=0; i<level; i++) {
        spaces += '   ';
    } //end for i<level

    if (typeof(data) != 'object') {
        dt = data;

        if (typeof(data) == 'string') {
            if (addwhitespace == 'html') {
                dt = dt.replace(/&/g,'&amp;');
                dt = dt.replace(/>/g,'&gt;');
                dt = dt.replace(/</g,'&lt;');
            } //end if addwhitespace == html
            dt = dt.replace(/\"/g,'\"');
            dt = '"' + dt + '"';
        } //end if typeof == string

        if (typeof(data) == 'function' && addwhitespace) {
            dt = new String(dt).replace(/\n/g,"\n"+spaces);
            if (addwhitespace == 'html') {
                dt = dt.replace(/&/g,'&amp;');
                dt = dt.replace(/>/g,'&gt;');
                dt = dt.replace(/</g,'&lt;');
            } //end if addwhitespace == html
        } //end if typeof == function

        if (typeof(data) == 'undefined') {
            dt = 'undefined';
        } //end if typeof == undefined

        if (addwhitespace == 'html') {
            if (typeof(dt) != 'string') {
                dt = new String(dt);
            } //end typeof != string
            dt = dt.replace(/ /g,"&nbsp;").replace(/\n/g,"<br>");
        } //end if addwhitespace == html
        return dt;
    } //end if typeof != object && != array

    for (var x in data) {
        if (safety && (level > safety)) {
            dt = '*RECURSION*';
        } else {
            try {
                dt = var_dump(data[x],addwhitespace,safety,level+1);
            } catch (e) {
                continue;
            }
        } //end if-else level > safety
        it = var_dump(x,addwhitespace,safety,level+1);
        rtrn += it + ':' + dt + ',';
        if (addwhitespace) {
            rtrn += '\n'+spaces;
        } //end if addwhitespace
    } //end for...in

    if (addwhitespace) {
        rtrn = '{\n' + spaces + rtrn.substr(0,rtrn.length-(2+(level*3))) + '\n' + spaces.substr(0,spaces.length-3) + '}';
    } else {
        rtrn = '{' + rtrn.substr(0,rtrn.length-1) + '}';
    } //end if-else addwhitespace

    if (addwhitespace == 'html') {
        rtrn = rtrn.replace(/ /g,"&nbsp;").replace(/\n/g,"<br>");
    } //end if addwhitespace == html

    return rtrn;
} //end function var_dump




//此处为独立函数
function LTrim(str)
{
    var i;
    for(i=0;i<str.length;i++)
    {
        if(str.charAt(i)!=" "&&str.charAt(i)!=" " &&str.charAt(i)!="　")break;
    }
    str=str.substring(i,str.length);
    return str;
}
function RTrim(str)
{
    var i;
    for(i=str.length-1;i>=0;i--)
    {
        if(str.charAt(i)!=" "&&str.charAt(i)!=" "&&str.charAt(i)!="　")break;
    }
    str=str.substring(0,i+1);
    return str;
}
function Trim(str)
{
    return LTrim(RTrim(str));
}

function len(s) { 
	var l = 0; 
	var a = s.split(""); 
	for (var i=0;i<a.length;i++) { 
		if (a[i].charCodeAt(0)<299) { 
			l++; 
		} else { 
			l+=2; 
		} 
	} 
	return l; 
}
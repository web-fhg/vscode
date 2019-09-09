(function(){
var menuList = document.getElementsByClassName('menu-list')[0];
var studentList = menuList.getElementsByTagName('dd')[0];
var tbody = document.getElementsByTagName('tbody')[0];
var dialog = document.getElementsByClassName('dialog')[0];
var newDay = new Date;
var nowYear = newDay.getFullYear();
var ul = document.getElementsByClassName('pages')[0];
var lis = ul.getElementsByTagName('li');


init();

function bindEvent(){
    menuList.addEventListener('click',changeMenu,false);
    //导航条点击切换列表绑定点击事件
    var submitAdd = document.getElementsByClassName('add-btn')[0];
    //新增学生中的提交按钮绑定点击事件
    submitAdd.addEventListener('click',addStudent,false);
    //学生列表点击刷新绑定点击事件
    //studentList.addEventListener('click',studentListRefresh,false);
    //学生列表中的编辑按钮绑定点击事件
    tbody.addEventListener('click',editorfn,false);
    //点击mask退出编辑
    var mask = document.getElementsByClassName('mask')[0];
    mask.addEventListener('click',outEditor,false);
    //编辑完成点击提交事件
    var editorBtn = document.getElementById('edit-student-btn');
    editorBtn.addEventListener('click',editorSubmit,false);
    //删除
    tbody.addEventListener('click',deleteReset,false);
    //分页切换
    ul.addEventListener('click',changPage,false)
    //上一页点击事件
    var lastpages = document.getElementsByClassName('lastpage')[0];
    lastpages.addEventListener('click',lastpage,false)
    //
    var nextpages = document.getElementsByClassName('nextpage')[0];
    nextpages.addEventListener('click',nextpage,false)
}
//导航条点击切换列表
function changeMenu(e){
    //console.log(e.target);
    var tagName = e.target.tagName;
    //console.log(tagName);
    if (tagName !== 'DD'){
        //console.log(tagName);
        return false;
    }
    //获取左侧导航栏所有可选元素 dd
    var ddList = this.getElementsByTagName('dd');
    //去除左侧导航栏所有可选元素 dd 的class类名中的 active 类名
    for(var i = 0;i < ddList.length;i++){
            //ddList[i].className = '';
            ddList[i].classList.remove('active');
    }
    //e.target.className = 'active';
    e.target.classList.add('active');
    var id = e.target.getAttribute('date-id');
    //console.log(id);
    var content = document.getElementById(id)
    //console.log(content);
    //content.style.display = 'block';
    var same = document.getElementsByClassName('same');
    for(var i = 0;i < same.length;i++){
        same[i].classList.remove('same');
    }
    content.classList.add('same');
    
}
//新增学生中的提交按钮点击事件
function addStudent(e){
    e.preventDefault();
    var form = document.getElementById('edit-student-form');
    var name = form.name.value;
    var sex = form.sex.value;
    var sNo = form.sNo.value;
    var email = form.email.value;
    var birth = form.birth.value;
    var phone = form.phone.value;
    var address = form.address.value;
    if(!name || !sex || !sNo || !email || !birth || !phone || !address){
        alert('信息不全，请检查！');
        return false;
    }
    var studentObj = {
        name : name,
        sex : sex,
        sNo : sNo,
        email : email,
        birth : birth,
        phone : phone,
        address : address,
        appkey : "fhgweb_1559459973074",
    };
    var result = saveData('http://api.duyiedu.com/api/student/addStudent', studentObj);
    //console.log(result.status);
    if( !result){
        alert('该学生已经存在');
    }
    else if(result.status == 'success'){
        alert(result.msg);
        form.reset();
        init();
    } else {
        alert(result.msg);
    }
}
//学生列表点击刷新点击事件
// function studentListRefresh(){
//     var result = checkNavPage(1);
    
// }
//学生列表中的编辑按钮点击事件
function editorfn(e){
    if(e.target.className !== "Lbtn btn"){
        return false;
    }
    //console.log(e.target);
    var id = e.target.getAttribute('date-id');
    //console.log(id);
    var tdList = tbody.getElementsByClassName(id)[0].getElementsByTagName('td');
    var editorForm = document.getElementById('dialog-content-editor');
    editorForm.sNo.value = tdList[0].innerHTML;
    editorForm.name.value = tdList[1].innerHTML;
    editorForm.sex.value = tdList[2].innerHTML =='男'? 0:1;
    editorForm.email.value = tdList[3].innerHTML;
    editorForm.birth.value = nowYear - tdList[4].innerHTML;
    editorForm.phone.value = tdList[5].innerHTML;
    editorForm.address.value = tdList[6].innerHTML;

    dialog.style.display = 'block';
}
//点击mask退出编辑
function outEditor(){
    dialog.style.display = 'none';
}
//编辑完成点击提交事件
function editorSubmit(e){
    e.preventDefault();
    var form = document.getElementById('dialog-content-editor');
    var name = form.name.value;
    var sex = form.sex.value;
    var sNo = form.sNo.value;
    var email = form.email.value;
    var birth = form.birth.value;
    var phone = form.phone.value;
    var address = form.address.value;
    if(!name || !sex || !sNo || !email || !birth || !phone || !address){
        alert('信息不全，请检查！');
        return false;
    }
    var studentObj = {
        name : name,
        sex : sex,
        sNo : sNo,
        email : email,
        birth : birth,
        phone : phone,
        address : address,
        appkey : "fhgweb_1559459973074",
    };
    var result = saveData('http://api.duyiedu.com/api/student/updateStudent', studentObj);
     if(result.status == 'success'){
        form.reset();
        outEditor();
        alert(result.msg);
        init();
    } else {
        alert(result.msg);
    }
}
//删除
function deleteReset(e){
    if(e.target.className !== "Rbtn btn"){
        return false;
    }
    var sNo = e.target.getAttribute('date-sno');
    //console.log(sNo);
    var studentObj = {
        sNo : sNo,
        appkey : "fhgweb_1559459973074",
    };
    var result = saveData('http://api.duyiedu.com/api/student/delBySno', studentObj);
     if(result.status == 'success'){
        
        alert(result.msg);
        init();
    } else {
        alert(result.msg);
    }
}
//分页查询 以及信息填充
function checkNavPage(nowpage){
    var studentObj = {
        appkey : "fhgweb_1559459973074",
        page : nowpage,
        size : studentspage,
    };
    var result = saveData('http://api.duyiedu.com/api/student/findByPage', studentObj);
    //console.log(result);
    var bodytr = '';
    for(var i=0;i<result.data.findByPage.length;i++){
        var tr = '<tr class = '+result.data.findByPage[i].sNo+' > \
        <td>'+result.data.findByPage[i].sNo+'</td> \
        <td>'+result.data.findByPage[i].name+'</td> \
        <td>'+(result.data.findByPage[i].sex == 0 ? '男':(result.data.findByPage[i].sex == 1 ? '女': '你猜'))+'</td> \
        <td>'+result.data.findByPage[i].email+'</td> \
        <td>'+(nowYear - result.data.findByPage[i].birth)+'</td> \
        <td>'+result.data.findByPage[i].phone+'</td> \
        <td>'+result.data.findByPage[i].address+'</td> \
        <td> \
            <button class="Lbtn btn" date-id = '+result.data.findByPage[i].sNo+' >编辑</button> \
            <button class="Rbtn btn" date-sno = '+result.data.findByPage[i].sNo+'>删除</button> \
        </td> \
    </tr>'
        bodytr += tr
    }
    tbody.innerHTML= bodytr;
    return result;
}
//页码以及样式切换
function changPage(e){
    if(e.target.tagName !== 'LI' ){
        return false;
    }
    //console.log(e.target);
    //console.log(ul.offsetLeft);
    var text = e.target.innerHTML;
    pagemove(text);
    //console.log(ul.offsetLeft);
    for(var i= 0; i< lis.length;i++){
        lis[i].classList = ' ';
    }
    e.target.classList = 'act';
    
    checkNavPage(text);
}  
//页码移动规则
function pagemove(text){
    ul.style.left = ul.offsetLeft == 0 || ul.offsetLeft>0 ? (text== 1 || text== 2  ? ul.offsetLeft : (lis.length == 3 && text== 3?ul.offsetLeft:-(text-2) * 40 +'px')) : 
    (ul.offsetLeft == -40*(lis.length-3) ? (text== lis.length - 1 || text== lis.length ? -40*(lis.length-3) +'px' : -(text-2) * 40 +'px' ):-(text-2) * 40 +'px');
}
function lastpage() {
    var liact = ul.getElementsByClassName('act')[0];
    var text = liact.innerHTML - 1;
    if(text < 1){
        text = 1;
    }
    console.log(text);
    pagemove(text);
    for(var i= 0; i< lis.length;i++){
        lis[i].classList = ' ';
    }
    lis[text-1].classList = 'act';
    checkNavPage(text);
}
function nextpage() {
    var liact = ul.getElementsByClassName('act')[0];
    var text = (liact.innerHTML - 1) + 2;
    console.log(text);
    if(text > lis.length){
        text = lis.length;
    }
    console.log(text);
    pagemove(text);
    for(var i= 0; i< lis.length;i++){
        lis[i].classList = ' ';
    }
    lis[text-1].classList = 'act';
    checkNavPage(text);
}
//页面初始化
function init(){
    var result = checkNavPage(1);
    //console.log(result.data.cont);
    var number = Math.ceil(result.data.cont / studentspage);
    //console.log(number);
    ul.style.left = number <= 2 ? 20*(3-number) +'px' : 0;
    ul.style.width = number * 40 +'px';
    var uls = '';
    for(var i= 1;i<= number;i++){
        if(i==1){
            var li = '<li class= "act">'+i+'</li>';
        }else{
        var li = '<li>'+i+'</li>';
        };
        uls += li;
    }
    ul.innerHTML= uls;
}
//navPage();

// 向后端存储数据
//url:http://api.duyiedu.com
//appkey： fhgweb_1559459973074
function saveData(url, param) {
    var result = null;
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    if (typeof param == 'string') {
        xhr.open('GET', url + '?' + param, false);
    } else if (typeof param == 'object'){
        var str = "";
        for (var prop in param) {
            str += prop + '=' + param[prop] + '&';
        }
        xhr.open('GET', url + '?' + str, false);
    } else {
        xhr.open('GET', url + '?' + param.toString(), false);
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                result = JSON.parse(xhr.responseText);
            }
        }
    }
    xhr.send();
    return result;
}

bindEvent();
})(studentspage)
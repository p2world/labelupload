# labelupload

ie8+ label iframe :hover

* depend on jQuery
* btn must be `<label>`
* one click one auto file upload
* very simple


```javascript
var jbtn=$('label').labelUpload({
    name:'file',         //  field name
    action:'/upload',
    accept: 'image/*',
    dataType:'json',     //  json,text
    contentType:'html',  //  html,text   (server response contentType text/html,text/plain)
    onstart:function(){
        jbtn.addClass('loading');
    },
    oncomplete:function(err,json){
        jbtn.removeClass('loading');
        if(err){
            alert('upload fail');
        }else{
            alert(json.id);
        }
    }
});
```
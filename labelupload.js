(function(){

var jbox=$('<div/>').css({
    position: 'absolute',
    bottom: 5,
    left: 5,
    width: 1,
    height: 1,
    overflow: 'hidden'
});
$(function(){
    jbox.appendTo('body');
});


var formSeed=0;
var iframeSeed=0;
$.fn.labelUpload=function(config){
    formSeed++;

    config=$.extend({
        contentType:'html', // html,text
        dataType:'text',    // json,text
        onstart:$.noop,
        oncomplete:$.noop
    },config);

    var jform = $('<form method="post" enctype="multipart/form-data" action="'+config.action+'"/>');

    var jinput =$('<input type="file" name="'+config.name+'" id="labelupload_'+formSeed+'" />');


    if (config.accept) {
        jinput.prop('accept',config.accept);
    }
    jinput.change(function(){
        // 点取消会变成""
        if(!$(this).val()){
            return;
        }
        config.onstart();
        iframeSeed++;
        var jiframe = $('<iframe name="labelupload_iframe_'+iframeSeed+'"/>').hide();
        jiframe.appendTo(jbox);

        jform.attr('target',jiframe.attr('name'));
        jiframe.one('load', function() {
            ieLoadingHack();
            try {
                var jbody=jiframe.contents().find("body");
                var response;
                if(config.contentType.toLowerCase()==='html'){
                    response=jbody.html();
                }else{
                    response=jbody.text();
                }
                if(config.dataType.toLowerCase()==='json'){
                    response=$.parseJSON(response);
                }
                config.oncomplete(null,response);
            } catch (e) {
                config.oncomplete('upload fail');
            }
            jiframe.remove();
            jform[0].reset();
        });
        jform.submit();
    });

    jform.append(jinput);

    jbox.append(jform);

    this.attr('for',jinput.attr('id'));
    return this;
};


// https://github.com/blueimp/jQuery-File-Upload/blob/9.5.6/js/jquery.iframe-transport.js#L102
// Fix for IE endless progress bar activity bug
// (happens on form submits to iframe targets):
function ieLoadingHack(){
    $('<iframe src="javascript:false;"></iframe>')
    .appendTo(jbox)
    .remove();
}


}());
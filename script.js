import {Stack} from './stack.js';

document.onkeydown=function(event){
    if(event.ctrlKey || event.metaKey){     //Not allowing copy paste commands
        event.preventDefault();
    }
};

onload=function(){
     const textbox=document.getElementById('comment');
     const undo=document.getElementById('Undo');
     const clear=document.getElementById('Reset');
     const temptext=document.getElementById('temptext');

     textbox.value="";
     let text="";
     let stack=new Stack();

     textbox.onclick=function(){
        textbox.selectionStart=textbox.selectionEnd=textbox.value.length;
     }; //in middle text editor will not work, cursor always remains end of the string.

     clear.onclick=function(){
        stack.clear();
        text="";
        textbox.value="";
        temptext.innerHTML="LIFO(Last-In-First-Out) Example"
     };
     textbox.oninput=function(event){
        switch(event.inputType){
            case "insertText":
                stack.push(0, event.data);
                break;
            case "deleteContentBackward":
                stack.push(1, text[text.length-1]);
                break;
        }

        temptext.innerHTML="On Stack "+stack.top()+"<br>"+temptext.innerHTML;
        text=textbox.value;
     };

     undo.onclick=function(){
        let operation =stack.pop();
        if(operation[0]!==-1){
            temptext.innerHTML="Undo operation in Progress...<br>"+temptext.innerHTML;
            if(operation[0]==0){
                let len=operation[1].length;
                textbox.value=textbox.value.substring(0,textbox.value.length-len);
            }
            else{
                textbox.value+=operation[1];
            }
            text=textbox.value;
        }
     };
};
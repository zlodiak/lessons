<script>
function ScreenWorkspace(){
  if(window.innerWidth){
    width = window.innerWidth;
    height = window.innerHeight;
	console.log(width);
  }   else if(document.documentElement && document.documentElement.clientWidth){
    width = document.documentElement.clientWidth;
    height = document.documentElement.clientHeight;
  }   else if(document.body && document.body.clientWidth){
    width = document.body.clientWidth;
    height = document.body.clientHeight;
  }
  alert(width+' * '+height);
}
ScreenWorkspace();

</script>
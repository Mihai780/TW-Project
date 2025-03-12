window.onload = function() 
{
	var colorPicker=document.getElementById('colorPicker');
	var color1='white';
	var color2='white'
	
	var canvas = document.getElementById("myCanvas");
	canvas.style.position='relative';
	canvas.style.top='450px';
	canvas.style.left='200px';
    var context = canvas.getContext("2d");
    
    context.beginPath();
    context.arc(100, 100, 50, 0, 2 * Math.PI);
    context.fillStyle = color1;
    context.fill();
    context.closePath();
	var selectedValue=3;
	var selectElement = document.getElementById("formaPicker");

    var ColorPicker2=document.getElementById('colorPicker2')
	
    selectElement.addEventListener("change", function() {
    selectedValue = selectElement.value;
	
	if (selectedValue==2)
	 {
		colorPicker.addEventListener('input',function()
	  {
		color1=colorPicker.value;
		color2=colorPicker.value;
		
		context.beginPath();
        context.arc(100, 100, 50, 0, 2 * Math.PI);
        context.fillStyle = color1;
        context.fill();
        context.closePath();

		ColorPicker2.addEventListener('input',function()
		{
			color2=ColorPicker2.value;
		    context.beginPath();
            context.arc(100, 100, 25, 0, 2 * Math.PI);
            context.fillStyle = color2;
            context.fill();
            context.closePath();
		})
	  });
	 }
	if(selectedValue==1)
	{
	colorPicker.addEventListener('input',function()
	   {
		color1=colorPicker.value;
		context.beginPath();
        context.rect(50,50,100,100);
        context.fillStyle = color1;
        context.fill();
        context.closePath();
		
		ColorPicker2.addEventListener('input',function()
		{
			color2=ColorPicker2.value;
		    context.beginPath();
            context.arc(100, 100, 25, 0, 2 * Math.PI);
            context.fillStyle = color2;
            context.fill();
            context.closePath();
		})
		
	   });
	 }
	});
	let buttonstart=document.getElementById('start');
	buttonstart.style.position='relative';
	buttonstart.style.top='500px';
	buttonstart.style.left='330px';
	
	let container=document.createElement('div');
	container.setAttribute('id','container');
	container.style.width='1000px';
	container.style.height='750px';
	container.style.left='750px';
	container.style.position = "relative";
	container.style.backgroundColor='black';
	container.style.bottom='200px';
	document.getElementById('main').appendChild(container);
	
	sessionStorage.setItem("nodots",0);
	sessionStorage.setItem("diffi",1);

	let nr = document.createElement('div');
    nr.setAttribute("id","nr");
    document.getElementById('main').appendChild(nr);
	nr.style.top='160px';
    nr.style.left='750px';
	nr.style.color='white';
	nr.style.position = "absolute";
	
	let diff = document.createElement('div');
    diff.setAttribute("id","diff");
    document.getElementById('main').appendChild(diff);
	diff.style.top='160px';
    diff.style.left='1670px';
	diff.style.color='white';
	diff.style.position = "absolute";
    
    let difficulty=1500;
	
	let win_message = document.createElement('div');
    win_message.setAttribute("id","win_message");
	win_message.style.left='220px';
	win_message.style.top='200px';
    win_message.style.position='relative';
	win_message.style.fontSize='350%';
    document.getElementById('container').appendChild(win_message);
	win_message.style.color='white';
	
    let imagess=['1.jpg','3.jpg','4.jpg','5.jpg','6.jpg'];
	let image_div=document.createElement('img');
	image_div.setAttribute('id','image_id');
	image_div.setAttribute('src','');
	image_div.src=imagess[Math.floor(Math.random()*imagess.length)];
	image_div.style.height='300px';
	image_div.style.left='250px';
	image_div.style.top='300px';
	image_div.style.position='relative';
	
	document.getElementById('diff').innerHTML='Difficulty: ' + sessionStorage.getItem('diffi');
	document.getElementById("nr").innerHTML = 'Score: ' + sessionStorage.getItem("nodots");	
	document.body.addEventListener('keydown',function()
	{
		let nivel = Number(sessionStorage.getItem("diffi"));
		switch (event.key) {
      case "+":  
			if(nivel<10)
			{
				sessionStorage.setItem('diffi', nivel+1);
				difficulty=1600-100*(sessionStorage.getItem('diffi'));
		        document.getElementById('diff').innerHTML='Difficulty: ' + sessionStorage.getItem('diffi');
			}
      break;
      case "-":
			if(nivel>1)
			{
			   sessionStorage.setItem('diffi',nivel-1);
			   difficulty=1600-100*(sessionStorage.getItem('diffi'));
		       document.getElementById('diff').innerHTML='Difficulty: ' + sessionStorage.getItem('diffi');
			}
      break;
      default:
        return;
      }
	 }
	);
	var time=0;

buttonstart.addEventListener('click', function()
 {
  var intervalbuline = setInterval(function()
  {
	if(time==6000)
	{
		clearInterval(intervalbuline);
        document.getElementById('win_message').innerHTML='You have lost!';
	}
	else
	{
	let thedot = document.createElement('canvas');
	thedot.id='bulinuta';
    var context2=thedot.getContext('2d');
	context2.drawImage(canvas, 0, 0);

	if(selectedValue==2)
	{
		thedot.style.borderRadius = "50%";
    }
    thedot.style.display= "inline-block";
    thedot.style.position = "absolute";
		
    let containerWidth = parseInt(container.style.width);
    let containerHeight = parseInt(container.style.height);

    let posx = Math.floor(Math.random() * (containerWidth - 50));
    let posy = Math.floor(Math.random() * (containerHeight - 50));

    thedot.style.left = posx + 'px';
    thedot.style.top = posy + 'px';
	
    let x=Math.floor(Math.random() * 70);
	while(x<30)
	{
		x=Math.floor(Math.random() * 70);
	}
    thedot.style.height = x+"px";
    thedot.style.width = x+"px";
	
    thedot.style.backgroundColor = color1;
	document.getElementById("container").appendChild(thedot);
	thedot.addEventListener('click', function() {
	let x = Number(sessionStorage.getItem("nodots"));
    sessionStorage.setItem("nodots", x + 1);
    document.getElementById("nr").innerHTML = 'Score: ' + sessionStorage.getItem("nodots");	
	  if(parseInt(sessionStorage.getItem('nodots'))===3)
      {
	   document.getElementById('win_message').innerHTML='You have won this Game!';
	   document.getElementById('container').appendChild(image_div);
	   clearInterval(intervalbuline);
      }
    this.remove();
    });
	document.getElementById("nr").innerHTML = 'Score: ' + sessionStorage.getItem("nodots");
	document.getElementById('diff').innerHTML='Difficulty: ' + sessionStorage.getItem('diffi');
	setTimeout(function() {
		 thedot.remove();
      }, difficulty);
	  time+=1500;
	}
   },1500);
 });
};
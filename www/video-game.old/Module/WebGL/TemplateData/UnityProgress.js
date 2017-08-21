function UnityProgress (dom) {
	this.progress = 0.0;
	this.message = "";
	this.dom = dom;

	var parent = dom.parentNode;

	var background = document.createElement("div");
	background.style.background = "#FFFFFF";
	background.style.position = "absolute";
	parent.appendChild(background);
	this.background = background;



	var messageArea = document.createElement("p");
	messageArea.style.position = "absolute";
	parent.appendChild(messageArea);
	this.messageArea = messageArea;



	this.SetProgress = function (progress) { 
		if (this.progress < progress)
			this.progress = progress; 
		this.messageArea.style.display = "none";
		

		this.Update();
	}

	this.SetMessage = function (message) { 
		this.message = message; 
		this.background.style.display = "inline";

		
		this.Update();
	}

	this.Clear = function() {
		this.background.style.display = "none";


	}

	this.Update = function() {
		this.background.style.top = this.dom.offsetTop + 'px';
		this.background.style.left = this.dom.offsetLeft + 'px';
		this.background.style.width = this.dom.offsetWidth + 'px';
		this.background.style.height = this.dom.offsetHeight + 'px';

		tot = parseInt(this.progress / 0.2);

		for (i = 0; i < 5; ++i)
			document.getElementById("a1" + i).style.display = 'none';
		for (i = 0; i < tot; ++i)
			document.getElementById("a1" + i).style.display = 'inline-block';

		this.messageArea.style.left = 0;
		this.messageArea.style.width = '100%';
		this.messageArea.style.textAlign = 'center';
		this.messageArea.innerHTML = this.message;
	}

	this.Update ();
}
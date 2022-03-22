

var vue1= new Vue({
	el:"#app",
	data: {
		game_is_on : false,
		kit_exist : true,
		special_attack_exist: true,
		player_heal:100,
		monster_heal:100,
		logs:[],
        interval: null
	},
	methods: {
		start_game: function(){ 
			this.game_is_on = true; 	
			this.player_heal=100;
			this.monster_heal=100;
			this.logs = []; 
			this.interval = setInterval(() => {  this.monster_attack(5)  }, 1000);
		}, 
		finish_game: function()
		{
			this.game_is_on = false; 
			this.logs = [];		
			clearInterval(this.interval);			
		},
		attack: function(){
			var point = Math.ceil(Math.random()*10);  
			this.monster_heal -= point;
			this.add_to_log({ turn: "p", text: "Oyuncu Atağı (" + this.player_heal + ")"});
			
			this.monster_attack(15); 
			
		},
		special_attack: function(){
			var point = Math.ceil(Math.random()*30);  
			this.monster_heal -= point;	
			this.monster_attack(15); 		
			this.special_attack_exist = false;	
			setTimeout(() => {this.special_attack_exist = true;}, 2000);//2 saniyede bir özel saldırı yapabilsin
			this.add_to_log({ turn: "p", text: "Özel Oyuncu Atağı (" + this.player_heal + ")"});				
		},
		monster_attack: function(multiple){
			var point = Math.ceil(Math.random()*multiple); 
			this.player_heal -= point;  		
			this.add_to_log({ turn: "m", text: "Canavar Atağı (" + this.player_heal + ")"});	
		},
		heal_up: function() 
		{
			var point = Math.ceil(Math.random()*20); 
			this.player_heal += point;  
			this.kit_exist = false;	   
			setTimeout(() => {this.kit_exist = true;}, 3000);//3sn sonra tekrar can basabilmesi icin
			this.add_to_log({ turn: "p", text: "Oyuncu Can Bastı (" + this.player_heal + ")"});	
		},
		give_up: function ()
		{
			this.player_heal=0; 
			this.add_to_log({ turn: "p", text: "Oyuncu Pes Etti!"});		
		},
		add_to_log: function(log)
		{
			this.logs.push(log);
		}
		
	},
	watch: {
		player_heal: function(value)
		{
			if(value < 0)
			{
				this.player_heal=0;					
			}
			else if	(value == 0)
			{
				this.finish_game();				
				if(confirm("Oyunu kaybettin tekrar denemek ister misin?"))
				{
					this.start_game();
				}		
				
			} 
			else if (value >100)
				this.player_heal=100;
		},
		
		monster_heal: function(value)
		{
			if(value < 0)
			{
				this.monster_heal=0;  
			}
			else if (value == 0)
			{ 
			    this.finish_game();			
				if(confirm("Tebrikler oyunu kazandın, tekrar oynamak ister misin?"))
				{
					this.start_game();
				}
			}
		}
	}
})
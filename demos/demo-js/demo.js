(function($){
	//always load jquery ui
	$.webshims.loader.loadList(['jquery-ui']);
	$.webshims.ready('DOM jquery-ui', function(){
		if(!window.console){
			window.console = {log: $.noop};
		}
		if(!$.browser.msie || parseInt($.browser.version, 10) > 7){
			$('code.run-once').each(function(){
				var elem = this;
				$('<button>run example</button>').insertAfter(elem).click(function(){
					eval(elem.innerHTML.replace(/&gt;/g, '>').replace(/&lt;/g, '<'));
					this.disabled = true;
					return false;
				});
			});
			
		}
		var hash = (location.hash || '').replace(/^#/, '');
		$('div.accordion')
			.each(function(){
				var accordion = this;
				var headers = $('h3.button', this);
				var selected = (hash) ? headers.filter('[id="'+hash+'"]') : 0;
				if(selected && selected[0]){
					var selElem = selected[0];
					setTimeout(function(){
						selElem.scrollIntoView();
					}, 0);
					selected = headers.index(selected[0]);
				}
				
				$(this).accordion({
					header: 'h3.button',
					active: selected,
					autoHeight: false
				});
				$(window).bind('hashchange', function(){
					hash = (location.hash || '').replace(/^#/, '');
					selected = headers.filter('[id="'+hash+'"]');
					if(selected[0]){
						$(accordion).accordion("option", "animated", false).accordion('activate', headers.index(selected[0])).accordion("option", "animated", "slide");
						setTimeout(function(){
							selected[0].scrollIntoView();
						}, 1);
					}
				});
			})
		;
		
		$('div.feature-example').each(function(){
			var div = $('div.hidden-explanation', this).hide();
			$('button', this).bind('click', function(){
				$('#placeholder').attr('placeholder', $('#placeholder-text').val());
				div.slideDown();
				return false;
			});
		});
	});
})(jQuery);

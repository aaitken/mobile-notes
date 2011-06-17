var NOTESAPP=(function(){

	//private
	var app={
			stores:{},
			views:{}
		},
		modelNote,
		viewNewForm;
	//init localStorage Data Store
	app.stores.notes=new Store('notes');

	//Model
	modelNote=Backbone.Model.extend({
		localStorage:app.stores.notes,
		initialize:function(){
				if(!this.get('title')){//this = note
					this.set({title:'Note @ '+Date()})
				}
				if(!this.get('body')){//this = note
					this.set({body:'No content'})
				}
			}
	});

	//Views
	viewNewForm=Backbone.View.extend({
		//el:$('#new'),
		events:{
				'submit form':'createNote'
			},
		createNote:function(e){
			var attrs=this.getAttributes(),
				note=new modelNote();
			note.set(attrs);
			note.save();
		},
		getAttributes:function(){
			return{
				title:this.$('form [name=title]').val(),
				body:this.$('form [name=body]').val()
			}
		}
	});

	window.modelNote=modelNote;

	$(document).ready(function(){
		app.views.newForm=new viewNewForm({
			el:$('#new')
		});
	})


	

	return app;
}());


Backbone.$ = $;
// I have no idea why backbone complains about that stuff, but this thing solves the problem.
_.templateSettings = {
    interpolate:/\$\{\{(.+?)\}\}/g,
    evaluate:/\{\{(.+?)\}\}/g
};
// set template interpolation settings

//*******************************************************************************
//core models
var user = Backbone.Model.extend({
    defaults:{
        id:'0',
        rendered:false
    },
    initialize:function (data) {
        this.model_type = "user";
    },
    toJSON:function () {
        return { user:_.clone(this.attributes) }
    },
    urlRoot:'/users',
    url:function () {
        // send the url along with the serialized query params
        return this.urlRoot + "/" + this.attributes.id;
    }
});

//*******************************************************************************
//core collections
var ScoreList = Backbone.Collection.extend({
    model:user,
    url:"/scores",
    comparator:function (event) {
        return -event.get("score");
    }
});


//*******************************************************************************
//main object
main = Backbone.Model.extend({

    defaults:{
        id:'0'
    },
    initialize:function (data) {
        data = data || {};
        this.current_view = new Backbone.View();
        this.current_user = new user();
        this.user_score_list = new ScoreList();
    },
    backup:function () {
        /* how to backup and restore objects locally

         data_x = this.toJSON();
         data_x.image_tmp = this.image_tmp.toJSON();
         data_x.user_tmp = this.user_tmp.toJSON();
         data_x.tech_album = this.tech_album.toJSON();

         Main.test = data_x;
         localStorage.main = $.base64.encode(unescape(encodeURIComponent(JSON.stringify(data_x))));
         // JSON.parse(decodeURIComponent( escape($.base64.decode(localStorage.main))))
         // decode        */

        // first we have to figure out a way to find out if cached data has changed or not
    },
    restore:function () {
        // Main = new main(JSON.parse(decodeURIComponent( escape($.base64.decode(localStorage.main)))));
    }
})
;

var Main = new main();